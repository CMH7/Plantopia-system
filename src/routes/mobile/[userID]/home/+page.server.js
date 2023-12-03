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

  console.log(e.params.userID);
  if(e.params.userID === '' || e.params.userID == null) throw error(500, {message: 'UserID error'})

  let userGardenCountSnaps = await getCountFromServer(
    query(
      collection(db, 'userGardens'),
      where("uid", "==", e.params.userID)
    )
  )
  console.log(userGardenCountSnaps.data().count)

  if (userGardenCountSnaps.data().count > 0) {
    // get all user's garden
    let plantDocSnaps = await getDocs(
      query(
        collection(db, "userGardens"),
        where("uid", "==", e.params.userID)
      )
    )
    if (plantDocSnaps.empty) throw error(500, { message: 'UserGarden Error' })
    

    // assign user's garden to data.userGarden
    data.userGarden = plantDocSnaps.docs.map((x) => {
      return { ...x.data() };
    });
    
    // get all ID of plant if custom = false (perenual)
    let perenOnlyIDs = data.userGarden.filter(x => !x.custom).map(x => { return x.id })
    console.log(perenOnlyIDs);
    
    if (perenOnlyIDs.length > 0) {
      // get all perenual plants based on the IDs from prev.
      plantDocSnaps = await getDocs(
        query(collection(db, "perenualPlants"), where("id", "in", perenOnlyIDs))
      )
      if (plantDocSnaps.empty) throw error(500, { message: "PerenualLIst Error" });
      
      // assign result to data.perenualPlants
      data.perenualPlants = plantDocSnaps.docs.map(x => { return { ...x.data() } })
    }
  }

  let q = e.url.searchParams.get('q')
  
  if (q != null) {
    let indoor = e.url.searchParams.get('indoor')
    let cycle = e.url.searchParams.get('cycle')

    let S_PlantsDocSnaps
    let P_PlantsDocSnaps

    if (indoor != null && cycle != null) {
      let indoor2 = indoor === '1' ? true : false
      S_PlantsDocSnaps = await getDocs(
        query(
          collection(db, 'seasonalPlants'),
          where('indoor', '==', indoor2),
          where('cycle', '==', `${cycle.charAt(0).toUpperCase()}${cycle.slice(1)}`)
        )
      )
      P_PlantsDocSnaps = await getDocs(
        query(
          collection(db, "perenualPlants"),
          where("indoor", "==", indoor2),
          where("cycle", "==", `${cycle.charAt(0).toUpperCase()}${cycle.slice(1)}`)
        )
      );
    } else if (indoor != null) {
      let indoor3 = indoor === '1' ? true : false
      S_PlantsDocSnaps = await getDocs(
        query(
          collection(db, 'seasonalPlants'),
          where('indoor', '==', indoor3)
        )
      )
      P_PlantsDocSnaps = await getDocs(
        query(
          collection(db, "perenuaPlants"),
          where("indoor", "==", indoor3)
        )
      );
    } else if (cycle != null) {
      S_PlantsDocSnaps = await getDocs(
        query(
          collection(db, "seasonalPlants"),
          where("cycle", "==", `${cycle.charAt(0).toUpperCase()}${cycle.slice(1)}`)
        )
      );
      P_PlantsDocSnaps = await getDocs(
        query(
          collection(db, "perenualPlants"),
          where("cycle", "==", `${cycle.charAt(0).toUpperCase()}${cycle.slice(1)}`)
        )
      );
    } else {
      S_PlantsDocSnaps = await getDocs(query(collection(db, "seasonalPlants")));
      P_PlantsDocSnaps = await getDocs(query(collection(db, "perenualPlants")));
    }

    // if (S_PlantsDocSnaps != null && S_PlantsDocSnaps.empty ) throw error(500, { message: "S_PlantsDocSnaps Error" })
    // if (P_PlantsDocSnaps != null && P_PlantsDocSnaps.empty) throw error(500, { message: "P_PlantsDocSnaps Error" })

    if ((S_PlantsDocSnaps != null && !S_PlantsDocSnaps.empty) && (P_PlantsDocSnaps != null && !P_PlantsDocSnaps.empty)) {
      let splants = S_PlantsDocSnaps.docs.map(x => { return { ...x.data() }})
      let pplants = P_PlantsDocSnaps.docs.map(x => { return { ...x.data() } })
  
      splants = splants.filter(x => `${x.common_name} ${x.scientific_name.map(sn => { return sn }).join(' ')} ${x.other_name.map(on => { return on}).join(' ')}`.trim().toLowerCase().match(q.toLowerCase()))
      pplants = pplants.filter(x => `${x.common_name} ${x.scientific_name.map(sn => { return sn }).join(' ')} ${x.other_name.map(on => { return on}).join(' ')}`.trim().toLowerCase().match(q.toLowerCase()))
  
      if(splants.length > 0) plantlist = [...plantlist, ...splants]
      if(pplants.length > 0) plantlist = [...plantlist, ...pplants]
      console.log(`${splants.length > 0 ? 'sp' : 'no-sp'}`);
      console.log(`${pplants.length > 0 ? 'pp' : 'no-pp'}`);
    }

    const perenAPIKeyDocSnaps = await getDocs(query(collection(db, 'mobileConfig'), where('active', '==', true)))
    // console.log(perenAPIKeyDocSnaps.docs[0].data());
    const perenAPIKey = perenAPIKeyDocSnaps.docs[0].data().perenAPIKey

    const data1 = await axios.get(
			`https://perenual.com/api/species-list?key=${perenAPIKey}&q=${q}${
				indoor !== "" && indoor != null ? `&indoor=${indoor}` : ""
			}${cycle !== "" && cycle != null ? `&cycle=${cycle}` : ""}&order=asc`,
			{
				headers: {
					"Api-Key": "AdARzwkXXXyLaSqmDN3gv3JcY4qRoFv0luuIhmedxx0c5XffvE",
					"Content-Type": "application/json",
				},
			}
		);
    plantlist = [...plantlist, ...data1.data.data.filter(x => x.default_image?.original_url !== 'https://perenual.com/storage/image/upgrade_access.jpg')]
    
    data.searchValue = q,
    data.plantlist = plantlist
  }

  return data
}
