import { db } from '$lib/configurations/firebase';
import { fail, redirect } from '@sveltejs/kit';
import { and, collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').Actions} */
export const actions = {
	admin_login: async ({ request }) => {
		const data = await request.formData();
		// console.log(data);
		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();

		if (email === "" || password === "")
			return fail(404, { message: "Invalid email or password" });

		// get data where email = email to check if exisiting or not
		let adminCount = await getCountFromServer(
			query(
				collection(db, 'admins'),
				and(
					where('email', '==', email),
					where('password', '==', password)
				)
			)
		)
		if (adminCount.data().count <= 0) return fail(404, { message: `Wrong email or password, adminCount: ${adminCount.data().count}` })
		
		let docSnaps = await getDocs(
			query(collection(db, "admins"), where("email", "==", email))
		);
		if (docSnaps.empty)
			return fail(404, { message: "Email not found. Please sign up" });

		const user = { id: docSnaps.docs[0].id, ...docSnaps.docs[0].data() };
    //@ts-ignore
		if (password !== user.password)
			return fail(404, { message: "Wrong password" });

		throw redirect(302, `/dashboard`);
	},
};