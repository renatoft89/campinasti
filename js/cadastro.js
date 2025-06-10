// cadastro.js

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const form = document.getElementById('form-cadastro');
  const retorno = document.getElementById('mensagem-cadastro');
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

  // Efeito header ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Validação e simulação de cadastro
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    retorno.textContent = 'Validando...';
    retorno.className = '';

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const senha = form.senha.value;
    const confirmar = form.confirmar.value;

    setTimeout(() => {
      if (!nome || !email || !senha || !confirmar) {
        retorno.textContent = 'Preencha todos os campos obrigatórios.';
        retorno.className = 'erro';
      } else if (senha !== confirmar) {
        retorno.textContent = 'As senhas não coincidem.';
        retorno.className = 'erro';
      } else if (senha.length < 6) {
        retorno.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        retorno.className = 'erro';
      } else {
        retorno.textContent = 'Cadastro realizado com sucesso!';
        retorno.className = 'sucesso';
        form.reset();
      }
    }, 1000);
  });

  console.log("Página 'Cadastro' carregada com sucesso.");
});
