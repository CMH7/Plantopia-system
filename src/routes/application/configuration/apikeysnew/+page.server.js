//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { error, fail, redirect } from '@sveltejs/kit';
import { collection, doc, getCountFromServer, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';

/** @type {import('./$types').Actions} */
export const actions = {
  addAPIKey: async ({ request }) => {
    const data = await request.formData();
    const newAPIKey = JSON.parse(data.get('newAPIKey')?.toString())

    const newAPIKEYnameCount = await getCountFromServer(query(collection(db, 'mobileConfig'), where('name', '==', newAPIKey.name)))
    const newAPIKeyCount = await getCountFromServer(
			query(
				collection(db, "mobileConfig"),
				where("perenAPIKey", "==", newAPIKey.perenAPIKey)
			)
		);
    if(newAPIKEYnameCount.data().count > 0) return fail(401, {message: 'API Key Name is already used. Use other name'})
    if(newAPIKeyCount.data().count > 0) return fail(401, {message: 'API Key is already used. Use other key'})
    // console.log(newAPIKey);
    
    await setDoc(
      doc(db, "mobileConfig", nanoid()),
      {
        ...newAPIKey
      }
    ).catch(err => {
      return fail(500, {message: 'Failed to add new API Key'})
    })

    throw redirect(302, `/application/configuration`);
  }
}