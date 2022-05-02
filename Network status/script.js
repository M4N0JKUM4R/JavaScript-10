// Initialize DOM elements

const notificationEl = document.querySelector(".notification-banner");
wifiIcon = notificationEl.querySelector(".wifi-icon");
statusText = notificationEl.querySelector(".status-text");
closeBtn = notificationEl.querySelector(".close-btn");

window.onload = () => {
    const ajax = () => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
        xhr.onload = (e) => {
            notificationEl.classList.add("connected")
            statusText.innerText = "You are connected!"
            setTimeout(() => {
                notificationEl.classList.add("disappear");
                notificationEl.classList.remove("connected");
            }, 5000);
            console.log(e);
        }

        xhr.onerror = (e) => {
            notificationEl.classList.remove("connected");
            notificationEl.classList.remove("disappear");
            console.log(e);
            statusText.innerText = "You are disconnected!"
        }

        xhr.send();
    }

    ajax();

    setInterval(ajax, 1000);
    
}

closeBtn.addEventListener("click", () => {
    if(notificationEl.classList.contains("connected")) {
        console.log("Close button was clicked!");
        notificationEl.classList.add("disappear");
    } 
})