// selecting our elements
const playBtn = document.getElementById("play-pauze");
const nextBtn = document.getElementById("next-btn");
const beforeBtn = document.getElementById("before-btn");
const muteBtn = document.getElementById("mute-btn");
const controlsBtn = document.getElementsByClassName("controls-btn")[0];
const musicTitle = document.getElementsByClassName("music-title")[0];
const musicArtist = document.getElementsByClassName("music-artist")[0];
const audioHidden = document.getElementsByClassName("audio-hidden")[0];
const musicImg = document.getElementsByClassName("music-img")[0];
const starttime = document.getElementsByClassName("start-time")[0];
const endTime = document.getElementsByClassName("end-time")[0];
const dorationTimer = document.getElementsByClassName("doration-timer")[0];
const dorationWrap = document.getElementsByClassName("doration-wrap")[0];
const song = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];
playBtn.addEventListener("click", () => {
  if (audioHidden.paused) {
    musicPlay();
  } else {
    musicPause();
  }
});

controlsBtn.children[3].classList.replace("fa-volume-xmark", "fa-volume-high");

muteBtn.addEventListener("click", () => {
  if (audioHidden.muted) {
    unMuteMusic();
  } else {
    muteMusic();
  }
});

// stop and start functions
function musicPlay() {
  audioHidden.play();
  controlsBtn.children[1].classList.replace("fa-play", "fa-pause");
}

function musicPause() {
  audioHidden.pause();
  controlsBtn.children[1].classList.replace("fa-pause", "fa-play");
}

// mute and unmute functions
function muteMusic() {
  audioHidden.muted = true;
  controlsBtn.children[3].classList.replace(
    "fa-volume-high",
    "fa-volume-xmark"
  );
}

function unMuteMusic() {
  audioHidden.muted = false;
  controlsBtn.children[3].classList.replace(
    "fa-volume-xmark",
    "fa-volume-high"
  );
}

// udate dom

function loadSong(song) {
  musicArtist.textContent = song.artist;
  audioHidden.src = `../music/${song.name}.mp3`;
  musicTitle.textContent = song.displayName;
  musicImg.src = `../imgs/${song.name}.jpg`;
}
//  if the song ends then play next song

// our before and next functions
let songInedx = 0;

function nextMusic() {
  songInedx++;
  if (songInedx == song.length) {
    songInedx = 0;
  }
  console.log(songInedx);
  loadSong(song[songInedx]);
  musicPlay();
}

function beforeMusic() {
  if (songInedx == 0) {
    songInedx = song.length;
  }
  songInedx--;
  console.log(songInedx);
  loadSong(song[songInedx]);
  musicPlay();
}

// our click for before and next functions
nextBtn.addEventListener("click", () => {
  nextMusic();
});

beforeBtn.addEventListener("click", () => {
  beforeMusic();
});

loadSong(song[2]);

//event progressbar
audioHidden.addEventListener("timeupdate", updateprogressBar);

function updateprogressBar(e) {
  if (audioHidden) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    dorationTimer.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      endTime.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // calculate for duration :
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    starttime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audioHidden;
  audioHidden.currentTime = (clickX / width) * duration;
}
audioHidden.addEventListener("ended", nextMusic);
dorationWrap.addEventListener("click", setProgressBar);
