<template>
  <div id="app">
    <header>
      <div class="header-content">
        <h1>Réservation</h1>
        <nav>
          <router-link to="/">Accueil</router-link> |
          <router-link to="/shows">Spectacles</router-link> |
          
          <!-- Affichage conditionnel basé sur l'état de connexion -->
          <template v-if="isLoggedIn">
            <span class="user-info">Bienvenue, {{ currentUser.nom || currentUser.login }}</span> |
            <a href="#" @click.prevent="logout">Se déconnecter</a>
          </template>
          <template v-else>
            <router-link to="/login">Se connecter</router-link> | 
            <router-link to="/register">S'inscrire</router-link>
          </template>
        </nav>
      </div>
    </header>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import { eventBus } from './services/eventBus';

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      currentUser: {}
    };
  },
  created() {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const userDataStr = localStorage.getItem('userData');
    const token = localStorage.getItem('userToken');
    
    if (userDataStr && token) {
      try {
        this.currentUser = JSON.parse(userDataStr);
        this.isLoggedIn = true;
      } catch (e) {
        console.error('Erreur lors de la lecture des données utilisateur:', e);
      }
    }
    
    // Écouter l'événement de connexion réussie avec eventBus
    eventBus.on('user-logged-in', (userData) => {
      this.isLoggedIn = true;
      this.currentUser = userData;
    });
  },
  methods: {
    logout() {
      // Supprimer les données de session
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      
      // Mettre à jour l'état
      this.isLoggedIn = false;
      this.currentUser = {};
      
      // Rediriger vers la page d'accueil
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 10px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

h1 {
  margin: 0;
}

nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-active {
  color: #42b983;
}

.user-info {
  font-weight: bold;
  color: #42b983;
  margin: 0 10px;
}

main {
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>