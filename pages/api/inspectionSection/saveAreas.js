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
      var regex = new RegExp(["^", req.body.area, "$"].join(""), "i");
      try {
        await req.db
          .collection("inspectionCenter")
          .find({
            _id: ObjectId(req.body.inspectionObjectId),
            isDeleted: false,
            "AreaArray.area": regex,
          })
          .toArray(async (err, data) => {
            if (err) {
              res
                .status(500)
                .json({ message: "Internal server error!!!", error: err });
            } else if (data.length > 0) {
              console.log();
              res.status(409).json({ message: "Area already added." });
            } else {
              const date = new Date();
              const currentDate = date.valueOf();
              const randomStr = Math.floor(Math.random() * 10000 + 99999);
              const areaId = randomStr + "-" + currentDate;
              req.db
                .collection("inspectionCenter")
                .updateOne(
                  {
                    _id: ObjectId(req.body.inspectionObjectId),
                    isDeleted: false,
                  },
                  {
                    $push: {
                      AreaArray: {
                        areaId: areaId,
                        area: req.body.area,
                        priority: req.body.priority,
                        priorityNo: req.body.priorityNo,
                        description: req.body.description,
                        suggestion: req.body.suggestion,
                        status: req.body.status,
                        createdBy: req.body.createdBy,
                        observation: req.body.observation,
                        sortId: req.body.sortId,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        isDeleted: false,
                        editorId: req.body.editorId,
                        lastModifiedBy: req.body.lastModifiedBy,
                      },
                    },
                  }
                )
                .then((data) => {
                  if (data) {
                    res.status(201).json({
                      message: `Inspection Area successfully updated for ${areaId}`,
                    });
                  } else {
                    console.log("error updating");
                  }
                });
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
