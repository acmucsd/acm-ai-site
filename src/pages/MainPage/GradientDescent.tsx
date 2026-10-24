import { CSSProperties, useEffect, useState } from 'react';

// wavy.svg box: y = 500 + 250 sin(2πx / W)
const W = 1440;
const H = 1000;
const waveY = (x: number) => 500 + 250 * Math.sin((2 * Math.PI * x) / W);
// slope of wave height (500 - y)
const slope = (x: number) => -((500 * Math.PI) / W) * Math.cos((2 * Math.PI * x) / W);

const TROUGH_X = W / 4;
const STEP_MS = 450;
const HOLD_MS = 10000;
const PAUSE_MS = 4000;

// coral at peak (y 250) to orange at trough (y 750)
const tint = (y: number) => ({ '--mix': `${(y - 250) / 5}%` }) as CSSProperties;

const random = (min: number, max: number) => min + Math.random() * (max - min);

// random start left of hill top (peak at 3W/4) and learning rate, last point snapped to trough
const descend = () => {
  const learningRate = random(110, 190);
  const points: [number, number][] = [];
  for (let x = random(1000, 1070); Math.abs(x - TROUGH_X) > 10; x -= learningRate * slope(x)) {
    points.push([x, waveY(x)]);
  }
  points.push([TROUGH_X, waveY(TROUGH_X)]);
  return points;
};

/**
 * Looping gradient descent along the hero wave.
 */
function GradientDescent() {
  const [points, setPoints] = useState(descend);
  // 0..n points shown, n + 1 fading out
  const [shown, setShown] = useState(0);
  const n = points.length;

  useEffect(() => {
    const delay = shown === n ? HOLD_MS : shown > n ? PAUSE_MS : STEP_MS;
    const timer = setTimeout(() => {
      if (shown > n) {
        setPoints(descend());
        setShown(0);
      } else {
        setShown(shown + 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [shown, n]);

  const visible = points.slice(0, Math.min(shown, n));

  return (
    <div className={`gradientDescent${shown > n ? ' fading' : ''}`}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {visible.slice(1).map(([x, y], i) => (
          <line key={i} x1={visible[i][0]} y1={visible[i][1]} x2={x} y2={y} pathLength={1} style={tint(y)} />
        ))}
      </svg>
      {visible.map(([x, y], i) => (
        <span key={i} style={{ ...tint(y), left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }} />
      ))}
    </div>
  );
}

export default GradientDescent;
