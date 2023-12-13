//@ts-nocheck

import { db } from '$lib/configurations/firebase'
import { collection, documentId, getDocs, query } from 'firebase/firestore'

/**@type {import('./$types').PageLoad} */
export async function load(e) {
  let data = {
    mobileConfigDocID: '',
    /**@type {{ docID: string, image: string, active: boolean }[]} */
    banners: Array(10)
  }

  const mobileConfigDSs = await getDocs(query(collection(db, 'mobileConfig')))
  const mobileConfigList = mobileConfigDSs.docs.map(x => {
    return {
      docID: x.id,
      ...x.data()
    }
  })
  
  data.mobileConfigDocID = mobileConfigList[0].docID
  
  const bannersDSs = await getDocs(query(collection(db, 'banners')))
  const bannersList = bannersDSs.docs.map(x => {
    return {
      docID: x.id,
      ...x.data()
    }
  })

  data.banners = bannersList

  // const temp = [1, 1, 1, 1, 1, 1, 1, 1, 2,2,2,2,2,2]
  // data.banners = []
  // temp.filter(x => x == 1).forEach(x => {
  //   data.banners = [...data.banners, {
  //     docID: '',
  //     active: true,
  //     image: ''
  //   }]
  // })
  // temp.filter(x => x == 2).forEach(x => {
  //   data.banners = [...data.banners, {
  //     docID: '',
  //     active: false,
  //     image: ''
  //   }]
  // })

  // console.log(data.banners)

  return data
}