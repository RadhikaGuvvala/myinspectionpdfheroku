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
              _id: ObjectId(req.body.editId),
              "AreaArray.areaId": req.body.areaId,
            },
            {
              $set: {
                "AreaArray.$.workStatus": req.body.workStatus,
                "AreaArray.$.updatedAt": new Date(),
                "AreaArray.$.editorId": req.body.editorId,
                "AreaArray.$.lastModifiedBy": req.body.lastModifiedBy,
                lastEditBy: req.body.lastModifiedBy,
                updatedAt: new Date(),
              },
            }
          )
          .then((result) => {
            if (result.result.nModified > 0) {
              res
                .status(201)
                .json({ message: "Inspection Area successfully updated" });
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
