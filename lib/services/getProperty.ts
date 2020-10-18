const URL = 'http://localhost:3000/api/v1/property';

export async function getProperty() {
  let response = await fetch(URL);
  let json = await response.json();
  return json.data;
}
