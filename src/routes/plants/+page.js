//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { WriteBatch, collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore";

/** @type {import('./$types').PageLoad} */
export async function load(e) {
	let data = {
		plants: [],
	};

	let allPlantsDSs = await getDocs(query(collection(db, "plants")));

	let allPlants = allPlantsDSs.docs.map((x) => {
		return { docID: x.id, ...x.data() };
	});
	data.plants = allPlants;

	// const batch = writeBatch(db)

	// allPlants.forEach(x => {
	// 	batch.update(doc(db, 'plants', x.docID), {
	// 		watering: 1
	// 	})
	// })
	// await batch.commit()
	return data;
}
