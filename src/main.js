import { createApp } from 'vue';
import App from './App.vue';
import { database } from './firebase';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark', // или 'dark'
    themes: {
      light: {
        primary: '#1976D2', // Основной цвет
        secondary: '#424242', // Вторичный цвет
        accent: '#82B1FF', // Акцентный цвет
      },
    },
  },
});

const app = createApp(App);
app.use(vuetify);
app.mount('#app');