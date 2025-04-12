<!-- src/components/ShowDetailPage.vue -->
<template>
  <div class="show-detail-container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Chargement des détails du spectacle...</p>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-if="!loading && !error" class="show-content">
      <h1>{{ show.title }}</h1>
      
      <div class="main-content">
        <div class="poster-container">
<div class="poster" :style="show.posterUrl ? { backgroundImage: `url(/api/images/${show.posterUrl})` } : {}">            <div v-if="!show.posterUrl" class="no-image-text">Pas d'image</div>
          </div>
        </div>
        
        <div class="details">
          <p v-if="show.location" class="location">
            <strong>Lieu de création :</strong> {{ show.location.designation }}
          </p>
          
          <div class="description-section">
            <p><strong>Description :</strong></p>
            <p>{{ show.description || 'Aucune description disponible' }}</p>
          </div>
          
          <div class="reservation-tag" v-if="show.bookable">
            <span class="tag reservable">Réservable</span>
            <span v-if="show.price" class="price-tag">{{ show.price }} €</span>
          </div>
        </div>
      </div>
      
      <!-- Section des représentations -->
      <div v-if="show.representations && show.representations.length" class="representations-section">
        <h2>Représentations</h2>
        <div class="representations-grid">
          <div v-for="(representation, index) in show.representations" :key="index" class="representation-card">
            {{ formatDate(representation.when) }}
          </div>
        </div>
      </div>
      
      <!-- Section des collaborateurs -->
      <div class="collaborateurs-section">
        <h2>Collaborateurs</h2>
        
        <div class="collaborateurs-grid">
          <div v-if="show.authors && show.authors.length" class="collaborateur-group">
            <h3>Auteur(s) :</h3>
            <ul>
              <li v-for="(author, index) in show.authors" :key="'author-'+index">
                {{ author.firstname }} {{ author.lastname }}
              </li>
            </ul>
          </div>
          
          <div v-if="show.directors && show.directors.length" class="collaborateur-group">
            <h3>Metteur(s) en scène :</h3>
            <ul>
              <li v-for="(director, index) in show.directors" :key="'director-'+index">
                {{ director.firstname }} {{ director.lastname }}
              </li>
            </ul>
          </div>
          
          <div v-if="show.distributions && show.distributions.length" class="collaborateur-group">
            <h3>Distribution :</h3>
            <ul>
              <li v-for="(actor, index) in show.distributions" :key="'distribution-'+index">
                {{ actor.firstname }} {{ actor.lastname }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="back-link">
        <router-link to="/shows">← Retour à la liste</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShowDetailPage',
  data() {
    return {
      show: {},
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchShowDetails();
  },
  methods: {
    fetchShowDetails() {
      const showId = this.$route.params.id;
      
      this.loading = true;
      axios.get(`/api/shows/${showId}`)
        .then(response => {
          // Récupération des données depuis la réponse
          console.log('Réponse API détail:', response.data);
          this.show = response.data;
          
          // Corriger la casse du nom de fichier pour l'image
          if (this.show.slug === 'ayiti' && this.show.posterUrl) {
            // S'assurer que la première lettre est en majuscule pour le nom du fichier
            const fileName = this.show.posterUrl.replace('.jpg', '.jpg'); // Garder l'extension telle quelle
            const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
            const extension = fileName.substring(fileName.lastIndexOf('.'));
            const correctedFileName = fileNameWithoutExt.charAt(0).toUpperCase() + fileNameWithoutExt.slice(1) + extension;
            this.show.posterUrl = correctedFileName;
          }
          this.loading = false;
        })
        .catch(error => {
          console.error('Erreur lors du chargement des détails du spectacle:', error);
          this.error = 'Impossible de charger les détails du spectacle. Veuillez réessayer plus tard.';
          this.loading = false;
        });
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      
      try {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(date);
      } catch (e) {
        console.error('Erreur lors du formatage de la date:', e);
        return dateStr;
      }
    }
  }
};
</script>

<style scoped>
.show-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  color: #1a202c;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.8rem;
  color: #1a202c;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 10px;
}

h3 {
  font-size: 1.2rem;
  color: #1a202c;
  margin-bottom: 10px;
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

.main-content {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}

.poster-container {
  flex: 0 0 300px;
}

.poster {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-image-text {
  color: #777;
  font-size: 1rem;
}

.details {
  flex: 1;
}

.location {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.description-section {
  margin-bottom: 20px;
  line-height: 1.6;
}

.reservation-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.reservable {
  background-color: #c6f6d5;
  color: #22543d;
}

.price-tag {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2d3748;
}

.representations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.representation-card {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 15px;
  text-align: center;
}

.collaborateurs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.collaborateur-group ul {
  list-style-type: none;
  padding-left: 0;
}

.collaborateur-group li {
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
}

.collaborateur-group li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4299e1;
}

.back-link {
  margin-top: 40px;
}

.back-link a {
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link a:hover {
  color: #2c5282;
  text-decoration: underline;
}
</style>