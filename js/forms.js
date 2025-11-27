// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  
  // Seleccionar elementos
  const tipoBtns = document.querySelectorAll('.tipo-btn');
  const form = document.getElementById('comercializaForm');
  let tipoClienteSeleccionado = 'pet-shop'; // Valor por defecto

  // Funcionalidad de los botones de tipo de cliente
  tipoBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevenir comportamiento por defecto
      
      // Remover clase active de todos los botones
      tipoBtns.forEach(b => b.classList.remove('active'));
      
      // Agregar clase active al botón clickeado
      this.classList.add('active');
      
      // Guardar el tipo de cliente seleccionado
      tipoClienteSeleccionado = this.getAttribute('data-tipo');
      console.log('Tipo de cliente seleccionado:', tipoClienteSeleccionado);
    });
  });

  // Manejo del envío del formulario
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Recopilar datos del formulario
      const formData = {
        tipoCliente: tipoClienteSeleccionado,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        pais: document.getElementById('pais').value,
        provincia: document.getElementById('provincia').value,
        localidad: document.getElementById('localidad').value,
        codigoPostal: document.getElementById('codigo-postal').value,
        calle: document.getElementById('calle').value,
        altura: document.getElementById('altura').value,
        mensaje: document.getElementById('mensaje').value
      };

      console.log('Datos del formulario completos:', formData);
      console.log('═══════════════════════════════════════');
      console.log('TIPO DE CLIENTE:', formData.tipoCliente);
      console.log('NOMBRE COMPLETO:', formData.nombre + ' ' + formData.apellido);
      console.log('EMAIL:', formData.email);
      console.log('TELÉFONO:', formData.telefono);
      console.log('DIRECCIÓN:', formData.calle + ' ' + formData.altura + ', ' + formData.localidad);
      console.log('PROVINCIA/PAÍS:', formData.provincia + ', ' + formData.pais);
      console.log('CÓDIGO POSTAL:', formData.codigoPostal);
      console.log('MENSAJE:', formData.mensaje);
      console.log('═══════════════════════════════════════');
      
      // Aquí puedes agregar la lógica para enviar los datos a un servidor
      // Ejemplo con fetch:
      /*
      fetch('/api/comercializa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('¡Formulario enviado con éxito! Nos pondremos en contacto pronto.');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
      });
      */
      
      // Por ahora solo mostramos un mensaje de éxito
      alert(`¡Formulario enviado con éxito!\n\nTipo de cliente: ${getTipoClienteNombre(tipoClienteSeleccionado)}\nNos pondremos en contacto pronto.`);
      
      // Opcional: Limpiar el formulario después del envío
      form.reset();
      
      // Opcional: Resetear el botón de tipo de cliente al primero
      tipoBtns.forEach(b => b.classList.remove('active'));
      tipoBtns[0].classList.add('active');
      tipoClienteSeleccionado = 'pet-shop';
    });
  }

  // Función auxiliar para obtener el nombre legible del tipo de cliente
  function getTipoClienteNombre(tipo) {
    const nombres = {
      'pet-shop': 'Pet Shop',
      'distribuidora': 'Distribuidora',
      'consumidor': 'Consumidor Final'
    };
    return nombres[tipo] || tipo;
  }

  // Validación en tiempo real del email
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.value) && this.value !== '') {
        this.style.boxShadow = '0 0 0 3px rgba(255, 0, 0, 0.3)';
      } else {
        this.style.boxShadow = '';
      }
    });
  }

  // Formateo automático del teléfono
  const telefonoInput = document.getElementById('telefono');
  if (telefonoInput) {
    telefonoInput.addEventListener('input', function(e) {
      // Permitir solo números, paréntesis, guiones y el símbolo +
      this.value = this.value.replace(/[^0-9+()-\s]/g, '');
    });
  }

  // ========================================
  // NEWSLETTER FORM
  // ========================================
  // Attach submit handlers to all newsletter forms on the page. This covers
  // pages that include more than one form or that use an id like
  // newsletterFormComercializa. We prefer to use the .newsletter-form class.
  const newsletterForms = document.querySelectorAll('.newsletter-form');

  if (newsletterForms && newsletterForms.length) {
    newsletterForms.forEach(newsletterForm => {
      newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('.newsletter-input');
      const email = emailInput.value;
      
      console.log('═══════════════════════════════════════');
      console.log('SUSCRIPCIÓN AL NEWSLETTER');
      console.log('Email:', email);
      console.log('═══════════════════════════════════════');
      
      // Aquí puedes agregar la lógica para enviar el email a tu servidor
      /*
      fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('¡Gracias por suscribirte! Recibirás nuestras novedades pronto.');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error. Por favor intenta nuevamente.');
      });
      */
      
      alert('¡Gracias por suscribirte! Recibirás nuestras novedades pronto.');
      emailInput.value = '';
      });
    });
  }
});