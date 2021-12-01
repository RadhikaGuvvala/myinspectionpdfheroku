import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { ObjectId } from "mongodb";
import normalizeEmail from "validator/lib/normalizeEmail";
import passportCustom from 'passport-custom';
const CustomStrategy = passportCustom.Strategy;
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// passport#160
passport.deserializeUser((req, id, done) => {
  req.db
    .collection("inspectors")
    .findOne(ObjectId(id))
    .then((user) => done(null, user));
});
passport.use('Custom', new CustomStrategy(
  async function (req, done) {

    try {
      const user = await req.db
        .collection("inspectors")
        .findOne({ _id: ObjectId(req.body.inspectorId1) });
      delete user.password
      if (user) {

        return done(null, user);

      }

    }
    catch (err) {
      return done(err)
    }
    // Do your custom user finding logic here, or set to false based on req object
    // callback(null, user);
  }
));
passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        let emailToCheck = normalizeEmail(email);
        const user = await req.db
          .collection("inspectors")
          .findOne({ email: emailToCheck });

        if (user.loginAttempt && user.loginAttempt > 4) {
          done(
            null,
            { _id: user._id },
            {
              message:
                "User has been locked, you need to reset your password to login again!!!",
            }
          );
        } else if (user && user.provider != "Web") done(null, user);
        else if (user && (await bcrypt.compare(password, user.password))) {
          req.db.collection("inspectors").updateOne(
            {
              email,
            },
            {
              $set: {
                loginAttempt: 0,
              },
            }
          );
          done(null, user);
        } else {
          req.db.collection("inspectors").updateOne(
            {
              email,
            },
            {
              $set: {
                loginAttempt: user.loginAttempt ? user.loginAttempt + 1 : 1,
              },
            }
          );

          if (5 - (user.loginAttempt ? user.loginAttempt + 1 : 1))
            done(
              null,
              { _id: user._id },
              {
                message:
                  "Incorrect password. After " +
                  (5 - (user.loginAttempt ? user.loginAttempt + 1 : 1)) +
                  " more attempts your account will be locked. Did you forget your password?",
              }
            );
          else
            done(
              null,
              { _id: user._id },
              {
                message:
                  "Your account has now been locked. You need to reset your password first to login again!!!",
              }
            );
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

const JWTstrategy = require("passport-jwt").Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require("passport-jwt").ExtractJwt;

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top_secret",
      //we expect the user to send the token as a query parameter with the name 'secret_token'
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
