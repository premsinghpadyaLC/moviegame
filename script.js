const TMDB_API_KEY = '8ebfde042f847e6ec8fc7cd15d0f6c5f';
const YOUTUBE_API_KEY = 'AIzaSyCV3vzz4tzMj2Bj4W6qMgab_3S-6w1w1HE';

const languageSelect = document.getElementById("language");
const eraSelect = document.getElementById("era");
const timerInput = document.getElementById("timerInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const playHintBtn = document.getElementById("playHintBtn");
const movieName = document.getElementById("movieName");
const timerDisplay = document.getElementById("timer");
const songPlayer = document.getElementById("songPlayer");

let timer;
let timeLeft = 60;
let selectedMovie = "";

startBtn.addEventListener("click", async () => {
  let inputTime = parseInt(timerInput.value);
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

  const movies = await fetchMoviesFromTMDB(lang, era);
  if (movies.length === 0) {
    movieName.textContent = "⚠️ No movies found.";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    timerInput.disabled = false;
    return;
  }

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  selectedMovie = randomMovie;
  movieName.textContent = `🎬 ${selectedMovie}`;
  playHintBtn.disabled = false;

  timeLeft = inputTime;
  timerDisplay.textContent = `⏱️ Time Left: ${timeLeft}s`;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱️ Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "⏱️ Time's up!";
      askIfGuessed();
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  askIfGuessed();
});

playHintBtn.addEventListener("click", async () => {
  if (!selectedMovie) return;

  const query = `${selectedMovie} movie song`;
  const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}&maxResults=5`;

  try {
    const response = await fetch(youtubeURL);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const randomVideo = data.items[Math.floor(Math.random() * data.items.length)];
      const videoId = randomVideo.id.videoId;
      songPlayer.innerHTML = `<iframe width="100%" height="215" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    } else {
      songPlayer.innerHTML = "❌ No song found.";
    }
  } catch (error) {
    console.error("YouTube fetch error:", error);
    songPlayer.innerHTML = "⚠️ Error loading song.";
  }
});

function askIfGuessed() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  timerInput.disabled = false;
  playHintBtn.disabled = true;
  selectedMovie = "";
  const guessed = confirm("Did the team guess the movie correctly?");
  alert(guessed ? "✅ Great! Ready for the next one." : "❌ No worries! Try again.");
  timerDisplay.textContent = "⏱️ Timer stopped.";
}

async function fetchMoviesFromTMDB(lang, era) {
  const languageMap = { te: "te", hi: "hi", ta: "ta", kn: "kn", ml: "ml", en: "en" };
  const yearFilter = era === "old"
    ? "&primary_release_date.lte=2014-12-31"
    : "&primary_release_date.gte=2015-01-01";

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=${languageMap[lang]}${yearFilter}&sort_by=popularity.desc&page=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results.map(movie => movie.title || movie.original_title);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}
