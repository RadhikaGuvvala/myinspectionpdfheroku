const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

export async function sendMail(email, subject, message, cb) {
  // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      // imap: 993,
      secure: process.env.MAIL_PORT == 465, // true for 465, false for other ports
      // service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_ID, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.MAIL_ID, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: message,
    });
    cb(info);
  } catch (err) {
    console.log(err, "in error");
    cb(undefined, err);
  }
}

export function extractUser(req) {
  if (!req.user) return null;
  // take only needed user fields to avoid sensitive ones (such as password)
  const {
    _id,
    id,
    firstName,
    lastName,
    email,
    provider,
    verified,
    isDeleted,
    activate,
    licenseId,
    inspectionSpecialities,
    address,
    phone,
    licenseImg,
    createdAt,
    updatedAt,
    numberUpdates,
    lastModifiedBy,
    loginAttempt,
  } = req.user;
  return {
    _id,
    id,
    firstName,
    lastName,
    email,
    provider,
    verified,
    isDeleted,
    activate,
    licenseId,
    inspectionSpecialities,
    address,
    phone,
    licenseImg,
    createdAt,
    updatedAt,
    numberUpdates,
    lastModifiedBy,
    loginAttempt,
  };
}

export function extractClientDetails(req) {
  const clientDetails = req.headers.clientdetails
    ? JSON.parse(req.headers.clientdetails)
    : { via: "POSTMAN" };

  return clientDetails;
}

export async function extractAllUsers(req, email) {
  let users = [];
  await req.db
    .collection("users")
    .find({ email: email })
    .toArray((err, item) => {
      if (err) {
        console.log(err);
      } else {
        users = item.map((v) => {
          let obj = {
            ...v,
          };
          delete obj.password;
          return v;
        });
        return users;
      }
    });
}

export async function sessionLogging(req, obj) {
  req.db.collection("session").insertOne(obj);
}

export function signJwt(u, t = "6h") {
  return jwt.sign({ user: u }, "top_secret", { expiresIn: t });
}

export function checkUserEligible(req, str) {
  let flag = false;
  if (str == "SystemAdmin")
    if (
      req.user.role.includes("SystemAdmin") ||
      req.user.role.includes("ApplicationAdmin")
    )
      flag = true;
    else flag = false;
  else if (str == "ApplicationAdmin")
    if (req.user.role.includes("ApplicationAdmin")) flag = true;
    else flag = false;
  return flag;
}

export async function getNextSequenceValue(sequenceName, req, cb) {
  req.db
    .collection("counters")
    .findAndModify(
      { _id: sequenceName },
      [["_id", "asc"]],
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true },
      (err, doc) => {
        cb(doc.value.sequence_value);
      }
    );
}

export async function addActiveUser(req, ttl) {
  req.db
    .collection("loggedInUsers")
    .insertOne({ id: req.user.id, loggedInDT: new Date(), ttl: ttl });
}

export async function removeActiveUser(req) {
  req.db.collection("loggedInUsers").remove({ id: req.user.id });
}
