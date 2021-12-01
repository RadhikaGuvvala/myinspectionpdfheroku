import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import { ObjectId } from "mongodb";
import passport from "../../../lib/passport";

const handler = nextConnect();

handler.use(middleware);

handler.post(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.body) {
      try {
        await req.db
          .collection("inspectionCenter")
          .updateOne(
            { _id: ObjectId(req.body.inspectionId) },
            {
              $set: {
                outerViews: req.body.outerViews,
              },
            }
          )
          .then((result) => {
            if (result.result.nModified > 0) {
              res
                .status(201)
                .json({ message: "Inspection successfully updated" });
            } else {
              res.status(200).json({});
            }
          });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Internal server error!!!", error: err });
      }
    }
  }
);

export default handler;
