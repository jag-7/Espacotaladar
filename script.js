document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Imagens do carrossel
    const imagensHamburguer = {
        hamburguer1: ['1.jpg', '2.jpg', '3.jpg'],
        hamburguer2: ['1.jpg', '2.jpg', '3.jpg'],
        pao1: ['1.jpg', '2.jpg', '3.jpg'],
        pao2: ['1.jpg', '2.jpg', '3.jpg']
    };

    // Função para abrir imagem em tela cheia
    function abrirImagem(img) {
        const modal = document.querySelector('.modal-zoom');
        const modalImg = modal.querySelector('.modal-img');
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    }

    // Função para fechar imagem
    function fecharImagem() {
        const modal = document.querySelector('.modal-zoom');
        modal.style.display = 'none';
    }

    // Adicionar eventos de clique nas imagens
    const imagens = document.querySelectorAll('.img-lateral');
    imagens.forEach(img => {
        img.addEventListener('click', function() {
            abrirImagem(this);
        });
    });

    // Adicionar evento de clique no botão fechar
    const botaoFechar = document.querySelector('.modal-fechar');
    if (botaoFechar) {
        botaoFechar.addEventListener('click', fecharImagem);
    }

    // Adicionar evento de clique no modal para fechar
    const modal = document.querySelector('.modal-zoom');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                fecharImagem();
            }
        });
    }

    // Inicializar carrossel
    function initCarrossel() {
        const carrosseis = document.querySelectorAll('[data-carrossel]');
        
        carrosseis.forEach(carrossel => {
            const img = carrossel;
            const pontos = carrossel.parentElement.querySelectorAll('.carrossel-ponto');
            const hamburguerId = img.dataset.carrossel;
            let currentIndex = 0;
            let intervalId = null;

            // Função para atualizar imagem e pontos
            function atualizarCarrossel(index) {
                img.src = imagensHamburguer[hamburguerId][index];
                pontos.forEach((ponto, i) => {
                    if (i === index) {
                        ponto.classList.add('ativo');
                    } else {
                        ponto.classList.remove('ativo');
                    }
                });
                currentIndex = index;
            }

            // Clique nos pontos
            pontos.forEach((ponto, index) => {
                ponto.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evita que o clique propague para a imagem
                    atualizarCarrossel(index);
                });
            });

            // Troca automática
            intervalId = setInterval(() => {
                const nextIndex = (currentIndex + 1) % imagensHamburguer[hamburguerId].length;
                atualizarCarrossel(nextIndex);
            }, 3000);

            // Pausa o carrossel quando o mouse está sobre a imagem
            img.addEventListener('mouseenter', () => {
                if (intervalId) {
                    clearInterval(intervalId);
                }
            });

            // Retoma o carrossel quando o mouse sai da imagem
            img.addEventListener('mouseleave', () => {
                intervalId = setInterval(() => {
                    const nextIndex = (currentIndex + 1) % imagensHamburguer[hamburguerId].length;
                    atualizarCarrossel(nextIndex);
                }, 3000);
            });
        });
    }

    initCarrossel();

    // Sistema de pedidos
    let pedidoTotal = 0;
    const itensPedido = [];
    const totalValorDisplay = document.getElementById('total-valor');
    const finalizarBtn = document.getElementById('finalizar-pedido');
    const itensPedidoContainer = document.createElement('div');
    itensPedidoContainer.id = 'itens-pedido-container';
    itensPedidoContainer.className = 'itens-pedido-container';
    
    // Inserir o container de itens do pedido antes do total
    const totalContainer = document.getElementById('total-container');
    if (totalContainer) {
        totalContainer.parentNode.insertBefore(itensPedidoContainer, totalContainer);
    }

    // Function to parse price string like "800 Kz" to number 800
    function parsePrice(priceStr) {
        return Number(priceStr.replace(/[^\d]/g, ''));
    }

    // Update total display
    function updateTotal() {
        if (totalValorDisplay) {
            totalValorDisplay.textContent = pedidoTotal.toLocaleString('pt-BR') + ' Kz';
        }
    }
    
    // Formatar preço para exibição
    function formatPrice(price) {
        return price.toLocaleString('pt-BR') + ' Kz';
    }
    
    // Adicionar item ao pedido
    function adicionarAoPedido(nome, preco, quantidade) {
        // Verificar se o item já existe no pedido
        const itemIndex = itensPedido.findIndex(item => item.nome === nome);
        
        if (itemIndex !== -1) {
            // Atualizar quantidade e preço total do item existente
            itensPedido[itemIndex].quantidade += quantidade;
            itensPedido[itemIndex].total = itensPedido[itemIndex].preco * itensPedido[itemIndex].quantidade;
        } else {
            // Adicionar novo item
            itensPedido.push({
                nome: nome,
                preco: preco,
                quantidade: quantidade,
                total: preco * quantidade
            });
        }
        
        // Atualizar o pedido total
        pedidoTotal = itensPedido.reduce((sum, item) => sum + item.total, 0);
        updateTotal();
        
        // Atualizar a exibição dos itens
        renderizarItensPedido();
    }
    
    // Remover item do pedido
    function removerDoPedido(index) {
        // Subtrai o valor do item do total
        pedidoTotal -= itensPedido[index].total;
        
        // Remove o item do array
        itensPedido.splice(index, 1);
        
        // Atualiza o total e a exibição
        updateTotal();
        renderizarItensPedido();
    }
    
    // Renderizar itens do pedido
    function renderizarItensPedido() {
        if (!itensPedidoContainer) return;
        
        itensPedidoContainer.innerHTML = '';
        
        if (itensPedido.length === 0) {
            const mensagemVazia = document.createElement('p');
            mensagemVazia.className = 'pedido-vazio';
            mensagemVazia.textContent = 'Seu pedido está vazio.';
            itensPedidoContainer.appendChild(mensagemVazia);
            return;
        }
        
        itensPedido.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-pedido';
            
            itemElement.innerHTML = `
                <div class="item-pedido-info">
                    <span class="item-pedido-nome">${item.nome}</span>
                    <span class="item-pedido-quantidade">x${item.quantidade}</span>
                    <span class="item-pedido-preco">${formatPrice(item.total)}</span>
                </div>
                <button class="btn-remover" data-index="${index}">Remover</button>
            `;
            
            itensPedidoContainer.appendChild(itemElement);
        });
        
        // Adicionar eventos aos botões de remover
        document.querySelectorAll('.btn-remover').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removerDoPedido(index);
            });
        });
    }

    // Add event listeners to all "Adicionar ao Pedido" buttons
    const addButtons = document.querySelectorAll('.btn-adicionar');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the price element, title, and quantity input in the same card or parent container
            const container = button.closest('.card-hamburguer') || button.parentElement;
            if (!container) return;
            
            const priceElem = container.querySelector('.card-preco');
            const titleElem = container.querySelector('.card-titulo');
            const quantityInput = container.querySelector('.quantity-input');
            
            if (!priceElem || !titleElem) return;
            
            const nome = titleElem.textContent;
            const unitPrice = parsePrice(priceElem.dataset.basePrice || priceElem.textContent);
            const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            
            // Armazenar o preço base original como um atributo data
            if (!priceElem.dataset.basePrice) {
                priceElem.dataset.basePrice = priceElem.textContent;
            }
            
            // Adicionar ao pedido
            adicionarAoPedido(nome, unitPrice, quantity);
            
            // Feedback visual para o usuário
            button.textContent = 'Adicionado!';
            setTimeout(() => {
                button.textContent = 'Adicionar ao Pedido';
            }, 1000);
        });
    });

    // Adicionar event listeners para os inputs de quantidade
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        // Garantir valor mínimo
        input.addEventListener('change', () => {
            if (parseInt(input.value) < 1) {
                input.value = 1;
            }
        });
        
        // Atualizar preço exibido quando a quantidade muda
        input.addEventListener('input', () => {
            const card = input.closest('.card-hamburguer');
            if (!card) return;
            
            const priceElem = card.querySelector('.card-preco');
            if (!priceElem) return;
            
            // Obter o preço base
            let basePrice;
            if (priceElem.dataset.basePrice) {
                basePrice = parsePrice(priceElem.dataset.basePrice);
            } else {
                basePrice = parsePrice(priceElem.textContent);
                priceElem.dataset.basePrice = priceElem.textContent;
            }
            
            const quantity = parseInt(input.value) || 1;
            const newPrice = basePrice * quantity;
            
            // Atualizar o preço exibido
            priceElem.textContent = formatPrice(newPrice);
        });
    });

    // Adicionar quantidade aos botões de adicionar nas bebidas onde não existe input
    const bebidasButtons = document.querySelectorAll('.bebidas-container .btn-adicionar');
    bebidasButtons.forEach(button => {
        const container = button.closest('div');
        if (!container) return;
        
        // Criar input de quantidade e inserir antes do botão
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'quantity-input';
        quantityInput.min = 1;
        quantityInput.value = 1;
        quantityInput.style.width = '40px';
        quantityInput.style.marginBottom = '0.5rem';
        
        // Inserir o input antes do botão
        container.insertBefore(quantityInput, button);
    });

    // Handle finalize button click
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', () => {
            if (pedidoTotal === 0) {
                alert('Seu pedido está vazio.');
                return;
            }
            
            // Validar campos obrigatórios
            const nome = document.getElementById('nome').value.trim();
            const numero = document.getElementById('numero').value.trim();
            const localizacao = document.getElementById('localizacao').value.trim();
            
            if (!nome || !numero || !localizacao) {
                alert('Por favor, preencha todos os campos do formulário.');
                return;
            }
            
            // Formatar o resumo do pedido
            let resumo = 'Pedido finalizado!\n\n';
            resumo += `Nome: ${nome}\n`;
            resumo += `Número: ${numero}\n`;
            resumo += `Localização: ${localizacao}\n\n`;
            resumo += 'Itens:\n';
            
            itensPedido.forEach(item => {
                resumo += `- ${item.nome} (x${item.quantidade}): ${formatPrice(item.total)}\n`;
            });
            
            resumo += `\nTotal a pagar: ${formatPrice(pedidoTotal)}`;
            
            alert(resumo);
            
            // Limpar o pedido
            itensPedido.length = 0;
            pedidoTotal = 0;
            updateTotal();
            renderizarItensPedido();
            
            // Limpar campos do formulário
            document.getElementById('nome').value = '';
            document.getElementById('numero').value = '';
            document.getElementById('localizacao').value = '';
        });
    }

    // Inicializar a exibição dos itens do pedido
    renderizarItensPedido();
});