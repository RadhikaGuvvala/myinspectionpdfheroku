import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

/**
 * @swagger
 * /api/addQuestion/getDescriptionData:
 *   post:
 *     summary: Get Description of all inner Question
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
 *                 example: 101623-1626342014642
 *               mainId:
 *                 type: string
 *                 example: 60e6663c458cb11cb477ad7a
 *     responses:
 *       200:
 *         description: Fetch all inner question related to the question
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   type:
 *                     type: string
 *                   userId:
 *                     type: number
 *                   OriginalUserId:
 *                     type: string
 *                   heading:
 *                     type: string
 *                   subHeading:
 *                     type: string
 *                   image:
 *                     type: string
 *                   writtenBy:
 *                     type: string
 *                   outersortId:
 *                     type: number
 *                   outerViews:
 *                     type: number
 *                   isCritical:
 *                     type: boolean
 *                   allTags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   all:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   isDeleted:
 *                     type: boolean
 *                   showRecord:
 *                     type: boolean
 *                   numberUpdates:
 *                     type: boolean
 *                   lastModifiedBy:
 *                     type: string
 *                   QuestionArray:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         isInnerCritical:
 *                           type: boolean
 *                         questionId:
 *                           type: string
 *                         heading:
 *                           type: string
 *                         subHeading:
 *                           type: string
 *                         description:
 *                           type: string
 *                         writtenBy:
 *                           type: string
 *                         sortId:
 *                           type: number
 *                         createAt:
 *                           type: string
 *                         updatedAt:
 *                           type: string
 *                         isDeleted:
 *                           type: boolean
 *                         numberUpdates:
 *                           type: number
 *                         innerViews:
 *                           type: number
 *                         lastModifiedBy:
 *                           type: string
 *       500:
 *         description: Internal Server Errror
 *       401:
 *         description: Data not Found
 */

handler.post(async (req, res) => {
  try {
    const recentlyView = await req.db.collection("helpCenter").findOne({
      _id: ObjectId(req.body.mainId),
      "QuestionArray.questionId": req.body.questionId,
    });
    if (recentlyView) res.status(200).json(recentlyView);
    else res.status(200).json({});
  } catch (err) {
    res.status(500).send("Internal server error!!!");
  }
});
export default handler;
