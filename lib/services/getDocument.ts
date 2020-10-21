const URL = 'http://localhost:3000/api/v1/documents';

export async function getDocument(id: string) {
  let response = await fetch(`${URL}/${id}`);
  let message = await response.json();
  return message.data;
}
