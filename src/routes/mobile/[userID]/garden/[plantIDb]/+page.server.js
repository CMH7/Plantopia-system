//@ts-nocheck

import { db } from '$lib/configurations/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

	let userCustomPlantDocSnaps = await getDocs(
		query(
			collection(db, "seasonalPlants"),
			where("id", "==", parseInt(params.plantIDb))
		)
	)
	let plant = { ...userCustomPlantDocSnaps.docs[0].data() }
	// console.log(plant);
	// userCustomPlantDocSnaps.docs.forEach(x => {
	// 	console.log({...x.data()});
	// })

	

	const data = {
		plant,
		inTheGarden: true
	};

	return data;
}