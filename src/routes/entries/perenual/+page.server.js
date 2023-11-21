//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let data = {
    perenualPlants: []
  }

  let allPerenualPlantsDocSnaps = await getDocs(
    query(collection(db, "perenualPlants"))
  );

  let allPerenualPlants = allPerenualPlantsDocSnaps.docs.map(x => { return { ...x.data() } })
  allPerenualPlants.sort((a, b) => {
    if (a.id > b.id) return 1
    if (a.id < b.id) return -1
    return 0
  })
  // console.log(allSeasonalPlants);
  data.perenualPlants = allPerenualPlants
  return data
}