#  Movie Charades Game – Built by Premsingh Padya

> **Interactive team game to guess movies using acting and music hints.**
>  
> Built for fun, strategy, and teamwork — designed and developed by Premsingh Padya.

![Movie Charades Banner](https://premsinghpadyalc.github.io/moviegame/assets/banner.png)

---

## 🧠 What is Movie Charades?

**Movie Charades Game** is a web-based team activity built using HTML, CSS, and JavaScript. It allows players to:

- Randomly generate Indian movies (by language and era)
- Set timers for guessing
- Use song hints if teams get stuck
- Track points based on gameplay rules

It's the **ultimate fusion of movies, music, gestures, and team spirit.**

---

## ✨ Why I Built It (The Story)

During a group game night, I noticed how teams struggled with choosing fair movie names or explaining the rules. Often, the same movies were reused, or the gameplay became unclear and with no timer set. 

So I decided to create a platform that:
- **Simplifies and automates movie selection**
- **Explains rules immediately on startup**
- **Adds a creative twist with music hint finally if the movie is not guessed till the end**

I wanted to make a tool not just for *our team*, but something others could use and enjoy — whether in a hostel, office, or family gathering.

---

## 🎮 How the Game Works

1. **Team A selects a movie** (using the generator button ) and gives it to **one member of Team B**.
2. That member **acts silently** to help Team B guess the movie.
3. If stuck, they can **pass the acting role to another teammate**.
4. If guessed:
   -  Correct: Opponent team gets **1 point**
   -  Wrong: Your team gets **1 point**
5. **Optional Hint**: Play a **music hint** from the movie
   -  Guessed with song: **Both teams get 0.5 points** each (Draw)
   -  Still not guessed: **Your team gets 1 point**

---

##  Features

-  Random movie name generation based on language & era
-  Customizable guessing timer (10–300 seconds)
-  Song hint player embedded from YouTube
-  Auto-popup rule instructions on page load
-  Restart game functionality
-  Clear point logic for fair gameplay
-  “Don’t show again” toggle for instructions modal
-  Responsive, mobile-friendly design with vibrant UI

---

##  Tech Stack

| Layer        | Technology Used                          |
|--------------|-------------------------------------------|
| Front-end    | HTML, CSS (custom styles), JavaScript     |
| Assets       | JSON files for movies and video links     |
| Music Hints  | YouTube embeds with selected video IDs    |
| Logic        | DOM scripting, timers, async fetch        |
| Visualization| Python + Graphviz (Game Flow Diagram)     |

---

## How to Run

1. **Clone the repo** or [visit the live site](https://premsinghpadyalc.github.io/moviegame/)
2. Use a modern browser (Chrome, Firefox)
3. Allow audio autoplay for best experience
4. `movies.json` and `video_ids.json` are in the `data/` folder

No backend or server needed — works completely in the browser!

---

##  Gameplay Flow Diagram

A detailed gameplay flow diagram was designed using Python and Graphviz to explain the entire structure.

[View Diagram (PDF)](https://github.com/premsinghpadyalc/moviegame/blob/main/movie_charades_game_flow_diagram.pdf)

---

## 🙋‍♂️ About Me

**👤 Premsingh Padya**  
Software Developer | UI/UX Enthusiast | Innovator  
📍 Based in Ottawa, Canada  
📧 premsinghpadya944@gmail.com  
🌐 [GitHub](https://github.com/premsinghpadyalc) | [LinkedIn](https://www.linkedin.com/in/premsinghpadya)

---

## ⚖️ License

## Movie Charades Game — Proprietary Software

**Copyright © 2025 Premsingh Padya**  
All rights reserved.

Unauthorized copying, modification, distribution, or use of any part of this project is strictly prohibited without the prior written consent of the author.

📩 Contact: premsinghpadya944@gmail.com
