/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
  const data = {
    month: params.month,
    data: Array(10)
  }

  return data
}
