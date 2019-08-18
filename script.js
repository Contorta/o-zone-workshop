'use strict'




// корзина

    // всплытие и закрытие модального окна корзины
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
    // всплытие и закрытие модального окна корзины

    // добавляем и удаляем товары из корзины
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
function countTotalPriceAndItems (){

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
    // Считаем количество и общую цену товаров в корзине

// корзина

// фильтр акции
    // чекбоксы

const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach(function(elem){
    elem.addEventListener('change', function(){
        if(!this.checked){
            this.nextElementSibling.classList.add('checked')
        } else {
            this.nextElementSibling.classList.remove('checked')
        };
    });
});

// чекбоксы

// фильтр акции