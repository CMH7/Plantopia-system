//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let data = {
    storePlants: []
  }

  let allStorePlantsDSs = await getDocs(
    query(collection(db, "storePlants"))
  );

  data.storePlants = allStorePlantsDSs.docs.map(x => { return { id: x.id, ...x.data() } })
  return data
}