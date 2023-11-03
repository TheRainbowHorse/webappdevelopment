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
const passwordInput = document.querySelector('#password-input');
const userName = document.querySelector('.user-name');
const logoutButton = document.querySelector('.logout-button');

let login = localStorage.getItem('gloDelivery');

function toggleModalAuth(){
    loginForm.reset();
    modalAuth.classList.toggle('is-open');
    if (modalAuth.classList.contains("is-open")){
        disableScroll();
    } else {
        enableScroll();
    }
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
        password = passwordInput.value;

        localStorage.setItem('gloDelivery', login);

        if (login && password) {
            toggleModalAuth();
        }
        else if (!login)
        {
            console.log('animate');
            loginInput.style.border = '2px solid rgb(255, 65, 65)';
            loginInput.classList.add('animate__animated', 'animate__shakeX');
            loginInput.addEventListener('animationend', () => {
                loginInput.classList.remove('animate__animated', 'animate__shakeX');
                loginInput.style.border = '';
            });
        }
        else
        {
            console.log('animate');
            passwordInput.style.border = '2px solid rgb(255, 65, 65)';
            passwordInput.classList.add('animate__animated', 'animate__shakeX');
            passwordInput.addEventListener('animationend', () => {
                passwordInput.classList.remove('animate__animated', 'animate__shakeX');
                passwordInput.style.border = '';
            });
        }
        authButton.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        loginForm.removeEventListener('submit', logIn);

        checkAuth();
    }

    authButton.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    loginForm.addEventListener('submit', logIn)
    modalAuth.addEventListener('click', function (event) {
        if (event.target.classList.contains('is-open')){
            toggleModalAuth();
        }
    })
}

function checkAuth() {
    if (login && password) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkAuth();

window.disableScroll = function () {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.dbscrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        overflow: hidden;
        height: 100vh;
        top: ${-window.scrollY}px;
        left: 0;
        width 100%;
        padding-right: ${widthScroll}px;
    `;
}

window.enableScroll = function () {
    document.body.style.cssText = ``;
    window.scroll({top: document.body.dbscrollY})
}