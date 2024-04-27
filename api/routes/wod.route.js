import { Router } from "express";
import { routeCollection } from "../app.js";
// import { FieldValue } from "@firebase/storage";

export const wodRouter = Router();

wodRouter.get("/wod/:id", (req, res) => {
  const wod = req.params.id;
  console.log(wod);
  const collection = routeCollection[wod];
  const today = new Date();

  //   const docRef = collection.doc(wod);
  collection.get().then((querySnap) => {
    querySnap.size === 0 && res.send({});
    querySnap.forEach((docSnap) => {
      const dateWod = new Date(docSnap.id);
      const dayWod = dateWod.getDate();
      if (today.getDate() === dayWod) {
        return res.send(docSnap.data());
      }
      // docSnap.id devuelve la fecha que tiene como id
      // docSnap.data() devuelve el objeto data
    });
  });
});

wodRouter.post("/create-wod", (req, res) => {
  const { fecha, workout, clase } = req.body;
  const collection = routeCollection[clase];
  const wodDocRef = collection.doc(fecha);
  wodDocRef.get().then((docSnap) => {
    if (docSnap.exists) {
      wodDocRef.set({ workout });
      return res.send(true);
    } else {
      collection.doc(fecha).set({ workout });
      return res.send(true);
    }
  });
});
