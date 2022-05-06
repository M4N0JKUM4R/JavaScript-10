// Initialize DOM elements

let detectEl = document.querySelector("#detect-blocker");
let wrapper = document.querySelector(".blocker-wrapper");
let button = document.querySelector("button");

// Inject ad manually for the adblocker to hide

let adClasses = ["ad", "ads", "adsbox", "ad-placement", "doubleclick", "adplaceholder", "ad-badge"];

adClasses.forEach(el => {
    detectEl.classList.add(el);
})


let detectStyles = window.getComputedStyle(detectEl).getPropertyValue("display");

button.addEventListener("click", () => {
    wrapper.classList.remove("show");
})

// Check for adblock 

const checkAdBlocker = () => {
    if(!wrapper.classList.contains("show")) {
        detectStyles === "none" ? wrapper.classList.add("show") : wrapper.classList.remove("show");
    }
}

setInterval(checkAdBlocker,500);
