//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where, getCountFromServer } from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	let data = {
    allUsersCount: 0,
		allUserGardensCount: 0,
		topPlants: []
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
	
	const userGardensDocSnaps = await getDocs(query(collection(db, 'userGardens')))
	const userGardensList = userGardensDocSnaps.docs.map(x => { return { docID: x.id, ...x.data() } })
	let uidList = []
	userGardensList.forEach(x => {
		if (!uidList.includes(x.uid)) {
			uidList.push(x.uid)
		}
	})
	const finalUserGardensList = userGardensList.filter(x => uidList.includes(x.uid))

	data.allUserGardensCount = finalUserGardensList.length

	const spug = userGardensList.filter(x => x.custom)
	const ppug = userGardensList.filter(x => !x.custom)

	

	let spugList = []
	let ppugList = []

	spug.forEach(x => {
		if (!spugList.includes(x.id)) {
			spugList.push(x.id)
		}
	})
	
	ppug.forEach(x => {
		if (!ppugList.includes(x.id)) {
			ppugList.push(x.id)
		}
	})

	console.log(spugList);
	console.log(ppugList);

	const spDSs = await getDocs(query(collection(db, 'seasonalPlants')))
	const spDSsList = spDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
	console.log(spDSsList)
	const finalspDSsList = spDSsList.filter(x => spug.includes(x.id))
	console.log(finalspDSsList)
	const ppDSs = await getDocs(query(collection(db, 'perenualPlants')))
	const ppDSsList = ppDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
	const finalppDSsList = ppDSsList.filter((x) => ppug.includes(x.id));

	finalspDSsList.forEach(x => {
		data.topPlants.push({
			custom: true,
			count: finalUserGardensList.filter(x => x.id == x.id && x.custom).length,
			...x
		});
	})
	
	finalppDSsList.forEach(x => {
		data.topPlants.push({
			custom: false,
			count: finalUserGardensList.filter(x => x.id == x.id && !x.custom).length,
			...x
		});
	})


	return data;
}
