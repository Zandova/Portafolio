
(function () {
  const hero   = document.getElementById('home');
  const canvas = document.getElementById('binary-bg');
  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');

  // --- Configuración ---
  const COLS         = 42;
  const ROWS         = 20;
  const HOVER_RADIUS = 100;   // px de radio de influencia del cursor
  const FONT_RATIO   = 0.52;  // tamaño de fuente relativo a la celda

  // Colores CodeConCafe
  const COLOR_DEFAULT = 'rgba(196,168,130,';   // text-muted apagado
  const COLOR_AMBER   = 'rgba(239,159,39,';    // accent — para el "1"
  const COLOR_TEAL    = 'rgba(29,158,117,';    // teal    — para el "0"

  let cells = [];
  let mouse = { x: -9999, y: -9999 };
  let animId;
  let cw, ch; // tamaño de celda

  // --- Inicializar grilla ---
  function init() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    cw = canvas.width  / COLS;
    ch = canvas.height / ROWS;

    cells = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        cells.push({
          val:        Math.random() < 0.5 ? '0' : '1',
          alpha:      Math.random() * 0.25 + 0.04,
          targetAlpha:Math.random() * 0.25 + 0.04,
          speed:      0.006 + Math.random() * 0.016,
          nextFlip:   Math.floor(Math.random() * 200),
          r, c
        });
      }
    }
  }

  // Distancia del centro de una celda al cursor
  function cellDist(cell) {
    const cx = (cell.c + 0.5) * cw;
    const cy = (cell.r + 0.5) * ch;
    return Math.hypot(cx - mouse.x, cy - mouse.y);
  }

  // --- Loop de animación ---
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.min(cw, ch) * FONT_RATIO}px 'Courier New', monospace`;

    cells.forEach(cell => {
      const d       = cellDist(cell);
      const hovered = d < HOVER_RADIUS;

      if (hovered) {
        // Cerca del cursor → se ilumina fuerte
        const strength = 2 - d / HOVER_RADIUS;
        cell.alpha += (0.9 * strength - cell.alpha) * 0.10;
      } else {
        // Parpadeo orgánico
        cell.alpha += cell.speed * (cell.alpha < cell.targetAlpha ? 1 : -1);
        if (cell.alpha <= 0.03) {
          cell.alpha       = 0.03;
          cell.targetAlpha = Math.random() * 0.28 + 0.06;
        }
        if (cell.alpha >= cell.targetAlpha) {
          cell.targetAlpha = Math.random() * 0.10 + 0.03;
        }
      }

      // Flip aleatorio del dígito
      cell.nextFlip--;
      if (cell.nextFlip <= 0) {
        cell.val      = cell.val === '0' ? '1' : '0';
        cell.nextFlip = hovered
          ? 6  + Math.floor(Math.random() * 12)
          : 70 + Math.floor(Math.random() * 160);
      }

      // Color: hover → amber/teal, reposo → text-muted
      let colorBase;
      if (hovered) {
        colorBase = cell.val === '1' ? COLOR_AMBER : COLOR_TEAL;
      } else {
        colorBase = COLOR_DEFAULT;
      }

      ctx.fillStyle = colorBase + cell.alpha.toFixed(3) + ')';
      ctx.fillText(cell.val, (cell.c + 0.5) * cw, (cell.r + 0.5) * ch);
    });

    animId = requestAnimationFrame(draw);
  }

  // --- Eventos de mouse ---
  // pointer-events: none en canvas, capturamos el hero directamente
  hero.addEventListener('mousemove', e => {
    const rect  = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Soporte táctil (móvil)
  hero.addEventListener('touchmove', e => {
    const rect  = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouse.x = touch.clientX - rect.left;
    mouse.y = touch.clientY - rect.top;
  }, { passive: true });

  hero.addEventListener('touchend', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Redimensionar ventana
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    draw();
  });

  // Arrancar
  init();
  draw();
})();
