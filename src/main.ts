import { createApp } from "vue";
import "./style.css";
import VueApp from "./App.vue";
import { collection, getFirestore } from "firebase/firestore";
import CONFIG from "./firebaseConfig.json";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

createApp(VueApp).mount("#app");

const app = initializeApp(CONFIG);
const db = getFirestore(app);

export const firebase = {
	auth: getAuth(app),
	productCollection: collection(db, "products"),
};
