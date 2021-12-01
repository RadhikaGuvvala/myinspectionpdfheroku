import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";
import passport from "../../lib/passport";
import {
  extractUser,
  extractClientDetails,
  sessionLogging,
  signJwt,
  addActiveUser,
  removeActiveUser,
} from "../../lib/api-helpers";
import moment from "moment";

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate("local"), async (req, res) => {
  let userToCheck = extractUser(req);
  if (req.authInfo && req.authInfo.message) {
    res.status(401).send(req.authInfo.message);
  }
  // else if (!userToCheck.activate) {
  //   res.status(403).send(
  //     "Your application is in review will update you once it is successfully reviewed!!!"
  //     // "User has been deactivated at " +
  //     //   moment(userToCheck.deactivatedAt).format("MMMM Do YYYY, h:mm:ss a") +
  //     //   " by " +
  //     //   userToCheck.deactivatedBy +
  //     //   "!!!"
  //   );
  // }
  else if (!userToCheck.verified) {
    res.status(403).send("Not verified");
  } else {
    if (
      userToCheck.provider == "Web" ||
      userToCheck.provider == "MongoDB" ||
      !userToCheck.provider
    ) {
      const token = req.body.keepLoggedIn
        ? signJwt(extractUser(req), "6h")
        : signJwt(extractUser(req));
      let date = new Date();

      sessionLogging(req, {
        userId: req.user.id,
        date: date,
        type: "inspector-login",
        ...extractClientDetails(req),
      });

      addActiveUser(req, req.body.keepLoggedIn ? 21600 : 7200);

      const userData = { ...extractUser(req) };

      /* Fetch user settings from db */
      // const userSettings = await req.db
      //   .collection('credentialsOnFile')
      //   .findOne({ userId: req.user.id });

      // const customerSettings = await req.db
      //   .collection('customers')
      //   .findOne({ userId: req.user.id });

      // if (userSettings?.personalPreferences) {
      //   // Adding personalPreferences to login response
      //   userData['preferences'] = { ...userSettings['personalPreferences'] };
      // }
      // if (userSettings?.settingDetails) {
      //   userData['settings'] = {
      //     ...userSettings['settingDetails']
      //   };
      // }

      // if (customerSettings?.dwollaCustomerID) {
      //   userData['dwollaCustomerID'] = customerSettings['dwollaCustomerID'];
      // }
      // if (customerSettings?.stripeCustomerID) {
      //   userData['stripeCustomerID'] = customerSettings['stripeCustomerID'];
      // }

      // ioHandler(req, res, 'login', r => {
      res.status(200).json({
        token: token,
        user: { ...userData },
        // });
      });
    } else {
      res
        .status(403)
        .send(
          "User has registered with " +
            userToCheck.provider +
            ". Login with " +
            userToCheck.provider +
            " to continue!!!"
        );
    }
  }
});

handler.delete(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let date = new Date();
      sessionLogging(req, {
        userId: req.user?.id,
        date: date,
        type: "inspector-logout",
        ...extractClientDetails(req),
      });

      removeActiveUser(req);
      // ioHandler(req, res,'logout', r => {
      req.logOut();
      res.status(204).end();
      // });
    } catch (err) {
      console.log("kkkkkkkkkkkkkkkkk", err);
      res.status(500).json({ message: "Internal server error!!!", error: err });
    }
  }
);

export default handler;
