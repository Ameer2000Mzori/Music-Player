// selecting our elements
const playBtn = document.getElementById("play-pauze");
const nextBtn = document.getElementById("next-btn");
const beforeBtn = document.getElementById("before-btn");
const muteBtn = document.getElementById("mute-btn");
const controlsBtn = document.getElementsByClassName("controls-btn")[0];
const musicTitle = document.getElementsByClassName("music-title")[0];
const musicArtist = document.getElementsByClassName("music-artist")[0];
const audioHidden = document.getElementsByClassName("audio-hidden")[0];

// getting music
// const musicOne = "../music/jacinto-1.mp3";
// const musicTwo = "../music/jacinto-2.mp3";
// const musicThree = "../music/jacinto-3.mp3";
// const musicFour = "../music/metric-1.mp3";

// audioHidden.src = musicOne;

const song = [
  {
    name: "jacinto-1",
    artist: "Ameer Ameen",
    displayname: "seven nation army (remix)",
  },
  {
    name: "jacinto-2",
    artist: "Mzori",
    displayname: "seven nation army (remix)",
  },
  {
    name: "jacinto-3",
    artist: "Ameer",
    displayname: "seven nation army (remix)",
  },
  {
    name: "metric-1",
    artist: "Ameen",
    displayname: "seven nation army (remix)",
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
  musicTitle.textContent = song.displayname;
}

// our before and next functions
let songInedx = 0;
function nextMusic() {
  songInedx++;
  if (songInedx == 4) {
    songInedx = 0;
  }
  console.log(songInedx);
  loadSong(song[songInedx]);
}

function beforeMusic() {
  if (songInedx == 0) {
    songInedx = 4;
  }
  songInedx--;
  console.log(songInedx);
  loadSong(song[songInedx]);
}

// our click for before and next functions
nextBtn.addEventListener("click", () => {
  nextMusic();
  musicPlay();
});

beforeBtn.addEventListener("click", () => {
  beforeMusic();
  musicPlay();
});

loadSong(song[2]);
