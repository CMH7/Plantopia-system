//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { error, fail } from "@sveltejs/kit";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let data = {
    help: {
      id: '',
      question: '',
      answer: ''
    },
	};

  let helpDocSnap = await getDoc(doc(db, "helps", params.helpID));

	data.help = { id: params.helpID, ...helpDocSnap.data() }

	return data;
}

/** @type {import('./$types').Actions} */
export const actions = {
	saveHelp: async ({ request, params }) => {
		const data = await request.formData();
    let question = data.get('question')?.toString();
    let answer = data.get('answer')?.toString();

		const plantData = doc(db, "helps", params.helpID);

		await updateDoc(plantData, {
      question,
      answer
		}).catch((err) => {
			return fail(500, {
				message: `Error saving help data. Please try again later. ${err}`,
			});
		});
	},
};
