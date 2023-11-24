'use strict';

const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const closeCartButton = document.querySelector('.close-cart');

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
const cardsRestaurant = document.querySelector('.cards-restaurant');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantShort = document.querySelector('.restaurant-short');

let login = localStorage.getItem('gloDelivery');
let password = localStorage.getItem('gloDeliveryPass');


const getData = async function(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка ${response.status} по адресу ${url}`);
    }

    return await response.json();
}

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
        localStorage.setItem('gloDeliveryPass', password);

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

function createGoodsTitle({ image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery }) {
    const card = document.createElement('div');
    card.className = 'restaurant-short section-heading';

    card.insertAdjacentHTML('beforeend', `
            <h2 class="section-title">${name}</h2>
            <div class="card-info">
                <div class="rating">
                    <img src="img/icon/rating.svg" alt="rating" class="rating-star">
                    ${stars}
                </div>
                <div class="price">От ${price} $</div>
                <div class="category">${kitchen}</div>
            </div>
    `);

    menu.insertAdjacentElement('afterbegin', card);
}

function createCardRestaurant({ image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery }) {
    const card = `
        <a class="card card-restaurant wow animate__animated animate__fadeInUp" data-wow-delay="0.2s" data-products="${products}">
            <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag">${timeOfDelivery}</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        <img src="img/icon/rating.svg" alt="rating" class="rating-star">
                        ${stars}
                    </div>
                    <div class="price">От ${price} $</div>
                    <div class="category">${kitchen}</div>
                </div>
            </div>
        </a>
    `;

    cardsRestaurant.insertAdjacentHTML('beforeend', card);
}

function createCardGood({ description, id, image, name, price }) {

    const card = document.createElement('div');
    card.className = 'card wow animate__animated animate__fadeInUp';
    card.setAttribute('data-wow-delay', '0.2s');

    card.insertAdjacentHTML('beforeend', `
            <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${description}</div>
                </div>
                <div class="card-buttons">
                    <button class="sign-in button-to-cart">В корзину</button>
                    <strong class="card-price-bold">${price} $</strong>
                </div>
            </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');

    if (login){
        if (restaurant){
            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
            getData(`db/partners.json`).then(function(data){
                createGoodsTitle(data.find((element) => element.name == restaurant.lastElementChild.firstElementChild.firstElementChild.textContent));
            });
            getData(`db/${restaurant.dataset.products}`).then(function(data){
                data.forEach(createCardGood);
            });
        }
    }
    else {
        toggleModalAuth();
    }
}

getData('db/partners.json').then(function(data){
    data.forEach(createCardRestaurant);
});

cartButton.addEventListener('click', toggleModal);

closeCartButton.addEventListener('click', toggleModal);

cardsRestaurant.addEventListener('click', openGoods);

logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});


checkAuth();

//Slider

new Swiper('.swiper', {
    sliderPerView: 1,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});