import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";
import passport from "../../lib/passport";
import { uploadToAzure2 } from "../../lib/azure-helper";

import * as multer from "multer";

const inMemoryStorage = multer.memoryStorage(),
  uploadStrategy = multer({ storage: inMemoryStorage }).single("file");

const handler = nextConnect();

handler.use(middleware);

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(uploadStrategy, async (req, res) => {
  if (req.file) {
    uploadToAzure2(req.file, (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Internal server error!!!",
          err: err,
        });
        return;
      }
      res.status(200).json({
        message: "File uploaded to Azure Blob storage.",
        result: data,
      });
    });
  } else {
    res.status(401).send("Please attach an image!");
  }
});
export default handler;
