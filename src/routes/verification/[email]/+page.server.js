import { db } from '$lib/configurations/firebase';
import { error } from "@sveltejs/kit";
import { collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { config } from 'dotenv';
import sgMail from '@sendgrid/mail'
import constants from '$lib/configurations/constants';

config()

//@ts-ignore
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  let docSnaps = await getDocs(
		query(collection(db, "users"), where("email", "==", params.email))
	);
	if (docSnaps.empty) throw error(404, { message: "Email not found" });
  
  const user = { id: docSnaps.docs[0].id, ...docSnaps.docs[0].data() };
  // console.log("user:", user);
  
  //@ts-ignore
  if (user.verified) throw error(400, { message: "Email already verified" })
  
  updateDoc(doc(db, "users", user.id), {
    verified: true,
		dateUpdated: serverTimestamp(),
  });
  
  //@ts-ignore
  await sgMail.send(constants.successVerificationMsg(user.email, user.name))

  let data = {
    //@ts-ignore
    name: user.name
  }

	return data;
}
