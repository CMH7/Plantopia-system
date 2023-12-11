//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where, writeBatch } from "firebase/firestore";

/** @type {import('./$types').PageLoad} */
export async function load(e) {
	let data = {
		allUsers: [],
  };
  
  const gardensDSs = await getDocs(query(collection(db, 'gardens')))
  const gardensList = gardensDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
  
  const usersDSs = await getDocs(
    query(
      collection(db, 'users'),
      where('uid', 'in', gardensList.map(x => x.owner))
    )
  )
  const usersList = usersDSs.docs.map(x => { return {docID: x.id, ...x.data()}})
  data.allUsers = usersList
	return data;
}
