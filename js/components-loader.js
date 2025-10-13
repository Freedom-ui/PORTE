// Función para cargar un componente HTML
async function loadComponent(componentPath, targetId) {
    try {
      // Hacemos una petición para leer el archivo HTML del componente
      const response = await fetch(componentPath);
      
      // Convertimos la respuesta a texto (el HTML)
      const html = await response.text();
      
      // Buscamos el elemento con el ID donde queremos insertar el componente
      const targetElement = document.getElementById(targetId);
      
      // Si existe ese elemento, insertamos el HTML
      if (targetElement) {
        targetElement.innerHTML = html;
      }
    } catch (error) {
      console.error(`Error cargando ${componentPath}:`, error);
    }
  }
  
  // Cuando el DOM esté completamente cargado, ejecutamos esto
  document.addEventListener('DOMContentLoaded', () => {
    // Cargamos el navbar
    loadComponent('../../components/navbar.html', 'navbar-placeholder');
    
    // Cargamos el footer
    loadComponent('../../components/footer.html', 'footer-placeholder');

    // Inicializamos la funcionalidad del menú móvil después de cargar el navbar
    setTimeout(initMobileMenu, 100);
  });
  
  // Función para el menú hamburguesa en móvil
  function initMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
      });
    }
  }