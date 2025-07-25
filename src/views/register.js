// src/views/register.js

import { registerUser } from '../js/auth.js';

export function showRegister() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="register">
      <h2>Registro de Usuario</h2>
      <form id="register-form">
        <label>Nombre:</label>
        <input type="text" id="name" required />

        <label>Email:</label>
        <input type="email" id="email" required />

        <label>Contraseña:</label>
        <input type="password" id="password" required />

        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a></p>
    </section>
  `;
   // aqui le pedimos one element by the DOM, realize action of listen and save that information and prevent default behavior
  const form = document.getElementById('register-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    //here we ask values of DOM elements
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const newUser = {
      name,
      email,
      password,
      role: "user"
    };
    //here this function try to wait the response and the alert give two options in two case
    try {
      await registerUser(newUser);
      alert("Registro exitoso. Inicia sesión.");
      window.location.hash = '#/login';
    } catch (error) {
      alert(error.message || "Error al registrarse.");
      console.error(error);
    }
  });
}
