//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { error, fail } from '@sveltejs/kit';
import { collection, doc, getCountFromServer, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let data = {
    plant: {},
    perenualCount: 0
  }

  const pCount = await getCountFromServer(query(collection(db, 'perenualPlants')))
  data.perenualCount = pCount.data().count

  let plantDocSnaps = await getDocs(
    query(collection(db, "perenualPlants"), where("id", '==', parseInt(params.plantIDd)))
  );

  // let tempPlants = plantDocSnaps.docs.map(x => { return { ...x.data() } } )
  let tempPlant = {...plantDocSnaps.docs[0].data()}
  data.plant = tempPlant

  // console.log(tempPlant);
  return data
}

/** @type {import('./$types').Actions} */
export const actions = {
  savePlant: async ({ request }) => {
    const data = await request.formData();
    // console.log(data);
    let id = data.get('id')?.toString()
		let cname = data.get('cname')?.toString()
		let fam = data.get('fam')?.toString()
		let sname = data.get('sname')?.toString()
		let oname = data.get('oname')?.toString()
		let pmonth = data.get('pmonth')?.toString()
		let desc = data.get('desc')?.toString()
		let care = data.get('care')?.toString()
    let custom = data.get('custom')?.toString()
    let pid = data.get('pid')?.toString()
    let cycle = data.get('cycle')?.toString()
    let indoor = data.get('indoor')?.toString()
    let image = data.get('image')?.toString()
    
    sname = sname.split(',')
    oname = oname.split(',')
    pmonth = pmonth.split(",");

    // let plantDocSnaps = await updateDoc(db)
    let plantDocSnaps = await getDocs(
			query(collection(db, "perenualPlants"), where("id", "==", parseInt(id)))
		);
    
    const plantData = doc(db, 'perenualPlants', plantDocSnaps.docs[0].id)

    await updateDoc(plantData, {
      id: parseInt(id),
      common_name: cname,
      scientific_name: sname,
      other_name: oname,
      pruning_month: pmonth,
      family: fam,
      description: desc,
      care,
      cycle,
      custom: custom === 'true' ? true : false,
      indoor: indoor === 'true' ? true : false,
      image,
      pid: parseInt(pid)
    }).catch(err => {
      return fail(500, {message: `Error saving plant data. Please try again later. ${err}`})
    })
  }
}