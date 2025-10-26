// Adicionamos um único 'ouvinte' que espera a página carregar completamente.
document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // CÓDIGO DO CARROSSEL (SÓ EXECUTA NA PÁGINA PRINCIPAL)
    // =======================================================
    const carouselTrack = document.querySelector('.carousel-track');
    // A verificação 'if (carouselTrack)' garante que este bloco só rode se o carrossel existir na página.
    if (carouselTrack) {
        const viewport = document.querySelector('.carousel-viewport');
        const prevBtn = document.querySelector('.arrow.left');
        const nextBtn = document.querySelector('.arrow.right');
        const dotsContainer = document.querySelector('.dots');
        const cards = Array.from(carouselTrack.children);

        const visibleCards = 3; // Ajuste se o número de cards visíveis mudar
        let currentIndex = 0;
        let cardSize = 0;
        let gapSize = 0;
        let totalPages = 0;

        function measure() {
            if (!cards.length) return;
            const cardRect = cards[0].getBoundingClientRect();
            cardSize = Math.round(cardRect.width);
            const trackStyle = getComputedStyle(carouselTrack);
            gapSize = parseInt(trackStyle.gap) || 0;
            totalPages = Math.ceil(cards.length / visibleCards);
        }

        function createDots() {
            dotsContainer.innerHTML = "";
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                if (i === 0) dot.classList.add("active");
                dot.addEventListener("click", () => {
                    currentIndex = i * visibleCards;
                    update();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function update() {
            const step = cardSize + gapSize;
            const maxIndex = cards.length - visibleCards;
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex > maxIndex) currentIndex = maxIndex;

            const offset = -currentIndex * step;
            carouselTrack.style.transform = `translateX(${offset}px)`;

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;

            const activePage = Math.floor(currentIndex / visibleCards);
            document.querySelectorAll(".dot").forEach((dot, i) => {
                dot.classList.toggle("active", i === activePage);
            });
        }

        nextBtn.addEventListener("click", () => {
            currentIndex += visibleCards;
            update();
        });

        prevBtn.addEventListener("click", () => {
            currentIndex -= visibleCards;
            update();
        });

        window.addEventListener("resize", () => {
            measure();
            update();
        });

        // Inicialização
        measure();
        createDots();
        update();
    }


    // =======================================================
    // CÓDIGO DO TEMA DARK/LIGHT (SÓ EXECUTA NA PÁGINA PRINCIPAL)
    // =======================================================
    const themeToggle = document.getElementById("theme-toggle");
    // A verificação 'if (themeToggle)' garante que este bloco só rode se o botão de tema existir.
    if (themeToggle) {
        const body = document.body;

        if (localStorage.getItem("theme") === "light") {
            body.classList.add("light-mode");
            themeToggle.textContent = "☾";
        }

        themeToggle.addEventListener("click", () => {
            body.classList.toggle("light-mode");

            if (body.classList.contains("light-mode")) {
                themeToggle.textContent = "☾";
                localStorage.setItem("theme", "light");
            } else {
                themeToggle.textContent = "☼";
                localStorage.setItem("theme", "dark");
            }
        });
    }


    // =======================================================
// CÓDIGO DO FORMULÁRIO DE LOGIN (SÓ EXECUTA NA PÁGINA DE LOGIN)
// =======================================================
const loginForm = document.querySelector('.login-box form');
if (loginForm) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === '' || password === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // --- LÓGICA DE VALIDAÇÃO DE USUÁRIO ---
        let user;

        // Se o email for o do admin, cria um objeto de usuário admin
        if (email.toLowerCase() === 'admin@nextlevel.com' && password === 'admin123') { // Senha simples para teste
            user = {
                name: 'Admin',
                role: 'admin'
            };
            alert('Bem-vindo, Admin!');
        } else {
            // Para qualquer outro email, cria um objeto de usuário comum
            user = {
                name: 'Usuário Comum', // Poderia vir do formulário de cadastro
                role: 'user'
            };
            alert('Login realizado com sucesso!');
        }

        // Salva os dados do usuário no localStorage para "lembrar" dele em outras páginas
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Redireciona para a página inicial após o login
        window.location.href = 'index.html';
    });
}
    // =======================================================
// CÓDIGO DO FORMULÁRIO DE CADASTRO (SÓ EXECUTA NA PÁGINA DE CADASTRO)
// =======================================================
const cadastroForm = document.querySelector('.cadastro-form');
// A verificação 'if (cadastroForm)' garante que este bloco só rode na página de cadastro.
if (cadastroForm) {
    // Popula os dias do mês
    const daySelect = document.getElementById('dob-day');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    cadastroForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio do formulário

        // Pegando os elementos do formulário
        const email = document.getElementById('email');
        const fullName = document.getElementById('fullname');
        const day = document.getElementById('dob-day');
        const month = document.getElementById('dob-month');
        const year = document.getElementById('dob-year');
        const password = document.getElementById('password');

        // Validações simples
        if (email.value.trim() === '') {
            alert('Por favor, informe seu e-mail.');
            email.focus();
            return;
        }
        if (fullName.value.trim() === '') {
            alert('Por favor, informe seu nome completo.');
            fullName.focus();
            return;
        }
        if (day.value === '' || month.value === '' || year.value.trim() === '') {
            alert('Por favor, preencha sua data de nascimento completa.');
            year.focus();
            return;
        }
        if (password.value.trim().length < 8) {
            alert('A senha deve ter no mínimo 8 dígitos.');
            password.focus();
            return;
        }
        // Aqui você poderia adicionar uma validação mais complexa para a senha (regex)

        alert('Conta criada com sucesso! (Isso é uma simulação)');
        // window.location.href = 'login.html'; // Redireciona para o login após o sucesso
    });
}

 // ===================================================================
