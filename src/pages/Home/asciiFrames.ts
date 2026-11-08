// Cuadros de la animación ASCII del hero: una lamparita que parpadea, se
// enciende de abajo hacia arriba, irradia, se transforma en "/>" y vuelve a
// apagarse. Es el mismo dibujo del diseño de Celeste, pasado a una función
// pura: el ruido del fundido usa una semilla fija, así el build (pre-render) y
// el navegador generan exactamente los mismos cuadros y la hidratación coincide.

export type AsciiMode = 'off' | 'warm' | 'on' | 'morph' | 'code';

export interface AsciiFrame {
  mode: AsciiMode;
  text: string;
}

const W = 50;
const H = 32;

type Grid = string[][];

const blank = (): Grid => Array.from({ length: H }, () => Array<string>(W).fill(' '));
const toText = (g: Grid): string => g.map((row) => row.join('')).join('\n');

/** PRNG determinístico (mulberry32): mismo resultado en Node y en el navegador. */
function seeded(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildFrames(): AsciiFrame[] {
  // ---- Lamparita: vidrio (G), cuello (N), rosca (S), punta (T, U) ----
  const shape = blank();
  const dist: number[][] = Array.from({ length: H }, () => Array<number>(W).fill(0));
  const cx = 24.5;
  const cy = 10.5;
  const rx = 16.6;
  const ry = 10.2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const d = dx * dx + dy * dy;
      if (y <= 19 && d <= 1) {
        shape[y][x] = 'G';
        dist[y][x] = d;
      }
    }
  }
  ([[20, 16, 33], [21, 17, 32], [22, 18, 31], [23, 18, 31]] as const).forEach(([y, a, b]) => {
    for (let x = a; x <= b; x++) shape[y][x] = 'N';
  });
  [24, 25, 26, 27].forEach((y) => {
    for (let x = 17; x <= 32; x++) shape[y][x] = 'S';
  });
  for (let x = 20; x <= 29; x++) shape[28][x] = 'T';
  for (let x = 22; x <= 27; x++) shape[29][x] = 'U';

  // Filamento en zigzag.
  const filament: [number, number][] = [];
  ([[19, 9], [20, 11], [21, 9], [22, 11], [23, 9], [24, 11], [25, 9], [26, 11], [27, 9], [28, 11], [29, 9], [30, 11]] as const)
    .forEach(([x, y]) => filament.push([y, x]));
  for (let y = 12; y <= 19; y++) {
    filament.push([y, 19]);
    filament.push([y, 30]);
  }
  const glassRows: number[] = [];
  for (let y = 0; y < H; y++) if (shape[y].includes('G')) glassRows.push(y);

  const bulb = (lit: (y: number) => boolean, opts: { shine?: boolean; rays?: number; warmFil?: boolean } = {}): Grid => {
    const g = blank();
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const c = shape[y][x];
        const d = dist[y][x];
        if (c === 'G') g[y][x] = lit(y) ? (d > 0.84 ? '▓' : '█') : d > 0.84 ? '▒' : '░';
        else if (c === 'N') g[y][x] = lit(y) ? '▓' : '▒';
        else if (c === 'S') g[y][x] = y % 2 === 0 ? '▀' : '▄';
        else if (c === 'T' || c === 'U') g[y][x] = '▀';
      }
    }
    // El filamento se ve con la luz apagada o tibia.
    filament.forEach(([y, x]) => {
      if (!lit(y)) g[y][x] = '▓';
      else if (opts.warmFil) g[y][x] = '▒';
    });
    if (opts.shine) {
      for (let y = 2; y <= 9; y++) {
        for (let x = 6; x <= 20; x++) {
          const dx = (x - cx) / rx;
          const dy = (y - cy) / ry;
          const d = dx * dx + dy * dy;
          if (d > 0.42 && d < 0.62 && x < cx - 4 && y < cy - 1) g[y][x] = '▒';
        }
      }
      g[5][13] = '░';
      g[6][12] = '░';
    }
    if (opts.rays) {
      const rays = opts.rays;
      [-180, -155, -130, -105, -75, -50, -25, 0, 25, 155].forEach((deg, i) => {
        const t = (deg * Math.PI) / 180;
        [1.22, 1.36, 1.5].forEach((k, j) => {
          const x = Math.round(cx + Math.cos(t) * rx * k);
          const y = Math.round(cy + Math.sin(t) * ry * k);
          if (x < 0 || x >= W || y < 0 || y >= H || g[y][x] !== ' ') return;
          const on = (i + j + rays) % 2 === 0;
          g[y][x] = j === 0 ? (on ? '•' : '·') : j === 1 ? (on ? '·' : '•') : on ? '·' : ' ';
        });
      });
    }
    return g;
  };

  // ---- "/>" relleno, con bordes sombreados ----
  const code = (cursor: boolean, spark: 1 | 2): Grid => {
    const g = blank();
    for (let r = 0; r < 22; r++) {
      const y = 4 + r;
      const s = 24 - r;
      for (let x = s; x < s + 6; x++) g[y][x] = x === s || x === s + 5 ? '▓' : '█';
    }
    for (let r = 0; r < 19; r++) {
      const y = 5 + r;
      const c = 31 + (9 - Math.abs(r - 9));
      for (let x = c; x < c + 7; x++) g[y][x] = x === c || x === c + 6 ? '▓' : '█';
    }
    if (cursor) {
      for (let x = 40; x < 47; x++) {
        g[27][x] = '▄';
        g[28][x] = '▀';
      }
    }
    const sparks1: [number, number][] = [[1, 40], [29, 5], [12, 47], [3, 10], [24, 44]];
    const sparks2: [number, number][] = [[2, 42], [28, 7], [14, 48], [0, 14], [26, 46], [8, 2]];
    (spark === 1 ? sparks1 : sparks2).forEach(([y, x], i) => {
      g[y][x] = i % 2 ? '·' : '•';
    });
    if (spark === 1) {
      g[2][39] = '·';
      g[1][41] = '·';
    } else {
      g[13][47] = '·';
      g[15][48] = '·';
    }
    return g;
  };

  // ---- Fundido entre dos dibujos ----
  const random = seeded(0x1de0);
  const noise = Array.from({ length: H }, () => Array.from({ length: W }, () => random()));
  const morph = (from: Grid, to: Grid, p: number): Grid => {
    const g = blank();
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const a = from[y][x];
        const b = to[y][x];
        const k = noise[y][x];
        if (k < p - 0.15) g[y][x] = b;
        else if (k < p + 0.15) g[y][x] = a !== ' ' || b !== ' ' ? (k < p ? '▒' : '░') : k > 0.93 ? '·' : ' ';
        else g[y][x] = a;
      }
    }
    return g;
  };

  const OFF = bulb(() => false);
  const LIT = bulb(() => true, { shine: true });
  const LIT1 = bulb(() => true, { shine: true, rays: 1 });
  const LIT2 = bulb(() => true, { shine: true, rays: 2 });
  const C0 = code(false, 1);
  const C1 = code(true, 2);

  const frames: AsciiFrame[] = [];
  const add = (mode: AsciiMode, g: Grid, n = 1) => {
    const text = toText(g);
    for (let i = 0; i < n; i++) frames.push({ mode, text });
  };

  add('off', OFF, 8);
  add('on', LIT, 1);
  add('off', OFF, 2);
  add('on', LIT, 1);
  add('off', OFF, 3);
  const lowest = glassRows[glassRows.length - 1];
  for (let k = 1; k <= glassRows.length; k++) {
    add('warm', bulb((y) => y >= lowest - k + 1 || (!glassRows.includes(y) && y > lowest), { warmFil: true }));
  }
  for (let i = 0; i < 6; i++) {
    add('on', LIT1, 3);
    add('on', LIT2, 3);
  }
  for (let k = 1; k <= 14; k++) add('morph', morph(LIT, C0, k / 14));
  for (let i = 0; i < 5; i++) {
    add('code', C0, 4);
    add('code', C1, 4);
  }
  for (let k = 1; k <= 14; k++) add('morph', morph(C0, OFF, k / 14));

  return frames;
}

export const ASCII_FRAMES: readonly AsciiFrame[] = buildFrames();

/** Cuadro estático para "reducir movimiento": el "/>" quieto. */
export const ASCII_STILL_INDEX = ASCII_FRAMES.findIndex((frame) => frame.mode === 'code');

/** Milisegundos entre cuadros (como el diseño). */
export const ASCII_FRAME_MS = 110;
