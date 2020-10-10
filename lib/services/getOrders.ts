const URL = 'http://localhost:3000/api/v1/orders';

export async function getOrders() {
  let response = await fetch(URL);
  let json = await response.json();
  return json.data;
}
