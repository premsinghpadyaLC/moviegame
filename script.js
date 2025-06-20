let movieData = {};
let songLinks = {};
let score = 0;

const languageSelect = document.getElementById("language");
const eraSelect = document.getElementById("era");
const timerInput = document.getElementById("timerInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const playHintBtn = document.getElementById("playHintBtn");
const movieName = document.getElementById("movieName");
const timerDisplay = document.getElementById("timer");
const songPlayer = document.getElementById("songPlayer");
const scoreDisplay = document.getElementById("scoreDisplay");
const volumeBtn = document.getElementById("volumeBtn");

let timer, timeLeft = 60, selectedMovie = "", isMuted = false;

// Load movie data
fetch("data/movies.json")
  .then((res) => res.json())
  .then((data) => movieData = data);

// Load song video ID data
fetch("data/video_ids.json")
  .then((res) => res.json())
  .then((data) => songLinks = data);

startBtn.addEventListener("click", () => {
  const inputTime = parseInt(timerInput.value);
  if (isNaN(inputTime) || inputTime < 10 || inputTime > 300) {
    alert("Please enter a timer value between 10 and 300 seconds.");
    return;
  }

  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerInput.disabled = true;
  playHintBtn.disabled = true;
  songPlayer.innerHTML = "";
  movieName.innerHTML = "";

  const lang = languageSelect.value;
  const era = eraSelect.value;
  const movies = movieData[lang]?.[era] || [];

  if (!movies.length) {
    movieName.textContent = "No movies found.";
    resetButtons();
    return;
  }

  selectedMovie = movies[Math.floor(Math.random() * movies.length)];

  movieName.innerHTML = `<strong>${selectedMovie}</strong> <small>(${lang.toUpperCase()}, ${era})</small>`;
  playHintBtn.disabled = false;

  timeLeft = inputTime;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = " Time's up!";
      askIfGuessed();
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  askIfGuessed();
});

playHintBtn.addEventListener("click", () => {
  const lang = languageSelect.value;
  const era = eraSelect.value;
  const videoData = songLinks[lang]?.[era]?.[selectedMovie];

  if (!videoData || videoData.length === 0) {
    songPlayer.innerHTML = `<p> No video found for this movie.</p>`;
    return;
  }

  // Choose a random video ID if multiple are available
  const videoId = Array.isArray(videoData)
    ? videoData[Math.floor(Math.random() * videoData.length)]
    : videoData;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}`;

  songPlayer.innerHTML = `
    <iframe
      width="100%"
      height="300"
      src="${embedUrl}"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
    <p style="margin-top: 8px;"> Playing a hint song from the movie...</p>
  `;
});

volumeBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  volumeBtn.textContent = isMuted ? " Muted" : " Unmuted";
});

function askIfGuessed() {
  clearInterval(timer);
  stopBtn.disabled = true;
  startBtn.disabled = false;
  timerInput.disabled = false;
  playHintBtn.disabled = true;

  const guessed = confirm("Did the team guess the movie correctly?");
  if (guessed) score++;

  scoreDisplay.textContent = ` Score: ${score}`;
  selectedMovie = "";
  timerDisplay.textContent = "Timer stopped.";
  songPlayer.innerHTML += `<p> ${guessed ? "Correct!" : "Try again next time."}</p>`;
}

function resetButtons() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  playHintBtn.disabled = true;
  timerInput.disabled = false;
}
