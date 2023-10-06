const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const closeCartButton = document.querySelector('.close-cart');

cartButton.addEventListener('click', toggleModal);
closeCartButton.addEventListener('click', toggleModal);

function toggleModal(){
    modal.classList.toggle('is-open');
}

new WOW().init();


const authButton = document.querySelector('.auth-button');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-input');
const userName = document.querySelector('.user-name');
const logoutButton = document.querySelector('.logout-button');

let login = localStorage.getItem('gloDelivery');

function toggleModalAuth(){
    modalAuth.classList.toggle('is-open');
}

function authorized(){
    function logOut(){
        login = null;
        localStorage.removeItem('gloDelivery');
        authButton.style.display = '';
        userName.style.display = 'none';
        logoutButton.style.display = '';
        logoutButton.removeEventListener('click', logOut);

        checkAuth();
    }

    console.log('Авторизован');

    userName.textContent = login;

    authButton.style.display = 'none';
    userName.style.display = 'inline';
    logoutButton.style.display = 'inline';

    logoutButton.addEventListener('click', logOut);
}

function notAuthorized(){
    console.log('Не авторизован');
    function logIn(event) {
        event.preventDefault();
        login = loginInput.value;

        localStorage.setItem('gloDelivery', login);

        if (login) toggleModalAuth();
        else{
            console.log('animate');
            loginInput.style.border = '2px solid rgb(255, 65, 65)';
            loginInput.classList.add('animate__animated', 'animate__shakeX');
            loginInput.addEventListener('animationend', () => {
                loginInput.classList.remove('animate__animated', 'animate__shakeX');
                loginInput.style.border = '';
            });
        }
        authButton.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        loginForm.removeEventListener('submit', logIn);
        loginForm.reset();

        checkAuth();
    }

    authButton.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    loginForm.addEventListener('submit', logIn)
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkAuth();