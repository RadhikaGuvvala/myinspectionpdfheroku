import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import passport from "../../../lib/passport";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

/**
 * @swagger
 * /api/inspectionSection/removeItem:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove Item
 *     tags:
 *       - InspectionCenter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *               inspectionObjectId:
 *                 type: string
 *                 example: 61483a164afcb63108956c7f
 *               areaId:
 *                 type: string
 *                 example: 104651-1632686114841
 *               deleteId:
 *                 type: string
 *                 example: 105256-1632450651972
 *     responses:
 *       201:
 *         description: Item successfully removed
 *         content:
 *           applciation/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item successfully remove
 *       200:
 *         description: inspection item not removed
 *         content:
 *           applciation/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item not remove
 *       500:
 *         description: Internal Server Error
 *
 */

handler.post(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.body) {
      // console.log('removed item',req.body);
      try {
        await req.db
          .collection("inspectionCenter")
          .updateOne(
            {
              _id: ObjectId(req.body.deleteId),
              "AreaArray.areaId": req.body.areaId,
            },
            {
              $pull: {
                "AreaArray.$.ItemArray": {
                  itemId: req.body.itemId,
                },
              },
            }
          )
          .then((result) => {
            if (result.result.nModified > 0) {
              res.status(201).json({
                message: `inspection item successfully removed for ${req.body.delete}`,
              });
            } else {
              res.status(200).json({
                message: "inspection item not removed",
              });
            }
          });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal server error!!!", error: err });
      }
    }
  }
);

export default handler;
