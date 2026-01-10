// Theme Toggle with Animation
const toggleTheme = () => {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  
  // Add transition class for smooth theme change
  body.classList.add('theme-transition');
  
  // Toggle dark class
  body.classList.toggle('dark');
  
  // Update localStorage
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  
  // Change icon based on theme
  if (body.classList.contains('dark')) {
    themeIcon.textContent = '☀️';
    themeIcon.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeIcon.textContent = '🌙';
    themeIcon.setAttribute('aria-label', 'Switch to dark mode');
  }
  
  // Remove transition class after animation completes
  setTimeout(() => {
    body.classList.remove('theme-transition');
  }, 300);
};

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  
  // Add fade-in class for entrance animation
  body.classList.add('fade-in');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Check for system preference if no saved preference
  if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else if (savedTheme === 'dark') {
    body.classList.add('dark');
  }
  
  // Update theme icon based on current theme
  const themeIcon = document.querySelector('.theme-icon');
  if (body.classList.contains('dark')) {
    themeIcon.textContent = '☀️';
    themeIcon.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeIcon.textContent = '🌙';
    themeIcon.setAttribute('aria-label', 'Switch to dark mode');
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .highlight-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});

// Listen for theme changes in other tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    document.body.classList.toggle('dark', e.newValue === 'dark');
  }
});
// Add this to your script.js
// Create floating particles
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);
  
  const particleCount = window.innerWidth < 768 ? 20 : 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 10 + 5;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Random color variation
    if (Math.random() > 0.7) {
      particle.style.background = `var(--accent)`;
    }
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles when DOM loads
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  
  // Animate elements when they come into view
  const animateOnScroll = () => {
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 100) {
        section.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});
// Add to your script.js
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab, .tab-content').forEach(el => {
      el.classList.remove('active');
    });
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Show corresponding content
    const tabId = tab.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
// Add this to your script.js
// Scroll progress indicator
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
  document.querySelector('.header-progress').style.width = `${scrollPercent}%`;
  
  // Highlight active section
  const sections = document.querySelectorAll('section');
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollTop >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });
    
    // Update URL without page reload
    history.pushState(null, null, targetId);
  });
});
