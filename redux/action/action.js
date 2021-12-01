import axios from "axios";
import { toast } from "react-toastify";
import { GET_INSPECTOR } from "./actionTypes";
import { getInspectorListing } from "./getInspectorListing";
toast.configure();

export function getInspector(data) {
  return {
    type: GET_INSPECTOR,
    Payload: data,
  };
}

export function increaseViewsCollection(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/increaseViewsCollection", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getParticularInspectionData(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/getParticularInspectionData", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// export function getDescriptionData(data) {
//   return function (dispatch) {
//     return axios
//       .post("/api/addQuestion/getDescriptionData", data)
//       .then((res) => {
//         if (res.status == 200 || res.status == 201) {
//           return res;
//         } else {
//           return false;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

// export function increaseInnerViewsCollection(data) {
//   return function (dispatch) {
//     return axios
//       .post("/api/addQuestion/increaseInnerViewsCollection", data)
//       .then((res) => {
//         if (res.status == 200 || res.status == 201) {
//           return res;
//         } else {
//           return false;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

// export function getRating(data) {
//   return function (dispatch) {
//     return axios
//       .post("/api/addQuestion/getRating", data)
//       .then((res) => {
//         if (res.status == 200 || res.status == 201) {
//           return res;
//         } else {
//           return false;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

// export function addRating(data) {
//   return function (dispatch) {
//     return axios
//       .post("/api/addQuestion/addRating", data)
//       .then((res) => {
//         if (res.status == 200 || res.status == 201) {
//           return res;
//         } else {
//           return false;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

/*******************************************************************/
export function getInspectioncenter(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/getInspectionCenter", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function logoutInspector(data) {
  return function (dispatch) {
    return axios
      .delete("/api/auth")
      .then((res) => {
        if (res.status === 204 || res.status === 201 || res.status === 200) {
          dispatch(getInspectorListing({}));
          dispatch(getInspector({}));
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// export function verifyOtp(data){
//   return function(dispatch){
//     return axios.post("/api/inspectors/verifyInspector",{data})
//   }
// }

export function socialLoginRegister(data) {
  return function (dispatch) {
    return axios
      .post("/api/socialLoginRegister", { ...data })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          // localStorage.removeItem('stripeId');
          // localStorage.removeItem('dwollaBusinessId');
        }, 60 * 60 * 1000);
        axios.defaults.headers.Authorization = "Bearer " + res.data.token;

        dispatch(getInspectorListing(res.data.user));
        dispatch(getInspectorInfo(res.data.user));

        connection.defaults.headers.Authorization = "Bearer " + res.data.token;
        if (res.status == 200)
          notifications.success("Logged in successfully!!!");
        if (res.status == 201)
          notifications.success("Registered successfully!!!");
        return res.data.user;

        // if (res.status === 200) {
        //   dispatch(getInspectorListing(res.data.user));
        //   localStorage.setItem("token", res.data.token);
        //   axios.defaults.headers.Authorization = "Bearer " + res.data.token;
        //   dispatch(getInspectorInfo(res.data.user));
        //   setTimeout(() => {
        //     localStorage.removeItem("token");
        //   }, 60 * 60 * 1000);

        //   return res.data.user;
        // } else {
        //   return false;
        // }
      })
      .catch((err) => {
        // return err;
        console.log(err);
        //   if (err.response.data.includes("User has been deactivated"))
        //     console.log(err.response.data);
        //
      });
  };
}

export function login(data) {
  return function (dispatch) {
    return axios
      .post("/api/auth", { ...data })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInspectorListing(res.data.user));
          localStorage.setItem("token", res.data.token);
          axios.defaults.headers.Authorization = "Bearer " + res.data.token;
          dispatch(getInspectorInfo(res.data.user));
          setTimeout(() => {
            localStorage.removeItem("token");
          }, 60 * 60 * 1000);

          return res.data.user;
        } else {
          return false;
        }
      })
      .catch((err) => {
        // return err;
        console.log(err);
        //   if (err.response.data.includes("User has been deactivated"))
        //     console.log(err.response.data);
        //
      });
  };
}

export function getInspectorInfo(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectors/getInspectorInfo", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          dispatch(getInspectorListing(res.data));
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function uploadimage(data) {
  return function (dispatch) {
    let formData = new FormData();
    formData.append("file", data);
    return axios
      .post("/api/Azure", formData)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function AddInspectorDetails(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspector", { ...data })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function checkInspector(data) {
  return function (dispatch) {
    var tempdata = {
      email: data,
    };
    var temp = { ...tempdata };
    return axios
      .get("/api/checkInspector/" + data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("checkInspector", temp.email);
          //dispatch(changeLoginUser(temp))
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function checkInspectorId(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectors/checkInspectorId", data)
      .then((res) => {
        if (res.status === 200) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function editInspectionObservation(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/editInspectionObservation", data)
      .then((res) => {
        if (res.status === 200) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function ForgotPassword(data) {
  let tempdata = {
    email: data,
  };
  return function (dispatch) {
    return axios
      .post("/api/password/reset", tempdata)
      .then((res) => {
        if (res.status === 200) {
          // dispatch(changeLoginUser(temp))
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function updatePassword(data) {
  return function (dispatch) {
    return axios
      .patch("/api/password/update", data)
      .then((res) => {
        if (res.status === 200) {
          // dispatch(changeLoginUser(temp))
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function verifyOtp(data) {
  return function (dispatch) {
    return axios
      .put("/api/password/reset", data)
      .then((res) => {
        if (res.status === 200) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function saveArea(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/saveAreas", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function editparticulararea(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/editParticularArea", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removeArea(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/removeArea", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function addMultimediaArea(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/addMultimediaArea", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updateMultimediaArea(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/updateMultimediaArea", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getParticularAreaData(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/getParticularAreaData", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function saveItem(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/saveItem", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function editparticularitem(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/editParticularItem", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removeItem(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/removeItem", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function addMultimediaItem(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/addMultimediaItem", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updateMultimediaItem(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/updateMultimediaItem", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function changeWorkAreaStatus(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/changeWorkAreaStatus", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function changeWorkItemStatus(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/changeWorkItemStatus", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getAllRequestedInspection() {
  return function (dispatch) {
    return axios
      .get(
        "https://smw-digital-assets.vercel.app/api/requestedInspection/getAllRequestedInspection"
      )
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function saveBidInspection(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/saveBidInspection", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getAllBaseInspections(data) {
  return function (dispatch) {
    return axios
      .get(
        `/api/inspectionSection/getAllBaseInspections?inspectorDomain=${data.inspectorDomain}`
      )
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getAllBidInspections(data) {
  return function (dispatch) {
    return axios
      .get("/api/inspectionSection/getAllBidInspections")
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function addBaseInspection(data) {
  return function (dispatch) {
    return axios
      .post("/api/inspectionSection/addBaseInspection", data)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          return res;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
