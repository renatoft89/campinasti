// login.js

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const form = document.getElementById('form-login');
  const retorno = document.getElementById('mensagem-login');
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

  // Efeito de header ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Simulação de login
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    retorno.textContent = 'Verificando...';
    retorno.className = '';

    setTimeout(() => {
      const email = form.email.value.trim();
      const senha = form.senha.value.trim();

      if (email === 'admin@campinasti.com.br' && senha === '123456') {
        retorno.textContent = 'Login realizado com sucesso!';
        retorno.className = 'sucesso';
        form.reset();
      } else {
        retorno.textContent = 'E-mail ou senha inválidos.';
        retorno.className = 'erro';
      }
    }, 1000);
  });

  console.log("Página 'Login' carregada com sucesso.");
});
