// Carousel functionality
class Carousel {
    constructor() {
      this.currentSlide = 0;
      this.slides = document.querySelectorAll('.carousel-slide');
      this.indicators = document.querySelectorAll('.indicator');
      this.prevButton = document.querySelector('.carousel-arrow-left');
      this.nextButton = document.querySelector('.carousel-arrow-right');
      this.autoplayInterval = null;
      this.autoplayDelay = 15000; // 15 segundos
      this.isAnimating = false;

      this.init();
    }

    init() {
      // Inicializar todos los slides excepto el primero fuera de pantalla
      this.slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.transition = '';
        if (i === 0) {
          slide.classList.add('active');
          slide.style.transform = 'translateX(0)';
        } else {
          slide.style.transform = 'translateX(100%)';
        }
      });
      // Event listeners para las flechas
      if (this.prevButton) {
        this.prevButton.addEventListener('click', () => this.prevSlide());
      }
      if (this.nextButton) {
        this.nextButton.addEventListener('click', () => this.nextSlide());
      }

      // Event listeners para los indicadores
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          if (!this.isAnimating) {
            let direction = 'next';
            if (index < this.currentSlide) direction = 'prev';
            this.goToSlide(index, direction);
          }
        });
      });

      // Iniciar autoplay
      this.startAutoplay();
    }

    goToSlide(index, direction = 'next') {
        if (index === this.currentSlide || this.isAnimating) return;
        this.isAnimating = true;
        const currentSlideEl = this.slides[this.currentSlide];
        const nextSlideEl = this.slides[index];
      
        // Remover clase active del indicador actual
        this.indicators[this.currentSlide].classList.remove('active');
      
        // Para el efecto loop: si vamos del último al primero con next, o del primero al último con prev
        const slidesLength = this.slides.length;
        const isLoopForward = (this.currentSlide === slidesLength - 1 && index === 0 && direction === 'next');
        const isLoopBackward = (this.currentSlide === 0 && index === slidesLength - 1 && direction === 'prev');
      
        let actualDirection = direction;
        
        // Mantener la dirección visual correcta en los loops
        if (isLoopForward) {
          actualDirection = 'next';
        } else if (isLoopBackward) {
          actualDirection = 'prev';
        }
      
        const isNext = actualDirection === 'next';
      
        // Preparar el slide entrante
        nextSlideEl.style.transition = 'none';
        nextSlideEl.style.transform = isNext ? 'translateX(100%)' : 'translateX(-100%)';
        nextSlideEl.offsetHeight; // Forzar reflow
        nextSlideEl.style.transition = 'transform 0.6s ease-in-out';
      
        // Animar salida del slide actual y entrada del nuevo
        currentSlideEl.style.transition = 'transform 0.6s ease-in-out';
        currentSlideEl.style.transform = isNext ? 'translateX(-100%)' : 'translateX(100%)';
        nextSlideEl.classList.add('active');
        nextSlideEl.style.transform = 'translateX(0)';
      
        // Actualizar índice
        this.currentSlide = index;
        // Agregar clase active al nuevo indicador
        this.indicators[this.currentSlide].classList.add('active');
      
        // Limpiar después de la animación
        setTimeout(() => {
          currentSlideEl.classList.remove('active');
          // Reposicionar todos los slides que no están activos
          this.slides.forEach((slide, i) => {
            if (i !== this.currentSlide) {
              slide.style.transition = 'none';
              slide.style.transform = i > this.currentSlide ? 'translateX(100%)' : 'translateX(-100%)';
            }
          });
          this.isAnimating = false;
        }, 600);
      }

    nextSlide() {
        if (this.isAnimating) return;
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        // Siempre usar dirección 'next' para el botón siguiente
        this.goToSlide(nextIndex, 'next');
        this.resetAutoplay();
      }

    prevSlide() {
      if (this.isAnimating) return;
      const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prevIndex, 'prev');
      this.resetAutoplay();
    }

    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoplayDelay);
    }

    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    }

    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
}

// Inicializar carousel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const carouselElement = document.querySelector('.hero-carousel');
  if (carouselElement) {
    new Carousel();
  }
});