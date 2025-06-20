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

fetch("data/movies.json").then(res => res.json()).then(data => movieData = data);
fetch("data/song_links.json").then(res => res.json()).then(data => songLinks = data);

startBtn.addEventListener("click", () => {
  const inputTime = parseInt(timerInput.value);
  if (isNaN(inputTime) || inputTime < 10 || inputTime > 300) {
    alert("Please enter a timer value between 10 and 300 seconds.");
    return;
  }

  const lang = languageSelect.value;
  const era = eraSelect.value;
  const movies = movieData?.[lang]?.[era] || [];

  if (!movies.length) {
    movieName.textContent = "No movies found.";
    return;
  }

  selectedMovie = movies[Math.floor(Math.random() * movies.length)];
  movieName.textContent = selectedMovie;
  playHintBtn.disabled = false;

  timeLeft = inputTime;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerInput.disabled = true;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "Time's up!";
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
  const videoId = songLinks?.[lang]?.[era]?.[selectedMovie];

  if (!videoId) {
    songPlayer.innerHTML = `<p>No song link found for this movie.</p>`;
    return;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  songPlayer.innerHTML = `
    <iframe width="100%" height="300" src="${embedUrl}" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>`;
});

function askIfGuessed() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  timerInput.disabled = false;
  playHintBtn.disabled = true;
  selectedMovie = "";
  const guessed = confirm("Did the team guess the movie correctly?");
  alert(guessed ? "Great! Ready for the next one." : "No worries! Try again.");
  timerDisplay.textContent = "Timer stopped.";
  movieName.textContent = "Movie name will appear here";
  songPlayer.innerHTML = "";
}
