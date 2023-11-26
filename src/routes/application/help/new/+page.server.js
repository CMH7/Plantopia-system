//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { error, fail, redirect } from '@sveltejs/kit';
import { collection, doc, getCountFromServer, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';

/** @type {import('./$types').Actions} */
export const actions = {
  addHelp: async ({ request }) => {
    const data = await request.formData();
    let id = data.get('id')?.toString()
    let question = data.get('question')?.toString()
    let answer = data.get('answer')?.toString()

    await setDoc(doc(db, "helps", id), {
			question,
			answer
		}).catch((err) => {
			return fail(500, {
				message: `Error saving help data. Please try again later. ${err}`,
			});
		});

    throw redirect(302, `/application/help/${id}`);
  }
}