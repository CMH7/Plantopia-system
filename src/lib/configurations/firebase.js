import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//plantopia
// const firebaseConfig = {
//   apiKey: "AIzaSyAyRH56_fCyWWcZWlxgkO8mq2YjphjXJsM",
//   authDomain: "plantopia-9ec40.firebaseapp.com",
//   projectId: "plantopia-9ec40",
//   storageBucket: "plantopia-9ec40.appspot.com",
//   messagingSenderId: "416916165230",
//   appId: "1:416916165230:web:9839b0c08792d67e384c7f"
// };

//CM
const firebaseConfig = {
	apiKey: "AIzaSyA2Zx_SelOobSTRiCU2BQFuLre2Uum62WM",
	authDomain: "plantopia-e290c.firebaseapp.com",
	projectId: "plantopia-e290c",
	storageBucket: "plantopia-e290c.appspot.com",
	messagingSenderId: "565781229496",
	appId: "1:565781229496:web:8d1a1d1e3bf85044c0294d",
};

//Arnel
// const firebaseConfig = {
// 	apiKey: "AIzaSyCEoz0WI7reIeiu1cPZsr2af394odDDxHE",
// 	authDomain: "classwise-app-e808c.firebaseapp.com",
// 	projectId: "classwise-app-e808c",
// 	storageBucket: "classwise-app-e808c.appspot.com",
// 	messagingSenderId: "940068990966",
// 	appId: "1:940068990966:web:caa6447ff2ec31b7fea1d7",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);