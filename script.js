// Script para funcionalidades interativas da página provisória

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeito de digitação no título
    const heroTitle = document.querySelector('.hero h2');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let index = 0;
    function typeWriter() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Iniciar animação após um pequeno delay
    setTimeout(typeWriter, 500);

    // Adicionar efeito de partículas no background
    createParticles();

    // Adicionar contador de visitas (simulado)
    updateVisitCounter();

    // Adicionar funcionalidade de copiar email
    setupEmailCopy();

    // Adicionar animações de scroll
    setupScrollAnimations();
});

function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
    `;

    hero.appendChild(particlesContainer);

    // Criar partículas
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;

            particlesContainer.appendChild(particle);

            // Remover partícula após animação
            setTimeout(() => {
                particle.remove();
            }, 7000);
        }, i * 200);
    }
}

// Adicionar keyframes para animação das partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

function updateVisitCounter() {
    // Simular contador de visitas
    const counter = document.createElement('div');
    counter.className = 'visit-counter';
    counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        z-index: 100;
        backdrop-filter: blur(10px);
    `;

    // Simular número de visitas
    const visits = Math.floor(Math.random() * 1000) + 100;
    counter.textContent = `👀 ${visits} visitas`;
    document.body.appendChild(counter);
}

function setupEmailCopy() {
    const emailLink = document.querySelector('.social-link.email');

    emailLink.addEventListener('click', function(e) {
        e.preventDefault();

        const email = 'coletivoimagemviva@gmail.com';

        // Copiar email para clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copiado!');
            });
        } else {
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Email copiado!');
        }

        // Abrir email client após copiar
        setTimeout(() => {
            window.location.href = `mailto:${email}`;
        }, 500);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4CAF50;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: notificationSlide 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remover notificação após 2 segundos
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Adicionar keyframes para animações de notificação
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes notificationSlide {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes notificationSlideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(notificationStyle);

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.about, .social-links, .credits');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Adicionar efeito de hover nos links sociais
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Adicionar som de hover (opcional - desabilitado por padrão)
function playHoverSound() {
    // Desabilitado para não ser intrusivo
    // Pode ser habilitado se necessário
}

// Smooth scroll para links internos (se houver)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
