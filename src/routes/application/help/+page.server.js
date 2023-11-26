//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { fail } from '@sveltejs/kit';
import { collection, deleteDoc, doc, getCountFromServer, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let data = {
    qnas: []
  }

  let allQnADocSnaps = await getDocs(
    query(collection(db, "helps"))
  );

  let allHelps = allQnADocSnaps.docs.map(x => { return { id: x.id, question: x.data().question, answer: x.data().answer } })
  // allHelps.sort((a, b) => {
  //   if (a.id > b.id) return 1
  //   if (a.id < b.id) return -1
  //   return 0
  // })
  // console.log(allSeasonalPlants);
  data.qnas = allHelps
  return data
}

/** @type {import('./$types').Actions} */
export const actions = {
  delHelp: async ({ request }) => {
    const data = await request.formData();
    let id = data.get('id')?.toString()

    await deleteDoc(doc(db, "helps", id)).catch((err) => {
			return fail(500, {
				message: `Error deleting help. Please try again later. ${err}`,
			});
		});
  }
}