// NOVA LÓGICA DE RENDERIZAÇÃO DO CABEÇALHO (COM CLIQUE)
// ===================================================================
const userSection = document.getElementById('user-section');
if (userSection) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // SE NÃO HOUVER USUÁRIO LOGADO
    if (!currentUser) {
        userSection.innerHTML = `
            <a href="login.html">Iniciar Sessão</a>
            <a href="carrinho.html" class="icon">🛒</a>
            <a href="listaDesejos.html" class="icon">❤</i>
            <i class="icon theme-toggle" id="theme-toggle">☼</i>
        `;
    } 
    // SE HOUVER USUÁRIO LOGADO
    else {
        let finalHTML = '';

        // Se for ADMIN, cria DOIS menus
        if (currentUser.role === 'admin') {
            finalHTML = `
                <div class="menu-trigger" id="admin-menu-trigger">
                    <span>Painel Admin</span>
                    <div class="profile-dropdown" id="admin-menu-dropdown">
                        <ul>
                            <li><a href="gerenciamentoJogos.html">Gerenciamento de Jogos</a></li>
                            <li><a href="gerenciamentoEmpresas.html">Gerenciamento de Empresas</a></li>
                            <li><a href="#">Gerenciamento de Usuário</a></li>
                            <li><a href="#">Gerenciamento de Vendas</a></li>
                            <li><a href="moderacaoAvaliacao.html">Moderação de Avaliações</a></li>
                        </ul>
                    </div>
                </div>

                <div class="menu-trigger" id="user-menu-trigger">
                    <i class="icon">👤</i>
                    <div class="profile-dropdown" id="user-menu-dropdown">
                        <ul>
                            <li><a href="minhaBiblioteca.html">Minha Biblioteca</a></li>
                            <li><a href="#">Histórico de Compras</a></li>
                            <li><a href="listaDesejos.html">Lista de Desejos</a></li>
                            <li><a href="#">Meus Dados</a></li>
                            <li><a href="#" id="logout-button">Sair</a></li>
                        </ul>
                    </div>
                </div>

                <a href="carrinho.html" class="icon">🛒</a>
                <a href="listaDesejos.html" class="icon">❤</i>
                <i class="icon theme-toggle" id="theme-toggle">☼</i>
            `;
        } 
        // Se for USUÁRIO COMUM, cria SÓ UM menu
        else {
            finalHTML = `
                 <div class="menu-trigger" id="user-menu-trigger">
                    <i class="icon">👤</i>
                    <div class="profile-dropdown" id="user-menu-dropdown">
                        <ul>
                            <li><a href="minhaBiblioteca.html">Minha Biblioteca</a></li>
                            <li><a href="#">Histórico de Compras</a></li>
                            <li><a href="listaDesejos.html">Lista de Desejos</a></li>
                            <li><a href="#">Meus Dados</a></li>
                            <li><a href="#" id="logout-button">Sair</a></li>
                        </ul>
                    </div>
                </div>
                <a href="carrinho.html" class="icon">🛒</a>
                <a href="listaDesejos.html" class="icon">❤</i>
                <i class="icon theme-toggle" id="theme-toggle">☼</i>
            `;
        }
        userSection.innerHTML = finalHTML;
    }

    // --- LÓGICA PARA CONTROLAR OS MENUS COM CLIQUE ---
    const allTriggers = document.querySelectorAll('.menu-trigger');

    allTriggers.forEach(trigger => {
        const dropdown = trigger.querySelector('.profile-dropdown');
        if (dropdown) {
            trigger.addEventListener('click', (event) => {
                // Impede que o clique no trigger feche o menu imediatamente
                event.stopPropagation();
                
                // Fecha outros menus que possam estar abertos
                document.querySelectorAll('.profile-dropdown.show').forEach(openDropdown => {
                    if (openDropdown !== dropdown) {
                        openDropdown.classList.remove('show');
                    }
                });

                // Alterna a classe 'show' do menu clicado
                dropdown.classList.toggle('show');
            });
        }
    });

    // --- Lógica para fechar o menu ao clicar fora ---
    window.addEventListener('click', () => {
        document.querySelectorAll('.profile-dropdown.show').forEach(openDropdown => {
            openDropdown.classList.remove('show');
        });
    });


    // --- Lógica de Logout (permanece a mesma) ---
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }

    // --- Recarrega a lógica do Theme Toggle (permanece a mesma) ---
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        const body = document.body;
        if (localStorage.getItem("theme") === "light") {
            body.classList.add("light-mode");
            themeToggle.textContent = "☾";
        }
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            if (body.classList.contains("light-mode")) {
                themeToggle.textContent = "☾";
                localStorage.setItem("theme", "light");
            } else {
                themeToggle.textContent = "☼";
                localStorage.setItem("theme", "dark");
            }
        });
    }
}
// ===================================================================
// LÓGICA DA PÁGINA DO CARRINHO
// ===================================================================
const cartContainer = document.getElementById('cart-items-container');
if (cartContainer) {
    const subtotalElement = document.getElementById('subtotal');
    let cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const renderCart = () => {
        cartContainer.innerHTML = ''; // Limpa o carrinho antes de renderizar
        let subtotal = 0;

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            subtotalElement.textContent = '$0.00';
            return;
        }

        cartItems.forEach(item => {
            const itemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="item-details">
                        <h3>${item.nome}</h3>
                        <span class="item-price">$${item.preco.toFixed(2)}</span>
                    </div>
                    <div class="item-actions">
                        <button class="remove-btn">Remover</button>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += itemHTML;
            subtotal += item.preco;
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        addRemoveListeners();
    };

    const addRemoveListeners = () => {
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemElement = event.target.closest('.cart-item');
                const itemId = parseInt(itemElement.dataset.id);
                
                // Remove o item do array
                cartItems = cartItems.filter(item => item.id !== itemId);
                // Atualiza o localStorage
                localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
                // Re-renderiza o carrinho
                renderCart();
            });
        });
    };
    
    renderCart(); // Renderiza o carrinho ao carregar a página
}
// ===================================================================
// LÓGICA DA PÁGINA DE PAGAMENTO
// ===================================================================
const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio do formulário

        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvc = document.getElementById('cvc').value;

        // Validação simples (verificar se campos essenciais não estão vazios)
        if (!cardNumber || !cardName || !expiryDate || !cvc) {
            alert('Por favor, preencha todos os dados do cartão.');
            return;
        }

        // Validação básica do formato do cartão (simples)
        if (cardNumber.replace(/\s/g, '').length < 16) {
            alert('Número de cartão inválido.');
            return;
        }

        // SIMULAÇÃO SEGURA: NUNCA salve o número completo do cartão!
        // Vamos salvar apenas os últimos 4 dígitos.
        const last4digits = cardNumber.slice(-4);
        const paymentInfo = {
            method: 'Cartão de Crédito',
            cardholder: cardName,
            last4: last4digits
        };

        // Salva as informações "seguras" no localStorage para a página de revisão
        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

        // Redireciona para a página de revisão do pedido
        window.location.href = 'revisar-pedido.html';
    });
}
// ===================================================================
// LÓGICA DA PÁGINA DE REVISÃO DO PEDIDO
// ===================================================================
const finalizeButton = document.getElementById('finalize-order-btn');
if (finalizeButton) {
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));

    // Se não houver itens ou pagamento, redireciona de volta para o carrinho
    if (cartItems.length === 0 || !paymentInfo) {
        window.location.href = 'carrinho.html';
    } else {
        const reviewItemsList = document.getElementById('review-items-list');
        const reviewSubtotal = document.getElementById('review-subtotal');
        const reviewTotal = document.getElementById('review-total');
        const reviewCardLast4 = document.getElementById('review-card-last4');

        let subtotal = 0;
        reviewItemsList.innerHTML = '';

        // Renderiza a lista de itens
        cartItems.forEach(item => {
            reviewItemsList.innerHTML += `
                <div class="cart-item">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="item-details">
                        <h3>${item.nome}</h3>
                        <span class="item-price">$${item.preco.toFixed(2)}</span>
                    </div>
                </div>
            `;
            subtotal += item.preco;
        });

        // Atualiza os totais e informações de pagamento
        reviewSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        reviewTotal.textContent = `$${subtotal.toFixed(2)}`; // Total é o mesmo do subtotal nesta simulação
        reviewCardLast4.textContent = paymentInfo.last4;

        // Adiciona o evento ao botão de finalizar
        finalizeButton.addEventListener('click', () => {
            alert('Pedido finalizado com sucesso! Obrigado por comprar na NextLevel!');

            // Limpa o carrinho e as informações de pagamento
            localStorage.removeItem('shoppingCart');
            localStorage.removeItem('paymentInfo');

            // Redireciona para a página inicial
            window.location.href = 'index.html';
        });
    }
}
// ===================================================================
// LÓGICA DA PÁGINA DE DETALHES DO JOGO
// ===================================================================
const gameTitleElement = document.getElementById('game-title');
if (gameTitleElement) {
    //  Pega o ID do jogo da URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));

    //  Encontra o jogo no nosso "banco de dados"
    const gameData = gamesDB.find(game => game.id === gameId);

    if (gameData) {
        //  Preenche a página com os dados do jogo
        document.title = `${gameData.name} - NextLevel`; // Atualiza o título da aba
        gameTitleElement.textContent = gameData.name;
        document.getElementById('game-hero').style.backgroundImage = `url(${gameData.heroImage})`;
        document.getElementById('game-description').textContent = gameData.description;
        document.getElementById('game-price').textContent = `$${gameData.price.toFixed(2)}`;

    
        const minReqsList = document.getElementById('min-reqs');
        const recReqsList = document.getElementById('rec-reqs');
        minReqsList.innerHTML = Object.entries(gameData.system_reqs.min).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('');
        recReqsList.innerHTML = Object.entries(gameData.system_reqs.rec).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('');


        const detailsBox = document.getElementById('game-details');
        detailsBox.innerHTML = Object.entries(gameData.details).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('');

        // Preenche os comentários de usuários
        const reviewsContainer = document.getElementById('user-reviews-container');
        reviewsContainer.innerHTML = gameData.reviews.map(review => `
            <div class="user-review-card">
                <div class="review-header">
                    <strong>${review.user}</strong>
                    <div class="stars">
                        ${'★'.repeat(review.rating)}<span class="unfilled">${'☆'.repeat(5 - review.rating)}</span>
                    </div>
                </div>
                <p>"${review.comment}"</p>
                <div class="review-actions">
                    <i>👍 ${review.likes}</i> 
                    <i>👎 ${review.dislikes}</i>
                </div>
            </div>
        `).join('');

        //  Lógica do botão "Comprar" (Adicionar ao Carrinho)
        const addToCartButton = document.getElementById('add-to-cart-btn');
        addToCartButton.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            
            // Verifica se o item já está no carrinho
            if (cart.some(item => item.id === gameData.id)) {
                alert(`${gameData.name} já está no seu carrinho!`);
            } else {
                // Adiciona o item ao carrinho
                cart.push({
                    id: gameData.id,
                    nome: gameData.name,
                    preco: gameData.price,
                    imagem: 'https://via.placeholder.com/100x50/888/FFFFFF?text=Game' // Imagem para o carrinho
                });
                localStorage.setItem('shoppingCart', JSON.stringify(cart));
                alert(`${gameData.name} foi adicionado ao carrinho!`);
            }
        });

    } else {
        // Se o ID do jogo não for encontrado
        document.querySelector('.main-container').innerHTML = '<h1>Jogo não encontrado!</h1>';
    }



    // Script para a pagina de Gerenciamento de Jogos

    document.addEventListener('DOMContentLoaded', function() {
    
    // --- DADOS SIMULADOS (Banco de Dados de Jogos) ---
    // Usamos os dados da sua tabela para popular a lista.
    let jogos = [
        { id: 1, titulo: "The Legend of Zelda: Breath of the Wild", preco: 59.99, desenvolvedora: "Nintendo", categoria: "Aventura", ano: 2017, descricao: "Um jogo épico de mundo aberto." },
        { id: 2, titulo: "Minecraft", preco: 26.95, desenvolvedora: "Mojang", categoria: "Sandbox", ano: 2011, descricao: "Construa o que quiser." },
        { id: 3, titulo: "Grand Theft Auto V", preco: 59.99, desenvolvedora: "Rockstar Games", categoria: "Ação", ano: 2013, descricao: "Aventura e ação no mundo moderno." },
        { id: 4, titulo: "Red Dead Redemption 2", preco: 59.99, desenvolvedora: "Rockstar Games", categoria: "Ação", ano: 2018, descricao: "Faroeste épico." },
        { id: 5, titulo: "Call of Duty: Modern Warfare", preco: 59.99, desenvolvedora: "Infinity Ward", categoria: "Tiro", ano: 2019, descricao: "Jogo de tiro em primeira pessoa." },
        { id: 6, titulo: "Fallout 4", preco: 29.99, desenvolvedora: "Bethesda Game Studios", categoria: "RPG", ano: 2015, descricao: "Mundo aberto pós-apocalíptico." },
        { id: 7, titulo: "Portal 2", preco: 9.99, desenvolvedora: "Valve", categoria: "Puzzle", ano: 2011, descricao: "Quebra-cabeça em primeira pessoa." },
        { id: 8, titulo: "Stardew Valley", preco: 14.99, desenvolvedora: "ConcernedApe", categoria: "Simulação", ano: 2016, descricao: "Simulação de fazenda." },
        { id: 9, titulo: "Among Us", preco: 4.99, desenvolvedora: "Innersloth", categoria: "Social", ano: 2018, descricao: "Dedução social." },
        { id: 10, titulo: "Cyberpunk 2077", preco: 59.99, desenvolvedora: "CD Projekt Red", categoria: "RPG", ano: 2020, descricao: "Mundo aberto de RPG sombrio." },
    ];

    // --- SELETORES DE DOM ---
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const formCadastro = document.getElementById('cadastro-jogo-form');
    const inputBusca = document.getElementById('input-busca');
    const selectCategoria = document.getElementById('select-categoria');
    const selectClassificar = document.getElementById('select-classificar');

    // --- FUNÇÕES DE RENDERIZAÇÃO E FILTRAGEM ---

    function renderizarTabela(listaDeJogos) {
        tabelaCorpo.innerHTML = ''; // Limpa a tabela
        
        if (listaDeJogos.length === 0) {
            tabelaCorpo.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum jogo encontrado.</td></tr>';
            return;
        }

        listaDeJogos.forEach(jogo => {
            const linha = document.createElement('tr');
            linha.dataset.id = jogo.id;
            
            // Note o uso da classe 'preco-tabela' para o Verde Neon
            linha.innerHTML = `
                <td>${jogo.titulo}</td>
                <td class="preco-tabela">$ ${jogo.preco.toFixed(2)}</td>
                <td>${jogo.desenvolvedora}</td>
                <td>
                    <i class="fas fa-edit action-icon icon-edit" data-action="edit" data-id="${jogo.id}"></i>
                </td>
                <td>
                    <i class="fas fa-trash-alt action-icon icon-delete" data-action="delete" data-id="${jogo.id}"></i>
                </td>
            `;
            tabelaCorpo.appendChild(linha);
        });

        adicionarListenersAcoes(); // Re-adiciona os listeners aos novos ícones
    }
    
    // --- LÓGICA DE FILTRAGEM E CLASSIFICAÇÃO ---
    
    function aplicarFiltrosEClassificacao() {
        let listaFiltrada = [...jogos]; // Cria uma cópia para manipulação

        // 1. FILTRAGEM POR BUSCA
        const termoBusca = inputBusca.value.toLowerCase();
        if (termoBusca) {
            listaFiltrada = listaFiltrada.filter(jogo => 
                jogo.titulo.toLowerCase().includes(termoBusca) || 
                jogo.desenvolvedora.toLowerCase().includes(termoBusca)
            );
        }
        
        // 2. FILTRAGEM POR CATEGORIA (Exemplo - se quiser implementar)
        // const categoriaSelecionada = selectCategoria.value;
        // if (categoriaSelecionada) { /* ... */ }

        // 3. CLASSIFICAÇÃO
        const criterio = selectClassificar.value;
        if (criterio === 'preco-desc') {
            listaFiltrada.sort((a, b) => b.preco - a.preco);
        } else if (criterio === 'titulo-asc') {
             listaFiltrada.sort((a, b) => a.titulo.localeCompare(b.titulo));
        }

        renderizarTabela(listaFiltrada);
    }
    
    // --- LÓGICA CRUD (EDIÇÃO/EXCLUSÃO SIMULADA) ---

    function adicionarListenersAcoes() {
        document.querySelectorAll('.action-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const acao = e.target.dataset.action;
                const jogo = jogos.find(j => j.id === id);

                if (acao === 'delete') {
                    if (confirm(`Tem certeza que deseja EXCLUIR o jogo "${jogo.titulo}"?`)) {
                        // SIMULAÇÃO DE EXCLUSÃO: Remove o jogo do array
                        jogos = jogos.filter(j => j.id !== id);
                        renderizarTabela(jogos); // Recarrega a lista
                        alert('Jogo excluído com sucesso! (Simulação)');
                    }
                } else if (acao === 'edit') {
                    // SIMULAÇÃO DE EDIÇÃO: No mundo real, levaria a um formulário pré-preenchido
                    alert(`Iniciando edição de: ${jogo.titulo}. (Simulação)`);
                }
            });
        });
    }

    // --- LÓGICA DE CADASTRO (RF05) ---

    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de criação de um novo ID
        const novoId = jogos.length > 0 ? Math.max(...jogos.map(j => j.id)) + 1 : 1;
        
        // Coleta de dados do formulário
        const novoJogo = {
            id: novoId,
            titulo: document.getElementById('titulo').value,
            preco: parseFloat(document.getElementById('preco').value),
            desenvolvedora: document.getElementById('desenvolvedora').value,
            categoria: document.getElementById('categoria').value,
            ano: document.getElementById('ano').value,
            descricao: document.getElementById('descricao').value,
        };

        jogos.push(novoJogo); // Adiciona o novo jogo à lista
        renderizarTabela(jogos); // Recarrega a tabela
        formCadastro.reset(); // Limpa o formulário

        alert(`Jogo "${novoJogo.titulo}" cadastrado com sucesso! ID: ${novoJogo.id} (Simulação)`);
    });

    // --- INICIALIZAÇÃO ---
    inputBusca.addEventListener('input', aplicarFiltrosEClassificacao);
    selectClassificar.addEventListener('change', aplicarFiltrosEClassificacao);

    // Renderiza a tabela ao carregar a página
    renderizarTabela(jogos);
});
    

    // Script para pagina de Gerenciamento de Empresas

    // --- DADOS SIMULADOS DE EMPRESAS ---
