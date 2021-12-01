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
          .find({
            _id: ObjectId(req.body.inspectionObjectId),
            isDeleted: false,
          })
          .toArray(async (err, data) => {
            if (err) {
              res
                .status(500)
                .json({ message: "Internal server error!!!", error: err });
            } else if (data.length > 0) {
              const date = new Date();
              const currentDate = date.valueOf();
              const randomStr = Math.floor(Math.random() * 10000 + 99999);
              const itemId = randomStr + "-" + currentDate;
              req.db
                .collection("inspectionCenter")
                .updateOne(
                  {
                    _id: ObjectId(req.body.inspectionObjectId),
                    "AreaArray.areaId": req.body.areaId,
                    isDeleted: false,
                  },
                  {
                    $push: {
                      "AreaArray.$.ItemArray": {
                        itemId: itemId,
                        item: req.body.item,
                        priority: req.body.priority,
                        priorityNo: req.body.priorityNo,
                        description: req.body.description,
                        suggestion: req.body.suggestion,
                        status: req.body.status,
                        sortId: req.body.sortId,
                        allPotentialAnswers: req.body.allPotentialAnswers,
                        potentialAnswer: req.body.potentialAnswer,
                        securityIssue: req.body.securityIssue,
                        observation: req.body.observation,
                        createdBy: req.body.createdBy,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        isDeleted: false,
                        lastModifiedBy: req.body.lastModifiedBy,
                        editorId: req.body.editorId,
                      },
                    },
                    // $set: {
                    //   "AreaArray.$.lastModifiedBy": req.body.lastModifiedBy,
                    //   "AreaArray.$.editorId": req.body.editorId,
                    //   "AreaArray.$.updatedAt": new Date(),
                    // },
                  }
                )
                .then((data) => {
                  if (data) {
                    res.status(201).json({
                      message: `Item successfully added for ${itemId}`,
                    });
                  } else {
                    console.log("error updating");
                  }
                });
            }
          });
      } catch (err) {
        console.log("2");
        res
          .status(500)
          .json({ message: "Internal server error!!!", error: err });
      }
    }
  }
);

export default handler;
