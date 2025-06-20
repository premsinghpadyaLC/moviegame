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

  const lang = languageSelect.value;
  const era = eraSelect.value;
  const movies = movieData[lang]?.[era] || [];

  if (!movies.length) {
    movieName.textContent = "No movies found.";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    timerInput.disabled = false;
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
  const videoId = songLinks[lang]?.[era]?.[selectedMovie];

  if (!videoId || videoId === "N/A") {
    songPlayer.innerHTML = `<p> No video found for this movie.</p>`;
    return;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  songPlayer.innerHTML = `
    <iframe
      width="100%"
      height="300"
      src="${embedUrl}"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>`;
});

function askIfGuessed() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  timerInput.disabled = false;
  playHintBtn.disabled = true;
  selectedMovie = "";
  movieName.textContent = "Movie-name will appear here";
  playHintBtn.textContent = "Play Hint for the below Movie";
  timerDisplay.textContent = "Timer stopped.";
  const guessed = confirm("Did the team guess the movie correctly?");
  alert(guessed ? " Great! Ready for the next one." : " No worries! Try again.");
}
