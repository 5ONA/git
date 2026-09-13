import { CameraTracker } from './camera.js';
import { Game } from './gameNoTimer.js';
import { AudioEngine } from './audio.js';
import { clearScores, renderLeaderboard } from './leaderboard.js';

const screens = [...document.querySelectorAll('.screen')];
const screenIds = { menu: 'screen-menu', instructions: 'screen-instructions', camera: 'screen-camera', game: 'screen-game', pause: 'screen-pause', result: 'screen-result', leaderboard: 'screen-leaderboard' };
const show = id => screens.forEach(screen => screen.classList.toggle('active', screen.id === (screenIds[id] || `screen-${id}`)));
const query = (...selectors) => selectors.map(selector => document.querySelector(selector)).find(Boolean);
const camera = new CameraTracker();
const audio = new AudioEngine();
let game;
let playerName = 'PLAYER';
const cameraVideo = query('#camera-video', '#webcam');
const miniVideo = query('#camera-mini-video');

function beginCalibration() {
  if (camera.active) { startGame(); return; }
  show('camera');
  const action = query('#camera-action', '#start-fight-btn');
  const status = query('#camera-status', '#calibration-title');
  const badge = query('#camera-badge', '#camera-status-pill');
  if (!action) return;
  action.disabled = false;
  action.textContent = 'ENABLE CAMERA';
  action.onclick = async () => {
    action.disabled = true;
    action.textContent = 'CONNECTING...';
    const result = await camera.start(cameraVideo, miniVideo);
    if (!result.active) {
      query('#camera-mode', '#calibration-result').textContent = 'DEMO MODE — CAMERA NOT ACTIVE. Simulated gaze is available.';
      badge.textContent = 'DEMO MODE';
    } else {
      query('#camera-mode', '#calibration-result').textContent = 'Camera processed locally. No video is uploaded or stored.';
      badge.textContent = 'FACE DETECTED ✓';
    }
    query('#step-face')?.classList.add('ready');
    status.textContent = 'Now look slightly away.';
    action.disabled = false;
    action.textContent = 'CALIBRATE GAZE';
    action.onclick = async () => {
      await camera.calibrate();
      query('#step-gaze')?.classList.add('ready');
      query('#step-ready')?.classList.add('ready');
      status.textContent = 'GAZE TRACKING READY ✓';
      badge.textContent = 'CAMERA READY';
      action.textContent = 'START BOSS FIGHT';
      action.onclick = () => startGame();
    };
  };
}
function startGame() {
  const nameField = document.querySelector('#player-name');
  const enteredName = nameField?.value || 'PLAYER';
  playerName = enteredName.trim().slice(0, 12).toUpperCase() || 'PLAYER';
  audio.start(); audio.play('start'); show('game');
  game?.destroy();
  game = new Game({ camera, audio, playerName, onEnd: result => { showResult(result); } });
  game.start();
}
function showResult(result) {
  show('result');
  query('#result-kicker','#game-over-reason')?.replaceChildren(document.createTextNode(result.won ? 'RUN COMPLETE // VICTORY' : result.reason));
  query('#result-title')?.replaceChildren(document.createTextNode(result.won ? 'BOSS DEFEATED!' : 'GAME OVER'));
  query('#result-subtitle')?.replaceChildren(document.createTextNode(result.won ? 'YOU BEAT HIM WITHOUT LOOKING.' : result.reason));
  const resultCard = query('#result-card');
  if (resultCard) {
    const shots = result.shots ?? result.hits + (result.misses ?? 0);
    const misses = result.misses ?? Math.max(0, shots - result.hits);
    resultCard.innerHTML = [
      ['SCORE', String(result.score).padStart(6, '0')],
      ['HITS', result.hits],
      ['SHOTS', shots],
      ['ACCURACY', `${result.accuracy}%`],
      ['MISSES', misses],
      ['BEST COMBO', result.combo],
      ['LIVES LEFT', result.lives]
    ].map(([label, value]) => `<div class="result-stat"><span>${label}</span><b>${value}</b></div>`).join('');
  }
  const leaderboard = query('#leaderboard-list'); if (leaderboard) renderLeaderboard(leaderboard);
}
query('#start-button','#start-game-btn')?.addEventListener('click', () => { audio.click(); show('instructions'); });
query('#got-it-button','#instruction-start-btn')?.addEventListener('click', () => { audio.click(); beginCalibration(); });
query('#scores-button','#high-score-btn')?.addEventListener('click', () => { audio.click(); const root=query('#leaderboard-list'); if(root) renderLeaderboard(root); show('leaderboard'); });
query('#clear-scores-button')?.addEventListener('click', () => { clearScores(); const root=query('#leaderboard-list'); if(root) renderLeaderboard(root); });
query('#leaderboard-back','#leaderboard-back-btn')?.addEventListener('click', () => show('menu'));
query('#again-button','#play-again-btn','#victory-play-again-btn')?.addEventListener('click', () => beginCalibration());
query('#result-scores-button','#leaderboard-btn','#victory-leaderboard-btn')?.addEventListener('click', () => { const root=query('#leaderboard-list'); if(root) renderLeaderboard(root); show('leaderboard'); });
query('#result-menu-button','#main-menu-btn','#leaderboard-main-btn')?.addEventListener('click', () => show('menu'));
query('#resume-button','#resume-btn')?.addEventListener('click', () => game?.resume());
query('#quit-button','#pause-menu-btn')?.addEventListener('click', () => { game?.destroy(); camera.stop(); show('menu'); });
