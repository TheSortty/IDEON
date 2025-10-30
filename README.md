# IDEON Landing Page

Este es el repositorio para la landing page de IDEON, un servicio enfocado en lanzar páginas web de alta calidad en tiempo récord. El proyecto está construido con React y Tailwind CSS, y está diseñado para ser moderno, rápido y totalmente responsive.

## 🚀 Features Clave

- **Diseño Minimalista y Profesional**: Una interfaz limpia y enfocada en la conversión.
- **100% Responsive**: Perfecta visualización en dispositivos de escritorio, tablets y móviles.
- **Tema Claro y Oscuro (Dark/Light Mode)**: Un switcher permite al usuario cambiar el tema visual de la página, y la preferencia se guarda en el `localStorage` del navegador.
- **Navegación Fluida (Smooth Scrolling)**: Links de navegación que desplazan suavemente al usuario a la sección correspondiente.
- **Dos Modales Independientes**:
    1.  **Modal de Contacto**: Un formulario para que los clientes potenciales dejen sus datos y consultas.
    2.  **Modal de Brief (Tally)**: Un botón principal que abre un formulario de Tally.so para que los clientes completen el brief del proyecto de manera detallada.
- **Optimización SEO**: Meta tags (incluyendo Open Graph para redes sociales) para un mejor posicionamiento.
- **Sin Build Step**: Utiliza `importmap` y CDNs para cargar React, lo que simplifica la configuración y el despliegue.

---

## 🛠️ Stack Tecnológico y Servicios

- **Frontend**:
    - **React**: Biblioteca principal para construir la interfaz de usuario.
    - **TypeScript**: Para un código más robusto y mantenible.
- **Estilos**:
    - **Tailwind CSS**: Framework CSS utility-first para un diseño rápido y personalizado. Se carga a través de CDN.
- **Servicios Externos**:
    - **Web3Forms**: Servicio utilizado para gestionar el envío del formulario de contacto del modal. Es gratuito y fácil de configurar.
    - **Tally.so**: Plataforma para crear formularios avanzados. Se usa para el brief del proyecto y se embebe directamente en un modal.

---

## 📁 Estructura del Proyecto

El proyecto está organizado de manera modular para facilitar su mantenimiento.

```
/
├── components/
│   ├── ui/
│   │   └── Button.tsx         # Componente de botón reutilizable
│   ├── Benefits.tsx         # Sección de beneficios
│   ├── ContactModal.tsx     # Modal con el formulario de contacto
│   ├── Cta.tsx              # Sección de Call to Action final
│   ├── Faq.tsx              # Sección de preguntas frecuentes
│   ├── Footer.tsx           # Pie de página
│   ├── Header.tsx           # Encabezado con la navegación
│   ├── Hero.tsx             # Sección principal (héroe)
│   ├── Plans.tsx            # Sección de planes y precios
│   ├── Process.tsx          # Sección del proceso de trabajo
│   ├── TallyModal.tsx       # Modal que embebe el formulario de Tally
│   └── ThemeSwitcher.tsx    # Botón para cambiar el tema
│
├── contexts/
│   ├── ModalContext.tsx     # Contexto global para manejar el estado de los modales
│   └── ThemeContext.tsx     # Contexto global para manejar el tema (claro/oscuro)
│
├── App.tsx                  # Componente principal que une todas las partes
├── index.html               # Archivo HTML de entrada
├── index.tsx                # Punto de montaje de la aplicación React
└── README.md                # Este archivo
```

---

## ⚙️ ¿Cómo Funciona?

### 1. Gestión de Temas (Claro/Oscuro)

- **`ThemeContext.tsx`**: Crea un contexto de React que provee el tema actual (`light` o `dark`) y una función para cambiarlo (`toggleTheme`).
- **`localStorage`**: Cuando el usuario cambia de tema, la preferencia se guarda en el `localStorage` del navegador.
- **Script en `index.html`**: Un pequeño script en el `<head>` del `index.html` lee el `localStorage` *antes* de que la página se renderice. Esto añade la clase `dark` al tag `<html>` si es necesario, evitando el molesto "flash" de contenido sin estilo (FOUC).
- **`ThemeSwitcher.tsx`**: Es el componente (botón) que utiliza el contexto para mostrar el ícono correcto (sol/luna) y llamar a la función `toggleTheme`.

### 2. Gestión de Modales

- **`ModalContext.tsx`**: Este contexto centraliza el estado de ambos modales (`isModalOpen` para el de contacto y `isTallyModalOpen` para el de brief). Proporciona funciones como `openModal`, `closeModal`, `openTallyModal` y `closeTallyModal`.
- **Componentes Consumidores**: Componentes como `Hero.tsx`, `Plans.tsx` y `Cta.tsx` usan el hook `useModal()` para obtener acceso a estas funciones y poder abrir los modales correspondientes al hacer clic en un botón.

### 3. Formulario de Contacto

- **`ContactModal.tsx`**: Contiene el formulario HTML.
- **Integración con Web3Forms**: Al enviar el formulario, se realiza una petición `fetch` (POST) a la URL de la API de Web3Forms, enviando los datos del formulario en formato JSON.
- **Manejo de Estados**: El modal gestiona internamente los estados de envío: `submitting` (cargando), `success` (éxito) y `error`, mostrando al usuario un feedback visual adecuado.

### 4. Formulario de Brief (Tally)

- **`Hero.tsx`**: Contiene el botón "Empezar mi brief!", que llama a la función `openTallyModal` del contexto.
- **`TallyModal.tsx`**: Este componente se renderiza cuando `isTallyModalOpen` es `true`.
- **`<iframe>` Embebido**: Dentro del modal hay un `<iframe>` que carga la URL del formulario de Tally.
- **Sincronización de Tema**: La URL del `iframe` se construye dinámicamente para incluir el tema actual del sitio (`?theme=light` o `?theme=dark`). De esta manera, el formulario de Tally se muestra con un estilo visual coherente con el resto de la página.

---

## 📦 Despliegue

Dado que este proyecto no requiere un paso de compilación (build), puede ser desplegado simplemente subiendo los archivos a cualquier servicio de hosting estático como:

- Vercel
- Netlify
- GitHub Pages
- Hostinger

Para probarlo localmente, puedes usar cualquier servidor web simple. Por ejemplo, con la extensión **Live Server** de Visual Studio Code, o ejecutando `npx serve` en la raíz del proyecto desde tu terminal.
