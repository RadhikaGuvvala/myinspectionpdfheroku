import nextConnect from "next-connect";
import { extractUser, signJwt } from "../../lib/api-helpers";
import middleware from "../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  let date = new Date();
  const { email, firstName, lastName, password, provider } = req.body;

  const userLogin = await req.db.collection("inspectors").findOne({ email });

  if (userLogin) {
    if (userLogin.deleted) {
      res
        .status(403)
        .send(
          "User has been deactivated at " +
            userLogin.deletedAt +
            " by " +
            userLogin.deletedBy +
            "."
        );
    } else {
      if (userLogin.provider == provider) {
        req.logIn(userLogin, { session: false }, (err) => {
          if (err) throw err;

          const token = signJwt(extractUser(req));
          const userData = extractUser(req);

          res.status(200).json({
            token: token,
            user: { ...userData },
          });
        });
        return;
      } else {
        res
          .status(403)
          .send(
            "This account is linked with " +
              userLogin.provider +
              " you are trying to login with " +
              provider +
              ". Try logging in with " +
              userLogin.provider +
              "."
          );
      }
    }
  }

  const inspector = await req.db
    .collection("inspectors")
    .insertOne({
      email,
      firstName,
      lastName,
      password,
      provider,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
  req.logIn(inspector, { session: false }, (err) => {
    if (err) throw err;

    const token = signJwt(extractUser(req));
    res.status(200).json({
      token: token,
      user: extractUser(req),
    });
  });
});

export default handler;
