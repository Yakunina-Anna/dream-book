import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "../firebaseConfig.js";
const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signupButton = document.getElementById('signup-button-text');
const signupLoader = document.getElementById('signup-loader');
async function createUser(event, emailValue, passwordValue) {
  event.preventDefault();
  const email = emailValue;
  const password = passwordValue;
  try {
    signupButton.classList.add('hidden');
    signupLoader.classList.remove('opacity-0');
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    await signIn(event, email, password);
  } catch (error) {
    alert('Ошибка регистрации');;
  } finally {
    signupEmailInput.value = '';
    signupPasswordInput.value = '';
    signupButton.classList.remove('hidden');
    signupLoader.classList.add('opacity-0');
  }
}
signupForm.addEventListener('submit', async (event) => {
  createUser(event, signupEmailInput.value, signupPasswordInput.value);
});