//@ts-nocheck
import { db } from "$lib/configurations/firebase";
import { error, fail, redirect } from "@sveltejs/kit";
import bcryptjs from 'bcryptjs'
import {
	and,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
  updateDoc,
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

/** @type {import('./$types').Actions} */
export const actions = {
  saveChanges: async ({ request }) => {
    const data = await request.formData();
    const user = JSON.parse(data.get('user')?.toString())
    console.log(user);

    const userDocSnaps = await getDoc(doc(db, 'users', user.uid))
    const userA = { ...userDocSnaps.data() }

    await updateDoc(doc(db, 'users', user.uid),
      {
        name: user.name,
        password: bcryptjs.hashSync(user.password),
        email: user.email
      }
    ).catch(err => {
      return fail(500, {message: 'Error saving changes of user'})
    })

    if (!bcryptjs.compareSync(user.password, userA.password)) {
      throw redirect(302, `/mobile/login/new`);
    }
  }
}