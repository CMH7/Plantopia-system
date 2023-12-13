//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { error, fail } from '@sveltejs/kit';
import { collection, doc, getCountFromServer, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let data = {
    apiKey: '',
    mobileConfigDocID: ''
  }

  const mobileConfigDSs = await getDocs(query(collection(db, 'mobileConfig')))
  const mobileConfigList = mobileConfigDSs.docs.map(x => { return { docID: x.id, ...x.data() } })
  data.apiKey = mobileConfigList[0].apiKey
  data.mobileConfigDocID = mobileConfigList[0].docID

  return data
}