//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { error, fail } from "@sveltejs/kit";
import {
	and,
	collection,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let data = {
    helps: [
      {
        id: '',
        question: '',
        answer: ''
      }
    ]
  }
  const helpsDocSnaps = await getDocs(query(collection(db, 'helps')))
  data.helps = helpsDocSnaps.docs.map(x => {return { id: x.id, ...x.data() }})

	return data;
}