let empresas = [
    { id: 101, nome: "Nintendo", localizacao: "Quioto, Japão", contato: "info@nintendo.jp", jogos: 1 },
    { id: 102, nome: "Mojang", localizacao: "Estocolmo, Suécia", contato: "contact@mojang.com", jogos: 1 },
    { id: 103, nome: "Rockstar Games", localizacao: "Nova Iorque, Estados Unidos", contato: "press@rockstargames.com", jogos: 2 },
    { id: 104, nome: "FromSoftware", localizacao: "Tóquio, Japão", contato: "info@fromsoftware.jp", jogos: 2 },
    { id: 105, nome: "Infinity Ward", localizacao: "Encino, Estados Unidos", contato: "hr@infinityward.com", jogos: 1 },
    { id: 106, nome: "Valve", localizacao: "Bellevue, Estados Unidos", contato: "info@valvesoftware.com", jogos: 2 },
    { id: 107, nome: "Dumativa", localizacao: "Rio de Janeiro, Brasil", contato: "contato@dumativa.com.br", jogos: 2 },
    { id: 108, nome: "CD Projekt Red", localizacao: "Polônia, Varsóvia", contato: "contact@cdprojektred.com", jogos: 2 },
];

// --- SELETORES ESPECÍFICOS PARA EMPRESAS ---
const tabelaCorpoEmpresas = document.getElementById('tabela-corpo-empresas');
const formCadastroEmpresa = document.getElementById('cadastro-empresa-form');
const inputBuscaEmpresa = document.getElementById('input-busca-empresa');
const selectClassificarEmpresa = document.getElementById('select-classificar-empresa');


