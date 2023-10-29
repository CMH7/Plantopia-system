/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
	const data = {
		ID: params.plantID
	};

	return data;
}
