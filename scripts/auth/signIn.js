import { auth, signInWithEmailAndPassword } from "../firebaseConfig.js";

const signinForm = document.getElementById('signin-form');
const signinEmailInput = document.getElementById('signin-email');
const signinPasswordInput = document.getElementById('signin-password');
const rememberMeCheckbox = document.getElementById('remember-checkbox');

signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = signinEmailInput.value;
  const password = signinPasswordInput.value;
  const isRememberMeChecked = rememberMeCheckbox.checked;

  try {
    // Шаг 1: Ожидаем ответа от Firebase об успешной авторизации
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in: ', userCredential.user);

    // Шаг 2: Сохраняем данные в localStorage
    localStorage.setItem('isAuthenticated', 'true');
    if (isRememberMeChecked) {
      localStorage.setItem('isRemembered', 'true'); // Флаг "запомнить меня"
    } else {
      localStorage.removeItem('isRemembered');
    }

    // Шаг 3: Переходим на главную страницу только после завершения всех операций
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error signing in: ', error);
    alert('Ошибка входа: ' + error.message); // Показываем ошибку пользователю
  } finally {
    // Очищаем поля формы независимо от результата
    signinEmailInput.value = '';
    signinPasswordInput.value = '';
  }
});