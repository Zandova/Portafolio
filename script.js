let sliderIndex = 0;

const proyectos = {
    xboxTimer: {
        titulo: "Xbox Timer 🎮",
        descripcion: "Xbox Timer es una aplicación de escritorio que funciona de forma local para controlar el tiempo de uso en una sala de videojuegos. Permite gestionar el tiempo asignado a cada estación, calcular las tarifas correspondientes y generar automáticamente un archivo PDF con el resumen de ganancias totales y el historial de registros, facilitando así el control administrativo del negocio sin depender de una conexión a internet.",
        tech: ["Html", "Css", "JavaScript"],
        imagenes: ["./img/xboxApp.png", "./img/xboxApp2.png"],
        features: ["Control de tiempo...", "Generación de PDF..."],
        github: "https://github.com/Zandova/xbox-timer.git",
        demo: "#"
    },
    criptosApp: {
        titulo: "CriptosApp 🎮",
        descripcion: "CriptosApp es una aplicación de seguimiento de criptomonedas en tiempo real, desarrollada con React y TypeScript. Permite buscar y filtrar criptomonedas, consultar precios actualizados mediante la API de CoinGecko, y navegar entre vistas usando React Router DOM. La interfaz es completamente responsiva, está construida con Tailwind CSS v4 y usa Vite como herramienta de desarrollo para un flujo de trabajo más rápido.",
        tech: ["React", "Vite", "Typescript"],
        imagenes: ["./img/CriptoApp.png"],
        features: ["sdfasd"],
        github: "https://github.com/Zandova/CriptosApp",
        demo: "#"
    },
    yesiNails: {
        titulo: "Yesi Nails 💅",
        descripcion: "Yesi Nails es una aplicación web para la gestión de citas de un salón de belleza, pensada para simplificar el proceso de reservación tanto para el negocio como para las clientas. Las citas se agendan desde la web y se confirman mediante WhatsApp, agilizando la comunicación sin necesidad de llamadas. Toda la información de las citas, junto con datos adicionales de las clientas, queda registrada de forma organizada, permitiendo un mejor control del negocio. El backend está construido con Node.js y MongoDB, mientras que la interfaz fue desarrollada con React.",
        tech: ["Html", "Css", "JavaScript"],
        imagenes: ["./img/YesiNailsApp.png"],
        features: ["sdfasd"],
        github: "https://github.com/Zandova/YesiNails",
        demo: "#"
    },
    gimnasioMulti: {
    titulo: "Gimnasio Multi 💪",
    descripcion: "GimnasioMulti es una aplicación web de administración diseñada para digitalizar la operación diaria de un gimnasio. Cuenta con un dashboard central con sidebar oscuro desde donde se gestionan socios, membresías, pagos y accesos, todo con un sistema de roles que limita qué puede ver y hacer cada tipo de usuario (por ejemplo, un administrador tiene control total, mientras que recepción solo accede a las funciones operativas del día a día). El backend está construido con Spring Boot y Java, con una arquitectura pensada para escalar y mantener la lógica de negocio separada del frontend, mientras que la interfaz fue desarrollada a la medida en HTML, CSS y JavaScript, priorizando una experiencia clara y rápida para el personal del gimnasio.",
    tech: ["React", "TypeScript"],
    imagenes: ["./img/GimnasioMultiApp.png"],
    features: [
        "Dashboard con control de acceso por roles",
        "Gestión de socios y membresías",
        "Registro y seguimiento de pagos",
        "Notificaciones en tiempo real vía WebSockets"
    ],
    github: "https://github.com/Zandova/GimnasioMulti",
    demo: "#"
    }
};

function abrirModal(id) {
    const proyecto = proyectos[id];
    if (!proyecto) return;

    document.getElementById('modalTitle').textContent = proyecto.titulo;
    document.getElementById('modalDescription').textContent = proyecto.descripcion;

    document.getElementById('modalTech').innerHTML = 
        proyecto.tech.map(item => `<span>${item}</span>`).join('');

    document.getElementById('modalFeaturesList').innerHTML = 
        proyecto.features.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('');

    document.getElementById('sliderTrack').innerHTML = 
        proyecto.imagenes.map(src => `<img src="${src}" alt="">`).join('');

    document.querySelector('.btn-github').href = proyecto.github;
    document.querySelector('.btn-demo').href = proyecto.demo;

    document.getElementById('miModal').classList.add('active');
    sliderIndex = 0;
    actualizarSlider();
}

function cerrarModal() {
    document.getElementById('miModal').classList.remove('active');
}

function moverSlider(direccion) {
    const track = document.getElementById();
    const totalImgs = track.children.length;
    sliderIndex = (sliderIndex + direccion + totalImgs) % totalImgs;
    actualizarSlider();
}

function actualizarSlider() {
    const track = document.getElementById('sliderTrack');
    const dotsContainer = document.getElementById('sliderDots');
    const totalImgs = track.children.length;

    track.style.transform = `translateX(-${sliderIndex * 100}%)`;

    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalImgs; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === sliderIndex) dot.classList.add('active');
        dot.onclick = () => { sliderIndex = i; actualizarSlider(); };
        dotsContainer.appendChild(dot);
    }
}

// Cerrar al hacer click fuera de la caja
document.getElementById('miModal').addEventListener('click', function(e) {
    if (e.target === this) cerrarModal();
});

