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
      const date = new Date();
      const currentDate = date.valueOf();
      const randomStr = Math.floor(Math.random() * 100000 + 999999);
      const fileId = randomStr + "-" + currentDate;
      try {
        await req.db
          .collection("inspectionCenter")
          .updateOne(
            {
              _id: ObjectId(req.body.editId),
              "AreaArray.areaId": req.body.areaId,
            },
            {
              $push: {
                "AreaArray.$.MultimediaAreaArray": {
                  areaId: req.body.areaId,
                  fileId: fileId,
                  multimedia: req.body.multimedia,
                  answer: req.body.answer,
                  type: req.body.type1,
                },
              },
              $set: {
                "AreaArray.$.lastModifiedBy": req.body.lastModifiedBy,
                "AreaArray.$.updatedAt": new Date(),
                updatedAt: new Date(),
              },
            }
            // {
            //   arrayFilters: [{ "a.areaId": req.body.areaId }],
            // }
          )
          .then((result) => {
            if (result.result.nModified > 0) {
              res
                .status(201)
                .json({ message: "Multimedia Successfully Added" });
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
