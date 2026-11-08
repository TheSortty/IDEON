import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// El tema inicial NO se decide acá: lo aplica un script inline en el <head> de
// index.html (localStorage → preferencia del sistema → claro), antes de que se
// pinte nada. Con las páginas pre-renderizadas eso es lo que evita el destello
// del tema equivocado. Este provider solo lee la clase que ya quedó puesta.
function readAppliedTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(readAppliedTheme);

  // El DOM se actualiza en el mismo click, no en un efecto: un efecto correría
  // también al montar y podría pisar la clase que puso el script del <head>.
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const next: Theme = prevTheme === 'light' ? 'dark' : 'light';
      const root = document.documentElement;
      root.classList.remove(prevTheme);
      root.classList.add(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Navegación privada o almacenamiento bloqueado: el tema igual cambia.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
