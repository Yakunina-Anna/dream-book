import { auth, signInWithEmailAndPassword } from "../firebaseConfig.js";

const signinForm = document.getElementById('signin-form');
const signinEmailInput = document.getElementById('signin-email');
const signinPasswordInput = document.getElementById('signin-password');

signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = signinEmailInput.value;
  const password = signinPasswordInput.value;
  try {
    const userSignedIn = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in: ', userSignedIn.user);
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error signing in: ', error);
  } finally {
    signinEmailInput.value = '';
    signinPasswordInput.value = '';
  }
});