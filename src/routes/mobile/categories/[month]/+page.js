/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const data = {
    month: params.month,
    data: Array(10)
  }

  return data
}
