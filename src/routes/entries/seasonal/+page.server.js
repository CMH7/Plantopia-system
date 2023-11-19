//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let data = {
    seasonalPlants: []
  }

  let allSeasonalPlantsDocSnaps = await getDocs(
    query(collection(db, "seasonalPlants"))
  );

  let allSeasonalPlants = allSeasonalPlantsDocSnaps.docs.map(x => { return { ...x.data() } })
  allSeasonalPlants.sort((a, b) => {
    if (a.id > b.id) return 1
    if (a.id < b.id) return -1
    return 0
  })
  // console.log(allSeasonalPlants);
  data.seasonalPlants = allSeasonalPlants
  return data
}