//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { error, fail, redirect } from '@sveltejs/kit';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';

/** @type {import('./$types').Actions} */
export const actions = {
  addPlant: async ({ request }) => {
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
    const uid = nanoid()
    
    sname = sname.split(',')
    oname = oname.split(',')
    pmonth = pmonth.split(",");

    await setDoc(
      doc(
        db,
        "perenualPlants",
        uid
      ),
      {
        id: parseInt(id),
        common_name: cname,
        scientific_name: sname,
        other_name: oname,
        pruning_month: pmonth,
        family: fam,
        description: desc,
        care,
        custom: custom === "true" ? true : false,
        image: ''
      }
    ).catch(err => {
      return fail(500, {message: `Error saving plant data. Please try again later. ${err}`})
    })

    throw redirect(302, `/entries/perenual/${id}`);
  }
}