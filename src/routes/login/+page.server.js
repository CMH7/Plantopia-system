import { db } from '$lib/configurations/firebase';
import { fail, redirect } from '@sveltejs/kit';
import { collection, getDocs, query, where } from 'firebase/firestore';

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
		let docSnaps = await getDocs(
			query(collection(db, "admins"), where("email", "==", email))
		);
		if (docSnaps.empty)
			return fail(404, { message: "Email not found. Please sign up" });

		const user = { id: docSnaps.docs[0].id, ...docSnaps.docs[0].data() };
    // if (!user.verified) return fail(500, { message: "Email is not yet verified" });
    //@ts-ignore
		// if (!bcryptjs.compareSync(password, user.password))
		if (password !== user.password)
			return fail(404, { message: "Wrong password" });

		throw redirect(302, `/dashboard`);
	},
};