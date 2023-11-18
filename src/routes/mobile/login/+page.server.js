// @ts-nocheck
import bcryptjs from "bcryptjs";
import { db } from "$lib/configurations/firebase";
import {
  and,
	collection,
	doc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { error, fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();

		if (email === "" || password === "")
			return fail(404, { message: "Invalid email or password" });

		// get data where email = email to check if exisiting or not
		let docSnaps = await getDocs(
			query(collection(db, "users"), where("email", "==", email))
		);
		if (docSnaps.empty)
			return fail(404, { message: "Email not found. Please sign up" });

		const user = { id: docSnaps.docs[0].id, ...docSnaps.docs[0].data() };
		if (!user.verified)
			return fail(500, { message: "Email is not yet verified" });
		if (!bcryptjs.compareSync(password, user.password))
			return fail(404, { message: "Wrong password" });

		throw redirect(302, `/mobile/${user.id}/home`);
	},
	addToGarden: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		const id = data.get("id")?.toString();
		const nickname = data.get("nickname")?.toString();
		const custom = data.get("custom")?.toString();
		const uid = data.get("uid")?.toString();

		let docSnaps = await getDocs(
			query(
				collection(db, "userGardens"),
				and(
					where("id", "==", id),
					where("uid", '==', uid)
				)
			)
		);
		if (!docSnaps.empty) return fail(401, { message: "Already in your garden" });

		const uiid = nanoid();
		await setDoc(doc(db, "userGardens", uiid), {
			id,
			uid,
			nickname,
			custom: custom === 'false' ? false : true
		});
		docSnaps = await getDocs(
			query(
				collection(db, "userGardens"),
				and(where("id", "==", id), where("uid", "==", uid))
			)
		);
		if (docSnaps.empty) return fail(401, { message: "Database error. Failed toi add to garden. Please try again" });
	}
};
