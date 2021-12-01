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
              "AreaArray.ItemArray.itemId": req.body.itemId,
            },
            {
              $set: {
                "AreaArray.$[a].ItemArray.$[i].workStatus": req.body.workStatus,
                "AreaArray.$[a].ItemArray.$[i].lastModifiedBy":
                  req.body.lastModifiedBy,
                "AreaArray.$[a].ItemArray.$[i].editorId": req.body.editorId,
                "AreaArray.$[a].ItemArray.$[i].updatedAt": new Date(),
                // "AreaArray.$[a].updatedAt": new Date(),
                // updatedAt: new Date(),
              },
            },
            {
              arrayFilters: [
                { "a.areaId": req.body.areaId },
                { "i.itemId": req.body.itemId },
              ],
            }
          )
          .then((result) => {
            if (result.result.nModified > 0) {
              res
                .status(201)
                .json({ message: "Inspection Area successfully updated" });
            } else {
              res.status(200).json({ message: "Inspection Area not updated" });
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
