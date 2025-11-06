// Esperar a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {

    // 1. Seleccionar todos los elementos que necesitamos
    const slides = document.querySelectorAll('.producto-slide');
    const thumbnails = document.querySelectorAll('.thumbnail-card');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    
    // 2. Variable para guardar el estado actual
    let currentSlide = 0;
    const totalSlides = slides.length;

    // 3. Función principal para mostrar un slide
    function showSlide(index) {
        
        // --- Lógica para "dar la vuelta" al slider ---
        // Si el índice es mayor que el último, ir al primero (0)
        if (index >= totalSlides) {
            index = 0;
        } 
        // Si el índice es menor que el primero (0), ir al último
        else if (index < 0) {
            index = totalSlides - 1;
        }
        // ---------------------------------------------

        // 4. Quitar la clase 'active' de todas las imágenes grandes
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // 5. Quitar la clase 'active' de todos los thumbnails
        thumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('active');
        });

        // 6. Añadir la clase 'active' solo al slide y thumbnail correctos
        slides[index].classList.add('active');
        thumbnails[index].classList.add('active');

        // 7. Actualizar nuestra variable de estado
        currentSlide = index;
    }

    // --- Configuración de los Eventos ---

    // Al hacer clic en el botón "siguiente"
    nextButton.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });

    // Al hacer clic en el botón "anterior"
    prevButton.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });

    // Al hacer clic en un thumbnail
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            showSlide(index); // Mostrar el slide correspondiente a ESE thumbnail
        });
    });

    // Opcional: Iniciar el slider en el primer slide (aunque ya lo hace el HTML)
    // showSlide(0); 
});