//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

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
	return data;
}
