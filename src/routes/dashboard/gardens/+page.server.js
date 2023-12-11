//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	let data = {
		allUsers: [],
  };
  
  const userGardensDocSnaps = await getDocs(query(collection(db, 'userGardens')))
	const userGardensList = userGardensDocSnaps.docs.map(x => { return { docID: x.id, ...x.data() } })
	let uidList = []
	userGardensList.forEach(x => {
		if (!uidList.includes(x.uid)) {
			uidList.push(x.uid)
		}
	})

	let allUsersDocSnaps = await getDocs(query(collection(db, "users")))
  let allUsers = allUsersDocSnaps.docs.map((x) => {
		return { id: x.id, name: x.data().name, email: x.data().email, date: new Date(x.data().dateCreated.seconds * 1000) };
  });

  allUsers = allUsers.filter((x) => uidList.includes(x.id));
  
  allUsers.sort((a, b) => a.date - b.date);

  allUsers = allUsers.map(x => {
    return {
      id: x.id,
      name: x.name,
      email: x.email,
      date: x.date.toUTCString()
    }
  })
	data.allUsers = allUsers;
	return data;
}
