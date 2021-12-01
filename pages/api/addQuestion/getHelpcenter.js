import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Api's for Questions
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */

/**
 *
 * @swagger
 * /api/addQuestion/getHelpcenter:
 *   post:
 *     summary: Get help Center Question
 *     tags:
 *       - Questions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 properties:
 *                   limit:
 *                     type: number
 *                     example: 1000
 *                   pageNumber:
 *                     type: number
 *                     example: 1
 *                   isSearching:
 *                     type: boolean
 *                     example: true
 *                   searchingData:
 *                     type: string
 *                     example: hoe
 *                   status:
 *                     type: string
 *                     example: ""
 *     responses:
 *       200:
 *         description: Fetch all Help Center the question
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
 *       500:
 *         description: Internal Server Errror
 *       401:
 *         description: Data not Found
 */

handler.post(async (req, res) => {
  try {
    let isSearching = req.body.filter.searchingData
        ? req.body.filter.searchingData
        : false,
      searchingData = req.body.filter.searchingData,
      regex = new RegExp(searchingData);
    if (isSearching) {
      await req.db
        .collection("helpCenter")
        .aggregate([
          {
            $match: {
              $or: [
                {
                  heading: { $regex: regex, $options: "i" },
                },
                {
                  subHeading: { $regex: regex, $options: "i" },
                },
                {
                  allTags: { $regex: regex, $options: "i" },
                },
              ],
              isDeleted: false,
            },
          },
        ])
        .toArray((err, data) => {
          if (err) {
            res.status(200).json({});
          } else {
            res.status(200).json(data);
          }
        });
    } else {
      await req.db
        .collection("helpCenter")
        .find({ isDeleted: false })
        .toArray((err, data) => {
          if (err) {
            res.status(200).json({});
          } else {
            res.status(200).json(data);
          }
        });
    }
  } catch (err) {
    res.status(500).send("Internal server error!!!");
  }
});

export default handler;
