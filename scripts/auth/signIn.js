import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  provider
} from "../firebaseConfig.js";

const signinForm = document.getElementById('signin-form');
const signinEmailInput = document.getElementById('signin-email');
const signinPasswordInput = document.getElementById('signin-password');
const googleSignInButton = document.getElementById('google-signin-button');
async function signIn(event, emailValue, passwordValue) {
  event.preventDefault();
  const email = emailValue;
  const password = passwordValue;
  const signinButton = document.getElementById('signin-button-text');
  const signinLoader = document.getElementById('signin-loader');
  try {
    signinButton.classList.add('hidden');
    signinLoader.classList.remove('opacity-0');
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('isAuthenticated', 'true');
  } catch (error) {
    alert('Ошибка входа');
  } finally {
    signinButton.classList.remove('hidden');
    signinLoader.classList.add('opacity-0');
    signinEmailInput.value = '';
    signinPasswordInput.value = '';
  }
}

async function signGoogleIn() {
  const signinGoogleButton = document.getElementById('google-signin-button-text');
  const signinGoogleLoader = document.getElementById('google-signin-loader');
  try {
    signinGoogleButton.classList.add('hidden');
    signinGoogleLoader.classList.remove('opacity-0');
    const result = await signInWithPopup(auth, provider);
    await GoogleAuthProvider.credentialFromResult(result);
    localStorage.setItem('isAuthenticated', 'true');

  } catch (error) {
    console.error('Error signing in with Google:', error);
    alert(`Ошибка входа через Google: ${errorMessage}`);
  } finally {
    signinGoogleButton.classList.remove('hidden');
    signinGoogleLoader.classList.add('opacity-0');
  }
}

signinForm.addEventListener('submit', (event) => {
  signIn(event, signinEmailInput.value, signinPasswordInput.value);
})

googleSignInButton.addEventListener('click', async (event) => {
  signGoogleIn()
})


export { signIn };