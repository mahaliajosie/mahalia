export function initHoverEffects() {
    const items = document.querySelectorAll('.nav-item');
  
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('hovering');
      });
  
      item.addEventListener('mouseleave', () => {
        item.classList.remove('hovering');
      });
    });
  }