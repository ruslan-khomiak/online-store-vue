// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import * as firebase from 'firebase/app';

import 'vuetify/dist/vuetify.min.css';

import BuyDialogComponent from '@/components/Common/BuyDialog';
import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify);
Vue.component('app-buy-dialog', BuyDialogComponent);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    const config = {
      apiKey: 'AIzaSyB9Ej1Q2M2HxCUqL9rZMY9cGvHMGYA3awA',
      authDomain: 'onlinestorevue.firebaseapp.com',
      databaseURL: 'https://onlinestorevue.firebaseio.com',
      projectId: 'onlinestorevue',
      storageBucket: 'onlinestorevue.appspot.com',
      messagingSenderId: '609895940469',
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
    this.$store.dispatch('fetchProducts');
  },
});
