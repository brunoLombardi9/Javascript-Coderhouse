const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_pcvtlta';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Enviar mensaje';
        // alert('Mensaje enviado!');

        Toastify({
          text: "¡Mensaje enviado! Te responderemos lo antes posible.",
          className: "info",
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "#05595B",
          }
        }).showToast();

      }, (err) => {
        btn.value = 'Enviar mensaje';
        alert(JSON.stringify(err));
      });
  });
