<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# DON'T LOOK AT ME !-The shy Boss Fight 🎯


## Basic Details
### Team Name: S square


### Team Members
- Team Lead: Shahina - Mar Athanasius College of Engineering
- Member 2: Sona s -Mar Athanasius College of Engineering

### Project Description
“Don’t Look At Me!” is a fun webcam-powered boss game where the player must look away to attack and avoid looking at the screen when the shy boss is watching. Face and gaze tracking control the gameplay, making it a funny and unusual challenge. The goal is to defeat the boss, survive his attacks, and get the highest score without making eye contact! 

### The Problem (that doesn't exist)
People have spent years defeating video game bosses by looking directly at them. But what if the boss hates eye contact? Nobody had solved this completely unnecessary problem.

### The Solution (that nobody asked for)
We made a game where you have to look away to attack. 👀🙈
The webcam tracks your gaze—look at the screen and the boss gets angry; look away and you can attack. Because apparently, avoiding eye contact is now a gaming skill
## Technical Details

### Technologies/Components Used
#Installation
#Run
For Software:
Languages: HTML, CSS, JavaScript
Frameworks: None
Libraries: MediaPipe Face Landmarker
Tools: Visual Studio Code, Git, GitHub, Web APIs

For Hardware:
Main components: Laptop/Computer, Webcam
Specifications: Any webcam capable of real-time video capture
Tools required: Mouse
### Implementation
For Software:
Clone the repository:

git clone https://github.com/shahinact/git.git
cd git

No additional packages or installation are required.

Run:

Start a local server:

python -m http.server 8000

Open the game in your browser:

http://localhost:8000

Allow webcam permission when prompted, then start the game.



### Project Documentation
For Software:
# How It Works

DON'T LOOK AT ME! is a browser-based webcam game that uses face and gaze tracking as the main interaction mechanism.

The player must defeat the boss while following one unusual rule:

**LOOK AWAY TO ATTACK. 👀🙈**

## Game Flow

1. **Start Game**
   - The player starts the game from the main menu.
   - A player name can be entered before starting.

2. **Camera Check**
   - The game requests access to the player's webcam.
   - The webcam feed is displayed on the camera-check screen.
   - MediaPipe Face Landmarker detects the player's face.
   - Gaze information is processed to determine whether the player is looking toward the screen.

3. **Game Start**
   - Once the camera and tracking system are ready, the boss fight begins.
   - The boss continuously moves around the game area.
   - The player can move the cursor and press `SPACE` to attack.

4. **Gaze-Based Gameplay**
   - When the player looks away, attacking the boss is safe.
   - When the player looks toward the screen, the boss detects the eye contact.
   - Looking at the screen can cause the player to lose a life.

5. **Boss Fight**
   - Successful attacks reduce the boss's health.
   - The player has three lives.
   - The game keeps track of score, combo, boss health and remaining time.
   - Sound effects, visual reactions and screen effects make the boss react to the player's actions.

6. **Game Result**
   - The player wins by defeating the boss.
   - The player loses if all lives are lost or the game timer expires.
   - The final score and game statistics are displayed.

7. **Leaderboard**
   - The player's score can be saved locally.
   - Previous high scores can be viewed through the leaderboard.


Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)



