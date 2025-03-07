import { auth, signOut } from "../firebaseConfig.js";

// Находим кнопку "Выйти"
const logoutButton = document.getElementById('logout-button');

// Проверяем, существует ли кнопка
if (logoutButton) {
  // Добавляем обработчик события клика на кнопку
  logoutButton.addEventListener('click', async () => {
    try {
      // Выполняем выход из Firebase Authentication
      await signOut(auth);
      console.log('User signed out successfully');

      // Очищаем данные из localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('isRemembered');

      window.location.href = 'auth.html';
    } catch (error) {
      console.error('Error signing out: ', error);
      alert('Ошибка при выходе: ' + error.message); // Показываем ошибку пользователю
    }
  });
}