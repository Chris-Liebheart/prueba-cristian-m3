// src/js/router.js

import { showLogin } from '../views/login.js';
import { showRegister } from '../views/register.js';
import { showDashboard } from '../views/dashboard.js';
import { showCreateEvent } from '../views/createEvent.js';
import { showEditEvent } from '../views/editEvent.js';
import { showNotFound } from '../views/notFound.js';
import { isAuthenticated, isAdmin } from './auth.js';

// Rutas base sin parámetros
const routes = {
  '#/login': showLogin,
  '#/register': showRegister,
  '#/dashboard': showDashboard,
  '#/dashboard/events/create': () => {
    if (isAdmin()) {
      showCreateEvent();
    } else {
      window.location.hash = '#/not-found';
    }
  },
  '#/dashboard/events/edit': () => {
    if (isAdmin()) {
      showEditEvent();
    } else {
      window.location.hash = '#/not-found';
    }
  },
  '#/not-found': showNotFound
};

// Función principal del enrutador
export function router() {
  const fullHash = window.location.hash;
  const [path] = fullHash.split('?'); // extraemos solo la ruta base sin parámetros

  // Redirección si ya está autenticado e intenta ir a login/register
  if (isAuthenticated() && (path === '#/login' || path === '#/register')) {
    window.location.hash = '#/dashboard';
    return;
  }

  // Rutas públicas
  const publicRoutes = ['#/login', '#/register'];

  // Si no está autenticado y la ruta no es pública, redirigir a not-found
  if (!isAuthenticated() && !publicRoutes.includes(path)) {
    window.location.hash = '#/not-found';
    return;
  }

  // aqui si la ruta existe entonces se ejecutara
  const render = routes[path];
  if (render) {
    render();
  } else {
    showNotFound();
  }
}

// hearing that changes in the hash URL
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
