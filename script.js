let audioElement = new Audio('songs/1.mp3');
let actionIcon = document.getElementById('actionIcon');
let gif = document.getElementById('playing-gif');
let myProgressBar = document.getElementById('myProgressBar');
const songList = document.querySelector('.songList');
let songItem = document.querySelector('.songItem');
let songName = document.getElementsByClassName('.song-name');
let backButton = document.getElementById('back-button');
let forwardButton = document.getElementById('forward-button');

let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
]

songs.map((dataItem) => {
    div = document.createElement('div');
    div.classList.add('songItem');
    img = document.createElement('img');
    img.classList.add('songCover');
    img.setAttribute('src', dataItem.coverPath);
    div.appendChild(img);
    span = document.createElement('span');
    span.textContent = dataItem.songName;
    div.appendChild(span);
    songListPlay = document.createElement('span');
    songListPlay.classList.add('songListPlay');
    timestamp = document.createElement('span');
    timestamp.classList.add('timeStamp');
    playButton = document.createElement('img');
    playButton.classList.add('playSongIcon');
    playButton.setAttribute('src', 'circle-play-regular.svg');
    playButton.setAttribute('id', dataItem.filePath);
    playButton.setAttribute('name', dataItem.songName);
    songListPlay.appendChild(timestamp);
    songListPlay.appendChild(playButton);
    div.appendChild(songListPlay);
    songList.appendChild(div);
})

let playIcon = document.getElementsByClassName('playSongIcon');

const makeAllPlays = () => {
    for (var i = 0; i < playIcon.length; i++) {
        playIcon[i].setAttribute('src', 'circle-play-regular.svg')
    }
}
Array.from(document.getElementsByClassName('playSongIcon')).forEach((element) => {
    element.addEventListener('click', () => {
        // console.log(element.src);
        document.getElementById("something").innerHTML = element.name;
        let result = element.src.includes('circle-pause-regular.svg');
        if (!result) {
            makeAllPlays();
            element.setAttribute('src', 'circle-pause-regular.svg')
            let result2 = audioElement.src.includes(element.id)
            if (!result2) {
                audioElement.src = element.id;
                audioElement.currentTime = 0;
            }
            audioElement.play();
            gif.style.opacity = 1;
            actionIcon.setAttribute('src', 'circle-pause-regular.svg');
        }
        else {
            gif.style.opacity = 0;
            audioElement.pause();
            element.setAttribute('src', 'circle-play-regular.svg')
            actionIcon.setAttribute('src', 'circle-play-regular.svg');
        }
    })
})

backButton.addEventListener('click', () => {
    audioElement.pause();
    let songNumber = audioElement.src[28];
    if (songNumber === '1') {
        audioElement.src = "songs/4.mp3";
    }
    else {
        let songNumberInt = parseInt(songNumber);
        songNumberInt = songNumberInt - 1;
        songNameString = "songs/" + songNumberInt.toString() + ".mp3";
        audioElement.src = songNameString;
    }
    audioElement.currentTime = 0;
    audioElement.play();
    actionIcon.setAttribute('src', 'circle-pause-regular.svg');
    gif.style.opacity = 1;
    document.getElementById("something").innerHTML = audioElement.src.substring(22, 33);
})

forwardButton.addEventListener('click', () => {
    audioElement.pause();
    let songNumber = audioElement.src[28];
    if (songNumber === '4') {
        audioElement.src = "songs/1.mp3";
    }
    else {
        let songNumberInt = parseInt(songNumber);
        songNumberInt = songNumberInt + 1;
        songNameString = "songs/" + songNumberInt.toString() + ".mp3";
        audioElement.src = songNameString;
    }
    audioElement.currentTime = 0;
    audioElement.play();
    actionIcon.setAttribute('src', 'circle-pause-regular.svg');
    gif.style.opacity = 1;
    document.getElementById("something").innerHTML = audioElement.src.substring(22, 33);
})

actionIcon.addEventListener('click', () => {
    document.getElementById("something").innerHTML = audioElement.src.substring(22, 33);
    console.log("dur", audioElement.duration);
    console.log(audioElement.currentTime);
    let grv = audioElement.paused;
    console.log(grv);
    if (audioElement.paused || audioElement.currentTime <= 0) {
        actionIcon.setAttribute('src', 'circle-pause-regular.svg');
        audioElement.play();
        gif.style.opacity = 1;
        console.log("check1");
    }
    else {
        makeAllPlays();
        actionIcon.setAttribute('src', 'circle-play-regular.svg');
        audioElement.pause();
        gif.style.opacity = 0;
        console.log("check2");
    }
})

audioElement.addEventListener('timeupdate', () => {
    console.log(typeof (audioElement.duration))
    progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.setAttribute('value', progress);
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})