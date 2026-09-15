# Mockup del hero

Los dos encuadres de `public/hero/` no son una foto: se componen acá y se
rasterizan con Chromium. Adentro de los marcos van capturas reales del campus
de coaching (`public/casos/home/`), las mismas que muestra la sección `#casos`.

- `desktop.html` — dos ventanas: el campus del alumno + el panel de administración.
- `mobile.html` — una sola ventana, encuadre más bajo, sin recorte lateral
  (a ese ancho, recortar de costado parte el texto de la interfaz al medio).

## Regenerar

```bash
CH=/ruta/a/chromium
cp public/casos/home/home-04-campus-programa.webp public/casos/home/home-06-campus-admin.webp docs/design-refs/hero-mockup/
cd docs/design-refs/hero-mockup

"$CH" --headless --default-background-color=00000000 --force-device-scale-factor=2 \
  --window-size=1440,760 --screenshot=desktop.png file://$PWD/desktop.html
"$CH" --headless --default-background-color=00000000 --force-device-scale-factor=2 \
  --window-size=760,480 --screenshot=mobile.png file://$PWD/mobile.html
```

Después convertir los PNG a WebP conservando el canal alfa (el fondo es
transparente a propósito: el mockup se apoya sobre el fondo de la página, que
cambia con el tema). Con `cwebp`:

```bash
cwebp -q 85 -resize 1520 0 desktop.png -o ../../../public/hero/hero-desktop.webp
cwebp -q 85 -resize 1000 0 mobile.png  -o ../../../public/hero/hero-mobile.webp
```
