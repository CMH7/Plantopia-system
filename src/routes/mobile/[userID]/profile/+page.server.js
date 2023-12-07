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
export async function load({ params }) { 
  let user = await getDoc(
    doc(db, 'users', params.userID)
  )

	return {
		uid: user.data().uid,
		name: user.data().name,
		email: user.data().email,
		password: user.data().password
  }
}