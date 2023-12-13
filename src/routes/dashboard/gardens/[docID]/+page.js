//@ts-nocheck

import { db } from "$lib/configurations/firebase"
import { doc, getDoc } from "firebase/firestore"

/**@type {import(./$types).PageLoad} */
export async function load({ params }) {
  let data = {
    user: {
      docID: params.docID,
      name: '',
      email: ''
    },
    plants: Array(10)
  }
  
  // const userDS = await getDoc(doc(db, 'users', params.docID))
  // data.user = { docID: userDS.id, ...userDS.data() }

  return data
}