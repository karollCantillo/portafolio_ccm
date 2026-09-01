// ============================================
// 1. Año dinámico en el footer (querySelector)
// ============================================
const anioSpan = document.querySelector('#anioActual');
anioSpan.textContent = new Date().getFullYear();

// ============================================
// 2. Modelo de datos en memoria (arreglo de objetos)
// ============================================
const proyectos = [
  {
    id: 1,
    titulo: 'Perfil-dev',
    descripcion: 'Sitio de perfil personal con secciones semánticas y estilos en Flexbox (Laboratorio 01).',
    categoria: 'web',
    imagen: 'img/icon-web.svg',
    enlace: 'proyectos/perfil-dev/index.html'
  },
  {
    id: 2,
    titulo: 'Taskboard',
    descripcion: 'Tablero de tareas con render dinámico desde un arreglo de objetos (Laboratorio 02).',
    categoria: 'web',
    imagen: 'img/icon-web.svg',
    enlace: 'proyectos/taskboard/index.html'
  },
  {
    id: 3,
    titulo: 'Análisis de dataset académico',
    descripcion: 'Limpieza y visualización de datos con Python (pandas) y consultas SQL sobre una base relacional.',
    categoria: 'datos',
    imagen: 'img/icon-datos.svg',
    enlace: 'https://github.com/tu-usuario/analisis-datos'
  },
  {
    id: 4,
    titulo: 'Simulación de red LAN',
    descripcion: 'Diseño y configuración de una red local con subredes, en Packet Tracer.',
    categoria: 'redes',
    imagen: 'img/icon-redes.svg',
    enlace: 'https://github.com/tu-usuario/simulacion-red'
  },
  {
    id: 5,
    titulo: 'Auditoría básica de seguridad',
    descripcion: 'Revisión de vulnerabilidades comunes y buenas prácticas aplicadas a un sistema de prueba.',
    categoria: 'ciberseguridad',
    imagen: 'img/icon-ciberseguridad.svg',
    enlace: 'https://github.com/tu-usuario/auditoria-seguridad'
  },
  {
    id: 6,
    titulo: 'Landing de evento',
    descripcion: 'Página de una sola vista para inscripción a un evento, con formulario validado.',
    categoria: 'web',
    imagen: 'img/icon-web.svg',
    enlace: 'proyectos/landing-evento/index.html'
  }
];

// ============================================
// 3. Render de tarjetas con createElement + appendChild
//    (se recorre el arreglo de objetos para pintar el DOM)
// ============================================
const grid = document.querySelector('#proyectosGrid');

function limpiarGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

function crearTarjeta(proyecto) {
  const card = document.createElement('article');
  card.classList.add('card');
  card.dataset.categoria = proyecto.categoria;

  const img = document.createElement('img');
  img.src = proyecto.imagen;
  img.alt = `Icono representativo del proyecto ${proyecto.titulo}`;
  img.classList.add('card__img');

  const body = document.createElement('div');
  body.classList.add('card__body');

  const tag = document.createElement('span');
  tag.classList.add('card__tag');
  tag.textContent = proyecto.categoria;

  const titulo = document.createElement('h3');
  titulo.textContent = proyecto.titulo;

  const descripcion = document.createElement('p');
  descripcion.textContent = proyecto.descripcion;

  body.appendChild(tag);
  body.appendChild(titulo);
  body.appendChild(descripcion);

  if (proyecto.enlace) {
    const enlace = document.createElement('a');
    enlace.href = proyecto.enlace;
    enlace.textContent = 'Ver proyecto →';
    enlace.classList.add('card__link');
    const esExterno = proyecto.enlace.startsWith('http');
    if (esExterno) {
      enlace.target = '_blank';
      enlace.rel = 'noopener noreferrer';
    }
    body.appendChild(enlace);
  }

  card.appendChild(img);
  card.appendChild(body);

  return card;
}

function renderProyectos(categoria) {
  limpiarGrid();
  const filtrados = categoria === 'todos'
    ? proyectos
    : proyectos.filter(p => p.categoria === categoria);

  filtrados.forEach(proyecto => {
    const tarjeta = crearTarjeta(proyecto);
    grid.appendChild(tarjeta);
  });
}

// Render inicial (respeta el último filtro guardado en localStorage, si existe)
const filtroGuardado = localStorage.getItem('filtroProyectos') || 'todos';
renderProyectos(filtroGuardado);

// ============================================
// 4. Delegación de eventos sobre los botones de filtro
// ============================================
const filtrosContenedor = document.querySelector('#filtros');
const botonesFiltro = document.querySelectorAll('.filtro');

// Marcar visualmente el filtro guardado al cargar
botonesFiltro.forEach(btn => {
  btn.setAttribute('aria-pressed', btn.dataset.category === filtroGuardado ? 'true' : 'false');
});

filtrosContenedor.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.filtro');
  if (!boton) return; // clic fuera de un botón, se ignora

  const categoria = boton.dataset.category;

  botonesFiltro.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
  boton.setAttribute('aria-pressed', 'true');

  renderProyectos(categoria);
  localStorage.setItem('filtroProyectos', categoria);
});

// ============================================
// 5. Formulario: submit + preventDefault + validación básica
// ============================================
const form = document.querySelector('#formContacto');
const feedback = document.querySelector('#formFeedback');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nombre = document.querySelector('#nombre').value.trim();
  const email = document.querySelector('#email').value.trim();
  const asunto = document.querySelector('#asunto').value;
  const terminos = document.querySelector('#terminos').checked;

  if (!nombre || !email || !asunto || !terminos) {
    feedback.textContent = 'Completa los campos obligatorios antes de enviar.';
    feedback.className = 'form__feedback error';
    return;
  }

  // Mensaje de éxito creado dinámicamente a partir de la acción del usuario
  feedback.textContent = `Gracias, ${nombre}. Tu mensaje quedó registrado (demo local, sin backend real).`;
  feedback.className = 'form__feedback exito';

  form.reset();
});

// ============================================
// 6. Menú hamburguesa (móvil)
// ============================================
const navToggle = document.querySelector('#navToggle');
const navLinksList = document.querySelector('#navLinks');

navToggle.addEventListener('click', () => {
  const abierto = navLinksList.classList.toggle('nav__links--open');
  navToggle.setAttribute('aria-expanded', abierto);
});

// Cerrar el menú al hacer clic en un link (delegación de eventos)
navLinksList.addEventListener('click', (evento) => {
  if (evento.target.tagName === 'A') {
    navLinksList.classList.remove('nav__links--open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ============================================
// 7. Resaltar el link activo al hacer scroll
// ============================================
const navLinkItems = document.querySelectorAll('.nav__link');
const seccionesObservadas = document.querySelectorAll('main section[id]');

function marcarLinkActivo(idSeccion) {
  navLinkItems.forEach(link => {
    link.classList.toggle('active', link.dataset.section === idSeccion);
  });
}

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      marcarLinkActivo(entrada.target.id);
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

seccionesObservadas.forEach(seccion => observador.observe(seccion));