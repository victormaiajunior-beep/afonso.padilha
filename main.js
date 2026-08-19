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
/* ... Código anterior do Focus Trap ... */

// --- INTERAÇÃO COM OS BOTÕES DE PRODUTO ---

// Seleciona todos os botões "Ver produto"
const productButtons = document.querySelectorAll('.btn-product-view');

productButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Pega o nome do produto que está dentro do mesmo card
        const parentCard = e.target.closest('.product-card');
        const productName = parentCard.querySelector('.product-name').innerText;
        
        // Mensagem de feedback (Simulação de carrinho)
        const message = `Produto "${productName}" adicionado ao carrinho! (Simulação)`;
        
        // Exibe o alerta. O navegador naturalmente foca no alerta, o que é ótimo para acessibilidade.
        alert(message);
    });
});

// --- FOCO NO PRIMEIRO ELEMENTO PARA LEITORES DE TELA (Boas Práticas) ---
// Ao carregar a página, coloca o foco no título principal, para que o leitor de tela
// anuncie a página imediatamente.
const mainTitle = document.querySelector('.hero-title');
if (mainTitle) {
    // Adiciona tabindex="-1" para permitir foco em elemento não interativo, 
    // mas o remove do fluxo de Tab normal.
    mainTitle.setAttribute('tabindex', '-1');
    mainTitle.focus(); 
}
document.addEventListener('DOMContentLoaded', () => {
    const navBox = document.querySelector('.keyboard-nav-box');
    if (!navBox) return;

    // Pega todas as teclas brancas (Tab, Enter, etc.)
    const keys = navBox.querySelectorAll('.key');
    if (keys.length === 0) return;

    const firstKey = keys[0];
    const lastKey = keys[keys.length - 1];
    const cartBtn = document.getElementById('btnCarrinho');

    // 1. FOCUS TRAP (Prender o foco dentro da caixa)
    navBox.addEventListener('keydown', (e) => {
        // Se a tecla pressionada foi TAB
        if (e.key === 'Tab') {
            // Se for Shift + Tab e estiver no primeiro item
            if (e.shiftKey && document.activeElement === firstKey) {
                e.preventDefault();
                lastKey.focus(); // Vai para o último
            } 
            // Se for apenas Tab e estiver no último item
            else if (!e.shiftKey && document.activeElement === lastKey) {
                e.preventDefault();
                firstKey.focus(); // Volta para o primeiro
            }
        }

        // 2. Lógica para ENTER e SPACE nas teclas brancas
        if (e.key === 'Enter' || e.key === ' ') {
            // Verifica se o elemento ativo é uma das teclas
            if (e.target.classList.contains('key')) {
                e.preventDefault();
                const keyText = e.target.innerText.trim();
                executarAcao(keyText);
            }
        }
        
        // 3. Lógica para ESC (Fechar modal)
        if (e.key === 'Escape') {
            console.log('🔹 [Ação] Modal fechado via Esc.');
            alert("Simulação: Modal de carrinho foi fechado.");
            // Remove o foco da caixa e devolve para o botão de origem
            document.activeElement.blur();
        }
    });

    // Função que dispara as ações de acordo com a tecla selecionada
    function executarAcao(comando) {
        console.log(`✅ Comando executado: ${comando}`);
        
        switch(comando) {
            case 'Tab':
                alert("Simulação: Você navegou para o próximo elemento interativo.");
                break;
            case 'Shift+Tab':
                alert("Simulação: Você navegou para o elemento anterior.");
                break;
            case 'Enter':
                alert("Simulação: Clicando no botão do carrinho!");
                if(cartBtn) cartBtn.click(); // Simula um clique no carrinho
                break;
            case 'Esc':
                alert("Simulação: Modal fechado.");
                break;
            case 'Space':
                alert("Simulação: Checkbox marcado/desmarcado.");
                break;
            default:
                console.log("Nenhuma ação mapeada para:", comando);
        }
    }

    // Ação extra: Botão carrinho que abre o "Modal" e prende o foco
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("🚀 CARRINHO ABERTO! Para fechar, vá até a caixa de Navegação, selecione a tecla 'Esc' com Enter, ou aperte a tecla Esc no seu teclado.");
            
            // Simula a abertura de um modal devolvendo o foco para a caixa de atalhos
            setTimeout(() => {
                firstKey.focus(); 
            }, 100);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.keyboard-nav-box');
    if (!box) return;

    const keys = box.querySelectorAll('.key');
    if (!keys.length) return;

    const first = keys[0];
    const last = keys[keys.length - 1];

    // 1. FOCUS TRAP (Prender o foco dentro da caixa)
    box.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        }

        // 2. EXECUTAR AÇÃO (Enter ou Espaço na tecla selecionada)
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('key')) {
            e.preventDefault();
            const comando = e.target.innerText.trim();
            
            switch(comando) {
                case 'Tab': console.log('Ação: Avançar'); break;
                case 'Shift+Tab': console.log('Ação: Voltar'); break;
                case 'Enter': 
                    alert('Simulação: Botão ativado!');
                    // Exemplo: document.querySelector('.btn-cart').click();
                    break;
                case 'Esc': 
                    alert('Simulação: Modal fechado.');
                    document.activeElement.blur(); // Tira o foco da caixa
                    break;
                case 'Space': alert('Simulação: Checkbox marcado.'); break;
            }
        }

        // 3. TECLA ESC FÍSICA (Sair da caixa)
        if (e.key === 'Escape') {
            alert('Simulação: Modal fechado via tecla Esc.');
            document.activeElement.blur();
        }
    });
});
