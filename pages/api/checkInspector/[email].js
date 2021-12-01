import nextConnect from "next-connect";
import normalizeEmail from "validator/lib/normalizeEmail";
import middleware from "../../../middleware/middleware";
import { connectToSecondDatabase } from '../../../lib/seconddb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
 // const connection1 = await connectToSecondDatabase();
  console.log("req", req.query.email);
  const email = normalizeEmail(req.query.email);
  let users = [];
  try {
    req.db
      .collection("inspectors")
      .find({ email: email, isDeleted: false })
      // TODO Use projections to limit the data returned.
      .toArray((err, item) => {
        if (err) {
          res.status(404).json(err);
        } else {
          users = item.map((v) => {
            let obj = {
              ...v,
            };
            delete obj.password;
            return obj;
          });
          res.status(200).json([...users]);

          //This is to get data from  another database

          // const { client } = connection1;
          // console.log(client)
          // let d = client.db()
          // console.log(d)
          // d.collection('users').find().toArray((err, item) => {
          // console.log(item)
        // })
         
        }
      });
  } catch (err) {
    res.status(500).send("Internal Server Error!!!");
  }
});

export default handler;
