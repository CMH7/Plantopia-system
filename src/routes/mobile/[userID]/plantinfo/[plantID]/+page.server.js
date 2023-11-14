//@ts-nocheck
import axios from 'axios';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const data1 = await axios.get(
		`https://perenual.com/api/species/details/${params.plantID}?key=sk-GNAU653141782caa62551`
	);

	const data2 = await axios.get(
		`http://perenual.com/api/species-care-guide-list?species_id=${params.plantID}&key=sk-GNAU653141782caa62551`
	);

	let care = ''
	data2.data?.data[0]?.section?.forEach(x => {
		care += ` ${x.description}`
	});

	console.log(data2.data.data);
	

	const data = {
		plant: {
			id: params.plantID,
			common_name: data1.data.common_name,
			description: data1.data.description,
  		scientific_name: data1.data.scientific_name,
  		other_name: data1.data.other_name,
  		family: data1.data.family,
			pruning_month: data1.data.pruning_month,
			care,
			image: data1.data.default_image.original_url
		},
		inTheGarden: false
	};

	return data;
}