// --- FUNÇÃO DE RENDERIZAÇÃO DE EMPRESAS ---

function renderizarTabelaEmpresas(listaDeEmpresas) {
    tabelaCorpoEmpresas.innerHTML = '';
    
    if (listaDeEmpresas.length === 0) {
        tabelaCorpoEmpresas.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhuma empresa encontrada.</td></tr>';
        return;
    }

    listaDeEmpresas.forEach(empresa => {
        const linha = document.createElement('tr');
        linha.dataset.id = empresa.id;
        
        // Colunas: Nome, Localização, Jogos, Editar, Excluir
        linha.innerHTML = `
            <td>${empresa.nome}</td>
            <td>${empresa.localizacao}</td>
            <td class="jogos-catalogo">${String(empresa.jogos).padStart(2, '0')}</td>
            <td>
                <i class="fas fa-edit action-icon icon-edit" data-action="edit" data-id="${empresa.id}"></i>
            </td>
            <td>
                <i class="fas fa-trash-alt action-icon icon-delete" data-action="delete" data-id="${empresa.id}"></i>
            </td>
        `;
        tabelaCorpoEmpresas.appendChild(linha);
    });

    adicionarListenersEmpresas(); // Re-adiciona os listeners
}

// --- LÓGICA DE FILTRAGEM E CLASSIFICAÇÃO DE EMPRESAS ---

