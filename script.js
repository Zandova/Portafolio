let sliderIndex = 0;

const proyectos = {
    xboxTimer: {
        titulo: "Xbox Timer 🎮",
        descripcion: "...",
        tech: ["Html", "Css", "JavaScript"],
        imagenes: ["./img/xboxApp.png", "./img/xboxApp2.png"],
        features: ["Control de tiempo...", "Generación de PDF..."],
        github: "https://github.com/Zandova/xbox-timer.git",
        demo: "#"
    },
    criptosApp: {
        titulo: "CriptosApp 🎮",
        descripcion: "...",
        tech: ["React", "Vite", "Typescript"],
        imagenes: ["./img/CriptoApp.png"],
        features: ["sdfasd"],
        github: "https://github.com/Zandova/CriptosApp",
        demo: "#"
    },
    yesiNails: {
        titulo: "Yesi Nails 💅",
        descripcion: "...",
        tech: ["Html", "Css", "JavaScript"],
        imagenes: ["./img/YesiNailsApp.png"],
        features: ["sdfasd"],
        github: "https://github.com/Zandova/YesiNails",
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

