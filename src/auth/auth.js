// src/api/auth.js

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getRequestToken() {
  const response = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.status_message || 'Failed to get request token');
  }
  return data.request_token;
}

export async function createSession(requestToken) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ request_token: requestToken })
  };

  const response = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.status_message || 'Failed to create session');
  }
  localStorage.setItem('sessionId', data.session_id); // Store session ID in local storage
  return data.session_id;
}
