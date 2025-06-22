/*!
 * Movie Charades Game — Proprietary Software
 * Copyright (c) 2025 Premsingh Padya
 * All rights reserved.
 *
 * Unauthorized copying, modification, distribution, or use of this file,
 * in whole or in part, is strictly prohibited without the prior written
 * consent of the author.
 *
 * Contact: premsinghpadya944@gmail.com
 */

let movieData = {};
let songLinks = {};

const languageSelect = document.getElementById("language");
const eraSelect = document.getElementById("era");
const timerInput = document.getElementById("timerInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const playHintBtn = document.getElementById("playHintBtn");
const movieName = document.getElementById("movieName");
const timerDisplay = document.getElementById("timer");
const songPlayer = document.getElementById("songPlayer");

let timer, timeLeft = 60, selectedMovie = "";
let selectedLang = "", selectedEra = "";

// Load movie data
fetch("data/movies.json")
  .then((res) => res.json())
  .then((data) => movieData = data);

// Load song video ID data
fetch("data/video_ids.json")
  .then((res) => res.json())
  .then((data) => songLinks = data);

startBtn.addEventListener("click", () => {
  // If timer already started, just show another movie
  if (timer) {
    showNewMovie(selectedLang, selectedEra);
    return;
  }

  const inputTime = parseInt(timerInput.value);
  if (isNaN(inputTime) || inputTime < 10 || inputTime > 300) {
    alert("Please enter a timer value between 10 and 300 seconds.");
    return;
  }

  stopBtn.disabled = false;
  timerInput.disabled = true;
  languageSelect.disabled = true;
  eraSelect.disabled = true;
  playHintBtn.disabled = true;
  songPlayer.innerHTML = "";

  selectedLang = languageSelect.value;
  selectedEra = eraSelect.value;

  const movies = movieData[selectedLang]?.[selectedEra] || [];

  if (!movies.length) {
    movieName.textContent = "No movies found.";
    stopBtn.disabled = true;
    timerInput.disabled = false;
    languageSelect.disabled = false;
    eraSelect.disabled = false;
    return;
  }

  selectedMovie = movies[Math.floor(Math.random() * movies.length)];
  movieName.textContent = ` ${selectedMovie}`;
  playHintBtn.textContent = ` Play Hint for: ${selectedMovie}`;
  playHintBtn.disabled = false;

  timeLeft = inputTime;
  timerDisplay.textContent = ` Time Left: ${timeLeft}s`;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = ` Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      songPlayer.innerHTML = ""; // Stop the video when timer ends
      timerDisplay.textContent = " Time's up!";
      askIfGuessed();
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  songPlayer.innerHTML = ""; // Stop the video immediately
  askIfGuessed();
});

playHintBtn.addEventListener("click", () => {
  const videoId = songLinks[selectedLang]?.[selectedEra]?.[selectedMovie];

  if (!videoId || videoId === "N/A") {
    songPlayer.innerHTML = `<p> No video found for this movie.</p>`;
    return;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  songPlayer.innerHTML = `
    <div class="video-container">
      <iframe
        width="100%"
        height="300"
        src="${embedUrl}"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>
      <div class="video-credit">
        <small> Movie Hint proudly Provided by <strong>Premsingh Padya</strong> © 2025</small>
      </div>
    </div>`;
});

function askIfGuessed() {
  stopBtn.disabled = true;
  timerInput.disabled = false;
  languageSelect.disabled = false;
  eraSelect.disabled = false;
  playHintBtn.disabled = true;
  selectedMovie = "";
  movieName.textContent = "Movie-name will appear here";
  playHintBtn.textContent = "Play Hint for the below Movie";
  timerDisplay.textContent = "Timer stopped.";
  songPlayer.innerHTML = ""; // Clear the video player
}


// Helper to show a new movie during active game
function showNewMovie(lang, era) {
  const movies = movieData[lang]?.[era] || [];

  if (!movies.length) {
    movieName.textContent = "No more movies found.";
    return;
  }

  selectedMovie = movies[Math.floor(Math.random() * movies.length)];
  movieName.textContent = ` ${selectedMovie}`;
  playHintBtn.textContent = ` Play Hint for: ${selectedMovie}`;
  playHintBtn.disabled = false;
  songPlayer.innerHTML = "";

  // Reset the timer to the original input value
  const inputTime = parseInt(timerInput.value) || 60;
  timeLeft = inputTime;
  timerDisplay.textContent = ` Time Left: ${timeLeft}s`;

  // Clear and restart the timer
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = ` Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      songPlayer.innerHTML = "";
      timerDisplay.textContent = " Time's up!";
      askIfGuessed();
    }
  }, 1000);
}
