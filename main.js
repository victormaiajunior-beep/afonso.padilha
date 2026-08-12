document.addEventListener('DOMContentLoaded', () => {
  // 1. Elementos da interface
  const btnCarrinho = document.querySelector('.btn-carrinho');
  const modalCarrinho = document.getElementById('modal-carrinho');

  // ==========================================
  // 2. ANÚNCIOS VIA ARIA (Para leitores de tela)
  // ==========================================
  /**
   * Cria uma região 'aria-live' dinamicamente para anunciar 
   * mudanças de estado ou erros sem mover o foco do usuário.
   */
  function anunciarAcessivel(mensagem) {
    let liveRegion = document.getElementById('aria-announcer');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'aria-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      
      // Estilo para esconder visualmente, mas manter legível para leitores de tela
      Object.assign(liveRegion.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      });

      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = ''; // Limpa antes de atualizar
    setTimeout(() => {
      liveRegion.textContent = mensagem;
    }, 100);
  }

  // ==========================================
  // 3. GERENCIAMENTO DE INTERAÇÕES E FOCO
  // ==========================================
  if (btnCarrinho) {
    // Configura o atributo ARIA inicial
    btnCarrinho.setAttribute('aria-expanded', 'false');

    btnCarrinho.addEventListener('click', () => {
      const estaAberto = btnCarrinho.getAttribute('aria-expanded') === 'true';

      if (!estaAberto) {
        btnCarrinho.setAttribute('aria-expanded', 'true');
        anunciarAcessivel('Carrinho aberto.');
        
        // Se existir um modal, você pode mover o foco para dentro dele aqui:
        if (modalCarrinho) {
          modalCarrinho.classList.add('ativo');
          modalCarrinho.focus();
        }