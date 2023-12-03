//@ts-nocheck
import { db } from '$lib/configurations/firebase';
import { error, fail } from '@sveltejs/kit';
import { collection, doc, getCountFromServer, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let data = {
    apiKeys: [],
    activeKey: ''
  }

  const mobileConfigDocSnaps = await getDocs(query(collection(db, 'mobileConfig')))
  data.apiKeys = mobileConfigDocSnaps.docs.map(x => { return { id: x.id, ...x.data() } })
  data.activeKey = data.apiKeys.filter(x => x.active)[0].id

  // console.log(data);

  return data
}

/** @type {import('./$types').Actions} */
export const actions = {
	editActiveAPIKey: async ({ request }) => {
    const data = await request.formData();
    const oldActiveKey = data.get("oldActiveKey")?.toString();
    const newActiveKey = data.get("newActiveKey")?.toString();

    console.log(`oldActiveKey ${oldActiveKey}`);
    console.log(`newActiveKey ${newActiveKey}`);

    await updateDoc(doc(db, 'mobileConfig', oldActiveKey), {
      active: false
    }).catch(err => {
      return fail(500, {message: 'Failed to update. COntact the administrator'})
    })
    
    await updateDoc(doc(db, 'mobileConfig', newActiveKey), {
      active: true
    }).catch(err => {
      return fail(500, {message: 'Failed to update 2. COntact the administrator'})
    })
	},
};