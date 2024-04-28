import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import { wodRouter } from "./routes/wod.route.js";
// import { createRequire } from "module";
import process from "process";
import dotenv from "dotenv";
dotenv.config();

// import key from "key.json";

// import { DATABASE_URL, FIREBASE_CONFIG } from "./config.js";
const port = process.env.PORT || 3000;

const app = express();
// const require = createRequire(import.meta.url);// var serviceAccount = require("./Key.json");

import { initializeApp } from "firebase/app";

console.log(process.env.PRIVATE_KEY);
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_provider_x509_cert_url: process.env.CLIENT_PROVIDER_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  }),
  databaseURL: process.env.DATABASE_URL,
});

initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
});

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

app.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`);
});

// console.log(process.env.DB_USER);
