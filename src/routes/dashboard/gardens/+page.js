//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where, writeBatch } from "firebase/firestore";

/** @type {import('./$types').PageLoad} */
export async function load(e) {
	let data = {
		allUsers: [],
  };
  
  const gardenMobilesDSs = await getDocs(query(collection(db, 'gardenMobile')))
  const gardenMobilesList = gardenMobilesDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
  
  const usersDSs = await getDocs(
    query(
      collection(db, 'users'),
      where('uid', 'in', gardenMobilesList.map(x => x.owner))
    )
  )
  const usersList = usersDSs.docs.map(x => { return {docID: x.id, ...x.data()}})
  data.allUsers = usersList
	return data;
}
