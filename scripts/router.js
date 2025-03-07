const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

if (isAuthenticated && window.location.pathname.endsWith('auth.html')) {
  window.location.href = 'index.html';
}

if (!isAuthenticated && window.location.pathname.endsWith('index.html')) {
  window.location.href = 'auth.html';
}