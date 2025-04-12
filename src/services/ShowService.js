// src/services/ShowService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/shows';

class ShowService {
  /**
   * Récupère tous les spectacles
   * @returns {Promise} Promesse contenant les données des spectacles
   */
  getAllShows() {
    return axios.get(API_URL);
  }

  /**
   * Récupère un spectacle par son ID
   * @param {number} id - L'ID du spectacle
   * @returns {Promise} Promesse contenant les données du spectacle
   */
  getShowById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
  
  /**
   * Traite les données reçues au format HATEOAS
   * @param {Object} response - La réponse de l'API
   * @returns {Array} Un tableau d'objets spectacles
   */
  processShowsData(response) {
    if (response.data && response.data._embedded && response.data._embedded.showList) {
      return response.data._embedded.showList;
    }
    return response.data || [];
  }
}

export default new ShowService();