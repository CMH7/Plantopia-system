//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where, getCountFromServer, documentId } from "firebase/firestore";

/** @type {import('./$types').PageLoad} */
export async function load(e) {
	let data = {
    usersCount: 0,
		gardensCount: 0,
		topPlants: []
	};

	let usersCount = await getCountFromServer(query(collection(db, 'users')))
	let gardensCount = await getCountFromServer(query(collection(db, 'gardens')))
	
	data.usersCount = usersCount.data().count
	data.gardensCount = gardensCount.data().count

	const gardensDSs = await getDocs(query(collection(db, 'gardens')))
	const gardensList = gardensDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
	
	let upgIDs = []
	gardensList.forEach(x => {
		upgIDs = [...upgIDs, ...x.upg]
	})

	const upgDSs = await getDocs(
		query(
			collection(db, "userPlantGarden"),
			where(documentId(), 'in', upgIDs)
		)
	);
	const upgList = upgDSs.docs.map(x => { return { docID: x.id, ...x.data() } })

	let topPlants = []
	upgList.forEach(x => {
		if (topPlants.filter(o => o.plant === x.plant).length > 0) {// meaning +1 to count
			topPlants.filter(o => o.plant === x.plant)[0].count += 1
		} else { // meaning newly added
			topPlants.push({
				plant: x.plant,
				count: 1,
				data: {}
			})
		}
	})
	
	const plantsDSs = await getDocs(query(
		collection(db, 'plants'),
		where(documentId(), 'in', topPlants.map(x => x.plant))
	))
	const plantsList = plantsDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
	plantsList.forEach(x => {
		topPlants.forEach(o => {
			if (o.plant === x.docID) {
				o.data = x
			}
		})
	})

	data.topPlants = topPlants
	console.log(topPlants);

	return data;
}