function aplicarFiltrosEmpresas() {
    let listaFiltrada = [...empresas];

    // 1. FILTRAGEM POR BUSCA (Nome)
    const termoBusca = inputBuscaEmpresa.value.toLowerCase();
    if (termoBusca) {
        listaFiltrada = listaFiltrada.filter(empresa => 
            empresa.nome.toLowerCase().includes(termoBusca)
        );
    }
    
    // 2. CLASSIFICAÇÃO
    const criterio = selectClassificarEmpresa.value;
    if (criterio === 'jogos-desc') {
        listaFiltrada.sort((a, b) => b.jogos - a.jogos);
    } else if (criterio === 'pais-asc') {
         listaFiltrada.sort((a, b) => a.localizacao.localeCompare(b.localizacao));
    } else if (criterio === 'nome-asc') {
         listaFiltrada.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    renderizarTabelaEmpresas(listaFiltrada);
}

// --- LÓGICA CRUD (Ações na Tabela) ---

function adicionarListenersEmpresas() {
    document.querySelectorAll('#tabela-corpo-empresas .action-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const acao = e.target.dataset.action;
            const empresa = empresas.find(j => j.id === id);

            if (acao === 'delete') {
                if (confirm(`Tem certeza que deseja EXCLUIR a empresa "${empresa.nome}"?`)) {
                    empresas = empresas.filter(e => e.id !== id);
                    renderizarTabelaEmpresas(empresas);
                    alert('Empresa excluída com sucesso! (Simulação)');
                }
            } else if (acao === 'edit') {
                alert(`Iniciando edição da empresa: ${empresa.nome}. (Simulação)`);
            }
        });
    });
}

