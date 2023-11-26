//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { error } from "@sveltejs/kit";
import {
	collection,
	getCountFromServer,
	getDocs,
	query,
	where,
} from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let data = {
    userGarden: [],
    userPlantList: [],
    perenPlants: []
  }

  let userCount = await getCountFromServer(
    collection(db, 'users'),
    where('id', '==', e.params.userID)
  )
  if (userCount.data().count <= 0) throw error(500, { message: 'Account not found.' })

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

    console.log(seasonalPlants);
    console.log(perenualPlants);
    
    let userSeasonalPlantDocSnaps;
    let userPerenPlantsDocSnaps;

    if (seasonalPlants.length > 0) {
      userSeasonalPlantDocSnaps = await getDocs(
        query(
          collection(db, "seasonalPlants"),
          where("id", "in", [...seasonalPlants.map((x) => x.id)])
        )
      );
      data.userPlantList = [...userSeasonalPlantDocSnaps.docs.map(x => { return { ...x.data() } })]
    }
    
    if (perenualPlants.length > 0) {
      userPerenPlantsDocSnaps = await getDocs(
        query(
          collection(db, "perenualPlants"),
          where("id", "in", [...perenualPlants.map((x) => x.id)])
        )
      )
      data.userPlantList = [...data.userPlantList, ...userPerenPlantsDocSnaps.docs.map(x => { return { ...x.data() } })]
      data.perenPlants = [...userPerenPlantsDocSnaps.docs.map(x => { return { ...x.data() } })]
    }
  }
  
  return data
}