const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//Авторизация 



const buttonAuth =  document.querySelector('.button-auth');
const modalAuth = document.querySelector ('.model-auth');
const logInForm = document.querySelector ('#logInForm');
const closeAuth = document.querySelector('.close-auth');
const loginInput = document.querySelector ('#login');
const userName = document.querySelector ('.user-name');
const buttonOut = document.querySelector ('.botton-out');

let login = localStorage.getItem('gloDelivery') ; 

function toogleModalAuth() {
  modalAuth.classList.toggle('is-open');  
}



function autorized() {
  
  function logOut () {
    login = null ;

    buttonAuth.style.display = '';
    localStorage.removeItem('gloDelivery')
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click' , logOut);
    checkAuth () ;
  }
  
  console.log('Авторизован');

  userName.textContent = login; 

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click' , logOut)
}

function notAuthorized() {
  console.log('Не авторизован');
  
  function logIn (event) {
    event.preventDefault();
    login = loginInput.value;
    
    localStorage.setItem('gloDelivery', login)

    toogleModalAuth();
    buttonAuth.removeEventListener('click', toogleModalAuth);
  closeAuth.removeEventListener('click', toogleModalAuth);
  logInForm.removeEventListener('submit' , logIn)
  logInForm.request();
    checkAuth (); 
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

checkAuth() ; 