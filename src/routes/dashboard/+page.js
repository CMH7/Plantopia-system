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
	
	data.usersCount = usersCount.data().count
	

	const gardenMobileDSs = await getDocs(query(collection(db, "gardenMobile")));
	const gardenMobileList = gardenMobileDSs.docs.map(x => { return { docID: x.id, ...x.data() } })

	let gardenMobilesDistinct = []
	gardenMobileList.forEach(x => {
		if (!gardenMobilesDistinct.includes(x.owner)) {
			gardenMobilesDistinct.push(x.owner)
		}
	})

	data.gardensCount = gardenMobilesDistinct.length

	// const temp = await getDocs(query(collection(db, 'plants', gardenMobilesDistinct)))
	// console.log(temp)

	let topPlants = []
	gardenMobileList.forEach((x) => {
		if (topPlants.filter((o) => o.plant === x.plant).length > 0) {
			// meaning +1 to count
			// console.log(x.plant._key.segments[x.plant._key.segments.length-1]);
			topPlants.filter((o) => o.plant === x.plant)[0].count += 1;
		} else {
			// console.log(x.plant._key.path.segments[x.plant._key.path.segments.length - 1])
			// meaning newly added
			topPlants.push({
				plant: x.plant._key.path.segments[x.plant._key.path.segments.length - 1],
				count: 1,
				data: {},
			});
		}
	});
	
	// console.log(topPlants)
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
	// console.log(topPlants);

	return data;
}
