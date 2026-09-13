DON'T LOOK AT ME
“Don’t Look At Me!” is a fun webcam-powered boss game where the player must look away to attack and avoid looking at the screen when the shy boss is watching. Face and gaze tracking control the gameplay, making it a funny and unusual challenge. The goal is to defeat the boss, survive his attacks, and get the highest score without making eye contact! 👀😈
## Run

Camera permissions require a secure context. Start a local server from this folder, for example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

The game attempts to load MediaPipe Face Landmarker from its CDN and process the camera locally. If the camera is unavailable, it explicitly switches to DEMO MODE with simulated gaze states so the game remains playable. No webcam footage is uploaded or stored.
