# Don't Look At Me!

A retro webcam boss fight built with HTML5 Canvas, CSS, and JavaScript modules.

## Run

Camera permissions require a secure context. Start a local server from this folder, for example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

The game attempts to load MediaPipe Face Landmarker from its CDN and process the camera locally. If the camera is unavailable, it explicitly switches to DEMO MODE with simulated gaze states so the game remains playable. No webcam footage is uploaded or stored.
