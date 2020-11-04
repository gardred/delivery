const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");
const cookieButton2 = document.querySelector(".cookie-btn2");

cookieButton.addEventListener("click" , () => {
    cookieContainer.classList.remove("active");
    localStorage.setItem("cookieBannerDisplayed" , "true");
});
cookieButton2.addEventListener("click" , () => {
    cookieContainer.classList.remove("active");
    localStorage.setItem("cookieBannerDisplayed" , "true");
});

setTimeout(() => {
    if (!localStorage.getItem("cookieBannerDisplayed"));
    cookieContainer.classList.add("active");
},2000 );
