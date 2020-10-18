import { PropertyItem, Serialized } from '../types';

const URL = 'http://localhost:3000/api/v1/property';

export async function getProperty(): Promise<Serialized<PropertyItem>[]> {
  let response = await fetch(URL);
  let json = await response.json();
  return json.data;
}
