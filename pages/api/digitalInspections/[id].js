import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { ObjectId } from 'mongodb';
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const inspectorData = await req.db
      .collection('bidInspections')
      .find({ projectId: ObjectId(req.query.id), isDeleted: false })
      .toArray();

    if (inspectorData) {
      res.status(200).json({ inspectorData });
    } else res.status(200).json({});
  } catch (err) {
    res.status(500).send('Internal server error!!!');
  }
});

export default handler;
