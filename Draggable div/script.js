const draggableContainer = document.querySelector(".draggable-container");
header = draggableContainer.querySelector(".header")

let selectionLocked = false;

const lockSelection = () => {
    selectionLocked = true;
    console.log("Locked");
}

const unlockSelection = () => {
    selectionLocked = false;
    console.log("Unlocked");
}

// const onDrag = ({movementX,movementY}) => {
//     console.log(e);
//     let styles = window.getComputedStyle(draggableContainer);
//     let left = parseInt(styles.left);
//     let top = parseInt(styles.top);
    
// }

header.addEventListener("mousedown", () => {
    lockSelection();
    header.classList.add("active");
    // header.addEventListener("mousemove", onDrag);
})

window.addEventListener("mouseup", () => {
    unlockSelection();
    header.classList.remove("active");
    header.removeEventListener("mousemove", onDrag);
})

window.addEventListener("mousemove", ({movementX,movementY}) => {
    if(selectionLocked) {
        let styles = window.getComputedStyle(draggableContainer);
        let left = parseInt(styles.left);
        let top = parseInt(styles.top);
        draggableContainer.style.left = `${left + movementX}px`;
        draggableContainer.style.top = `${top + movementY}px`;
    }
})