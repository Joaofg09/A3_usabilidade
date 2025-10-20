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
            <i class="icon">❤</i>
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
                            <li><a href="#">Gerenciamento de Jogos</a></li>
                            <li><a href="#">Gerenciamento de Empresas</a></li>
                            <li><a href="#">Gerenciamento de Usuário</a></li>
                            <li><a href="#">Gerenciamento de Vendas</a></li>
                            <li><a href="#">Moderação de Avaliações</a></li>
                        </ul>
                    </div>
                </div>

                <div class="menu-trigger" id="user-menu-trigger">
                    <i class="icon">👤</i>
                    <div class="profile-dropdown" id="user-menu-dropdown">
                        <ul>
                            <li><a href="#">Minha Biblioteca</a></li>
                            <li><a href="#">Histórico de Compras</a></li>
                            <li><a href="#">Lista de Desejos</a></li>
                            <li><a href="#">Meus Dados</a></li>
                            <li><a href="#" id="logout-button">Sair</a></li>
                        </ul>
                    </div>
                </div>

                <a href="carrinho.html" class="icon">🛒</a>
                <i class="icon">❤</i>
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
                            <li><a href="#">Minha Biblioteca</a></li>
                            <li><a href="#">Histórico de Compras</a></li>
                            <li><a href="#">Lista de Desejos</a></li>
                            <li><a href="#">Meus Dados</a></li>
                            <li><a href="#" id="logout-button">Sair</a></li>
                        </ul>
                    </div>
                </div>
                <a href="carrinho.html" class="icon">🛒</a>
                <i class="icon">❤</i>
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
}
});