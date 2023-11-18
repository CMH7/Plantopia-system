//@ts-nocheck
import axios from 'axios'
import { db } from "$lib/configurations/firebase";
import { error, fail, redirect } from "@sveltejs/kit";
import {
	and,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let data = {
    userGarden: [],
    userPlantList: []
  }

  let docSnap = await getDoc(doc(db, "users", e.params.userID));
  if (!docSnap.exists) throw redirect(300, '/mobile/login')
  const user = {
    id: docSnap.id,
    email: docSnap.data().email,
    name: docSnap.data().name,
    password: docSnap.data().password,
  };

  let userGardenDocSnaps = await getDocs(
    query(collection(db, "userGardens"), where("uid", "==", user.id))
  );

  let userGarden = [];
  userGardenDocSnaps.docs.forEach((x) => {
    userGarden = [...userGarden, { id: `${x.data().id}`, custom: x.data().custom, nickname: x.data().nickname }];
  });
  data.userGarden = userGarden


  let customPlants = userGarden.filter(x => x.custom)
  let userCustomPlantDocSnaps = await getDocs(
    query(collection(db, "seasonalPlants"), where("id", "in", [...customPlants.map(x => parseInt(x.id))]))
  );
  
  data.userPlantList = userCustomPlantDocSnaps.docs.map(x => { return { ...x.data() } })

  console.log(data);
  
  return data
}