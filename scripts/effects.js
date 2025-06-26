// * Add click "burst" then navigate
document.querySelectorAll('.nav-text a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const href = link.getAttribute('href');

    // * Add burst class to <textPath> parent so only that label plays
    link.closest('text').classList.add('burst');

    // * Navigate after animation finishes (350 ms)
    setTimeout(()=>{ window.location = href; }, 350);
  });
});