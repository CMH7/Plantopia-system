//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { error, fail } from '@sveltejs/kit';
import { collection, doc, getCountFromServer, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let data = {
    plant: {},
    seasonalCount: 0
  }

  const sCount = await getCountFromServer(query(collection(db, 'seasonalPlants')))
  data.seasonalCount = sCount.data().count

  let currentPlant = await getDoc(doc(db, 'storePlants', params.spID))
  data.plant = {id: currentPlant.id, ...currentPlant.data()}

  return data
}

/** @type {import('./$types').Actions} */
export const actions = {
  savePlant: async ({ request, params }) => {
    const data = await request.formData();
		let cname = data.get('cname')?.toString()
		let fam = data.get('fam')?.toString()
		let sname = data.get('sname')?.toString()
		let oname = data.get('oname')?.toString()
		let pmonth = data.get('pmonth')?.toString()
		let desc = data.get('desc')?.toString()
		let care = data.get('care')?.toString()
    let image = data.get('image')?.toString()
    
    sname = sname.split(',')
    oname = oname.split(',')
    pmonth = pmonth.split(",");
    
    const plantData = doc(db, 'storePlants', params.spID)

    await updateDoc(plantData, {
      common_name: cname,
      scientific_name: sname,
      other_name: oname,
      pruning_month: pmonth,
      family: fam,
      description: desc,
      care,
      image,
    }).catch(err => {
      return fail(500, {message: `Error saving plant data. Please try again later. ${err}`})
    })
  }
}