// --- LÓGICA DE CADASTRO DE EMPRESA ---

if (formCadastroEmpresa) {
    formCadastroEmpresa.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const novoId = empresas.length > 0 ? Math.max(...empresas.map(e => e.id)) + 1 : 101;
        
        const novaEmpresa = {
            id: novoId,
            nome: document.getElementById('nome').value,
            localizacao: `${document.getElementById('cidade').value}, ${document.getElementById('pais').value}`,
            contato: document.getElementById('contato').value,
            jogos: 0, // Inicia com zero jogos
        };

        empresas.push(novaEmpresa);
        renderizarTabelaEmpresas(empresas);
        formCadastroEmpresa.reset();

        alert(`Empresa "${novaEmpresa.nome}" cadastrada com sucesso! (Simulação)`);
    });
}


// --- INICIALIZAÇÃO DA TELA DE EMPRESAS (Garantir que rode só nesta página) ---

if (tabelaCorpoEmpresas) {
    inputBuscaEmpresa.addEventListener('input', aplicarFiltrosEmpresas);
    selectClassificarEmpresa.addEventListener('change', aplicarFiltrosEmpresas);

    // Inicializa a tabela
    renderizarTabelaEmpresas(empresas);
}


    //Script para a pagina de Moderação e Avaliação.

    // --- DADOS SIMULADOS DE AVALIAÇÕES PENDENTES ---
let avaliacoes = [
    { id: 1, jogo: "Red Dead Redemption II", usuario: "User1233", nota: 4, comentario: "Achei o jogo bastante divertido com o gráfico magnífico! (Spoiler: O final é triste).", status: 'pendente' },
    { id: 2, jogo: "Red Dead Redemption II", usuario: "User456", nota: 2, comentario: "Não gostei muito da dinâmica do jogo. Missões muito longas.", status: 'pendente' },
    { id: 3, jogo: "Cyberpunk 2077", usuario: "NetRunner", nota: 5, comentario: "A melhor imersão cyberpunk que já tive! Gráficos incríveis.", status: 'pendente' },
    { id: 4, jogo: "Fallout 4", usuario: "VaultDweller", nota: 3, comentario: "Bom jogo, mas senti falta da profundidade dos jogos antigos.", status: 'pendente' },
];

// --- SELETORES ESPECÍFICOS PARA MODERAÇÃO ---
const tabelaCorpoAvaliacoes = document.getElementById('tabela-corpo-avaliacoes');
const selectJogo = document.getElementById('select-jogo');
const selectClassificarAval = document.getElementById('select-classificar-aval');
const inputBuscaConteudo = document.getElementById('input-busca-conteudo');


// --- FUNÇÃO DE RENDERIZAÇÃO DE AVALIAÇÕES ---

