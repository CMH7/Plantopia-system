//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { error } from "@sveltejs/kit";
import {
	collection,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let user = {
    name: '',
    uid: '',
    email: '',
    password: ''
  }
  let data = {
    userGarden: [],
    userPlantList: [],
    perenPlants: [],
    user
  }

  const userDS = await getDoc(doc(db, "users", e.params.userID));
	data.user.name = userDS.data().name;
	data.user.email = userDS.data().email;
	data.user.password = userDS.data().password;
	data.user.uid = e.params.userID;

  let userGardenCount = await getCountFromServer(
    query(
      collection(db, 'userGardens'),
      where('uid', '==', e.params.userID)
    )
  )

  if (userGardenCount.data().count > 0) {
    let userGardenDocSnaps = await getDocs(
      query(collection(db, "userGardens"), where("uid", "==", e.params.userID))
    );
  
    data.userGarden = userGardenDocSnaps.docs.map(x => {
      return {
        ...x.data()
      }
    })
  
    let seasonalPlants = data.userGarden.filter(x => x.custom)
    let perenualPlants = data.userGarden.filter(x => !x.custom)
    
    if (seasonalPlants.length > 0) {
      let userSeasonalPlantDocSnaps = await getDocs(
        query(
          collection(db, "seasonalPlants"),
          where("id", "in", seasonalPlants.map((x) => x.id))
        )
      );
      data.userPlantList = userSeasonalPlantDocSnaps.docs.map(x => { return { ...x.data() } })
    }
    
    if (perenualPlants.length > 0) {
      let userPerenPlantsDocSnaps = await getDocs(
        query(
          collection(db, "perenualPlants"),
          where("id", "in", perenualPlants.map((x) => x.id))
        )
      )
      data.userPlantList = [...data.userPlantList, ...userPerenPlantsDocSnaps.docs.map(x => { return { ...x.data() } })]
      data.perenPlants = [...userPerenPlantsDocSnaps.docs.map(x => { return { ...x.data() } })]
    }
  }
  
  return data
}