import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

/**
 * @swagger
 * /api/addQuestion/increaseInnerViewsCollection:
 *   post:
 *     summary: Increase view count of innerQuestions
 *     tags:
 *       - Questions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *                 example: 60e6663c458cb11cb477ad7a
 *               innerViews:
 *                 type: number
 *                 example: 10
 *               innerquestionId:
 *                 type: string
 *                 example: 101623-1626342014642
 *     responses:
 *       201:
 *         description: (if views are modified) View Increases Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       200:
 *         description: (if views are not modified)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Internal Server Errror
 *       401:
 *         description: Data not Found
 */

handler.post(async (req, res) => {
  if (req.body) {
    try {
      await req.db
        .collection("helpCenter")
        .updateOne(
          {
            _id: ObjectId(req.body.questionId),
            "QuestionArray.questionId": req.body.innerquestionId,
          },
          {
            $set: {
              "QuestionArray.$.innerViews": req.body.innerViews,
            },
          }
        )
        .then((result) => {
          if (result.result.nModified > 0) {
            res.status(201).json({ message: "Question successfully updated" });
          } else {
            res.status(200).json({});
          }
        });
    } catch (err) {
      res.status(500).json({ message: "Internal server error!!!", error: err });
    }
  }
});

export default handler;
