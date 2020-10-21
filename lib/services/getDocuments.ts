const URL = 'http://localhost:3000/api/v1/documents';

export async function getDocuments() {
  let response = await fetch(URL);
  let message = await response.json();
  return message.data;
}
