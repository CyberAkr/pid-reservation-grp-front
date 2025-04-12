<!-- src/components/AccueilPage.vue -->
<template>
  <div class="accueil-container">
    <!-- Hero Section with theater image background -->
    <div class="hero-section">
      <h1>Bienvenue sur notre plateforme</h1>
      <p>Réservez vos places pour les spectacles les plus en vogue</p>
      <button class="btn-primary" @click="navigateToShows">Découvrir les spectacles</button>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <div class="feature-card">
        <h2>Réservation en ligne</h2>
        <p>Accédez rapidement à vos réservations et achetez vos billets en quelques clics.</p>
      </div>
      
      <div class="feature-card">
        <h2>Évènements à venir</h2>
        <p>Consultez notre calendrier pour ne rien manquer des prochains spectacles.</p>
      </div>
      
      <div class="feature-card">
        <h2>Communauté</h2>
        <p>Rejoignez une communauté passionnée par la culture et les arts du spectacle.</p>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <p>© {{ currentYear }} – EPFC / ICC – Projet Réservations</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AccueilPage',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    navigateToShows() {
      this.$router.push('/shows');
    }
  }
}
</script>

<style scoped>
.accueil-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero-section {
  background-color: #1a2a3a; /* Couleur de fond au cas où l'image ne se charge pas */
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 20px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #3367d6;
}

.features-section {
  display: flex;
  justify-content: space-around;
  padding: 40px 20px;
  flex-wrap: wrap;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h2 {
  color: #333;
  margin-bottom: 15px;
}

.feature-card p {
  color: #666;
}

footer {
  background-color: #1a2a3a;
  color: white;
  text-align: center;
  padding: 15px 0;
  margin-top: auto;
}

@media (max-width: 768px) {
  .features-section {
    flex-direction: column;
    align-items: center;
  }
  
  .feature-card {
    width: 100%;
    max-width: 400px;
  }
}
</style>