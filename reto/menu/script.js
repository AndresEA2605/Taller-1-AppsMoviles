// Navegación móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scrolling y navegación activa
const navLinksArray = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

navLinksArray.forEach(link => {
  link.addEventListener('click', (e) => {
    // Si es el enlace de inicio (externo), no prevenir el comportamiento por defecto
    if (link.classList.contains('nav-home')) {
      return; // Permitir navegación normal
    }
    
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    // Cerrar menú móvil
    navLinks.classList.remove('active');
  });
});

// Intersection Observer para navegación activa
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-80px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      
      // Remover clase active de todos los links
      navLinksArray.forEach(link => {
        link.classList.remove('active');
      });
      
      // Agregar clase active al link correspondiente
      const activeLink = document.querySelector(`[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

// Observar todas las secciones
sections.forEach(section => {
  observer.observe(section);
});

// Animaciones de scroll
const animateOnScroll = () => {
  const elementsToAnimate = document.querySelectorAll('.fade-in');
  
  elementsToAnimate.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Ejecutar una vez al cargar
animateOnScroll();

// Efecto parallax sutil en el hero
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = scrolled * 0.5;
  
  if (hero) {
    hero.style.transform = `translateY(${parallaxSpeed}px)`;
  }
});

// Copy link functionality
const copyUrl = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    // Mostrar notificación (opcional)
    console.log('URL copiada al portapapeles');
  });
};

// Prevenir zoom en dispositivos móviles al hacer doble tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Lazy loading para imágenes
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      img.onload = () => {
        img.style.opacity = '1';
      };
      
      observer.unobserve(img);
    }
  });
});

images.forEach(img => {
  imageObserver.observe(img);
});

// Performance: throttle scroll events
let ticking = false;

const updateOnScroll = () => {
  animateOnScroll();
  
  // Header effect
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  ticking = false;
};

const requestScrollUpdate = () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
};

// Reemplazar el event listener anterior
window.removeEventListener('scroll', animateOnScroll);
window.addEventListener('scroll', requestScrollUpdate);

// Función para mostrar/ocultar contenido adicional
const toggleContent = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('expanded');
  }
};

// Funcionalidad de búsqueda (opcional)
const searchInPage = (query) => {
  if (!query) return;
  
  // Remover highlights anteriores
  document.querySelectorAll('.highlight').forEach(el => {
    el.classList.remove('highlight');
  });
  
  // Buscar y resaltar texto
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  let node;
  const nodes = [];
  while (node = walker.nextNode()) {
    if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
      nodes.push(node);
    }
  }
  
  nodes.forEach(node => {
    const parent = node.parentElement;
    if (parent && !parent.classList.contains('nav-link')) {
      parent.classList.add('highlight');
    }
  });
};

// Event listeners adicionales
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes cuando el DOM esté listo
  console.log('Página del Caso Uribe cargada completamente');
  
  // Agregar efectos de hover adicionales si es necesario
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Función para compartir en redes sociales
const shareOnSocial = (platform) => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent('Caso Uribe: Primera condena a un expresidente en Colombia');
  
  let shareUrl = '';
  
  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${title} ${url}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
};

// Función para imprimir la página
const printPage = () => {
  // Ocultar elementos que no deben imprimirse
  const elementsToHide = document.querySelectorAll('.nav-toggle, .scroll-indicator');
  elementsToHide.forEach(el => {
    el.style.display = 'none';
  });
  
  window.print();
  
  // Restaurar elementos después de imprimir
  setTimeout(() => {
    elementsToHide.forEach(el => {
      el.style.display = '';
    });
  }, 1000);
};

// Función para modo oscuro (opcional)
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Cargar preferencia de modo oscuro
document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
});

// Función para validar enlaces
const validateLinks = () => {
  const links = document.querySelectorAll('a[href^="http"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Agregar analytics o validaciones si es necesario
      console.log(`Navegando a: ${link.href}`);
    });
  });
};

// Inicializar validaciones de enlaces
validateLinks();