<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="login">Nom d'utilisateur</label>
        <input 
          type="text" 
          id="login" 
          v-model="login" 
          required
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>
      
      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </div>
      
      <div v-if="errorMessage" class="error-message">
        Échec de la connexion: {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../services/eventBus';

export default {
  name: 'LoginForm',
  data() {
    return {
      login: '',
      password: '',
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';
      
      try {
        const response = await axios.post('/api/login', {
          login: this.login,
          password: this.password
        });
        
        // En cas de succès, stockage du token et redirection
        if (response.data.token) {
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          
          // Utiliser eventBus au lieu de this.$root.$emit
          eventBus.emit('user-logged-in', response.data.user);
          
          // Redirection vers la page d'accueil
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Erreur de connexion:', error);
        this.errorMessage = error.response?.data?.message || 
                           'Erreur lors de la connexion. Veuillez réessayer.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-actions {
  margin-top: 20px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 15px;
  color: #f44336;
  text-align: center;
}
</style>