import nextConnect from "next-connect";
import passport from "../../../lib/passport";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.get(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      req.db
        .collection("inspectionCenter")
        .find({
          all: "baseInspection",
          inspectionType: req.query.inspectorDomain,
          isDeleted: false,
        })
        .toArray((err, data) => {
          if (err) {
            res.status(404).json(err);
          } else {
            res.status(200).json(data);
          }
        });
      // TODO Use projections to limit the data returned.
    } catch (err) {
      res.status(500).send("Internal Server Error!!!");
    }
  }
);

export default handler;
