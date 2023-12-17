//@ts-nocheck
import { db } from "$lib/configurations/firebase"
import { collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore"

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
  
  const userDS = await getDoc(doc(db, 'users', params.docID))
  data.user = { docID: userDS.id, ...userDS.data() }

  const userGardenMobilesDSs = await getDocs(
    query(
      collection(db, 'gardenMobile'),
      where('owner', '==', params.docID)
    )
  )
  const userGardenMobilesList = userGardenMobilesDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
  
  const plantsDSs = await getDocs(
    query(
      collection(db, 'plants'),
      where(documentId(), 'in', userGardenMobilesList.map(x => { return x.plant._key.path.segments[x.plant._key.path.segments.length - 1]}))
    )
  )
  const plantsList = plantsDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
  plantsList.forEach(x => {
    userGardenMobilesList.forEach((y) => {
      if (y.nickname !== '') {
        if (y.plant._key.path.segments[y.plant._key.path.segments.length - 1] === x.docID) {
          x.common_name = y.nickname;
        }
      }
		});
  })
  
  data.plants = plantsList

  return data
}