import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import passport from "../../../lib/passport";
import { ObjectId } from "mongodb";
import { extractUser } from "../../../lib/api-helpers";

const handler = nextConnect();

handler.use(middleware);

handler.post(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const inspectorData = await req.db.collection("inspectors").findOne({
        _id: ObjectId(req.user._id),
      });
      //   console.log(req.user, "kjjjjjjjjjjjjhkhk", inspectorData);
      let date = new Date();
      // sessionLogging(req, {
      //   userId: req.user.id,
      //   date: date,
      //   type: 'user-login',
      //   ...inspectorData
      // });
      if (inspectorData) {
        res.status(200).json({ ...extractUser({ user: inspectorData }) });
      } else res.status(200).json({});
    } catch (err) {
      res.status(500).send("Internal server error!!!");
    }
  }
);

export default handler;
