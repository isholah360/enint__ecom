export default async function AllProduct() {
  const res = await fetch('https://dummyjson.com/products?limit=100&skip=50')
  if(!res.ok) throw new Error( "fail to fetch data")

  return res.json()
}