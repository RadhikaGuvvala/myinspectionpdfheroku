import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import passport from "../../../lib/passport";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.post(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.body);
    if (req.body) {
      try {
        req.db
          .collection("inspectionCenter")
          .updateOne(
            {
              _id: ObjectId(req.body.editId),
              isDeleted: false,
            },
            {
              $push: {
                AreaArray: { $each: req.body.AreaArray },
              },
            }
          )
          .then((data) => {
            if (data) {
              res.status(201).json({
                message: `Inspection Area successfully updated`,
              });
            } else {
              console.log("error updating");
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
