import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

/**
 * @swagger
 * /api/addQuestion/getRating:
 *   post:
 *     summary: Get Updating Rating Question
 *     tags:
 *       - Questions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 example: 103.203.225.113
 *               InnerQuestionId:
 *                 type: string
 *                 example: 101623-1626342014642
 *     responses:
 *       200:
 *         description: Fetch all ratings related to the question
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   clientId:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   InnerQuestionId:
 *                     type: string
 *                   mainCollectionId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   numberUpdates:
 *                     type: number
 *                   lastModifiedBy:
 *                     type: string
 *       500:
 *         description: Internal Server Errror
 *       401:
 *         description: Data not Found
 */

handler.post(async (req, res) => {
  try {
    const ratingData = await req.db
      .collection("rating")
      .find({
        clientId: req.body.clientId,
        InnerQuestionId: req.body.InnerQuestionId,
      })
      .toArray();
    if (ratingData) res.status(200).json(ratingData);
    else res.status(200).json({});
  } catch (err) {
    res.status(500).send("Internal server error!!!");
  }
});

export default handler;
