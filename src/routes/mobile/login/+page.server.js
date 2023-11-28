// @ts-nocheck
import bcryptjs from "bcryptjs";
import { db } from "$lib/configurations/firebase";
import {
  and,
	collection,
	deleteDoc,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { error, fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		// console.log(data);
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
		// console.log(data);
		const id = data.get("id")?.toString();
		const nickname = data.get("nickname")?.toString();
		let custom = data.get("custom")?.toString();
		const uid = data.get("uid")?.toString();
		let picurrentplant = data.get('dataa')?.toString();
		picurrentplant = JSON.parse(picurrentplant)
		// console.log(picurrentplant)
		// return

		custom = custom === 'false' ? false : true
		let docSnaps = await getCountFromServer(
			query(
				collection(db, "userGardens"),
				and(
					where("id", "==", parseInt(id)),
					where("uid", '==', uid),
					where('custom', '==', custom)
				)
			)
		);
		if (docSnaps.data().count > 0) return fail(401, { message: "Already in your garden" });

		if (!custom) { // meaning galing sa perenual
			let plantDocSnaps = await getCountFromServer(query(collection(db, "perenualPlants")));
			await setDoc(
				doc(
					db,
					"perenualPlants",
					uid
				),
				{
					id: plantDocSnaps.data().count + 1,
					pid: parseInt(picurrentplant.pid),
					common_name: picurrentplant.common_name,
					scientific_name: picurrentplant.scientific_name,
					other_name: picurrentplant.other_name,
					pruning_month: picurrentplant.pruning_month,
					family: picurrentplant.family,
					description: picurrentplant.description,
					care: picurrentplant.care,
					custom: picurrentplant.custom,
					image: picurrentplant.image
				}
			).catch(err => {
				return fail(500, {message: `Error autoadd plant data. Please try again later. ${err}`})
			})
			
			const uiid = nanoid();
			await setDoc(doc(db, "userGardens", uiid), {
				id: plantDocSnaps.data().count + 1,
				uid,
				nickname,
				custom,
			}).catch(err => {
				return fail(500, {message: `Error saving plant to usergarden data. Please try again later. ${err}`})
			})
		} else {
			const uiid = nanoid();
			await setDoc(doc(db, "userGardens", uiid), {
				id: parseInt(id),
				uid,
				nickname,
				custom,
			}).catch(err => {
				return fail(500, {message: `Error saving plant to usergarden data. Please try again later. ${err}`})
			})
		}
	},
	renickname: async ({ request }) => {
		const data = await request.formData();
		// console.log(data);
		const id = data.get("id")?.toString();
		const renickname = data.get("renickname")?.toString();
		const uid = data.get("uid")?.toString();
		let custom = data.get("custom")?.toString();
		custom = custom === 'true' ? true : false
		
		let plantDocSnaps = await getDocs(
			query(collection(db, "userGardens"),
				and(
					where("id", "==", parseInt(id)),
					where('uid', '==', uid)
				)
			)
		);

		const userPlant = doc(db, "userGardens", plantDocSnaps.docs[0].id);

		await updateDoc(userPlant, {
			id: parseInt(id),
			uid,
			nickname: renickname,
			custom
		}).catch((err) => {
			return fail(500, {
				message: `Error saving plant data. Please try again later. ${err}`,
			});
		});
	},
	removeToGarden: async ({ request }) => {
		const data = await request.formData();
		// console.log(data);
		const id = data.get("id")?.toString();
		const uid = data.get("uid")?.toString();
		let custom = data.get("custom")?.toString();
		custom = custom === "true" ? true : false;

		// console.log(id, uid, custom)
		// return

		let plantDocsSnaps = await getDocs(
			query(
				collection(db, 'userGardens'),
				and(
					where('id', '==', parseInt(id)),
					where('uid', '==', uid),
					where('custom', '==', custom)
				)
			)
		)
		await deleteDoc(doc(db, 'userGardens', plantDocsSnaps.docs[0].id))

		// throw redirect(
		// 	301,
		// 	`/mobile/${uid}/plantinfo/${
		// 		custom
		// 			? plantDocsSnaps.docs[0].data().id
		// 			: plantDocsSnaps.docs[0].data().pid
		// 	}?custom=${custom}`
		// );
	}
};
