import { firestore, storage } from "firebase";
import { IDelivery, ICity } from "../interfaces";

// CITIES
export const getCitiesFB = (setCities: any) => {
  let data: any[] = [];
  firestore()
    .collection("cities")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setCities(data);
    });
};

export const addCityFB = (name: string, setCities: any) => {
  firestore()
    .collection("cities")
    .add({ name, baners: [] })
    .then(() => {
      getCitiesFB(setCities);
    })
    .catch((err) => {
      alert(err);
    });
};

export const removeCityFB = (cityID: string, setCities: any) => {
  // Remove all deliveries by cityID
  firestore()
    .collection("deliveries")
    .where("city", "==", cityID)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
          storage()
            .refFromURL(doc.data().logo)
            .delete()
            .then(() => {
              doc.data().baners &&
                doc.data().baners.forEach((baner: string) => {
                  storage().refFromURL(baner).delete();
                });
            });
      });
    })
    .then(() => {
      // Remove city
      firestore()
        .collection("cities")
        .doc(cityID)
        .delete()
        .then(() => {
          getCitiesFB(setCities);
        })
        .catch((err) => {
          alert(err);
        });
    });
};

export const updateBanersCityFB = (
  city: ICity,
  baners: { deliveryID: string; uri: string }[]
) => {
  firestore()
    .collection("cities")
    .doc(city.id)
    .set({ name: city.name, baners })
    .then(() => {
      alert("Баннеры сохранены.");
    })
    .catch((err) => {
      alert(err);
    });
};

// CATEGORIES
export const getCategoriesFB = (setCategories: any) => {
  let data: any[] = [];
  firestore()
    .collection("categories")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setCategories(data);
    });
};

export const addCategoyFB = (name: string, img: string, setCategories: any) => {
  uploadImgFB(img, "categories/").then((url) => {
    firestore()
      .collection("categories")
      .add({ name, image: url })
      .then(() => {
        getCategoriesFB(setCategories);
      })
      .catch((err) => {
        alert(err);
      });
  });
};

export const removeCategoryFB = (id: string, setCategories: any) => {
  firestore()
    .collection("categories")
    .doc(id)
    .get()
    .then((snapshot) => {
      storage().refFromURL(snapshot.data().image).delete();
    })
    .then(() => {
      firestore()
        .collection("categories")
        .doc(id)
        .delete()
        .then(() => {
          getCategoriesFB(setCategories);
        })
        .catch((err) => {
          alert(err);
        });
    });
};

export const updateCategoryFB = (
  id: string,
  name: string,
  img: string,
  setCategories: any
) => {
  uploadImgFB(img, "categories/").then((url) => {
    firestore()
      .collection("categories")
      .doc(id)
      .set({ name, image: url })
      .then(() => {
        getCategoriesFB(setCategories);
      })
      .catch((err) => {
        alert(err);
      });
  });
};

// DELIVERIES
export const getDeliveriesFB = (setDeliveries: any, cityID: string) => {
  let data: any[] = [];
  firestore()
    .collection("deliveries")
    .where("city", "==", cityID)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setDeliveries(data);
    });
};

export const addDeliveryFB = (setDeliveries: any, data: IDelivery) => {
  uploadImgFB(data.logo, "logos/").then((url) => {
    uploadBanersFB(data.baners, "baners/").then((baners) => {
      Promise.all(baners).then((banersURL) => {
        firestore()
          .collection("deliveries")
          .add({ ...data, logo: url, baners: banersURL })
          .then(() => {
            getDeliveriesFB(setDeliveries, data.city);
          })
          .catch((err) => {
            alert(err);
          });
      });
    });
  });
};

export const removeDeliveryFB = (
  setDeliveries: any,
  delivID: string,
  cityID: string
) => {
  firestore()
    .collection("deliveries")
    .doc(delivID)
    .get()
    .then((snapshot) => {
      storage()
        .refFromURL(snapshot.data().logo)
        .delete()
        .then(() => {
          snapshot.data().baners &&
            snapshot.data().baners.forEach((doc: string) => {
              storage().refFromURL(doc).delete();
            });
        });
    })
    .then(() => {
      firestore()
        .collection("deliveries")
        .doc(delivID)
        .delete()
        .then(() => {
          getDeliveriesFB(setDeliveries, cityID);
        })
        .catch((err) => {
          alert(err);
        });
    });
};

export const updateDeliveryFB = (setDeliveries: any, data: IDelivery) => {
  uploadImgFB(data.logo, "logos/").then((logo) => {
    uploadBanersFB(data.baners, "baners/").then((baners) => {
      Promise.all(baners).then((banersURL) => {
        firestore()
          .collection("deliveries")
          .doc(data.id)
          .set({ ...data, logo, baners: banersURL })
          .then(() => {
            getDeliveriesFB(setDeliveries, data.city);
          })
          .catch((err) => {
            alert(err);
          });
      });
    });
  });
};

export const updatePlaceDeliveriesFB = async (
  setDeliveries: any,
  data: IDelivery[]
) => {
  let batch = firestore().batch();
  for (const item of data) {
    batch.update(firestore().collection("deliveries").doc(item.id), {
      ...item,
    });
  }
  return batch.commit().then(() => {
    getDeliveriesFB(setDeliveries, data[0].city);
  });
};

// EXTRA
export const uploadImgFB = async (img: string, folder: string) => {
  if (img.startsWith("https://")) {
    return img;
  } else {
    const response = await fetch(img);
    const blob = await response.blob();

    return storage()
      .ref()
      .child(folder + Date.now().toString())
      .put(blob)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      });
  }
};

export const uploadBanersFB = async (imgs: string[], folder: string) => {
  if (imgs.length !== 0) {
    return imgs.map(async (img) => {
      if (img.startsWith("https://")) {
        return img;
      } else {
        const response = await fetch(img);
        const blob = await response.blob();

        return storage()
          .ref()
          .child(folder + Date.now().toString())
          .put(blob)
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
          });
      }
    });
  } else return [];
};
