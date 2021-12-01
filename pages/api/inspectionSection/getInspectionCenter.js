import nextConnect from "next-connect";
import passport from "../../../lib/passport";
import middleware from "../../../middleware/middleware";
import { ObjectId } from "mongodb";

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
        regex = new RegExp(searchingData);
      if (isSearching) {
        await req.db
          .collection("inspectionCenter")
          .aggregate([
            {
              $match: {
                $or: [
                  {
                    inspectionObject: { $regex: regex, $options: "i" },
                  },
                  {
                    inspectionType: { $regex: regex, $options: "i" },
                  },
                  {
                    allTags: { $regex: regex, $options: "i" },
                  },
                ],
                isDeleted: false,
                all: "inspection",
              },
            },
          ])
          .toArray((err, data) => {
            if (err) {
              res.status(200).json({});
            } else {
              res.status(200).json(data);
            }
          });
      } else if (req.body.filter.inspectorId) {
        await req.db
          .collection("inspectionCenter")
          .find({
            isDeleted: false,
            all: "inspection",
            inspectorId: ObjectId(req.body.filter.inspectorId),
          })
          .toArray((err, data) => {
            if (err) {
              res.status(200).json({});
            } else {
              res.status(200).json(data);
            }
          });
      } else {
        await req.db
          .collection("inspectionCenter")
          .find({ isDeleted: false, all: "inspection" })
          .toArray((err, data) => {
            if (err) {
              res.status(200).json({});
            } else {
              res.status(200).json(data);
            }
          });
      }
    } catch (err) {
      res.status(500).send("Internal server error!!!");
    }
  }
);

export default handler;
