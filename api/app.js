import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import { wodRouter } from "./routes/wod.route.js";
import { createRequire } from "module";
import process from "process";
import { PORT, firebaseConfig, DATABASE_URL } from "./config.js";

const app = express();
const require = createRequire(import.meta.url);
var serviceAccount = require("./Key.json");

import { initializeApp } from "firebase/app";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATABASE_URL,
});

initializeApp(firebaseConfig);

// const storage = getStorage();
// const storageRef = ref(
//   storage,
//   "https://firebasestorage.googleapis.com/v0/b/curso-dwf.appspot.com/o/Publicidad-sanicentro-tv.mp4?alt=media&token=654f6c8b-d1f8-4a2b-841c-b74c22578869"
// );
// getDownloadURL(storageRef).then((res) => console.log(res));
// console.log(storageRef);
const db = admin.firestore();
export const womanStrongCollection = db.collection("woman");
export const functionalCollection = db.collection("functional");
export const highIntensityCollection = db.collection("high");
export const crossfitCollection = db.collection("crossfit");
export const fullBodyCollection = db.collection("full");
export const powerWomanCollection = db.collection("power");
export const intenseFunctioCollection = db.collection("intense");

export const routeCollection = {
  crossfit: crossfitCollection,
  functional: functionalCollection,
  woman: womanStrongCollection,
  intense: intenseFunctioCollection,
  full: fullBodyCollection,
  power: powerWomanCollection,
  high: highIntensityCollection,
};

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(wodRouter);

app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});

// console.log(process.env.DB_USER);
const dataBase = process.env.dataBase;
console.log(dataBase);
