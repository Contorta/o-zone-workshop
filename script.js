'use strict'

// корзина

    // открытие и закрытие модального окна корзины
function toggleCart() {
    const cartBtn = document.querySelector('#cart');
    const modalCart = document.querySelector('.cart');
    const cartCloseBtn = document.querySelector('.cart-close');
    
    cartBtn.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    cartCloseBtn.addEventListener('click', () => {
        modalCart.style.display = '';
        document.body.style.overflow = '';
    });
};

    // открытие и закрытие модального окна корзины

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // добавляем и удаляем товары из корзины
function tamperingWithCards() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const cardsInCartCounter = document.querySelector('.counter');
    
    cards.forEach((card) => {
        const addCardinCartBtn = card.querySelector('.btn-primary');
        addCardinCartBtn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
    
            countTotalPriceAndItems();
    
            const cardRemoveFromCartBtn = cardClone.querySelector('.btn-primary');
            cardRemoveFromCartBtn.textContent = 'Удалить из корзины';
            cardRemoveFromCartBtn.addEventListener('click', () => {
                cardClone.remove();
    
                countTotalPriceAndItems();
            });
    
    
        });
    });
    // добавляем и удаляем товары из корзины
    
    // Считаем количество и общую цену товаров в корзине
    function countTotalPriceAndItems () {    
        const cardsInCart = cartWrapper.querySelectorAll('.card');
        cardsInCartCounter.textContent = cardsInCart.length;
    
        const cardInCartPrise = cartWrapper.querySelectorAll('.card-price');
        const cartTotalPrice = document.querySelector('.cart-total span');
        
        let sum = 0;
        cardInCartPrise.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });
        cartTotalPrice.textContent = sum;
    
        if (cardsInCart.length !== 0){
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        };
    };
};
     // Считаем количество и общую цену товаров в корзине

// корзина

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// перключатель чекбоксов

function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach(function(elem){
        elem.addEventListener('change', function(){
            if(this.checked){
                this.nextElementSibling.classList.add('checked')
            } else {
                this.nextElementSibling.classList.remove('checked')
            };
        });
    });
};

// перключатель чекбоксов

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// добавляем функцию поиска и обработки карточек товаров по поисковому запросу

function actionPage(){
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)){
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            };
        });
        search.value = '';
    });    
};

// добавляем функцию поиска и обработки карточек товаров по поисковому запросу

// фильтр акции

function filter() {
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');

    cards.forEach( (card) => {
        const cardPrice = card.querySelector('.card-price');
        const price = parseFloat(cardPrice.textContent);
        const discount = card.querySelector('.card-sale');

        if((min.value && price < min.value) || (max.value && price > max.value)){
            card.parentNode.style.display = 'none';
        } else if (discountCheckbox.checked && !discount){
            card.parentNode.style.display = 'none';
        } else {
            card.parentNode.style.display = '';
        };
    });
};

// фильтр акции

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// получение данных с сервера (подключение API)

function getServerData() {
    const goodsWrapper = document.querySelector('.goods');

    return fetch('../db/db.json')
    .then((response) => {
        if (response.ok){
            return response.json();
        } else {
            throw new Error ('Данные не были получены, ошибка: ' + response.status);
        }
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.warn(err);
        goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px;">Оппаньки!!! Что-то пошло не так!</div>';
    });
};

// получение данных с сервера (подключение API)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// функция рендера карточек по данным с сервера

function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const cardWrap = document.createElement('div');
        cardWrap.className = "col-12 col-md-6 col-lg-4 col-xl-3";
        cardWrap.innerHTML = `<div class="card" data-category="${good.category}">
                                  ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                                  <div class="card-img-wrapper">
                                      <span class="card-img-top"
                                          style="background-image: url('${good.img}')"></span>
                                  </div>
                                  <div class="card-body justify-content-between">
                                      <div class="card-price">${good.price} ₽</div>
                                      <h5 class="card-title">${good.title}</h5>
                                      <button class="btn btn-primary">В корзину</button>
                                  </div>
                              </div>`;

        goodsWrapper.appendChild(cardWrap);
    });
    
};

// функция рендера карточек по данным с сервера

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// функция рендера каталога

function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogWrapper = document.querySelector('.catalog');
    const catalogBtn = document.querySelector('.catalog-button');
    const categories = new Set();

    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        };
 
        if(event.target.tagName === "LI"){
            cards.forEach((card) => {
                if(card.dataset.category === event.target.textContent){
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                };
            });
        };
    });
};

// функция рендера каталога

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

getServerData().then((data) => {
    renderCards(data);
    toggleCart();
    tamperingWithCards();
    toggleCheckbox();
    actionPage();
    renderCatalog();
});
