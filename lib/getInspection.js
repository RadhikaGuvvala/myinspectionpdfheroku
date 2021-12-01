import { ObjectId } from "mongodb";

export async function getAllInspectionCollection(req, d) {
  let myPromise = () => {
    return new Promise(async (resolve, reject) => {
      await req.db
        .collection("inspectionCenter")
        .find({ isDeleted: false, all: "inspection" })
        .toArray((err, data) => {
          err ? reject(err) : resolve(data);
        });
    });
  };
  return await myPromise();
}

export async function getAreaArray(req, data) {
  let myPromise = () => {
    return new Promise(async (resolve, reject) => {
      await req.db
        .collection("inspectionCenter")
        .find({ _id: ObjectId(data.params.id) })
        .toArray((err, data) => {
          err ? reject(err) : resolve(data);
        });
    });
  };
  return await myPromise();
}

export async function getItemArray(req, data) {
  let myPromise = () => {
    return new Promise(async (resolve, reject) => {
      await req.db
        .collection("inspectionCenter")
        .find({
          _id: ObjectId(data.params.id),
          "AreaArray.areaId": data.params.areaId,
        })
        .toArray((err, datas) => {
          err
            ? reject(err)
            : resolve([
                ...datas[0].AreaArray.filter(
                  (d) => d.areaId === data.params.areaId
                ),
                datas[0],
              ]);
        });
    });
  };
  return await myPromise();
}

export async function getInspectorDetails(req,id) {
  console.log("aaaaaaaaaaaa",id)
  let myPromise = () => {
    return new Promise(async (resolve, reject) => {
      await req.db
        .collection("inspectors")
        .find({_id:ObjectId(id)})
        .toArray((err, data) => {
          err ? reject(err) : resolve(data);
        });
    });
  };
  return await myPromise();
// let details = await req.db.collection('inspectionCenter').find({ _id: ObjectId(req.body.inspectionId) });

// if (!details) return null;
// return {
//   details
// };
}
