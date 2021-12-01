import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import passport from "../../../lib/passport";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.post(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await req.db
        .collection("inspectionCenter")
        .updateOne(
          {
            _id: ObjectId(req.body._id),
          },
          {
            $set: {
              questionImage: req.body.questionImage,
              observation: req.body.observation,
              inspectionObjectAge: req.body.inspectionObjectAge,
              selectedDateFrom: req.body.selectedDateFrom,
              selectedDateTo: req.body.selectedDateTo,
              weather: req.body.weather,
              scope: req.body.scope,
            },
          }
        )
        .then((result) => {
          if (result) {
            res
              .status(200)
              .json({ message: "Inspection Center successfully updated" });
          } else {
            console.log("error updating");
          }
        });
    } catch (e) {
      res.status(500).send("Internal server error!!!");
    }
  }
);

export default handler;
