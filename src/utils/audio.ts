/**
 * Subtle Ambient Sound Synthesizer via Web Audio API.
 * 100% asset-free, zero-latency, respectful of user settings.
 * Starts strictly muted.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm cinematic lowpass filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Deep gentle root drone (55Hz / A1)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);
    this.osc1.connect(this.filter);
    this.osc1.start();

    // Fifth harmonic (165Hz / E3) for cinematic depth
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.osc2.connect(osc2Gain);
    osc2Gain.connect(this.filter);
    this.osc2.start();
  }

  public play() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2.5);
    this.isPlaying = true;
  }

  public pause() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.2);
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundEngine();
