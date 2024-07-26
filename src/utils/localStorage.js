const SESSION_KEY = 'session';

export function getSessionFromLocalStorage() {
  // We are storing whole session object to the local storage
  // Instead of just sessionId string
  // Because of the bug on the server
  // That requires us to send username to the server
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

export function setSessionToLocalStorage(sessionToStore) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionToStore));
}

export function removeSessionFromLocalStorage() {
  localStorage.removeItem(SESSION_KEY);
}
