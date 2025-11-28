// JavaScript educativo: interacción mínima y comentada para estudiantes

// 1. Declaración de variables globales (para que las funciones globales las usen)
let profileModal;
let modalName;
let modalBio;

// MEJORA 9: Variables de Audio Simplificadas
let backgroundAudio;
let isPlaying = false;
document.addEventListener('DOMContentLoaded', function(){
    // Obtención de elementos esenciales
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav-list');
    const showHintBtn = document.getElementById('showHint');
    const form = document.getElementById('contactForm');
    const navLinks = document.querySelectorAll('.nav-link'); // MEJORA 4

    // CRÍTICO: Obtención de elementos del Modal de Perfil (Mejora 1)
    profileModal = document.getElementById('profileModal');
    modalName = document.getElementById('modalName');
    modalBio = document.getElementById('modalBio');

    // MEJORA 9: Audio
    
// MEJORA 9: Audio (Simplificado)
    backgroundAudio = document.getElementById('backgroundAudio');
    const audioToggle = document.getElementById('audioToggle');

    // Establecer un volumen por defecto (entre 0 y 1)
    backgroundAudio.volume = 0.5;

    // Tema: persistir elección en localStorage (Mejora 3)
    const currentTheme = localStorage.getItem('animelab-theme');
    if (currentTheme === 'light') body.classList.add('light');
    themeBtn.textContent = body.classList.contains('light') ? '☀️' : '🌙'; 

    themeBtn.addEventListener('click', function(){
        body.classList.toggle('light');
        const isLight = body.classList.contains('light');
        localStorage.setItem('animelab-theme', isLight ? 'light' : 'dark');
        themeBtn.textContent = isLight ? '☀️' : '🌙';
    });

    // Navegación en móvil (Mejora 4)
    navToggle.addEventListener('click', function(){
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('show');
    });

    // Cierre automático de menú móvil (Mejora 4)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('show')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('show');
            }
        });
    });

    // Lightbox funciones (existente)
    window.openLightbox = function(src){
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightboxImg');
        img.src = src;
        lightbox.style.display = 'flex';
    };
    window.closeLightbox = function(e){
        if (e.target.id === 'lightbox') {
            document.getElementById('lightbox').style.display = 'none';
            document.getElementById('lightboxImg').src = '';
        }
    };

    // Ejemplo de validación de formulario simple (existente)
    form.addEventListener('submit', function(ev){
        ev.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) {
            alert('Completa todos los campos antes de enviar.');
            return;
        }
        alert('¡Gracias, ' + name + '! Tu mensaje ha sido recibido (simulado).');
        form.reset();
        // MEJORA 7: Limpiar clases de validación después del envío exitoso
        document.querySelectorAll('.form input, .form textarea').forEach(el => {
            el.classList.remove('valid', 'invalid');
        });
    });
    
    // MEJORA 7: Validación de campos en tiempo real
    document.querySelectorAll('.form input, .form textarea').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() === '') {
                // Si está vacío, no mostrar ni valid ni invalid (HTML lo manejará)
                this.classList.remove('valid', 'invalid');
            } else if (this.checkValidity()) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        });
    });


    if (showHintBtn) {
        showHintBtn.addEventListener('click', function(){
            const hint = document.createElement('div');
            hint.className = 'hint';
            hint.textContent = 'Pista: Revisa css/style.css para encontrar variables y layout. Revisa js/main.js para ver eventos.';
            document.querySelector('.hero').appendChild(hint);
            setTimeout(()=> hint.remove(), 6000);
        });
    }
    // MEJORA 8: Pie de Página Dinámico (Año actual)
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    

   // ----------------------------------------------------
    // MEJORA 9: Control de Audio (Simplificado: Solo Toggle)
    // ----------------------------------------------------
    
    // Reproducir / Pausar
    audioToggle.addEventListener('click', function() {
        if (backgroundAudio.paused) {
            backgroundAudio.play().then(() => {
                isPlaying = true;
                audioToggle.textContent = '⏸ Música OFF'; // Texto de Pausa
            }).catch(error => {
                console.error("Error al intentar reproducir audio:", error);
                alert("El navegador podría haber bloqueado la reproducción automática. Por favor, asegúrate de que el archivo de audio (.opus o .mp3) está en la carpeta 'music'.");
            });
        } else {
            backgroundAudio.pause();
            isPlaying = false;
            audioToggle.textContent = '🔊 Música ON'; // Texto de Reproducir
        }
    });

    // MEJORA 10: Mostrar/Ocultar Créditos
    const aboutSection = document.getElementById('about');
    const aboutLink = document.getElementById('aboutLink');
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        aboutSection.classList.add('active');
    });

}); // CIERRE DE DOMContentLoaded


// ----------------------------------------------------
// Mejora 1: Funciones de Modal de Perfil (Globales)
// ----------------------------------------------------

window.closeProfileModal = function(e){
    if (!e || e.target.id === 'profileModal' || e.target.classList.contains('modal-close-btn')) {
      profileModal.classList.remove('show');
      setTimeout(() => {
        profileModal.style.display = 'none';
      }, 300); 
    }
};

window.showProfile = function(name){
    const bio = {
        'Shaka': 'Shaka de Virgo — Caballero Dorado. Habilidad principal: Tesoro del Cielo.', 
        'Shisui': 'Shisui Uchiha — Ninja de Konoha. Habilidad principal: Genjutsu Kotoamatsukami.',
        'Luke': 'Luke Skywalker — Maestro Jedi. Habilidad principal: Manipulación de la Fuerza y uso del sable de luz.',
        'Goku': 'Goku — saiyajin protector de la Tierra. Habilidad principal: KAMEHAMEHA.', 
    };
    const profileText = bio[name] || 'Perfil no encontrado. Información no disponible.';
    
    if (profileModal) {
        modalName.textContent = name;
        modalBio.textContent = profileText;
        profileModal.style.display = 'flex';
        setTimeout(() => {
            profileModal.classList.add('show');
        }, 10);
    }
};