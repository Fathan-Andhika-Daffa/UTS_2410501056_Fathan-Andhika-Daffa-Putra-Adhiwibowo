import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const resepAPI = {
  getAll:  (params) => API.get('/resepUMKM', { params }),
  getOne:  (id)     => API.get(`/resepUMKM/${id}`),
  create:  (data)   => API.post('/resepUMKM', data),
  update:  (id, data)=> API.put(`/resepUMKM/${id}`, data),
  remove:  (id)     => API.delete(`/resepUMKM/${id}`),
};
