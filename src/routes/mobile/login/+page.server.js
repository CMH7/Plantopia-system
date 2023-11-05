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
import sgMail from "@sendgrid/mail";
import constants from "$lib/configurations/constants";
import { config } from "dotenv";

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();
		const passCopy = bcryptjs.hashSync(password?.toString(), 13);

		// get data where email = email to check if exisiting or not
		let docSnaps = await getDocs(
      query(collection(db, "users"),
        where("email", "==", email)
      )
		);
		if (!docSnaps.empty) return fail(404, { message: "Email not found. Please sign up" });
		
		docSnaps = await getDocs(
      query(
        collection(db, "users"),
        and(
          where("email", "==", email),
          where("password", '==', passCopy)
        )
      )
		);
		if (docSnaps.empty) return fail(404, { message: "Wrong password" });
		throw redirect(302, `/mobile/login`);
	},
};
