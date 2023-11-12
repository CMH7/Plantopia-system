//@ts-nocheck

import axios from 'axios'

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
  let plantlist = []
  let searchValue = ''
  let data = {
    searchValue,
    plantlist
  }

  let q = e.url.searchParams.get('q')
  console.log(q)
  if (q != null) {
    const data1 = await axios.get(
      `https://perenual.com/api/species-list?key=sk-GNAU653141782caa62551&q=${q}&order=asc`, {
        headers: {
          "Api-Key": "AdARzwkXXXyLaSqmDN3gv3JcY4qRoFv0luuIhmedxx0c5XffvE",
          "Content-Type": "application/json"
        },
      }
    )
    plantlist = data1.data.data
    
    data.searchValue = q,
    data.plantlist = plantlist
    console.log(data.plantlist[0].default_image);
  }

  console.log('rendered');

  // console.log(data);
  return data
}
