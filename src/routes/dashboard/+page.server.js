//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where, getCountFromServer } from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	let data = {
    allUsersCount: 0,
    allUserGardensCount: 0
	};

	// let allUsersDocSnaps = await getDocs(
	// 	query(collection(db, "users"))
	// );

	let allUsersCountSnaps = await getCountFromServer(
		query(collection(db, 'users'))
	)
	
  let allUserGardensCountSnaps = await getCountFromServer(
		query(collection(db, "userGardens"))
	);

  data.allUsersCount = allUsersCountSnaps.data().count
  data.allUserGardensCount = allUserGardensCountSnaps.data().count

	return data;
}
