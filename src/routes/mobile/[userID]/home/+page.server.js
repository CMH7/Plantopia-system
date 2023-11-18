//@ts-nocheck

import axios from 'axios'
import { db } from "$lib/configurations/firebase";
import { error, fail } from "@sveltejs/kit";
import {
	and,
	collection,
	doc,
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
  let user = {
    id: '',
    email: '',
    name: '',
    password: ''
  }
  let data = {
    searchValue,
    plantlist,
    user,
  }

  let docSnap = await getDoc(doc(db, "users", e.params.userID));
	if (!docSnap.exists)
		throw error(404, { message: "User not found. Please login" });
	const user2 = {
		id: docSnap.id,
		email: docSnap.data().email,
		name: docSnap.data().name,
		password: docSnap.data().password,
  };
  // console.log(user2)
  
  data.user = user2

  let q = e.url.searchParams.get('q')
  let indoor = e.url.searchParams.get('indoor')
  let cycle = e.url.searchParams.get('cycle')

  // console.log(
	// 	`https://perenual.com/api/species-list?key=sk-GNAU653141782caa62551&q=${q}${
	// 		indoor !== "" && indoor != null ? `&indoor=${indoor}` : ""
	// 	}${cycle !== "" && cycle != null ? `&cycle=${cycle}` : ""}&order=asc`
	// );
  // console.log(q)
  if (q != null) {
    const data1 = await axios.get(
			`https://perenual.com/api/species-list?key=sk-GNAU653141782caa62551&q=${q}${
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

    // console.log(plantlist);
    // plantlist = plantlist.filter(x => {
    //     x?.default_image?.original_url !== "https://perenual.com/storage/image/upgrade_access.jpg"
    // });
    
    data.searchValue = q,
    data.plantlist = plantlist
    // console.log(data.plantlist[0].default_image);
  }

  // console.log('rendered');

  // console.log(data);
  return data
}
