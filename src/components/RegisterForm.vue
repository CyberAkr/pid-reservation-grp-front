<template>
  <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="login">Nom d'utilisateur</label>
        <input 
          type="text" 
          id="login" 
          v-model="user.login" 
          required
          placeholder="Choisissez un nom d'utilisateur"
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="user.email" 
          required
          placeholder="Entrez votre email"
        />
      </div>
      
      <div class="form-row">
        <div class="form-group half">
          <label for="firstname">Prénom</label>
          <input 
            type="text" 
            id="firstname" 
            v-model="user.firstname" 
            required
            placeholder="Votre prénom"
          />
        </div>
        
        <div class="form-group half">
          <label for="lastname">Nom</label>
          <input 
            type="text" 
            id="lastname" 
            v-model="user.lastname" 
            required
            placeholder="Votre nom"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input 
          type="password" 
          id="password" 
          v-model="user.password" 
          required
          placeholder="Choisissez un mot de passe"
        />
      </div>
      
      <div class="form-group">
        <label for="passwordConfirm">Confirmer le mot de passe</label>
        <input 
          type="password" 
          id="passwordConfirm" 
          v-model="passwordConfirm" 
          required
          placeholder="Confirmez votre mot de passe"
          :class="{ 'input-error': passwordsDoNotMatch }"
        />
        <small v-if="passwordsDoNotMatch" class="error-text">
          Les mots de passe ne correspondent pas
        </small>
      </div>
      
      <div class="form-group">
        <label for="langue">Langue préférée</label>
        <select id="langue" v-model="user.langue" required>
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="nl">Néerlandais</option>
        </select>
      </div>
      
      <div class="form-actions">
        <button type="submit" :disabled="loading || passwordsDoNotMatch">
          {{ loading ? 'Inscription en cours...' : 'S\'inscrire' }}
        </button>
      </div>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      
      <div class="login-link">
        Déjà inscrit? <router-link to="/login">Connectez-vous ici</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      user: {
        login: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        langue: 'fr' // Valeur par défaut
      },
      passwordConfirm: '',
      loading: false,
      errorMessage: '',
      successMessage: ''
    };
  },
  computed: {
    passwordsDoNotMatch() {
      return this.user.password !== '' && 
             this.passwordConfirm !== '' && 
             this.user.password !== this.passwordConfirm;
    }
  },
  methods: {
    async handleRegister() {
      // Vérifier que les mots de passe correspondent
      if (this.user.password !== this.passwordConfirm) {
        this.errorMessage = 'Les mots de passe ne correspondent pas';
        return;
      }
      
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      try {
        const response = await axios.post('/api/register', this.user);
        
        console.log('Réponse d\'inscription:', response.data);
        
        if (response.data.success) {
          this.successMessage = 'Inscription réussie! Vous allez être redirigé vers la page de connexion.';
          
          // Réinitialiser le formulaire
          this.user = {
            login: '',
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            langue: 'fr'
          };
          this.passwordConfirm = '';
          
          // Redirection vers la page de connexion après un délai
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        }
      } catch (error) {
        console.error('Erreur d\'inscription:', error);
        this.errorMessage = error.response?.data?.message || 
                          'Erreur lors de l\'inscription. Veuillez réessayer.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 600px;
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

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.half {
  flex: 1;
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.input-error {
  border-color: #f44336;
}

.error-text {
  color: #f44336;
  font-size: 12px;
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

.success-message {
  margin-top: 15px;
  color: #4CAF50;
  text-align: center;
}

.login-link {
  margin-top: 15px;
  text-align: center;
}

.login-link a {
  color: #2196F3;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>