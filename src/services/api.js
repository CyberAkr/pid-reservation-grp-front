import axios from 'axios';

// Créer une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Remplacez par l'URL de votre API Spring Boot
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

// Intercepteur pour gérer les tokens d'authentification
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Services d'API pour différentes fonctionnalités
export const authService = {
  register(userData) {
    return apiClient.post('/auth/register', userData);
  },
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  }
};

export const reservationService = {
  getAll() {
    return apiClient.get('/reservations');
  },
  getById(id) {
    return apiClient.get(`/reservations/${id}`);
  },
  create(reservation) {
    return apiClient.post('/reservations', reservation);
  },
  update(id, reservation) {
    return apiClient.put(`/reservations/${id}`, reservation);
  },
  delete(id) {
    return apiClient.delete(`/reservations/${id}`);
  }
};

// Exportez d'autres services selon vos besoins...

export default apiClient;