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

let timer, timeLeft = 60, selectedMovie = "";

startBtn.addEventListener("click", async () => {
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

  const movies = await fetchMoviesFromTMDB(lang, era);
  if (!movies.length) {
    movieName.textContent = " No movies found.";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    timerInput.disabled = false;
    return;
  }

  selectedMovie = movies[Math.floor(Math.random() * movies.length)];
  movieName.textContent = ` ${selectedMovie}`;
  playHintBtn.disabled = false;

  timeLeft = inputTime;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  clearInterval(timer);
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

playHintBtn.addEventListener("click", async () => {
  if (!selectedMovie) return;

  // Map language code to language name for YouTube query
  const langNameMap = {
    te: "Telugu",
    hi: "Hindi",
    ta: "Tamil",
    kn: "Kannada",
    ml: "Malayalam",
    en: "English"
  };

  const langName = langNameMap[languageSelect.value] || "";

  // Build query including language
  const query = `${selectedMovie} ${langName} movie song`;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet` +
              `&q=${encodeURIComponent(query)}` +
              `&type=video&videoEmbeddable=true` +
              `&key=${YOUTUBE_API_KEY}&maxResults=5`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Filter out only embeddable, non-live videos with videoId
    const embeddableVideos = data.items.filter(item =>
      item.id.videoId && item.snippet.liveBroadcastContent === "none"
    );

    if (!embeddableVideos.length) {
      songPlayer.innerHTML = " No embeddable song found.";
      return;
    }

    const choice = embeddableVideos[Math.floor(Math.random() * embeddableVideos.length)];
    const videoId = choice.id.videoId;

    songPlayer.innerHTML = `
      <iframe
        width="100%" height="215"
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>`;
  } catch (err) {
    console.error("YouTube API error:", err);
    songPlayer.innerHTML = " Error loading song hint.";
  }
});

function askIfGuessed() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  timerInput.disabled = false;
  playHintBtn.disabled = true;
  selectedMovie = "";

  const guessed = confirm("Did the team guess the movie correctly?");
  alert(guessed ? "Great! Ready for the next one." : " No worries! Try again.");
  timerDisplay.textContent = " Timer stopped.";
}

async function fetchMoviesFromTMDB(lang, era) {
  const languageMap = { te: "te", hi: "hi", ta: "ta", kn: "kn", ml: "ml", en: "en" };
  const yearFilter = (era === "old")
    ? "&primary_release_date.lte=2014-12-31"
    : "&primary_release_date.gte=2015-01-01";
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}` +
              `&with_original_language=${languageMap[lang]}` +
              `${yearFilter}&sort_by=popularity.desc&page=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results.map(m => m.title || m.original_title);
  } catch (e) {
    console.error("TMDB error:", e);
    return [];
  }
}
