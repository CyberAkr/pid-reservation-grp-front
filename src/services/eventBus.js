// src/services/eventBus.js
import { ref } from 'vue'

// Création d'un bus d'événements personnalisé pour Vue 3
export const eventBus = {
  // Map pour stocker les événements et leurs callbacks
  listeners: ref(new Map()),

  // Méthode pour écouter un événement
  on(event, callback) {
    if (!this.listeners.value.has(event)) {
      this.listeners.value.set(event, []);
    }
    this.listeners.value.get(event).push(callback);
  },

  // Méthode pour émettre un événement
  emit(event, ...args) {
    if (this.listeners.value.has(event)) {
      this.listeners.value.get(event).forEach(callback => callback(...args));
    }
  },

  // Méthode pour arrêter d'écouter un événement
  off(event, callback) {
    if (this.listeners.value.has(event)) {
      const callbacks = this.listeners.value.get(event);
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }
};