import { useEffect, useRef, useState, useCallback } from 'react';
import './AudioControl.css';

const STORAGE_KEY = 'kt_audio';
const AMBIENT_SRC = '/ambient.mp3';

// Synthesize crisp UI ticks with Web Audio so no sound files are needed.
function tick(
  ctx: AudioContext,
  { freq, dur, type = 'sine', gain = 0.05 }: { freq: number; dur: number; type?: OscillatorType; gain?: number }
) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

const isInteractive = (el: Element | null) =>
  !!el?.closest('a, button, [data-sound], input, textarea, .magnetic');

const AudioControl = () => {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastHover = useRef(0);

  // Restore preference (default off). Skip if user prefers reduced motion.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && localStorage.getItem(STORAGE_KEY) === 'on') setEnabled(true);
  }, []);

  // Drive ambient loop + persist whenever `enabled` changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
    const audio = audioRef.current;
    if (!audio) return;
    if (enabled) {
      audio.volume = 0.18;
      audio.play().catch(() => {}); // ambient.mp3 may be missing — FX still work
    } else {
      audio.pause();
    }
  }, [enabled]);

  // Delegated UI sound FX — one set of listeners covers the whole app.
  useEffect(() => {
    if (!enabled) return;
    // First gesture already happened (the toggle click), so context can start.
    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;
    if (ctx.state === 'suspended') ctx.resume();

    const onClick = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) tick(ctx, { freq: 660, dur: 0.06, type: 'triangle', gain: 0.06 });
    };
    const onHover = (e: PointerEvent) => {
      const now = e.timeStamp;
      if (now - lastHover.current < 90) return;
      if (isInteractive(e.target as Element)) {
        lastHover.current = now;
        tick(ctx, { freq: 320, dur: 0.035, type: 'sine', gain: 0.025 });
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('pointerover', onHover);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('pointerover', onHover);
    };
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return (
    <>
      <audio ref={audioRef} src={AMBIENT_SRC} loop preload="none" />
      <button
        className={`audio-toggle ${enabled ? 'is-on' : ''}`}
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={enabled ? 'Mute sound' : 'Enable sound'}
        title={enabled ? 'Sound on' : 'Sound off'}
      >
        <span className="audio-bars" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </span>
      </button>
    </>
  );
};

export default AudioControl;
