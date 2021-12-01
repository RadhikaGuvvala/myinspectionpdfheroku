import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    // console.log(req.body);
    const Data = {
      ...req.body,
      projectId: ObjectId(req.body.projectId1),
      inspectorId: ObjectId(req.body.inspectorId1),
    };
    delete Data._id;
    delete Data.projectId1;
    delete Data.inspectorId1;

    const saveData = req.db.collection("bidInspections").insertOne({
      ...Data,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      lastModifiedBy: null,
    });
    // TODO Use projections to limit the data returned.
    res.status(200).json({
      message:
        "Inspection object successfully added to inspection center bucket",
      wishlist: saveData,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error!!!");
  }
});

export default handler;
