# -*- coding: utf-8 -*-
"""Local_Movie_Game_Setup.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1arIZ5l-7NUSzJyh55m7Mqzixjf8IoBn1
"""

# ────────────────────────────────────────────────────────────────
# Movie Charades Game - Gameplay Flow Diagram
# Created by: Premsingh Padya
# Email: premsinghpadya944@gmail.com
# Purpose: Visualize the detailed game logic for Movie Charades
# Technologies: Python, Graphviz
# Platform: Google Colab
# Date: 2025
# ────────────────────────────────────────────────────────────────

# Step 1: Install Graphviz (if not already installed in Colab)
!pip install graphviz

# Step 2: Import required library
from graphviz import Digraph

# Step 3: Initialize the Graphviz Digraph object
charades = Digraph('Movie_Charades_Game_Flow', format='pdf')
charades.attr(rankdir='TB', size='10')  # Top to Bottom flow

# Step 4: Diagram styling (font, colors)
charades.attr('node',
              shape='box',
              style='filled',
              fontname='Arial',
              fontsize='11',
              color='#7a42f4',
              fillcolor='#f4f0ff')

# ────────────────────────────────────────────────────────────────
# HEADER NODE with author info (Top of diagram)
# ────────────────────────────────────────────────────────────────
charades.node('Header',
              'MOVIE CHARADES GAME FLOW DIAGRAM\n\n'
              'Created by: Premsingh Padya\n'
              'Email: premsinghpadya944@gmail.com\n'
              'Purpose: To visualize the official gameplay mechanics\n'
              'Website: https://premsinghpadyalc.github.io/moviegame/\n'
              'Year: 2025')

# ────────────────────────────────────────────────────────────────
# NODES with full descriptions
# ────────────────────────────────────────────────────────────────

charades.node('Start',
              'START GAME\n\nUser selects movie language, era, and guessing timer.\nThis prepares the settings for a fair game.')

charades.node('Generate',
              'GENERATE MOVIE\n\nSystem randomly selects a movie based on chosen language and era.\nAvoids confusion or repeated entries.')

charades.node('Give',
              'TEAM A GIVES MOVIE\n\nTeam A selects the generated movie and gives it to one\nmember of Team B who will act it out silently.')

charades.node('Act',
              'ACTING PHASE\n\nThe chosen Team B member must act out the movie.\nNo verbal clues allowed. Gestures and mime only (This teammate will no longer be guessing).')

charades.node('Guess',
              'GUESSING PHASE\n\nTeam B tries to guess the movie name based on acting.\nThis continues until the timer ends or movie is guessed.')

charades.node('Struggle',
              'STUCK? PASS ACTING\n\nIf the actor is unable to act properly, they can pass\nthe role to another teammate to try again (Even this teammate will no longer be guessing).')

charades.node('Correct',
              'CORRECT GUESS\n\nIf Team B guesses the movie correctly through acting,\nthey get 1 point. The round ends.')

charades.node('Wrong',
              'WRONG GUESS\n\nIf Team B fails to guess correctly without hint,\nTeam A (who gave the movie) gets 1 point.')

charades.node('Hint',
              'OPTIONAL SONG HINT\n\nIf no one can act or guess, Team A plays a music hint\nfrom the movie as a last chance.')

charades.node('Draw',
              'GUESSED AFTER HINT\n\nIf the movie is guessed after the music hint,\nboth teams get 0.5 points each. It is a draw.')

charades.node('Fail',
              'STILL NOT GUESSED\n\nIf the movie is not guessed even after hint,\nTeam A gets full 1 point for that round.')

# ────────────────────────────────────────────────────────────────
# EDGES (connections between each phase)
# ────────────────────────────────────────────────────────────────

charades.edge('Header', 'Start', label='Game initiated')
charades.edge('Start', 'Generate', label='User clicks start')
charades.edge('Generate', 'Give', label='Movie generated')
charades.edge('Give', 'Act', label='Acting starts')
charades.edge('Act', 'Guess', label='Team guesses')

charades.edge('Guess', 'Correct', label='Guessed correctly')
charades.edge('Guess', 'Wrong', label='Guessed wrong')
charades.edge('Guess', 'Struggle', label='Actor stuck')

charades.edge('Struggle', 'Hint', label='Play music hint')
charades.edge('Hint', 'Draw', label='Guessed after hint')
charades.edge('Hint', 'Fail', label='Still not guessed')

# ────────────────────────────────────────────────────────────────
# Render the PDF output to Colab’s /content folder
# ────────────────────────────────────────────────────────────────

output_path = charades.render('/content/movie_guess_game_flow_diagram', view=False)

print(f"PDF Diagram Created!\nDownload here: {output_path}")

"""# **Behind the Game: The Story & Purpose**

---



---



The **Movie Charades Game** was designed to bring excitement, strategy, and fun into our team gatherings. Here's how the game works:

* **One team selects a movie** and gives it to a member of the **opposing team**, who must **act it out** silently for their team to guess.
* If the first actor struggles or feels stuck, they can **pass the acting role** to another teammate — still trying to help their team guess the correct movie name nd the memebers involved in guessing will no longer be eligible to guess the actions as he/she already the movie name.
* If the **guess is correct**, the **opponent team earns a point**. If the guess is incorrect, the **team that gave the movie earns a point**.
* To make the game **even more flexible and inclusive**, we’ve added an exciting twist:
  If the acting doesn't help and players are really stuck, the team can opt to **play a music hint (song from the movie)**.

  * If the movie is guessed correctly after the song hint, **both teams get ½ a point each** — it’s a **draw**.
  * If still not guessed, the **movie-giving team wins a full point**.

###  Why This Website?

* To **make it easier for our team** to **pick good movie names** to give the opponent — be it challenging or easy — without any confusion.
* To **automate** the process of choosing movies, **avoiding repeats**, and making the game **smoother and more fair**.
* To provide a **fun, music-powered backup** hint that adds to the thrill!

---

###  Verdict:

Yes — My idea is to make **fun, engaging, and unique**. It blends **team interaction**, **charades**, **music**, and **tech** all together. It not only supports gameplay but also encourages **smart movie selection**, **strategy**, and **friendly competition**.

- **Premsingh Padya**
"""