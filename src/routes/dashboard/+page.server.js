//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	let data = {
		allUsersCount: 0,
	};

	let allUsersDocSnaps = await getDocs(
		query(collection(db, "users"))
	);

  data.allUsersCount = allUsersDocSnaps.docs.length
  
	return data;
}
