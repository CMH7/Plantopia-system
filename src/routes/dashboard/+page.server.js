//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	let data = {
    allUsersCount: 0,
    allUserGardensCount: 0
	};

	let allUsersDocSnaps = await getDocs(
		query(collection(db, "users"))
	);
	
  let allUserGardensDocSnaps = await getDocs(
		query(collection(db, "userGardens"))
	);

  data.allUsersCount = allUsersDocSnaps.docs.length
  data.allUserGardensCount = allUserGardensDocSnaps.docs.length;

	return data;
}
