import { auth, createUserWithEmailAndPassword } from "../firebaseConfig.js";

const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;
    try {
        const userCreated = await createUserWithEmailAndPassword(auth, email, password);

        console.log('User created: ',userCreated.user);
        // Пользователь успешно зарегистрирован
    } catch (error) {
        console.error('Error creating user: ', error);
    } finally {
        signupEmailInput.value = '';
        signupPasswordInput.value = '';
    }
});