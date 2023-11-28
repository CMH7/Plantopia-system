//@ts-nocheck
import { db } from '$lib/configurations/firebase'
import { and, collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const monthPlants = await getDocs(
    query(
      collection(db, 'seasonalPlants'),
      where('pruning_month', 'array-contains', params.month)
    )
  )

  let plantlist = monthPlants.docs.map((x) => {
		return { docID: x.id, ...x.data() };
  });
  

  let seasonalPlants = []
  let userGardenCountSnaps = await getCountFromServer(
    query(
      collection(db, "userGardens"),
      and(
        where("uid", "==", params.userID),
        where('custom', '==', true)
      )
    )
  )
  
  // if meron get mo seasonal plants
  if (userGardenCountSnaps.data().count > 0) {
    const sPlantsDocSnaps = await getDocs(
      query(
        collection(db, 'userGardens'),
        and(
          where('uid', '==', params.userID),
          where('custom', '==', true)
        )
      )
    )

    seasonalPlants = sPlantsDocSnaps.docs.map(x => { return { docID: x.id, ...x.data() }})
  }

  return {
    month: params.month,
    plantlist,
    seasonalPlants
  }
}
