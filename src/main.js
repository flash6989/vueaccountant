/* eslint-disable */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import messagePlugin from './utils/message.plugin';
import store from './store';
import 'materialize-css/dist/js/materialize.min';
import Loader from '@/components/app/Loader'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpCFWvX5zqTnuZfbbs9aYiz0WOSQu7bqE",
  authDomain: "home-accountant-c0b40.firebaseapp.com",
  databaseURL: "https://home-accountant-c0b40-default-rtdb.firebaseio.com",
  projectId: "home-accountant-c0b40",
  storageBucket: "home-accountant-c0b40.appspot.com",
  messagingSenderId: "393833434680",
  appId: "1:393833434680:web:c27238505d011025f120cd",
  measurementId: "G-7D75H1QNDW"
};

const appFire = initializeApp(firebaseConfig);
// const database = getDatabase(appFire);
// const auth = getAuth(firebaseConfig)

// let app;
// onAuthStateChanged(() => {
//   if(!app) {
  const app = createApp(App)
  app.component('Loader', Loader)
  app.use(store)
  app.use(router)
  app.use(messagePlugin)
  app.mount('#app');
//   }
// })


