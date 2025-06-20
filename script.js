const languageSelect = document.getElementById("language");
const eraSelect = document.getElementById("era");
const timerInput = document.getElementById("timerInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const playHintBtn = document.getElementById("playHintBtn");
const movieName = document.getElementById("movieName");
const timerDisplay = document.getElementById("timer");
const songPlayer = document.getElementById("songPlayer");

let movieData = {};
let songLinks = {};
let selectedMovie = "";
let timer, timeLeft = 60;

// Load JSON once
async function loadData() {
  movieData = await fetch("data/movies.json").then(r => r.json());
  songLinks = await fetch("data/song_links.json").then(r => r.json());
}
loadData();

startBtn.addEventListener("click", () => {
  const lang = languageSelect.value;
  const era = eraSelect.value;
  const inputTime = parseInt(timerInput.value);

  if (!movieData[lang] || !movieData[lang][era] || movieData[lang][era].length === 0) {
    movieName.textContent = " No movies found.";
    return;
  }

  selectedMovie = movieData[lang][era][Math.floor(Math.random() * movieData[lang][era].length)];
  movieName.textContent = ` ${selectedMovie}`;
  songPlayer.innerHTML = "";
  playHintBtn.disabled = false;

  timeLeft = isNaN(inputTime) ? 60 : Math.min(Math.max(inputTime, 10), 300);
  timerInput.disabled = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerDisplay.textContent = ` ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = ` ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      askIfGuessed();
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  askIfGuessed();
});

playHintBtn.addEventListener("click", () => {
  if (!selectedMovie) return;

  const lang = languageSelect.value;
  const hintUrl = (songLinks[lang] && songLinks[lang][selectedMovie]) 
                  ? songLinks[lang][selectedMovie]
                  : `https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMovie)}+${lang}+movie+song`;

  songPlayer.innerHTML = `
    <a href="${hintUrl}" target="_blank" rel="noopener noreferrer">
       Click here to view song hint on YouTube
    </a>`;
});

function askIfGuessed() {
  clearInterval(timer);
  const guessed = confirm("Did the team guess the movie?");
  alert(guessed ? " Great! Ready for the next one." : " Try again.");
  timerInput.disabled = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  playHintBtn.disabled = true;
  movieName.textContent = "";
  timerDisplay.textContent = "";
  songPlayer.innerHTML = "";
  selectedMovie = "";
}
