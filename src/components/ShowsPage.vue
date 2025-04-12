<!-- src/components/ShowsPage.vue -->
<template>
  <div class="shows-container">
    <h1>Liste des spectacles</h1>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Chargement des spectacles...</p>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-if="!loading && !error" class="shows-grid">
      <div v-for="show in shows" :key="show.id" class="show-card">
        <div 
          class="show-image" 
          :style="getPosterStyle(show)"
        >
          <div v-if="!show.posterUrl" class="no-image-text">Pas d'image</div>
        </div>
        
        <div class="show-info">
          <h2>{{ show.title }}</h2>
          
          <div class="show-tags">
            <span v-if="show.bookable" class="tag reservable">Réservable</span>
            <span v-if="show.price" class="tag price">{{ show.price }} €</span>
            <span class="tag representations">
              {{ getRepresentationsText(show.representations) }}
            </span>
          </div>
          
          <router-link :to="'/shows/' + show.id" class="voir-details">
            Voir les détails →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShowsPage',
  data() {
    return {
      shows: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchShows();
  },
  methods: {
    fetchShows() {
      this.loading = true;
      axios.get('/api/shows')
        .then(response => {
          // Traitement des données au format HATEOAS
          console.log('Réponse API:', response.data);
          
          // Normaliser les données de spectacles
          if (response.data && response.data._embedded) {
            this.shows = response.data._embedded.showList.map(show => ({
              ...show,
              posterUrl: show.posterUrl ? show.posterUrl.toLowerCase() : null
            }));
          } else {
            this.shows = (response.data || []).map(show => ({
              ...show,
              posterUrl: show.posterUrl ? show.posterUrl.toLowerCase() : null
            }));
          }
          
          this.loading = false;
        })
        .catch(error => {
          console.error('Erreur lors du chargement des spectacles:', error);
          this.error = 'Impossible de charger les spectacles. Veuillez réessayer plus tard.';
          this.loading = false;
        });
    },
    getPosterStyle(show) {
      // Gérer le style de l'image avec un chemin normalisé
      if (!show.posterUrl) return {};
      
      return { 
        backgroundImage: `url(/api/images/${show.posterUrl.toLowerCase()})`
      };
    },
    getRepresentationsText(representations) {
      if (!representations || representations.length === 0) {
        return 'Aucune représentation';
      }
      return representations.length === 1 
        ? '1 représentation' 
        : `${representations.length} représentations`;
    }
  }
};
</script>

<style scoped>
.shows-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: #1a202c;
  margin-bottom: 20px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #42b983;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background-color: #ffdddd;
  color: #ff4444;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
  text-align: center;
}

.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.show-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.show-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.show-image {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-image-text {
  color: #777;
  font-size: 0.9rem;
}

.show-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.show-info h2 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 15px;
  color: #1a202c;
}

.show-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.tag {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.reservable {
  background-color: #c6f6d5;
  color: #22543d;
}

.price {
  background-color: #e2e8f0;
  color: #2d3748;
}

.representations {
  background-color: #bee3f8;
  color: #2c5282;
}

.voir-details {
  margin-top: auto;
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-top: 10px;
  transition: color 0.2s;
}

.voir-details:hover {
  color: #2c5282;
  text-decoration: underline;
}
</style>