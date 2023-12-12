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
const inputSearch = document.querySelector('.input-search');
const restaurantTitle = document.querySelector('.section-title');
const cartBody = document.querySelector('.cart-body');
const modalPrice = document.querySelector('.modal-pricetag');
const clearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('gloDelivery');
let password = localStorage.getItem('gloDeliveryPass');

const cart = [];

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
        cartButton.style.display = '';

        checkAuth();
    }

    console.log('Авторизован');

    userName.textContent = login;

    authButton.style.display = 'none';
    userName.style.display = 'inline';
    logoutButton.style.display = 'inline';
    cartButton.style.display = 'inline';

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
    const card = `
        <h2 class="section-title">${name}</h2>
        <div class="card-info">
            <div class="rating">
                <img src="img/icon/rating.svg" alt="rating" class="rating-star">
                ${stars}
            </div>
            <div class="price">От ${price} $</div>
            <div class="category">${kitchen}</div>
        </div>
    `;

    restaurantShort.insertAdjacentHTML('beforeend', card);
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
                    <button class="sign-in button-to-cart" id="${id}">В корзину</button>
                    <strong class="card-price card-price-bold">${price} $</strong>
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
            restaurantShort.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
            getData(`db/partners.json`).then(function(data){
                createGoodsTitle(data.find((element) => element.name == restaurant.querySelector('.card-title').textContent));
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

function addToCart(event){
    const target = event.target;
    const buttonAddToCart = target.closest('.button-to-cart');
    if (buttonAddToCart) {
        const card = target.closest('.card');
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;

        const food = cart.find(function(item){
            return item.id === id;
        })
        if (food) {
            food.count += 1;
        }
        else{
            cart.push({
                id,
                title,
                cost,
                count: 1
            });
        }
    }
}

function renderCart() {
    cartBody.textContent = '';
    cart.forEach(function({ id, title, cost, count }){
        const itemCart = `
            <div class="food-row">
                <span class="food-name">${title}</span>
                <strong class="food-price">${cost}</strong>
                <div class="food-counter">
                    <button class="counter-button counter-minus" data-id="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button counter-plus" data-id="${id}">+</button>
                </div>
            </div>
        `;
        cartBody.insertAdjacentHTML('afterbegin', itemCart);
    });
    const totalPrice = cart.reduce(function(result, item) {
        return result + (parseFloat(item.cost) * item.count);
    }, 0);
    modalPrice.textContent = totalPrice + ' $';
}

function changeCount(event) {
    const target = event.target;
    if (target.classList.contains('counter-button')){
        const food = cart.find(function(item){
            return item.id === target.dataset.id;
        });
        if (target.classList.contains('counter-minus')){
            food.count--;
            if (food.count === 0) {
                cart.splice(cart.indexOf(food), 1);
            }
        }
        if (target.classList.contains('counter-plus')) food.count++;
        renderCart();
    }
}

function init() {
    getData('db/partners.json').then(function(data){
        data.forEach(createCardRestaurant);
    });

    cartButton.addEventListener('click', function(){
        renderCart();
        toggleModal();
    });

    clearCart.addEventListener('click', function(){
        cart.length = 0;
        renderCart();
    });

    cartBody.addEventListener('click', changeCount);

    cardsMenu.addEventListener('click', addToCart);

    closeCartButton.addEventListener('click', toggleModal);

    cardsRestaurant.addEventListener('click', openGoods);

    logo.addEventListener('click', function() {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    });

    checkAuth();

    inputSearch.addEventListener('keypress', function(event) {
        if (event.charCode === 13){
            const value = event.target.value.trim();
            if (!value){
                event.target.style.outlineColor = 'red';
                event.target.style.borderColor = 'red';
                event.target.value = '';
                setTimeout(function() {
                    event.target.style.outlineColor = '';
                    event.target.style.borderColor = '';
                }, 1500);
                return;
            }
            getData('db/partners.json').then(function (data) {
                return data.map(function(partner) {
                    return partner.products;
                })
            })
            .then(function (linksProduct) {
                cardsMenu.textContent = '';
                restaurantShort.textContent = '';
                restaurantShort.insertAdjacentHTML('afterbegin', '<div class="section-title">Резульатат поиска</div>');
                linksProduct.forEach(function(link) {
                    getData(`db/${link}`)
                    .then(function (data) {
                        const resultSearch = data.filter(function (item) {
                            const name = item.name.toLowerCase();
                            return name.includes(value.toLowerCase());
                        })
                        containerPromo.classList.add('hide');
                        restaurants.classList.add('hide');
                        menu.classList.remove('hide');
                        resultSearch.forEach(createCardGood);
                    })
                })
            })
        }
    });
}

init();

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