export interface User {
  _id?: string;
  username: string;
  email: string;
  createdAt?: string;
}

const API_URL = 'http://localhost:5000';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error('Error al conectar con el servidor');
  return response.json();
};