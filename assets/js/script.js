// DARK MODE

document.getElementById("darkModeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// SCROLL SUAVE

document
  .querySelectorAll('a[href^="#"]')

  .forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      document
        .querySelector(this.getAttribute("href"))

        .scrollIntoView({
          behavior: "smooth",
        });
    });
  });

// EMAILJS INIT

if (typeof emailjs !== 'undefined') {
  emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
} else {
  console.warn('EmailJS not loaded. Email functionality will not work.');
}

// VALIDAÇÃO FORMULÁRIO

const form = document.getElementById("formContato");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  if (nome === "" || email === "" || mensagem === "") {
    alert("Preencha todos os campos!");
    return;
  }

  if (typeof emailjs === 'undefined') {
    alert("Serviço de e-mail não disponível. Mensagem não enviada.");
    return;
  }

  // Send email
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: nome,
    from_email: email,
    message: mensagem
  })
  .then(function(response) {
    alert("Mensagem enviada com sucesso!");
    form.reset();
  }, function(error) {
    alert("Erro ao enviar mensagem. Tente novamente.");
    console.log('FAILED...', error);
  });
});

// AOS INIT

AOS.init();

// MENU HIGHLIGHT

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});
