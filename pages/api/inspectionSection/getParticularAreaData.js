import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import { ObjectId } from "mongodb";
import passport from "../../../lib/passport";

const handler = nextConnect();

handler.use(middleware);

handler.post(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let isSearching = req.body.filter.searchingData
          ? req.body.filter.searchingData
          : false,
        searchingData = req.body.filter.searchingData,
        regex = new RegExp(searchingData, "i");
      if (isSearching) {
        await req.db
          .collection("inspectionCenter")
          .aggregate([
            {
              $match: {
                _id: ObjectId(req.body.inspectionObjectId),
                "AreaArray.areaId": req.body.areaId,
              },
            },
            {
              $unwind: "$AreaArray",
            },
            {
              $unwind: "$AreaArray.ItemArray",
            },
            {
              $match: {
                "AreaArray.areaId": req.body.areaId,
                $or: [
                  {
                    "AreaArray.ItemArray.item": { $regex: regex },
                  },
                  {
                    "AreaArray.ItemArray.status": { $regex: regex },
                  },
                  {
                    "AreaArray.ItemArray.securityIssue": { $regex: regex },
                  },
                ],
              },
            },
            {
              $project: {
                AreaArray: 1,
              },
            },
            {
              $group: {
                _id: "$AreaArray.areaId",
                ItemArray: { $push: "$AreaArray.ItemArray" },
              },
            },
          ])
          .toArray((err, data) => {
            if (err) {
              res.status(401).send(err, "error message");
            } else {
              res.status(200).json(data);
            }
          });
      } else {
        const recentlyView = await req.db
          .collection("inspectionCenter")
          .find({
            _id: ObjectId(req.body.inspectionObjectId),
            "AreaArray.areaId": req.body.areaId,
          })
          .toArray();
        if (recentlyView) {
          res
            .status(200)
            .json(
              recentlyView[0].AreaArray.filter(
                (d) => d.areaId === req.body.areaId
              )
            );
        } else res.status(200).json({});
      }
    } catch (err) {
      res.status(500).send("Internal server error!!!");
    }
  }
);
export default handler;
