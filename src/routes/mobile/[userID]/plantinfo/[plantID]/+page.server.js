//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import axios from 'axios';
import { and, collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
	let cus = url.searchParams.get('custom')
	cus = cus === 'true' ? true : false

	let data = {
		plant: {
			id: params.plantID,
			pid: params.plantID,
			common_name: '',
			custom: false,
			description: '',
			scientific_name: [''],
			other_name: [''],
			family: '',
			pruning_month: [''],
			care: '',
			image: '',
		},
		inTheGarden: false,
		nickname: ''
	};

	let docSnaps = await getCountFromServer(
		query(
			collection(db, "perenualPlants"),
			where("pid", "==", parseInt(params.plantID))
		)
	);
	let docSnaps2 = await getCountFromServer(
		query(
			collection(db, "seasonalPlants"),
			where("id", "==", parseInt(params.plantID))
		)
	);
	if ((!cus && docSnaps.data().count > 0) || (cus && docSnaps2.data().count > 0)) {
		let plantID1 = 0;

		if (!cus && docSnaps.data().count > 0) {
			console.log("saved in perenual");
			const pPlantDocSnaps = await getDocs(
				query(
					collection(db, "perenualPlants"),
					where("pid", "==", parseInt(params.plantID))
				)
			);
			data.plant = { ...pPlantDocSnaps.docs[0].data() };
			plantID1 = pPlantDocSnaps.docs[0].data().id;
		}
		else if (cus && docSnaps2.data().count > 0) {
			console.log("saved in seasonal");
			const sPlantDocSnaps = await getDocs(
				query(
					collection(db, "seasonalPlants"),
					where("id", "==", parseInt(params.plantID))
				)
			);
			data.plant = { pid: -1, ...sPlantDocSnaps.docs[0].data() };
			plantID1 = sPlantDocSnaps.docs[0].data().id;
		}
		
		let userGardenCount = await getCountFromServer(
			query(
				collection(db, "userGardens"),
				and(where("uid", "==", params.userID), where("id", "==", plantID1))
			)
		);
	
		if (userGardenCount.data().count > 0) {
			let userGardenDocSnaps = await getDocs(
				query(
					collection(db, "userGardens"),
					and(
						where("uid", "==", params.userID),
						where("id", "==", plantID1), where("custom", "==", cus)
					)
				)
			);
	
			data.nickname = userGardenDocSnaps.docs[0].data().nickname;
		}
		
		data = {
			plant: data.plant,
			inTheGarden: userGardenCount.data().count > 0,
			nickname: data.nickname,
		};
	}
	else {
		console.log('new')
		const data1 = await axios.get(
			`https://perenual.com/api/species/details/${params.plantID}?key=sk-GNAU653141782caa62551`
		);
	
		const data2 = await axios.get(
			`http://perenual.com/api/species-care-guide-list?species_id=${params.plantID}&key=sk-GNAU653141782caa62551`
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
				image: data1.data.default_image.original_url,
				indoor: data1.data.indoor,
				cycle: data1.data.cycle
			},
			inTheGarden: false,
			nickname: data1.data.common_name
		}
	}

	return data;
}