import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import { ObjectId } from "mongodb";
const handler = nextConnect();

handler.use(middleware);

/**
 * @swagger
 * /api/addQuestion/addRating:
 *   post:
 *     summary: Add Rating to Question
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
 *               rating:
 *                 type: number
 *                 example: 3
 *               InnerQuestionId:
 *                 type: string
 *                 example: 101623-1626342014642
 *               mainCollectionId:
 *                 type: string
 *                 example: 60e6663c458cb11cb477ad7a
 *     responses:
 *       201:
 *         description: (if rating changed) Rating Changed Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       200:
 *         description: (if rating not changed)
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
        .collection("rating")
        .find({
          clientId: req.body.clientId,
          InnerQuestionId: req.body.InnerQuestionId,
        })
        .toArray(async (err, data) => {
          if (data.length > 0) {
            await req.db
              .collection("rating")
              .updateOne(
                {
                  clientId: req.body.clientId,
                  InnerQuestionId: req.body.InnerQuestionId,
                },
                {
                  $set: {
                    rating: req.body.rating,
                  },
                }
              )
              .then(async (result) => {
                if (result.result.nModified > 0) {
                  const ratingCollection = await req.db
                    .collection("rating")
                    .find({ mainCollectionId: req.body.mainCollectionId })
                    .toArray();
                  if (ratingCollection && ratingCollection.length > 0) {
                    var totalrating = 0;
                    ratingCollection.forEach((element) => {
                      totalrating += element.rating;
                    });
                    const AverageRating = totalrating / ratingCollection.length;
                    await req.db
                      .collection("helpCenter")
                      .updateOne(
                        { _id: ObjectId(req.body.mainCollectionId) },
                        {
                          $set: {
                            averageRating: AverageRating,
                          },
                        }
                      )
                      .then((result) => {
                        if (result) {
                          res.status(201).json({
                            message: "Rating successfully updated",
                          });
                        }
                      });
                  } else {
                    res.status(200).json({});
                  }
                } else {
                  res.status(200).json({});
                }
              });
          } else if (data.length === 0) {
            const ratingData = await req.db.collection("rating").insertOne({
              ...req.body,
              createdAt: new Date(),
              updatedAt: new Date(),
              numberUpdates: 0,
              lastModifiedBy: null,
            });

            const ratingCollectionInitial = await req.db
              .collection("rating")
              .find({ mainCollectionId: req.body.mainCollectionId })
              .toArray();
            if (ratingCollectionInitial && ratingCollectionInitial.length > 0) {
              var totalrating = 0;
              ratingCollectionInitial.forEach((element) => {
                totalrating += element.rating;
              });
              const AverageRatingInitial =
                totalrating / ratingCollectionInitial.length;
              await req.db
                .collection("helpCenter")
                .updateOne(
                  { _id: ObjectId(req.body.mainCollectionId) },
                  {
                    $set: {
                      averageRating: AverageRatingInitial,
                    },
                  }
                )
                .then((result) => {
                  if (result) {
                    res.status(200).json({
                      message: "Rating added successfully.",
                      ratingData: ratingData,
                    });
                  }
                });
            } else {
              res.status(200).json({});
            }
          } else {
            res.status(401).send(err, "error message");
          }
        });
    } catch (err) {
      res.status(500).json({ message: "Internal server error!!!", error: err });
    }
  }
});

export default handler;
