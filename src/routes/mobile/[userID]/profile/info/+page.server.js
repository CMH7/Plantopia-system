//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { error, fail } from "@sveltejs/kit";
import {
	and,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
  where,
} from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) { 
  const uid = params.userID
  let docSnap = await getDoc(doc(db, "users", uid));
  if (!docSnap.exists) throw error(404, { message: "User not found. Please sign up" });
  const user = {
    id: docSnap.id,
    email: docSnap.data().email,
    name: docSnap.data().name,
    password: docSnap.data().password
  };
  return {
    user
  };
}