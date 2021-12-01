import nextConnect from "next-connect";
import normalizeEmail from "validator/lib/normalizeEmail";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const licenseId = new RegExp(["^", req.body.licenseId, "$"].join(""), "i");
  let users = [];
  try {
    req.db
      .collection("inspectors")
      .find({ licenseId: licenseId })
      // TODO Use projections to limit the data returned.
      .toArray((err, item) => {
        if (err) {
          res.status(404).json(err);
        } else {
          users = item.map((v) => {
            let obj = {
              ...v,
            };
            delete obj.password;
            return obj;
          });
          res.status(200).json([...users]);
        }
      });
  } catch (err) {
    res.status(500).send("Internal Server Error!!!");
  }
});

export default handler;
