const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");




//Авторизация 

'use strict' ;

const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector ('.model');
const close = document.querySelector('.close');
const buttonAuth =  document.querySelector('.button-auth');
const modalAuth =  document.querySelector ('.modal-auth');
const closeAuth = document.querySelector ('.close-auth');
const logInForm = document.querySelector ('#logInForm');
const loginInput = document.querySelector ('#login');
const passwordInput = document.querySelector ('#passworrd'); 
const userName = document.querySelector ('.user-name');
const buttonOut = document.querySelector ('.botton-out');
const cardsRestauants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector ('.restaurants');
const menu = document.querySelector ('.menu'); 
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector ('.restaurant-title');
const rating = document.querySelector ('.rating');
const minPrice = document.querySelector ('.price');
const category = document.querySelector('.category');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('gloDelivery') ; 

const cart = [];


const getData = async function (url) {
    const response = await  fetch(url)

    if (!response.ok){
      throw new Error (`Ошибка по адрессу ;{url}, 
      статус ошибка ${response.status}!`)
    }
  
  return await  response.json() ;
};

const  toggleModal = function () {
  modal.classList.toggle("is-open");
};

const toogleModalAuth = function() {
  modalAuth.classList.toggle('is-open');  
};

function returnMain() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}


function autorized() {
      function logOut () {
        login = null ;
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        cartButton.style.display = '';
        buttonOut.removeEventListener('click' , logOut);
        checkAuth () ;
        returnMain();
      }
  
  console.log('Авторизован');

  userName.textContent = login; 
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';
  buttonOut.addEventListener('click' , logOut)
}

function notAuthorized() {
  function logIn (event) {
    event.preventDefault();
    if (loginInput.value) {
      loginInput.style.borderColor = ''; 
      login = loginInput.value;

      localStorage.setItem('gloDelivery', login)
      toogleModalAuth();
      buttonAuth.removeEventListener('click', toogleModalAuth);
      closeAuth.removeEventListener('click', toogleModalAuth);
      logInForm.removeEventListener('submit' , logIn)
      logInForm.reset();
      checkAuth (); 
    } else {
      loginInput.style.borderColor = 'red';
    }
  }

buttonAuth.addEventListener('click', toogleModalAuth);
closeAuth.addEventListener('click', toogleModalAuth);
logInForm.addEventListener('submit' , logIn)
}

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAuthorized() ;
  }
}

function createCardRestaurarnt(restaurant) {

    const { image, 
            kitchen, 
            name, 
            price, 
            stars, 
            products, 
            time_of_delivery: timeOfDelivery
          } = restaurant

  const card = `	
                      <a href="restaurant.html" class="card card-restaurant" data-products="${products}">
                      <img src="${image}" alt="image" class="card-image"/>
                      <div class="card-text">
                        <div class="card-heading">
                          <h3 class="card-title">${name}'s</h3>
                          <span class="card-tag tag">${timeOfDelivery}мин</span>
                        </div>
                        <!-- /.card-heading -->
                        <div class="card-info">
                          <div class="rating">
                          ${stars}
                          </div>
                          <div class="price">${price}</div>
                          <div class="category">${kitchen}</div>
                        </div>
                        <!-- /.card-info -->
                      </div>
                      <!-- /.card-text -->
                    </a>
                    <!-- /.card -->
  `;



  cardsRestauants.insertAdjacentHTML('beforeend' , card);

}

function createCardGood (goods) {

  const { description, image, name, price , id} = goods

  const card = document.createElement(`div` );
  card.className = 'class';
 
 card.insertAdjacentHTML('beforeend' ,  `
              
              <img src="${image}" alt="image" class="card-image"/>
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                
                <div class="card-info">
                  <div class="ingredients">${description}
                  </div>
                </div>
                <div class="card-buttons">
                  <button class="button button-primary button-add-cart" id= "${id}">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                  </button>
                  <strong class="card-price-bold">${price} ₽</strong>
                </div>
              </div>
            
 `);
 
 cardsMenu.insertAdjacentElement(`beforeend`,card);

}

function openGoods (event) {
  const target = event.target; 
  
if (login){
  const restaurant = target.closest('.card-restaurant');
  

  if (restaurant) {
      
      cardsMenu.textContent = '';
      containerPromo.classList.add('.hide')
      restaurants.classList.add('.hide')
      menu.classList.remove('.hide')
      getData(`./db/${restaurant.dataset.products}`).then(function(data){
        data.forEach(createCardGood) ;
   
      });



  }
    } else{
  toogleModalAuth();

}
}

function addToCart(event) {

  const taget = event.target;

  const buttonAddToCart = taget.closest('.button-add-cart');

  if (buttonAddToCart) {
    const card = taget.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-pice').textContent; 
    const id = buttonAddToCart.id;
    
    const food = cart.find ( function(item) {
        return item.id === id ;
    })

    if (food) {
      food.count += 1 ;
    } else { 
      cart.push({
        id,
        title,
        cost ,  
        count:1
      })
    }
  }
}


function renderCart () {
  modalBody.textContent = '';

  cart.forEach(function({id, title, cost , count}){
    const itemCart = `
                        <div class="food-row">
                        <span class="food-name">${title}</span>
                        <strong class="food-price">${count}</strong>
                        <div class="food-counter">
                          <button class="counter-button counter-minus" data-id=${id}>-</button>
                          <span class=${count}>1</span>
                          <button class="counter-button counter-plus" data-id=${id}>+</button>
                        </div>
  `;

  modalBody.insertAdjacentHTML(`afterbegin` , itemCart)
  });

  const totalPrice = cart.reduce(function(result,item) { 
    return result = + (parseFloat(item.cost) * item.count) ; 
  } , 0);

  modalPrice.textContent = totalPrice + '$';
}

function changeCount(event) {
  const target = event.taget; 

  if (target.classList.countains('counter-button')) {
    const food = cart.find(function (item) {
      return item.id === taget.dataset.id;
    });

  if (target.classList.countains('counter-minus')) {
    food.count--;
    if (food.count === 0 ){
      cart.splice (cart.indexOf(food),1); 
    }
  };
  if (target.classList.countains('counter-plus')) food.count++;

  renderCart();
}


function init(){
getData('./db/partners.json').then(function(data){
  data.forEach(createCardRestaurarnt) ;
});

cartButton.addEventListener("click", function() {
  renderCart ();  
  toogleModalAuth();
});
buttonClearCart.addEventListener('click' , function() {
  cart.length = 0;
  renderCart();
})

modalBody.addEventListener('click' , changeCount);

cardsMenu.addEventListener('click' , addToCart);

close.addEventListener("click", toggleModal);

cardsRestauants.addEventListener('click' , openGoods);

logo.addEventListener('click' , function () {
  containerPromo.classList.remove('.hide')
  restaurants.classList.remove('.hide')
  menu.classList.add('.hide')
});
}



checkAuth() ; 
createCardRestaurarnt ();
createCardRestaurarnt ();
createCardRestaurarnt ();
init();