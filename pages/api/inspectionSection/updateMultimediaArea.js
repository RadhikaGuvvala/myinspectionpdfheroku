import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import passport from "../../../lib/passport";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);
/**
 * @swagger
 * /api/inspectionSection/editParticularItem:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Edit Particular Item
 *     tags:
 *       - InspectionCenter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: SuperAdmin
 *               userId:
 *                 type: number
 *                 example: 1
 *               editId:
 *                 type: string
 *                 example: 614d348936e99a0009d0c6d1
 *               areaId:
 *                 type: string
 *                 example: 102341-1632449695671
 *               itemId:
 *                 type: string
 *                 example: 106982-1632449754371
 *               item:
 *                 type: string
 *                 example: Test Item A
 *               priority:
 *                 type: string
 *                 example: Medium
 *               priorityNo:
 *                 type: number
 *                 example: 2
 *               allPotentialAnswers:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: cracks none
 *               description:
 *                 type: string
 *                 example: check throughly on surface as well as interior parts
 *               suggestion:
 *                 type: string
 *                 example: no cracks
 *               sortId:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: Inspection area successfully updated
 *         content:
 *           applciation/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inspection Item successfully updated
 *
 *       201:
 *         description: Inspection Item NOT updated
 *         content:
 *           applciation/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inspection Item not updated
 */

handler.post(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.body) {
      try {
        await req.db
          .collection("inspectionCenter")
          .updateOne(
            {
              _id: ObjectId(req.body.editId),
              "AreaArray.areaId": req.body.areaId,
              "AreaArray.MultimediaAreaArray.fileId": req.body.fileId,
            },
            {
              $set: {
                "AreaArray.$[a].MultimediaAreaArray.$[f].answer":
                  req.body.answer,
                "AreaArray.$[a].lastModifiedBy": req.body.lastModifiedBy,
                "AreaArray.$[a].updatedAt": new Date(),
                updatedAt: new Date(),
              },
            },
            {
              arrayFilters: [
                { "a.areaId": req.body.areaId },
                { "f.fileId": req.body.fileId },
              ],
            }
          )
          .then((result) => {
            if (result.result.nModified > 0) {
              res
                .status(201)
                .json({ message: "Inspection Area successfully updated" });
            } else {
              res.status(200).json({ message: "Inspection Area not updated" });
            }
          });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Internal server error!!!", error: err });
      }
    }
  }
);

export default handler;
