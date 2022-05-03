const draggableContainer = document.querySelector(".draggable-container");
header = draggableContainer.querySelector(".header")

let selectionLocked = false;

const lockSelection = () => {
    selectionLocked = true;
}

const unlockSelection = () => {
    selectionLocked = false;
}

header.addEventListener("mousedown", () => {
    lockSelection();
})

window.addEventListener("mouseup", () => {
    unlockSelection();
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