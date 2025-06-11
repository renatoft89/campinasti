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

 // Envio do formulário (com delays)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  retorno.textContent = 'Enviando...';
  retorno.className = '';

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const telefone = form.telefone.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    retorno.textContent = 'Por favor, preencha todos os campos obrigatórios.';
    retorno.className = 'erro';
    return;
  }

  try {
    // Delay antes de enviar (simula processamento local)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch('https://campinasti-back.onrender.com/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone, mensagem })
    });

    if (!response.ok) throw new Error('Erro na requisição');

    // Delay após receber resposta (simula processamento do servidor)
    await new Promise(resolve => setTimeout(resolve, 500));

    const data = await response.json();
    retorno.textContent = data.message || 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    retorno.className = 'sucesso';
    form.reset();
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    retorno.textContent = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
    retorno.className = 'erro';
  }
});

  console.log("Página 'Contato' carregada com sucesso.");
});
