// Script de Funcionalidades do Mercado Verde
(function() {
    "use strict";

    // Saudação Dinâmica
    // Exibe uma mensagem de saudação de acordo com a hora do dia
    function exibirSaudacao() {
        const greetDiv = document.getElementById('greeting');
        if (!greetDiv) return;

        const hora = new Date().getHours();
        let saudacao;

        if (hora >= 6 && hora < 12) {
            saudacao = "Bom dia";
        } else if (hora >= 12 && hora < 18) {
            saudacao = "Boa tarde";
        } else {
            saudacao = "Boa noite";
        }
        greetDiv.textContent = `${saudacao}! Seja bem-vindo(a) ao Mercado Verde.`;
    }
    exibirSaudacao();

    // Carousel Principal (Slides Automáticos)
    // Alterna entre os slides a cada 5 segundos
    function iniciarCarrossel() {
        const slides = document.querySelectorAll('.main-carousel .slide');
        if (slides.length === 0) return;

        let indiceAtual = 0;
        setInterval(() => {
            slides[indiceAtual].classList.remove('active');
            indiceAtual = (indiceAtual + 1) % slides.length;
            slides[indiceAtual].classList.add('active');
        }, 5000);
    }
    iniciarCarrossel();

    // Controles de Quantidade nos Produtos
    // Configura os botões para aumentar e diminuir a quantidade
    function configurarControlesQuantidade() {
        // Botões para diminuir a quantidade
        const btnMinusList = document.querySelectorAll('.qty-minus');
        btnMinusList.forEach(btn => {
            btn.addEventListener('click', () => {
                const qtyInput = btn.nextElementSibling;
                if (qtyInput) {
                    let currentVal = parseInt(qtyInput.value);
                    if (currentVal > 1) {
                        qtyInput.value = currentVal - 1;
                    }
                }
            });
        });

        // Botões para aumentar a quantidade
        const btnPlusList = document.querySelectorAll('.qty-plus');
        btnPlusList.forEach(btn => {
            btn.addEventListener('click', () => {
                const qtyInput = btn.previousElementSibling;
                if (qtyInput) {
                    let currentVal = parseInt(qtyInput.value);
                    qtyInput.value = currentVal + 1;
                }
            });
        });
    }
    configurarControlesQuantidade();

    // Simulação de Adição ao Carrinho
    // Incrementa o contador de produtos no carrinho ao clicar no botão
    let cartCount = 0;
    function configurarBotoesCarrinho() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const cartCountSpan = document.getElementById('cart-count');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Obtém o card do produto e a quantidade desejada
                const card = button.closest('.product-card');
                let quantidade = 1;
                if (card) {
                    const qtyInput = card.querySelector('.qty-input');
                    if (qtyInput) {
                        quantidade = parseInt(qtyInput.value) || 1;
                    }
                }
                cartCount += quantidade;
                if (cartCountSpan) {
                    cartCountSpan.textContent = cartCount;
                }
                alert("Produto adicionado ao carrinho!");
            });
        });
    }
    configurarBotoesCarrinho();

    // Toggle do Menu Mobile (Hamburger)
    // Alterna a exibição do menu de navegação no mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav ul');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Toggle do Dropdown "Shop" (Mobile)
    // Abre ou fecha o dropdown da seção "Shop" em telas menores que 768px
    const dropBtn = document.querySelector('.dropbtn');
    const dropdownItem = document.querySelector('.dropdown');
    if (dropBtn && dropdownItem) {
        dropBtn.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                dropdownItem.classList.toggle('open');
            }
        });
    }

    // Toggle do Campo de Busca no Mobile
    // Exibe ou oculta o campo de busca e foca no input quando aberto
    const searchToggle = document.getElementById('search-toggle');
    const mobileSearch = document.getElementById('mobile-search');
    if (searchToggle && mobileSearch) {
        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileSearch.classList.toggle('show');
            if (mobileSearch.classList.contains('show')) {
                const inputSearch = mobileSearch.querySelector('input');
                if (inputSearch) {
                    inputSearch.focus();
                }
            }
        });
    }

    // Validação do Formulário de Agendamento (Serviços)
    // Valida os campos obrigatórios e define restrição de data
    function configurarValidacaoFormulario() {
        const form = document.getElementById('agendamento-form');
        if (!form) return;

        // Define a data mínima para agendamento (data atual)
        const inputData = document.getElementById('data');
        if (inputData) {
            const hoje = new Date().toISOString().split('T')[0];
            inputData.setAttribute('min', hoje);
        }

        form.addEventListener('submit', function(event) {
            const nome = document.getElementById('nome').value.trim();
            const endereco = document.getElementById('endereco').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const genero = document.getElementById('genero').value;
            const servicoEscolhido = form.querySelector('input[name="servico"]:checked');
            const dataAg = document.getElementById('data').value;
            const horaAg = document.getElementById('hora').value;

            // Se houver erro na validação, previne o envio do formulário
            if (!nome || !endereco || !cpf || !telefone || !email || !genero || !servicoEscolhido || !dataAg || !horaAg) {
                event.preventDefault();
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            if (cpf.length !== 11 || isNaN(Number(cpf))) {
                event.preventDefault();
                alert("CPF inválido! Digite 11 dígitos numéricos.");
                return;
            }

            if (telefone.length < 10 || isNaN(Number(telefone))) {
                event.preventDefault();
                alert("Telefone inválido! Digite DDD + número (apenas dígitos).");
                return;
            }
            // Se todas as validações passarem, o formulário será enviado para o UseBasin sem interferência.
        });
    }
    configurarValidacaoFormulario();

})();