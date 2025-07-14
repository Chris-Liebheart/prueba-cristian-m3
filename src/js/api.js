const API_BASE = 'http://localhost:3000';

/* get all events */
export async function getEvents() {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error('Error al obtener eventos');
  return await res.json();
}

/* Obtener un evento por su ID */
export async function getEventById(id) {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (!res.ok) throw new Error('Evento no encontrado');
  return await res.json();
}

// Create new event
export async function createEvent(eventData) {
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...eventData,
      registeredUsers: [] // begin empty array
    }),
  });
  if (!res.ok) throw new Error('Error al crear el evento');
  return await res.json();
}

// update a event existing
export async function updateEvent(id, data) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar el evento');
  return await res.json();
}

//delete element
export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar el evento');
}

//* Registrar usuario visitante a un evento
export async function registerUserToEvent(eventId, userId) {
  const event = await getEventById(eventId);

  // Validación: ¿ya está registrado o está lleno?
  if (event.registeredUsers.includes(userId)) {
    throw new Error('Ya estás registrado en este evento.');
  }

  if (event.registeredUsers.length >= event.capacity) {
    throw new Error('El evento ya está lleno.');
  }

  const updatedUsers = [...event.registeredUsers, userId];

  const res = await fetch(`${API_BASE}/events/${eventId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ registeredUsers: updatedUsers }),
  });

  if (!res.ok) throw new Error('Error al registrar en el evento');
  return await res.json();
}
