import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { ObjectId } from 'mongodb';
import passport from '../../../lib/passport'

const handler = nextConnect();

handler.use(middleware);

handler.delete(async (req, res) => {

  if (req.query.id) {
    try {
      let bidInspection = await req.db.collection('bidInspections').updateOne(
        { _id: ObjectId(req.query.id) },
        {
          $set: { isDeleted: true }
        },
        { upsert: true }
      );

      if (bidInspection) {
        res.status(200).json({ message: 'Deleted successfully' });
      } else {
        res.status(401).send({ message: 'Cannot Delete' });
      }
    } catch (err) {
      res.status(401).send(err, 'error message');
    }
  } else {
    res.status(400);
  }
});

handler.post(passport.authenticate("Custom"), async (req, res) => {
  if (req.body) {
    try {
      let data = {
        ...req.body,
        projectId: ObjectId(req.body.projectId1),
        inspectorId: ObjectId(req.body.inspectorId1)
      };
      delete data.projectId1;
      delete data.inspectorId1;

      const inspectionCenterData = await req.db.collection('inspectionCenter').insertOne({
        ...data
      });

      if (inspectionCenterData) {
        res.status(200).json({
          message: 'Added to inspection center',
          data: inspectionCenterData.ops[0]
        });
      } else {
        res.status(400).send({
          message: 'cannot create',
          signa: 15
        });

        if (inspectionCenterData) {
          res.status(200).json({
            message: 'Added to inspection center',
            data: inspectionCenterData.ops[0]
          });
        } else {
          res.status(400).send({
            message: 'cannot create',
            signa: 15
          });
        }
      }



    } catch (err) {
      res.status(401).send(err, 'error message');
    }
  } else {
    res.status(400);
  }
});

export default handler;
