import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "../firebaseConfig.js";
const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');

async function createUser(event, emailValue, passwordValue) {
  event.preventDefault();
  const email = emailValue;
  const password = passwordValue;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    await signIn(event, email, password);
  } catch (error) {
    alert('Ошибка регистрации');;
  } finally {
    signupEmailInput.value = '';
    signupPasswordInput.value = '';
  }
}
signupForm.addEventListener('submit', async (event) => {
  createUser(event, signupEmailInput.value, signupPasswordInput.value);
});