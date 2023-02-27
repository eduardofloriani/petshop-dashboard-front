import { Authentication } from "./AuthenticationService.js";

const form = document.querySelector('form');
const errorMsg = document.querySelector('.error-msg');
localStorage.removeItem('token');

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    localStorage.removeItem('token');
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    const authentication = new Authentication(email, password);
    const response = await authentication.login();
    
    if (!response) {
        errorMsg.classList.add('active');
        return;
    };

    const token = response.token;
    localStorage.setItem('token', token);
    window.location.href = './dashboard.html';
});
