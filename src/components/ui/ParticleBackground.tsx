import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
}

/** Distancia (px) a la que dos partículas se unen con una línea. */
const LINK_DISTANCE = 140;
/** Radio (px) en el que las partículas tiran una línea hacia el cursor. */
const MOUSE_DISTANCE = 180;

/**
 * Fondo de partículas conectadas, con líneas hacia el cursor (como en el
 * diseño de Celeste). El color sale de las custom properties --particle y
 * --particle-alpha de index.css, así que sigue al tema sin colores sueltos.
 *
 * Rendimiento: se dibuja a la densidad de píxeles real (máx. 2x), la cantidad
 * de partículas escala con el área de la pantalla, y el loop se frena cuando
 * la pestaña no está visible. Con "reducir movimiento" no se dibuja.
 */
const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Una regla CSS no puede frenar un requestAnimationFrame: hay que preguntarlo acá.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const styles = getComputedStyle(document.documentElement);
        const rgb = styles.getPropertyValue('--particle').trim().split(/\s+/).join(', ');
        const baseAlpha = parseFloat(styles.getPropertyValue('--particle-alpha')) || 0.4;

        let width = 0;
        let height = 0;
        let particles: Particle[] = [];
        let frame = 0;
        const mouse = { x: -9999, y: -9999 };

        const setup = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.max(24, Math.min(80, Math.round((width * height) / 18000)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: 0.8 + Math.random() * 1.6,
                alpha: baseAlpha * (0.5 + Math.random() * 0.5),
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 0.8;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                // Salen por un borde y entran por el opuesto: el campo no se vacía.
                if (p.x < -10) p.x = width + 10;
                else if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                else if (p.y > height + 10) p.y = -10;

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const d = Math.hypot(p.x - q.x, p.y - q.y);
                    if (d < LINK_DISTANCE) {
                        ctx.strokeStyle = `rgba(${rgb}, ${(0.28 * baseAlpha * (1 - d / LINK_DISTANCE)).toFixed(3)})`;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }

                const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                if (md < MOUSE_DISTANCE) {
                    ctx.strokeStyle = `rgba(${rgb}, ${(0.5 * baseAlpha * (1 - md / MOUSE_DISTANCE)).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                ctx.fillStyle = `rgba(${rgb}, ${p.alpha.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            frame = requestAnimationFrame(draw);
        };

        const start = () => {
            if (!frame) frame = requestAnimationFrame(draw);
        };
        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const onMove = (e: PointerEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const onVisibility = () => (document.hidden ? stop() : start());

        window.addEventListener('resize', setup);
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);

        setup();
        start();

        return () => {
            stop();
            window.removeEventListener('resize', setup);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-20 h-full w-full"
        />
    );
};

export default ParticleBackground;
