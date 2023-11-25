//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import axios from 'axios';
import { and, collection, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

	let data

	let docSnaps = await getDocs(
		query(
			collection(db, "perenualPlants"),
			where("pid", "==", parseInt(params.plantID))
		)
	);
	
	if (!docSnaps.empty) {
		console.log('saved')
		let userGardenDocSnaps = await getDocs(
			query(
				collection(db, "userGardens"),
				and(
					where('uid', '==', params.userID),
					where("id", "==", docSnaps.docs[0].data().id)
				)
			)
		);
		data = {
			plant: {
				...docSnaps.docs[0].data()
			},
			inTheGarden: userGardenDocSnaps.docs.length > 0,
			nickname: userGardenDocSnaps.docs[0].data().nickname
		}
	} else {
		console.log('new')
		const data1 = await axios.get(
			`https://perenual.com/api/species/details/${params.plantID}?key=sk-yxVE6561c721ab30b3122`
		);
	
		const data2 = await axios.get(
			`http://perenual.com/api/species-care-guide-list?species_id=${params.plantID}&key=sk-yxVE6561c721ab30b3122`
		);
	
		let care = ''
		data2.data?.data[0]?.section?.forEach(x => {
			care += ` ${x.description}`
		});
		data = {
			plant: {
				id: params.plantID,
				pid: params.plantID,
				common_name: data1.data.common_name,
				custom: false,
				description: data1.data.description,
				scientific_name: data1.data.scientific_name,
				other_name: data1.data.other_name,
				family: data1.data.family,
				pruning_month: data1.data.pruning_month,
				care,
				image: data1.data.default_image.original_url
			},
			inTheGarden: false,
			nickname: data1.data.common_name
		}
	}

	return data;
}