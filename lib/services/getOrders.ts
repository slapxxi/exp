import { OrderItem, Serialized } from '../types';

const URL = 'http://localhost:3000/api/v1/orders';

export async function getOrders(): Promise<Serialized<OrderItem>[]> {
  let response = await fetch(URL);
  let json = await response.json();
  return json.data;
}
