
# Porte — Estructura del proyecto y flujo de trabajo

Este repositorio contiene una landing y páginas estáticas para el sitio de Porte. El objetivo de este README es dejar claro cómo está organizado el proyecto y dar instrucciones sencillas para que tus compañeros puedan clonar el repositorio, crear su propia rama y trabajar sin conflictos.

## Estructura principal de carpetas y archivos

- `index.html` — Página principal del sitio.
- `*.html` (p. ej. `contacto.html`, `productos.html`, `nosotros.html`, `preguntas-frecuentes.html`, etc.) — Cada sección del sitio tiene su propio archivo HTML. Esto mantiene las páginas separadas y fáciles de editar.
- `css/` — Contiene hojas de estilo por sección y estilos globales.
	- `global.css` — Estilos compartidos por todo el sitio.
	- `navbar.css`, `footer.css` — Estilos específicos para los componentes comunes.
	- `index.css`, `contacto.css`, `productos.css`, etc. — Estilos por sección. La razón de tener un CSS por sección es mantener el código modular y evitar archivos gigantescos y difíciles de mantener.
- `components/` — Fragmentos HTML reutilizables que se inyectan en las páginas (parciales).
	- `navbar.html` — Marca del menú de navegación (logo, enlaces, menú hamburguesa).
	- `footer.html` — Marca del pie de página (logos, enlaces, contacto).

	Por qué: colocar el navbar y footer en `components/` permite mantener una única fuente de verdad para estas partes compartidas. Un script (ver `js/components-loader.js`) carga estos fragmentos y los inyecta en cada HTML cuando la página carga.

- `js/` — Scripts JavaScript del proyecto.
	- `components-loader.js` — Script que carga `components/navbar.html` y `components/footer.html` dentro de los placeholders (`#navbar-placeholder` y `#footer-placeholder`). También inicializa el menú móvil.
	- Otros scripts (p. ej. `carousel.js`, `forms.js`) controlan funcionalidades específicas.

- `assets/` — Imágenes, íconos y fuentes.

## Convención: una sección = un HTML + un CSS

Cada sección visible en la web tiene su propio archivo HTML y su propia hoja CSS. Ventajas:

- Más simple para trabajar en equipo (cada desarrollador puede enfocarse en una página).
- Evita conflictos de estilos y hace más fácil localizar reglas CSS.
- Facilita cargar solo los estilos necesarios por página y mantener la performance.

Si una sección comparte estilos comunes, éstos deben ir en `css/global.css` o en los archivos `navbar.css`/`footer.css` para evitar duplicación.

## Flujo Git básico para tus compañeros

Sigue estos pasos para clonar el proyecto y trabajar en tu propia rama local antes de subir cambios a `main`.

1) Clonar el repositorio (desde la terminal / PowerShell en Windows):

```powershell
git clone <URL_DEL_REPOSITORIO>
cd porte
```

2) Crear y moverte a tu rama de trabajo (ejemplo: `feature/nombre-cambio`):

```powershell
git checkout -b feature/nombre-cambio
```

3) Ver el estado de los cambios locales:

```powershell
git status
```

4) Añadir archivos al staging (preparar para commit):

```powershell
git add .
```

5) Hacer commit con un mensaje descriptivo:

```powershell
git commit -m "Breve descripción de lo que cambiaste"
```

6) Subir tu rama al remoto (por primera vez):

```powershell
git push -u origin feature/nombre-cambio
```

7) Mantener tu rama actualizada con `main` (opcional, si `main` avanza y necesitas integrar cambios):

```powershell
git fetch origin
git checkout main
git pull origin main
git checkout feature/nombre-cambio
git merge main
```

8) Cuando la rama esté lista, abrir un Pull Request desde la rama `feature/nombre-cambio` hacia `main` en la plataforma de hosting (GitHub/GitLab/Bitbucket) para revisión.

Notas rápidas:
- Usa mensajes de commit claros y atómicos (un cambio lógico por commit).
- Antes de crear un PR, asegúrate de que tu rama pasa revisiones visuales locales (abrir página en el navegador) y que no rompes componentes comunes.

## Cómo probar las páginas localmente

- La forma más sencilla es abrir los archivos `.html` directamente en el navegador (doble clic). Algunos navegadores bloquean fetch de archivos locales; si ves que el navbar/footer no se cargan, ejecuta un servidor local (por ejemplo con la extensión Live Server de VS Code) y recarga la página.
- Recomendación: instalar la extensión Live Server en VS Code y usar "Go Live" para servir el proyecto en `http://127.0.0.1:5500` (o el puerto que indique la extensión).

## Buenas prácticas al trabajar en equipo

- Trabajar en ramas por feature o por ticket.
- Hacer commits pequeños y frecuentes con mensajes claros.
- Evitar editar el HTML del navbar o footer directamente en múltiples ramas a la vez; si hay que cambiarlos, coordinar la actualización.
- Mantener imágenes y fuentes organizadas dentro de `assets/`.

---