//@ts-nocheck

import axios from 'axios'
import { db } from "$lib/configurations/firebase";
import { error, fail } from "@sveltejs/kit";
import {
	and,
	collection,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let plantlist = []
  let searchValue = ''
  let perenualPlants = []
  let userGarden = []
  let data = {
    searchValue,
    plantlist,
    userGarden,
    perenualPlants
  }

  let userGardenCountSnaps = await getCountFromServer(
    query(
      collection(db, 'userGardens'),
      where("uid", "==", e.params.userID)
    )
  )

  if (userGardenCountSnaps.data().count > 0) {
    let plantDocSnaps = await getDocs(
      query(
        collection(db, "userGardens"),
        where("uid", "==", e.params.userID)
      )
    )

    data.userGarden = plantDocSnaps.docs.map((x) => {
			return { docID: x.id, ...x.data() };
    });
    
		let perenOnlyIDs = data.userGarden.map((x) => {
			if (!x.custom) {
				return x.id;
			}
    })
    
		plantDocSnaps = await getDocs(
			query(collection(db, "perenualPlants"), where("id", "in", perenOnlyIDs))
    );
    
    data.perenualPlants = plantDocSnaps.docs.map(x => { return { docID: x.id, ...x.data() } })
  }

  let q = e.url.searchParams.get('q')
  
  if (q != null) {
    let indoor = e.url.searchParams.get('indoor')
    let cycle = e.url.searchParams.get('cycle')

    const data1 = await axios.get(
			`https://perenual.com/api/species-list?key=sk-yxVE6561c721ab30b3122&q=${q}${
				indoor !== "" && indoor != null ? `&indoor=${indoor}` : ""
			}${cycle !== "" && cycle != null ? `&cycle=${cycle}` : ""}&order=asc`,
			{
				headers: {
					"Api-Key": "AdARzwkXXXyLaSqmDN3gv3JcY4qRoFv0luuIhmedxx0c5XffvE",
					"Content-Type": "application/json",
				},
			}
		);
    plantlist = data1.data.data

    
    data.searchValue = q,
    data.plantlist = plantlist
  }

  return data
}
