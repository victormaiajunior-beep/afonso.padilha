document.addEventListener('DOMContentLoaded', () => {
    
    const navBox = document.querySelector('.keyboard-nav-box');
    // Seleciona todos os elementos focáveis dentro da caixa de navegação (teclas e links)
    const focusableElements = navBox.querySelectorAll('.key, dd, dt, a');
    
    // Se não houver elementos para focar, sai da função
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Adiciona um ouvinte de evento para capturar o pressionamento de teclas dentro da caixa
    navBox.addEventListener('keydown', (e) => {
        // Verifica se a tecla pressionada foi 'Tab'
        if (e.key === 'Tab') {
            
            // Se Shift + Tab for pressionado (navegação reversa)
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault(); // Impede o foco de sair da caixa
                    lastElement.focus(); // Volta para o último elemento
                }
            } 
            // Se apenas Tab for pressionado
            else {
                if (document.activeElement === lastElement) {
                    e.preventDefault(); // Impede o foco de sair da caixa
                    firstElement.focus(); // Vai para o primeiro elemento
                }
            }
        }
    });

    // Exemplo para demonstrar a interação com o botão "Carrinho"
    const btnCart = document.querySelector('.btn-cart');
    btnCart.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Você entrou no carrinho de compras!');
    });
});