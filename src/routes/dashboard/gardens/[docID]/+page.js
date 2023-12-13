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

  const userGardensDSs = await getDocs(
    query(
      collection(db, 'gardens'),
      where('owner', '==', params.docID)
    )
  )
  const userGardensList = userGardensDSs.docs.map(x => { return { docID: x.id, ...x.data() } })

  /**@type {string[]} */
  let upgIDs = []
  userGardensList.forEach(x => {
    upgIDs = [...upgIDs, ...x.upg]
  })

  const upgDSs = await getDocs(
    query(
      collection(db, 'userPlantGarden'),
      where(documentId(), 'in', upgIDs)
    )
  )
  const upgList = upgDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
  
  const plantsDSs = await getDocs(
    query(
      collection(db, 'plants'),
      where(documentId(), 'in', upgList.map(x => { return x.plant}))
    )
  )
  const plantsList = plantsDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
  plantsList.forEach(x => {
    upgList.forEach(y => {
      if (y.plant === x.docID) {
        x.common_name = y.nickname
      }
    })
  })
  
  data.plants = plantsList

  return data
}