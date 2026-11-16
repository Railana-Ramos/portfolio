"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Alternar entre Tema Claro e Tema Escuro
    // ==========================================
    // Pego o botão de tema lá do HTML usando querySelector e tipando como HTMLButtonElement
    const themeToggleBtn = document.querySelector("#themeToggleBtn");
    // Como o padrão agora é o dark mode, o botão já inicia exibindo o ícone para mudar para o claro
    if (themeToggleBtn && document.body.classList.contains("dark-mode")) {
        themeToggleBtn.textContent = "☀️ Tema";
    }
    // Adiciono um evento de clique no botão
    themeToggleBtn === null || themeToggleBtn === void 0 ? void 0 : themeToggleBtn.addEventListener("click", () => {
        // Dou um toggle na classe 'dark-mode' do body para alternar os temas
        document.body.classList.toggle("dark-mode");
        // Mudo o texto/ícone do botão dependendo se o tema escuro está ativado ou não
        if (document.body.classList.contains("dark-mode")) {
            themeToggleBtn.textContent = "☀️ Tema";
        }
        else {
            themeToggleBtn.textContent = "🌙 Tema";
        }
    });
    // ==========================================
    // 2. Abrir e Fechar o Modal dos Projetos
    // ==========================================
    // Seleciono o modal de projetos pelo ID do HTML
    const modal = document.getElementById("projectModal");
    // Faço uma checagem se o modal realmente existe na página antes de rodar o código
    if (modal) {
        // Seleciono os elementos de dentro do modal (imagem, título, descrição, links)
        const modalImage = document.getElementById("projectModalImage");
        const modalTech = document.getElementById("projectModalTech");
        const modalTitle = document.getElementById("projectModalTitle");
        const modalDescription = document.getElementById("projectModalDescription");
        const modalDetail = document.getElementById("projectModalDetail");
        const modalLive = document.getElementById("projectModalLive");
        const modalGithub = document.getElementById("projectModalGithub");
        const closeElements = modal.querySelectorAll("[data-modal-close]");
        // Guardo qual botão foi clicado para devolver o foco para ele quando fechar o modal
        let lastFocusedButton = null;
        // Função que preenche os dados do projeto no modal e o abre na tela
        function openModal(row, button) {
            const image = row.querySelector(".project-image img");
            const title = row.querySelector(".project-title");
            const description = row.querySelector(".project-description");
            const tech = row.querySelector(".project-tech");
            const detail = row.querySelector(".project-detail");
            // Insiro os dados do card dentro dos elementos do modal
            if (modalImage) {
                modalImage.src = image ? image.src : "";
                modalImage.alt = image ? image.alt : "";
            }
            if (modalTech)
                modalTech.textContent = tech ? tech.textContent.trim() : "";
            if (modalTitle)
                modalTitle.textContent = title ? title.textContent.trim() : "";
            if (modalDescription)
                modalDescription.textContent = description ? description.textContent.trim() : "";
            if (modalDetail)
                modalDetail.textContent = detail ? detail.textContent.trim() : "";
            // Pego os links dos datasets da linha do projeto
            if (modalLive)
                modalLive.href = row.dataset.liveUrl || "#";
            if (modalGithub)
                modalGithub.href = row.dataset.githubUrl || "#";
            lastFocusedButton = button;
            // Adiciono a classe 'is-open' e mudo os atributos de acessibilidade para mostrar o modal
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
        }
        // Função para fechar o modal e tirar a trava de scroll da página
        function closeModal() {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
            // Devolvo o foco para o botão que abriu
            if (lastFocusedButton) {
                lastFocusedButton.focus();
                lastFocusedButton = null;
            }
        }
        // Pego todos os botões de projeto e escuto o clique em cada um deles
        document.querySelectorAll(".project-button").forEach((button) => {
            button.addEventListener("click", () => {
                const row = button.closest(".project-row");
                if (row)
                    openModal(row, button);
            });
        });
        // Faço o botão de fechar (X) e o fundo escuro funcionarem para fechar o modal
        closeElements.forEach((el) => {
            el.addEventListener("click", closeModal);
        });
        // Fecho o modal também se o usuário apertar a tecla 'Escape' do teclado
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && modal.classList.contains("is-open")) {
                closeModal();
            }
        });
    }
    // ==========================================
    // 3. Botão de Rolar para o Topo (Scroll to Top)
    // ==========================================
    // Pego o botão flutuante de voltar ao topo
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        // Fico monitorando o scroll da página
        window.addEventListener("scroll", () => {
            // Se rolar mais de 420px para baixo, mostro o botão; senão, escondo
            if (window.scrollY > 420) {
                scrollTopBtn.classList.add("is-visible");
            }
            else {
                scrollTopBtn.classList.remove("is-visible");
            }
        });
        // Quando clico no botão, ele rola a página suavemente até o topo
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    // ==========================================
    // 4. Animações de Aparição (Intersection Observer)
    // ==========================================
    // Seleciono todos os elementos que têm a classe 'reveal'
    const revealEls = document.querySelectorAll(".reveal");
    // Verifico se o navegador suporta o IntersectionObserver
    if (revealEls.length && "IntersectionObserver" in window) {
        // Crio o observador para animar os elementos conforme aparecem na tela
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Se o elemento entrou na área visível da tela
                if (entry.isIntersecting) {
                    // Adiciono a classe 'in-view' para disparar a animação do CSS
                    entry.target.classList.add("in-view");
                    // Paro de observar esse elemento para economizar processamento
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
        // Mando o observador vigiar cada elemento .reveal da página
        revealEls.forEach((el) => {
            revealObserver.observe(el);
        });
    }
});
