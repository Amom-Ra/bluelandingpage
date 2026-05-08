/**
 * BLUE | Core Logic & Interactivity
 * Versión Unificada: Temas + Animaciones + UI
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GESTIÓN DE TEMAS (SONARQUBE COMPLIANT)
    // ==========================================
    const themes = ['dark', 'corporate', /*'hacker', */  'ocean',/* 'solar',*/ 'monochrome'];
    const labels = { 
        dark: 'Dark Tech', 
        corporate: 'Corporate Blue', // El tema oficial del manual
        // hacker: 'Terminal Green',
        ocean: 'Deep Ocean', 
        // solar: 'Solar Light', 
        monochrome: 'Monochrome'
    };
    
    const htmlElement = document.documentElement;
    const themeBtn = document.getElementById('themeSwitcher'); // Asegúrate de que el botón en HTML tenga id="themeSwitcher"
    const logo = document.getElementById('mainLogo');

    // Recuperar el tema guardado o usar 'dark' por defecto
    let currentTheme = localStorage.getItem('blue-theme') || 'dark';
    let currentThemeIndex = themes.indexOf(currentTheme) !== -1 ? themes.indexOf(currentTheme) : 0;
    
    // Aplicar el tema al cargar la página
    applyTheme(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            currentTheme = themes[currentThemeIndex];
            
            applyTheme(currentTheme);
            localStorage.setItem('blue-theme', currentTheme);
        });
    }

    function applyTheme(themeName) {
        if (!htmlElement) return;

        // Uso seguro de dataset en lugar de setAttribute
        htmlElement.dataset.theme = themeName;
        
        // Actualizar el texto del botón
        if (themeBtn) {
            const labelSpan = themeBtn.querySelector('.theme-label');
            if (labelSpan) {
                labelSpan.textContent = labels[themeName];
            } else {
                themeBtn.textContent = 'TEMA: ' + labels[themeName].toUpperCase();
            }
        }

        // Gestión inteligente del Logo (Blanco vs Color)
        if (logo) {
            const lightThemes = ['corporate', 'solar', 'monochrome'];
            if (lightThemes.includes(themeName)) {
                logo.style.filter = 'none';
            } else {
                logo.style.filter = 'brightness(0) invert(1)';
            }
        }
    }


    // ==========================================
    // 2. ANIMACIONES DE ENTRADA (SCROLL REVEAL)
    // ==========================================
    const revealOptions = {
        threshold: 0.15, 
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.fade-in').forEach(section => {
        revealObserver.observe(section);
    });


    // ==========================================
    // 3. CONTROLADOR DEL NEWSLETTER
    // ==========================================
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const emailInput = newsletterForm.querySelector('input');
            const submitBtn = newsletterForm.querySelector('button');
            
            if (submitBtn && emailInput) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Procesando...';

                setTimeout(() => {
                    submitBtn.textContent = '¡Suscrito!';
                    submitBtn.style.backgroundColor = '#00c853'; 
                    submitBtn.style.color = '#ffffff';
                    
                    emailInput.value = '';
                    emailInput.disabled = true;
                }, 1200); 
            }
        });
    }
});

// ==========================================
// 4. EFECTO DINÁMICO EN EL NAVBAR (SCROLL)
// ==========================================
// Queda fuera del DOMContentLoaded para inicializarse más rápido
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 80) {
            navbar.style.padding = '0.8rem 5%';
            // Validar si el tema es claro u oscuro para la sombra podría ser un buen detalle, 
            // pero mantenemos tu sombra original:
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)'; 
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.boxShadow = 'none';
        }
    }
});