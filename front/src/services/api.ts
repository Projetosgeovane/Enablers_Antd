import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:4000',
});

export const loginApi = async (email: string, senha: string) => {
    return api.post('/login', { email, senha });
};