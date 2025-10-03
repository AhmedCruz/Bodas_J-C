document.addEventListener('DOMContentLoaded', function() {
    
    // --- MANEJO DEL FORMULARIO DE ASISTENCIA ---
    const form = document.getElementById("asistenciaForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const nombre = form.nombre.value.trim();
            const acompanantes = form.acompanantes.value.trim() || 0;
            const mensaje = `¡Hola! Confirmo mi asistencia a la boda de Jesús y Diana.\n\nNombre: ${nombre}\nInvitados: ${acompanantes}`;
            const whatsappURL = `https://wa.me/+5215632791109?text=${encodeURIComponent(mensaje)}`;
            window.open(whatsappURL, "_blank");
            alert("Gracias por confirmar. Serás redirigido a WhatsApp para enviar el mensaje.");
            form.reset();
        });
    }

    // --- CREAR PARTÍCULAS FLOTANTES ---
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        const particleCount = window.innerWidth < 768 ? 20 : 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `${Math.random() * 6}s`;
            particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
            particlesContainer.appendChild(particle);
        }
    }

    // --- MOSTRAR NAVEGACIÓN AL HACER SCROLL ---
    const navbar = document.getElementById('navbar');
    let ticking = false;
    function updateNavbarVisibility() {
        if (window.scrollY > window.innerHeight * 0.8) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbarVisibility);
            ticking = true;
        }
    });

    // --- CONTADOR REGRESIVO ---
    function updateCountdown() {
        const countdownElement = document.getElementById('contador');
        if (!countdownElement) return;
        const weddingDate = new Date('2025-12-06T17:00:00');
        const now = new Date();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownElement.innerHTML = '¡El gran día ha llegado! 🎉';
            clearInterval(countdownInterval);
        }
    }
    
    // --- SCROLL SUAVE PARA ENLACES DE NAVEGACIÓN ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- CONTROL DE MÚSICA DE FONDO (CON INTENTO DE AUTOPLAY) ---
    const music = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');

    function toggleMusic() {
        if (music.paused) {
            music.play();
            musicControl.textContent = '⏸️';
        } else {
            music.pause();
            musicControl.textContent = '▶️';
        }
    }

    // Se intenta reproducir la música automáticamente
    let playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Autoplay funcionó
            musicControl.textContent = '⏸️';
        }).catch(error => {
            // Autoplay fue bloqueado
            console.log("El autoplay fue bloqueado por el navegador.");
            musicControl.textContent = '▶️';
        });
    }
    
    // El botón siempre funcionará para pausar o continuar
    musicControl.addEventListener('click', toggleMusic);

    // --- INICIALIZACIÓN ---
    createParticles();
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
});