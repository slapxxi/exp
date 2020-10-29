const URL = 'http://localhost:3000/api/v1/documents';

interface DocData {
  title: string;
  content: string;
}

export async function postDocument(data: DocData) {
  let response = await fetch(`${URL}`, { method: 'POST', body: JSON.stringify(data) });
  let message = await response.json();
  return message.data;
}
