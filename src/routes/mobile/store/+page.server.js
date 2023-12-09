//@ts-nocheck

import { db } from '$lib/configurations/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let sp = [
    {
      id: '',
      common_name: '',
      family: '',
      pruning_month: [''],
      scientific_name: [''],
      other_name: [''],
      description: '',
      care: '',
      image: ''
    }
  ]

  let data = {
    sp
  }

  const spDSs = await getDocs(query(collection(db, 'storePlants')))
  data.sp = spDSs.docs.map(x => { return { id: x.id, ...x.data() } })
  
  return data
}