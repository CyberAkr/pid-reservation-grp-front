// src/services/auth.js
import axios from 'axios';

// Service d'authentification
const AuthService = {
  // Méthode pour se connecter
  async login(login, password) {
    try {
      const response = await axios.post('/api/login', { login, password });
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  },

  // Récupérer l'utilisateur actuel
  getCurrentUser() {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        return JSON.parse(userDataStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  // Vérifier si l'utilisateur est connecté
  isLoggedIn() {
    return !!localStorage.getItem('userToken') && !!this.getCurrentUser();
  },

  // Récupérer le token
  getToken() {
    return localStorage.getItem('userToken');
  }
};

export default AuthService;