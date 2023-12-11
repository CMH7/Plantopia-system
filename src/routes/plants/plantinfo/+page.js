//@ts-nocheck

import { db } from '$lib/configurations/firebase'
import { doc, getDoc } from 'firebase/firestore'

/**@type {import('./$types').PageLoad} */
export async function load(e) {
  const docID = e.url.searchParams.get('docID')

  const plantDS = await getDoc(doc(db, 'plants', docID))

  const plant = { docID: plantDS.id, ...plantDS.data() }
  
  return {
    plant
  }
}