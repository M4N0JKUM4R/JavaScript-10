// Initialize DOM elements

const musicPlayer = document.querySelector(".music-player");
const playlistIcon = musicPlayer.querySelector(".playlist .fa-list");
const musicList = musicPlayer.querySelector(".music-list");
const closeList = musicList.querySelector(".fa-close");
musicName = document.querySelector(".music-name");
musicArtist = document.querySelector(".music-artist");
musicImage = document.querySelector(".image-area img");
playPauseBtn = document.querySelector(".play-pause");
playPauseBtnIcon = playPauseBtn.querySelector("i");
nextBtn = document.querySelector(".next");
prevBtn = document.querySelector(".prev");

musicAudio = document.querySelector("audio.music-player");
currentTimeEl = document.querySelector(".current-time");
durationTimeEl = document.querySelector(".time-area .duration");
progressEl = document.querySelector(".progress");
progressBarEl = document.querySelector(".progress-bar");
musicListName = musicList.querySelectorAll(".music-name");
musicListArtist = musicList.querySelectorAll(".music-artist");
musicListTime = musicList.querySelectorAll(".time");

loopType = document.querySelector(".loop-type");
loopIcon = document.querySelector(".loop-type i");

let musicIndex = 0;

// Implement open playlist function

playlistIcon.addEventListener("click", (e) => {
    let musicListStyles = window.getComputedStyle(musicList);
    let height = musicListStyles.height;
    let musicPlayerstyles = window.getComputedStyle(musicPlayer);
    let padding = musicPlayerstyles.paddingBottom;
    let offset = parseInt(height) - parseInt(padding);
    musicList.style.top = `-${offset}px`;
})

// Implement close playlist function

closeList.addEventListener("click", (e) => {
    musicList.style.top = `2em`;
})

// Implement Load music function


const loadMusic = (musicIndex) => {
    musicName.innerText = music[musicIndex].name;
    musicArtist.innerText = music[musicIndex].singer;
    musicImage.src = music[musicIndex].img;
    musicAudio.src = music[musicIndex].src;
}

window.addEventListener("load", () => {
    let rand = Math.floor(Math.random() * music.length);
    loadMusic(rand);
})

playPauseBtn.addEventListener("click", () => {
    const musicStatus = musicPlayer.classList.contains("playing");
    musicStatus ? pauseMusic() : playMusic();
})

const playMusic = () => {
    musicAudio.play();
    musicPlayer.classList.add("playing");
    musicPlayer.classList.replace("paused", "playing");
    playPauseBtnIcon.classList.replace("fa-play", "fa-pause");
}

const pauseMusic = () => {
    musicAudio.pause();
    musicPlayer.classList.replace("playing", "paused");
    playPauseBtnIcon.classList.replace("fa-pause", "fa-play");
}


// Implement next music function 

const nextMusic = () => {
    if (musicIndex < music.length - 1) {
        musicIndex++;
    } else {
        musicIndex = 0;
    }
}

nextBtn.addEventListener("click", () => {
    nextMusic();
    loadMusic(musicIndex);
    playMusic();
});

// Implement previous music function 

const prevMusic = () => {
    if (musicIndex > 0) {
        musicIndex--;
    } else {
        musicIndex = music.length - 1;
    }
}

prevBtn.addEventListener("click", () => {
    prevMusic();
    loadMusic(musicIndex);
    playMusic();
});

// Update duration after loading

musicAudio.addEventListener("loadeddata", (e) => {
    const duration = e.target.duration;
    durationMinutes = parseInt(duration / 60);
    durationSeconds = parseInt(duration % 60);

    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    durationTimeEl.innerText = `${durationMinutes}:${durationSeconds}`;
});


// Implement music progress 

musicAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progress = (currentTime / duration) * 100;
    progressEl.style.width = `${progress}%`;

    let currentTimeMinutes = parseInt(currentTime / 60);
    let currentTimeSeconds = parseInt(currentTime % 60);

    if (currentTimeSeconds < 10) {
        currentTimeSeconds = `0${currentTimeSeconds}`;
    }

    currentTimeEl.innerText = `${currentTimeMinutes}:${currentTimeSeconds}`;
})

// Update music based on progress bar width

progressBarEl.addEventListener("click", (e) => {
    let progressBarWidth = progressBarEl.clientWidth;
    let songDuration = musicAudio.duration;
    musicAudio.currentTime = (e.offsetX / progressBarWidth) * songDuration;
})

// Complete music playlist

music.forEach((el, index) => {

    let list = `<div class="song" id="song-${index}">
                    <div class="music-details">
                        <div class="music-name">${el.name}</div>
                        <div class="music-artist">${el.singer}</div>
                    </div>
                    <audio src="${el.src}" class="number-${index}"></audio>
                    <div class="time number-${index}">
                        ${el.duration}
                    </div>
                </div>`;

    musicList.querySelector(".list").insertAdjacentHTML("beforeend", list);

    let singleAudio = musicList.querySelector(`.number-${index}`);

    singleAudio.addEventListener("loadeddata", (e) => {
        let totalTime = Math.floor(e.target.duration);
        let minutes = Math.floor(totalTime / 60);
        let seconds = Math.floor(totalTime % 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        musicList.querySelector(`.time.number-${index}`).innerText = `${minutes}:${seconds}`;
    })

    let singleSong = musicList.querySelector(`#song-${index}`);

    singleSong.addEventListener("click", () => {
        loadMusic(index);
        playMusic();
    })

});

// Repeat Music function

loopType.addEventListener("click", () => {

    loopIconText = loopIcon.innerText;

    switch (loopIconText) {
        case "shuffle":
            loopIcon.innerText = "repeat_one";
            loopIcon.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            loopIcon.innerText = "repeat";
            loopIcon.setAttribute("title", "Playlist looped");
            break;
        case "repeat":
            loopIcon.innerText = "shuffle";
            loopIcon.setAttribute("title", "Playlist shuffled");
            break;
        default:
            loopIcon.innerText = "repeat";
            loopIcon.setAttribute("title", "Playlist looped");
    }
})


// To do after music has ended

musicAudio.addEventListener("ended", () => {

    const loopTitle = loopIcon.getAttribute("title");

    switch (loopTitle) {
        case "Song looped":
            musicAudio.currentTime = 0;
            playMusic();
            break;
        case "Playlist looped":
            musicIndex++;
            if (musicIndex < music.length) {
                loadMusic(musicIndex);
                playMusic();
            } else {
                musicIndex = 0;
                loadMusic(musicIndex);
                playMusic();
            }
            break;
        case "Playlist shuffled":
            let rand = Math.floor(Math.random() * music.length);
            loadMusic(rand);
            playMusic();
            break;
    }
})