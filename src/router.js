import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Obras from './components/Obras.vue';
import Galerias from './components/Galerias.vue';
import Subituobra from './components/Subituobra.vue';
//import Registro from './components/Registro.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/obras', component: Obras },
  { path: '/galerias', component: Galerias },
  { path: '/subituobra', component: Subituobra },
 // { path: '/registro', component: Registro },
  { path: '/:pathMatch(.*)*', redirect: '/' },
  // Agrega más rutas según sea necesario para tus otras páginas
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;