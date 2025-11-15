import axios from 'axios';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export async function fetchUsers() {
  const response = await client.get('/users');
  return response.data;
}