function renderizarTabelaAvaliacoes(listaDeAvaliacoes) {
    tabelaCorpoAvaliacoes.innerHTML = ''; 
    
    if (listaDeAvaliacoes.length === 0) {
        tabelaCorpoAvaliacoes.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhuma avaliação pendente.</td></tr>';
        return;
    }

    listaDeAvaliacoes.forEach(avaliacao => {
        const linha = document.createElement('tr');
        linha.dataset.id = avaliacao.id;
        
        const estrelasHtml = `
            <span class="rating-stars">
                ${'★'.repeat(avaliacao.nota)}<span class="unfilled">${'★'.repeat(5 - avaliacao.nota)}</span>
            </span>
        `;
        
        linha.innerHTML = `
            <td>${avaliacao.jogo}</td>
            <td>${avaliacao.usuario}</td>
            <td>${estrelasHtml}</td>
            <td>${avaliacao.comentario}</td>
            <td>
                <i class="fas fa-check-square moderacao-action-icon icon-aprovar" data-action="aprovar" data-id="${avaliacao.id}"></i>
            </td>
            <td>
                <i class="fas fa-trash-alt moderacao-action-icon icon-remover" data-action="remover" data-id="${avaliacao.id}"></i>
            </td>
        `;
        tabelaCorpoAvaliacoes.appendChild(linha);
    });

    adicionarListenersModeracao(); // Re-adiciona os listeners
}

// --- LÓGICA DE AÇÕES DE MODERAÇÃO ---

function adicionarListenersModeracao() {
    document.querySelectorAll('.moderacao-action-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const acao = e.target.dataset.action;
            const avaliacao = avaliacoes.find(a => a.id === id);

            if (acao === 'aprovar') {
                if (confirm(`Aprovar a avaliação de ${avaliacao.usuario} para ${avaliacao.jogo}?`)) {
                    // Simulação: Remove da lista e atualiza
                    avaliacoes = avaliacoes.filter(a => a.id !== id);
                    renderizarTabelaAvaliacoes(avaliacoes);
                    alert('Avaliação aprovada e publicada. (Simulação)');
                }
            } else if (acao === 'remover') {
                if (confirm(`Tem certeza que deseja REMOVER a avaliação de ${avaliacao.usuario}?`)) {
                    // Simulação: Remove da lista e atualiza
                    avaliacoes = avaliacoes.filter(a => a.id !== id);
                    renderizarTabelaAvaliacoes(avaliacoes);
                    alert('Avaliação removida com sucesso. (Simulação)');
                }
            }
        });
    });
}

// --- LÓGICA DE FILTRAGEM (Busca no Conteúdo) ---

function aplicarFiltrosAvaliacao() {
    let listaFiltrada = [...avaliacoes];

    // FILTRAGEM POR CONTEÚDO
    const termoBusca = inputBuscaConteudo.value.toLowerCase();
    if (termoBusca) {
        listaFiltrada = listaFiltrada.filter(avaliacao => 
            avaliacao.comentario.toLowerCase().includes(termoBusca) ||
            avaliacao.usuario.toLowerCase().includes(termoBusca)
        );
    }
    
    // Outros filtros (Jogo, Classificar por) seriam implementados aqui.

    renderizarTabelaAvaliacoes(listaFiltrada);
}


// --- INICIALIZAÇÃO DA TELA DE MODERAÇÃO ---

if (tabelaCorpoAvaliacoes) {
    inputBuscaConteudo.addEventListener('input', aplicarFiltrosAvaliacao);
    // selectJogo.addEventListener('change', aplicarFiltrosAvaliacao); // Se o select existir
    // selectClassificarAval.addEventListener('change', aplicarFiltrosAvaliacao);

    // Renderiza a tabela ao carregar a página
    renderizarTabelaAvaliacoes(avaliacoes);
}


    // script para a Pagina de Minha Biblioteca

