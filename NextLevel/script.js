// Adicionamos um único 'ouvinte' que espera a página carregar completamente.
// Todo o nosso código vai dentro dele para garantir que os elementos HTML já existam.
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
// LÓGICA DE RENDERIZAÇÃO DO CABEÇALHO (SÓ EXECUTA NA PÁGINA PRINCIPAL)
// ===================================================================
const userSection = document.getElementById('user-section');
if (userSection) {

    // Tenta pegar o usuário salvo no localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Se não houver usuário logado
    if (!currentUser) {
        userSection.innerHTML = `
            <a href="login.html">Iniciar Sessão</a>
            <i class="icon">🛒</i>
            <i class="icon">❤</i>
            <i class="icon theme-toggle" id="theme-toggle">☼</i>
        `;
    } else {
        // Se houver um usuário logado

        let dropdownMenuHTML = '';

        // Monta o menu dropdown de acordo com a ROLE do usuário
        if (currentUser.role === 'admin') {
            dropdownMenuHTML = `
                <div class="profile-dropdown">
                    <ul>
                        <li><a href="#">Gerenciamento de Jogos</a></li>
                        <li><a href="#">Gerenciamento de Empresas</a></li>
                        <li><a href="#">Gerenciamento de Usuário</a></li>
                        <li><a href="#">Gerenciamento de Vendas e Chaves</a></li>
                        <li><a href="#">Moderação de Avaliações</a></li>
                    </ul>
                </div>
            `;
            userSection.innerHTML = `
                <div class="user-profile">
                    <span>Painel Admin</span>
                    <i class="icon">👤</i>
                    ${dropdownMenuHTML}
                </div>
                <i class="icon">🛒</i>
                <i class="icon">❤</i>
                <i class="icon theme-toggle" id="theme-toggle">☼</i>
            `;
        } else { // Se for 'user'
            dropdownMenuHTML = `
                <div class="profile-dropdown">
                    <ul>
                        <li><a href="#">Minha Biblioteca</a></li>
                        <li><a href="#">Histórico de Compras</a></li>
                        <li><a href="#">Lista de Desejos</a></li>
                        <li><a href="#">Meus Dados</a></li>
                        <li><a href="#" id="logout-button">Sair</a></li>
                    </ul>
                </div>
            `;
             userSection.innerHTML = `
                <div class="user-profile">
                    <i class="icon">👤</i>
                    ${dropdownMenuHTML}
                </div>
                <i class="icon">🛒</i>
                <i class="icon">❤</i>
                <i class="icon theme-toggle" id="theme-toggle">☼</i>
            `;
        }
    }

    // --- Lógica de Logout ---
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Previne que o link '#' mude a URL
            
            // Remove o usuário do localStorage
            localStorage.removeItem('currentUser');
            
            // Recarrega a página para atualizar o cabeçalho
            window.location.reload();
        });
    }

    // --- Recarrega a lógica do Theme Toggle, pois ele foi recriado ---
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
});