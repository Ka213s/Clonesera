// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2P695koTkrdM4f0d71e5_kyovUtWJH_k",
  authDomain: "managerpost-eb04e.firebaseapp.com",
  projectId: "managerpost-eb04e",
  storageBucket: "managerpost-eb04e.appspot.com",
  messagingSenderId: "1040324841373",
  appId: "1:1040324841373:web:83d445def2142931322974",
  measurementId: "G-DC26S31889",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
