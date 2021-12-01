import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import middleware from "../../middleware/middleware";
import {
  extractClientDetails,
  sessionLogging,
  getNextSequenceValue,
  sendMail,
} from "../../lib/api-helpers";
import passport from "../../lib/passport";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    licenseId,
    inspectionSpecialities,
    Address,
    phone,
    licenseImg,
  } = req.body;
  if (!req.body.email) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }
  const email = normalizeEmail(req.body.email);
  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }
  if (
    !password ||
    !firstName ||
    !lastName ||
    !licenseId ||
    !inspectionSpecialities ||
    !phone ||
    !licenseImg
  ) {
    res.status(400).send("Missing field(s)");
    return;
  }

  if ((await req.db.collection("inspectors").countDocuments({ email })) > 0) {
    res.status(403).send("The email has already been used.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let date = new Date();
  //   let token = (
  //     Math.floor(Math.random() * (999999 - 100000)) + 100000
  //   ).toString();
  //   let tokenToSend = token.split("");
  //   tokenToSend =
  //     tokenToSend[0] +
  //     tokenToSend[1] +
  //     "-" +
  //     tokenToSend[2] +
  //     tokenToSend[3] +
  //     "-" +
  //     tokenToSend[4] +
  //     tokenToSend[5];
  const subjectInspector = "Application in Review";
  const messageInspector =
    "<span>Your application is in review and it will be take upto 48hrs to review.</span>";
  const subjectAdmin = "New Inspector Registered";
  const messageAdmin = `<span>New Inspector <b>${email}<b> want to access the inspection. Please verify the details for the same. </span>`;
  getNextSequenceValue("inspector_id", req, async (id) => {
    const user = await req.db
      .collection("inspectors")
      .insertOne({
        id: id,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        provider: "Web",
        verified: true,
        isDeleted: false,
        activate: false,
        // token: token,
        licenseId: licenseId,
        inspectionSpecialities: inspectionSpecialities,
        Address: Address,
        phone: phone,
        licenseImg: licenseImg,
        createdAt: new Date(),
        updatedAt: new Date(),
        numberUpdates: 0,
        lastModifiedBy: null,
      })
      .then(({ ops }) => ops[0]);
    delete user.password;
    sessionLogging(req, {
      userId: user.id,
      date: date,
      type: "inspector-register",
      ...extractClientDetails(req),
    });
    sendMail(
      "regiAdmi1234@gmail.com",
      subjectAdmin,
      messageAdmin,
      (mailResp, mailErr) => {
        if (mailErr)
          res.status(500).json({
            message: "Internal server error sending mail!!!",
            error: mailErr,
          });
        else res.status(201).send(messageAdmin);
      }
    );
    sendMail(email, subjectInspector, messageInspector, (mailResp, mailErr) => {
      if (mailErr)
        res.status(500).json({
          message: "Internal server error sending mail!!!",
          error: mailErr,
        });
      else
        res
          .status(201)
          .send(
            "Your Application is in process. Check your mail for more details."
          );
    });
    // sendMail("adminId", subjectInspector, messageInspector, (mailResp, mailErr) => {
    //   if (mailErr)
    //     res.status(500).json({
    //       message: 'Internal server error sending mail!!!',
    //       error: mailErr
    //     });
    //   else
    //   res.status(201).send(
    //     "Your Application is in process. Check your mail for more details."
    //   );
    //   });
  });
});

// handler.patch(
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     req.db
//       .collection("users")
//       .updateOne(
//         { email: req.body.email },
//         {
//           $set: {
//             email: req.body.email,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             description: req.body.description,
//             modified_at: new Date(),
//           },
//         }
//       )
//       .then((/* data */) => {
//         let date = new Date();
//         const token = signJwt({
//           ...extractUser(req),
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           modified_at: new Date(),
//         });
//         sessionLogging(req, {
//           userId: req.user.id,
//           date: date,
//           type: "user-update",
//           ...extractClientDetails(req),
//         });
//         res.status(200).json({
//           token: token,
//         });
//       });
//   }
// );

export default handler;
