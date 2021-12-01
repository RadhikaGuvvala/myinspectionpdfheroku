import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { ObjectId } from 'mongodb';
import passport from '../../../lib/passport'

const handler = nextConnect();

handler.use(middleware);


handler.get(async (req, res) => {
  
    try {
      const inspectionCenterData = await req.db.collection('inspectionCenter').findOne({projectId:ObjectId(req.query.id)});

      if(inspectionCenterData){
      res.status(200).json({...inspectionCenterData});
      }
      else{
              res.status(400).json({});


      }
      }



     catch (err) {
      res.status(401).send(err, 'error message');
    }
 
});

export default handler;