document.addEventListener('DOMContentLoaded', function() {
    
    // --- DADOS SIMULADOS DE JOGOS NA BIBLIOTECA ---
    // 'status': 0 = Não instalado (Aparece 'Instalar'), 1 = Instalado (Aparece 'Jogar' e 'Desinstalar')
    let jogosBiblioteca = [
        { id: 1, titulo: "Resident Evil 7: Biohazard", genero: "Horror", empresa: "Capcom", status: 1, bordaColor: "linear-gradient(145deg, #B53F44, #800000)" },
        { id: 2, titulo: "Cyberpunk 2077", genero: "RPG", empresa: "CD Projekt Red", status: 0, bordaColor: "linear-gradient(145deg, #FFD700, #B8860B)" },
        { id: 3, titulo: "Among Us", genero: "Social", empresa: "Innersloth", status: 0, bordaColor: "linear-gradient(145deg, #3498db, #2980b9)" },
        { id: 4, titulo: "Minecraft", genero: "Sandbox", empresa: "Mojang", status: 1, bordaColor: "linear-gradient(145deg, #2ecc71, #27ae60)" },
        { id: 5, titulo: "Grand Theft Auto V", genero: "Ação", empresa: "Rockstar Games", status: 1, bordaColor: "linear-gradient(145deg, #9b59b6, #8e44ad)" },
        { id: 6, titulo: "Portal 2", genero: "Puzzle", empresa: "Valve", status: 0, bordaColor: "linear-gradient(145deg, #f1c40f, #f39c12)" },
        { id: 7, titulo: "The Legend of Zelda Breath of the Wild", genero: "Aventura", empresa: "Nintendo", status: 0, bordaColor: "linear-gradient(145deg, #e74c3c, #c0392b)" },
        { id: 8, titulo: "Half-Life: Alyx", genero: "VR", empresa: "Valve", status: 0, bordaColor: "linear-gradient(145deg, #1abc9c, #16a085)" },
        { id: 9, titulo: "Call of Duty: Modern Warfare", genero: "Tiro", empresa: "Infinity Ward", status: 0, bordaColor: "linear-gradient(145deg, #7f8c8d, #34495e)" },
        { id: 10, titulo: "Stardew Valley", genero: "Simulação", empresa: "ConcernedApe", status: 0, bordaColor: "linear-gradient(145deg, #95a5a6, #7f8c8d)" },
        { id: 11, titulo: "The Witcher 3: Wild Hunt", genero: "RPG", empresa: "CD Projekt Red", status: 0, bordaColor: "linear-gradient(145deg, #d35400, #e67e22)" },
        { id: 12, titulo: "Red Dead Redemption II", genero: "Ação", empresa: "Rockstar Games", status: 1, bordaColor: "linear-gradient(145deg, #c0392b, #e74c3c)" },
    ];

    // --- SELETORES DE DOM ---
    const gridContainer = document.getElementById('biblioteca-grid');
    const inputBusca = document.getElementById('input-busca-biblioteca');
    const selectGenero = document.getElementById('select-genero');
    const selectEmpresa = document.getElementById('select-empresa');
    
    // --- FUNÇÃO DE RENDERIZAÇÃO ---
    function renderizarBiblioteca(lista) {
        gridContainer.innerHTML = '';
        if (lista.length === 0) {
            gridContainer.innerHTML = '<p style="text-align:center;">Nenhum jogo encontrado na sua biblioteca.</p>';
            return;
        }

        lista.forEach(jogo => {
            let acoesHtml = '';
            
            if (jogo.status === 1) {
                // Jogo Instalado: Botões Jogar e Desinstalar
                acoesHtml = `
                    <button class="btn-biblioteca btn-jogar" data-id="${jogo.id}" data-action="jogar">Jogar</button>
                    <button class="btn-biblioteca btn-desinstalar" data-id="${jogo.id}" data-action="desinstalar">Desinstalar</button>
                `;
            } else {
                // Jogo Não Instalado: Botão Instalar
                acoesHtml = `
                    <button class="btn-biblioteca btn-instalar" data-id="${jogo.id}" data-action="instalar">Instalar</button>
                `;
            }

            const cardHtml = `
                <div class="jogo-card" style="background: ${jogo.bordaColor};" data-id="${jogo.id}">
                    <h2>${jogo.titulo}</h2>
                    <div class="status-actions">
                        ${acoesHtml}
                    </div>
                </div>
            `;
            gridContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
        
        adicionarListenersAcoes(); // Reatacha os listeners aos novos botões
    }

    // --- LÓGICA DE AÇÕES (JOGAR, INSTALAR, DESINSTALAR) ---
    function adicionarListenersAcoes() {
        document.querySelectorAll('.btn-biblioteca').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const acao = e.target.dataset.action;
                const jogo = jogosBiblioteca.find(j => j.id === id);

                if (!jogo) return;

                if (acao === 'jogar') {
                    alert(`Iniciando ${jogo.titulo}... (Simulação)`);
                } else if (acao === 'instalar') {
                    if (confirm(`Deseja iniciar a instalação de ${jogo.titulo}?`)) {
                        // SIMULAÇÃO: Muda o status para instalado
                        jogo.status = 1; 
                        alert(`${jogo.titulo} instalado com sucesso!`);
                        renderizarBiblioteca(jogosBiblioteca); // Atualiza o grid
                    }
                } else if (acao === 'desinstalar') {
                    if (confirm(`Tem certeza que deseja desinstalar ${jogo.titulo}?`)) {
                        // SIMULAÇÃO: Muda o status para não instalado
                        jogo.status = 0; 
                        alert(`${jogo.titulo} desinstalado.`);
                        renderizarBiblioteca(jogosBiblioteca); // Atualiza o grid
                    }
                }
            });
        });
    }
    
    // --- LÓGICA DE FILTRAGEM ---
    function popularFiltros() {
        const generos = [...new Set(jogosBiblioteca.map(j => j.genero))];
        const empresas = [...new Set(jogosBiblioteca.map(j => j.empresa))];

        generos.forEach(g => {
            selectGenero.innerHTML += `<option value="${g}">${g}</option>`;
        });
        empresas.forEach(e => {
            selectEmpresa.innerHTML += `<option value="${e}">${e}</option>`;
        });
    }

    function aplicarFiltros() {
        let listaFiltrada = [...jogosBiblioteca];
        const termoBusca = inputBusca.value.toLowerCase();
        const generoSelecionado = selectGenero.value;
        const empresaSelecionada = selectEmpresa.value;

        // Filtro por busca
        if (termoBusca) {
            listaFiltrada = listaFiltrada.filter(j => j.titulo.toLowerCase().includes(termoBusca));
        }

        // Filtro por gênero
        if (generoSelecionado) {
            listaFiltrada = listaFiltrada.filter(j => j.genero === generoSelecionado);
        }

        // Filtro por empresa
        if (empresaSelecionada) {
            listaFiltrada = listaFiltrada.filter(j => j.empresa === empresaSelecionada);
        }

        renderizarBiblioteca(listaFiltrada);
    }


    // --- INICIALIZAÇÃO ---
    popularFiltros();
    renderizarBiblioteca(jogosBiblioteca);
    
    // Adiciona os listeners de filtro
    inputBusca.addEventListener('input', aplicarFiltros);
    selectGenero.addEventListener('change', aplicarFiltros);
    selectEmpresa.addEventListener('change', aplicarFiltros);

});
}
});