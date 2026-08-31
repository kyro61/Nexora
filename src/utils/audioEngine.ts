class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private tickInterval: number | null = null;
  private currentVolume: number = 0.15;

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    } catch {
      // AudioContext not supported
    }
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startTicking();
      this.playChime();
    } else {
      this.stopTicking();
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playTick(isAlternative = false) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // High-frequency mechanical escapement click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(isAlternative ? 3200 : 3800, now);
      filter.Q.setValueAtTime(12, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isAlternative ? 2400 : 2850, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.015);

      gain.gain.setValueAtTime(this.currentVolume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);

      // Micro metallic resonance (jewel impact)
      const resOsc = this.ctx.createOscillator();
      const resGain = this.ctx.createGain();
      resOsc.type = 'sine';
      resOsc.frequency.setValueAtTime(isAlternative ? 5200 : 5800, now);
      resGain.gain.setValueAtTime(this.currentVolume * 0.1, now);
      resGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      resOsc.connect(resGain);
      resGain.connect(this.ctx.destination);

      resOsc.start(now);
      resOsc.stop(now + 0.04);
    } catch {
      // Audio error safely handled
    }
  }

  public playWindingClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.025);
      gain.gain.setValueAtTime(this.currentVolume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // safe
    }
  }

  public playChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [880, 1320, 1760];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(this.currentVolume * 0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.3);
      });
    } catch {
      // safe
    }
  }

  private startTicking() {
    if (this.tickInterval) return;
    let step = false;
    // 28,800 vph = 8 ticks per second = 125ms interval
    this.tickInterval = window.setInterval(() => {
      this.playTick(step);
      step = !step;
    }, 125);
  }

  private stopTicking() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }
}

export const soundManager = new AudioEngine();
