import React from 'react';
import BrowserFrame from './BrowserFrame';

// "Página web en construcción": los bloques aparecen de a uno, brillan y un
// cursor los va recorriendo. Todo CSS (loops de 9 s).
const BuildMock: React.FC = () => (
  <BrowserFrame>
    <div className="mock-screen flex min-h-[400px] flex-col gap-4 p-[18px]">
      <div className="mock-grid" />
      <div className="relative flex items-center justify-between gap-3">
        <div className="bk bk-accent b1 h-[22px] w-[70px]" />
        <div className="flex gap-2">
          <div className="bk bk-line b2 w-[46px]" />
          <div className="bk bk-line b2 w-[46px]" />
          <div className="bk bk-line b2 w-[46px]" />
        </div>
        <div className="bk bk-accent b3 h-[26px] w-[72px] !rounded-full" />
      </div>
      <div className="relative grid grid-cols-2 items-center gap-4">
        <div className="flex flex-col gap-2.5">
          <div className="bk b4 h-5 w-[90%]" />
          <div className="bk b4 h-5 w-[70%]" />
          <div className="bk bk-line b5 w-[95%]" />
          <div className="bk bk-line b5 w-[80%]" />
          <div className="bk bk-accent b6 mt-1.5 h-[30px] w-[100px] !rounded-full" />
        </div>
        <div className="bk b7 flex h-[150px] items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-55">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
      </div>
      <div className="relative grid grid-cols-3 gap-3">
        <div className="bk b8 h-[92px]" />
        <div className="bk b9 h-[92px]" />
        <div className="bk b10 h-[92px]" />
      </div>
      <div className="build-cursor">
        <span className="build-ring" />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="rgb(12 2 45)" strokeWidth="1.2">
          <path d="M4 3l7 17 2.5-7.5L21 10 4 3z" />
        </svg>
      </div>
    </div>
  </BrowserFrame>
);

export default BuildMock;
