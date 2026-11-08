import React from 'react';
import BrowserFrame from './BrowserFrame';

const BARS = [35, 55, 42, 70, 58, 85, 64, 92];
const KPIS = [
  { w: '60%', delay: '0s', b: 'b2' },
  { w: '78%', delay: '0.2s', b: 'b3' },
  { w: '45%', delay: '0.4s', b: 'b4' },
];
const ROWS = [
  { w: 'w-[80%]', b: 'b6' },
  { w: 'w-[65%]', b: 'b7' },
  { w: 'w-[72%]', b: 'b8' },
];

// Panel de gestión que se arma solo: menú lateral que cambia de sección,
// indicadores que se llenan, gráfico de barras con una línea, filas con
// interruptores y un aviso de "guardado". Todo CSS (loops de 9 s).
const DashMock: React.FC = () => (
  <BrowserFrame>
    <div className="mock-screen grid min-h-[420px] grid-cols-[56px_minmax(0,1fr)]">
      <div className="mock-grid" />
      <div className="relative flex flex-col items-center gap-3.5 border-r border-brand-text-primary/[0.06] bg-brand-text-primary/[0.03] py-4">
        <span className="bk bk-accent b1 h-[30px] w-[30px] !rounded-[10px]" />
        <span className="bk dash-ic on b1" />
        <span className="bk dash-ic b2" />
        <span className="bk dash-ic b3" />
        <span className="bk dash-ic b4" />
        <span className="bk dash-ic b5" />
      </div>
      <span className="dash-sel absolute left-1.5 h-[38px] w-11 rounded-[10px] border border-brand-primary/60 bg-brand-primary/10" />
      <div className="relative flex min-w-0 flex-col gap-3.5 p-4">
        <div className="flex items-center justify-between gap-2.5">
          <span className="bk b1 h-4 w-[40%]" />
          <span className="bk bk-accent b2 h-[30px] w-[30px] !rounded-full" />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {KPIS.map((kpi) => (
            <div key={kpi.w} className={`bk dash-kpi ${kpi.b} relative h-[70px] overflow-hidden rounded-xl`}>
              <i style={{ '--w': kpi.w, animationDelay: kpi.delay } as React.CSSProperties} />
            </div>
          ))}
        </div>
        <div className="bk b5 relative flex h-[150px] items-end gap-2 overflow-hidden rounded-xl p-3 !opacity-100">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="dash-bar"
              style={{ '--h': `${h}%`, animationDelay: `${(i * 0.12).toFixed(2)}s` } as React.CSSProperties}
            />
          ))}
          <svg className="dash-line absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 70 L14 52 L28 60 L42 34 L57 44 L71 18 L85 30 L100 8" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          {ROWS.map((row) => (
            <div key={row.b} className={`dash-row ${row.b} grid h-[30px] grid-cols-[22px_1fr_60px_34px] items-center gap-2.5 rounded-lg bg-brand-text-primary/[0.03] px-2.5`}>
              <span className="h-[18px] w-[18px] rounded-full bg-brand-text-primary/[0.12]" />
              <span className={`bk bk-line bk-static ${row.w}`} />
              <span className="bk bk-line bk-static" />
              <span className="switch switch-lg" />
            </div>
          ))}
        </div>
        <div className="dash-toast absolute bottom-4 right-4 flex items-center gap-2 rounded-[10px] border border-[rgb(var(--success)/0.5)] bg-[rgb(var(--success)/0.15)] px-3 py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--success))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <i className="h-2 w-[60px] rounded-full bg-brand-text-primary/35" />
        </div>
      </div>
    </div>
  </BrowserFrame>
);

export default DashMock;
