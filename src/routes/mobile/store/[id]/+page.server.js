//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import axios from 'axios';
import { and, collection, doc, getCountFromServer, getDoc, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

	let data = {
		plant: {
			id: params.id,
			common_name: '',
			description: '',
			scientific_name: [''],
			other_name: [''],
			family: '',
			pruning_month: [''],
			care: '',
			image: '',
		}
	};

	const spDS = await getDoc(doc(db, 'storePlants', params.id))
	data.plant = { id: spDS.id, ...spDS.data() }

	return data;
}