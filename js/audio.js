export class AudioEngine {
  constructor() { this.enabled = true; this.ctx = null; }
  start() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); this.ctx.resume(); }
  tone(freq=440, duration=.08, type='square', volume=.035) { if (!this.enabled || !this.ctx) return; const oscillator=this.ctx.createOscillator(); const gain=this.ctx.createGain(); oscillator.type=type; oscillator.frequency.value=freq; gain.gain.setValueAtTime(volume,this.ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+duration); oscillator.connect(gain).connect(this.ctx.destination); oscillator.start(); oscillator.stop(this.ctx.currentTime+duration); }
  play(name) { const notes={start:[220,.1],shoot:[520,.05],hit:[150,.13],critical:[780,.16],penalty:[90,.32],damage:[70,.18],victory:[440,.12],gameover:[110,.3],click:[300,.04]}; const note=notes[name]||notes.click; this.tone(...note); if(name==='victory') setTimeout(()=>this.tone(660,.16),130); }
  click(){this.play('click')}
  toggle(){this.enabled=!this.enabled; return this.enabled}
}
