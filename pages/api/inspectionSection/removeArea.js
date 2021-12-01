import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import passport from "../../../lib/passport";
import { ObjectId } from "mongodb";

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
            {
              _id: ObjectId(req.body.deleteId),
              "AreaArray.areaId": req.body.areaId,
            },
            {
              $pull: {
                AreaArray: {
                  areaId: req.body.areaId,
                },
              },
            }
          )
          .then((result) => {
            if (result) {
              res
                .status(201)
                .json({
                  message: `Inspection Area successfully deleted of id ${req.body.areaId}`,
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
