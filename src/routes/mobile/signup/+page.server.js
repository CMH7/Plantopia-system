// @ts-nocheck
import bcryptjs from 'bcryptjs'
import { db } from '$lib/configurations/firebase'
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { error, fail, redirect } from '@sveltejs/kit'
import sgMail from "@sendgrid/mail";
import constants from '$lib/configurations/constants'
import { config } from 'dotenv'

config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/** @type {import('./$types').Actions} */
export const actions = {
  signup: async ({ request }) => {
    const data = await request.formData()
    const name = data.get('name')?.toString()
    const email = data.get('email')?.toString()
    const password = data.get('password')?.toString()
    const passCopy = bcryptjs.hashSync(password?.toString(), 13);

    // get data where email = email to check if exisiting or not
    let docSnaps = await getDocs(
      query(
        collection(db, "users"),
        where("email", "==", email))
		);
    if (!docSnaps.empty) return fail(401, { message: 'Email used has an existing account' })
    const uid = nanoid();

    await setDoc(doc(db, "users", uid), {
			name,
			email,
			password: passCopy,
      dateCreated: serverTimestamp(),
      dateUpdated: serverTimestamp(),
      verified: false
    }).catch(err => {
      throw error(500, { message: `Database error. Please try again, ${err}` });
    })

    await sgMail.send(constants.newMsg(email, name));
		throw redirect(302, `/mobile/login`);
  }
}

