import React from 'react';
import { cn } from '../../lib/cn';

/** Marco de navegador (los tres puntos y la barra de dirección) para los mockups. */
const BrowserFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div aria-hidden="true" className={cn('browser-frame', className)}>
    <div className="browser-bar">
      <i />
      <i />
      <i />
      <span />
    </div>
    {children}
  </div>
);

export default BrowserFrame;
