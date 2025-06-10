// contato.js

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const form = document.getElementById('form-contato');
  const retorno = document.getElementById('mensagem-retorno');
  const header = document.querySelector('.header');

  // Menu mobile
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header com fundo ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Envio do formulário (simulado)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    retorno.textContent = 'Enviando...';
    retorno.className = '';

    // Simula envio com delay
    setTimeout(() => {
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (nome && email && mensagem) {
        retorno.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        retorno.className = 'sucesso';
        form.reset();
      } else {
        retorno.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        retorno.className = 'erro';
      }
    }, 1000);
  });

  console.log("Página 'Contato' carregada com sucesso.");
});
