// src/views/editEvent.js

import { getEventById, updateEvent } from '../js/api.js';
import { isAdmin } from '../js/auth.js';

export async function showEditEvent() {
  const app = document.getElementById('app');

  // Extraer that ID from hash: #/dashboard/events/editar?id=1
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  const eventId = params.get('id');
   //here say tha admin is diferent at admin-user
  if (!isAdmin()) {
    window.location.hash = '#/not-found';
    return;
  }
    //here say that if ID by event is diferent print one block of html
  if (!eventId) {
    app.innerHTML = '<p>eror: ID del evento no esta bien diligenciada.</p>';
    return;
  }
     
  try {
    const event = await getEventById(eventId);
    if (!event) {
      app.innerHTML = '<p>event not are found.</p>';
      return;
    }
      
    app.innerHTML = `
      <section class="edit-event">
        <h2>Editar Evento</h2>
        <form id="edit-event-form">
          <label>Nombre del evento:</label>
          <input type="text" id="name" value="${event.name}" required />

          <label>Fecha:</label>
          <input type="date" id="date" value="${event.date}" required />

          <label>Lugar:</label>
          <input type="text" id="location" value="${event.location}" required />

          <label>Capacidad:</label>
          <input type="number" id="capacity" value="${event.capacity}" required min="1" />

          <button type="submit">Guardar cambios</button>
        </form>
      </section>
    `;
    // through the element by the DOM give the function of listen event(edit)
    document.getElementById('edit-event-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const updatedEvent = {
        name: document.getElementById('name').value.trim(),
        date: document.getElementById('date').value,
        location: document.getElementById('location').value.trim(),
        capacity: parseInt(document.getElementById('capacity').value),
      };
      //this function try to update a event by your ID and caught the mistake in other case tha condition be invalid and print a console.log
      try {
        await updateEvent(event.id, updatedEvent);
        alert("Evento actualizado correctamente.");
        window.location.hash = '#/dashboard';
      } catch (error) {
        alert("mistake at the moment of update event.");
        console.error(error);
      }
    });
      // renderisa un bloque html que nos muestra que ocurrio un error al cargar el evento
  } catch (err) {
    console.error("Error cargando evento:", err);
    app.innerHTML = `<p class="error">Hubo un problema al cargar el evento.</p>`;
  }
}
