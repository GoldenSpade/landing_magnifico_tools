import Lenis from 'lenis';
import './nav-mobile';
import './workflow-tabs';

// ─── Smooth scroll ────────────────────────────

const lenis = new Lenis({
  duration: 1.1,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
