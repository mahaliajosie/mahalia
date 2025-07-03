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

// * Helper: read current rotation from computed transform matrix
function getCurrentAngle(el){
  const st = getComputedStyle(el);
  const matrix = st.transform === 'none'
    ? [1,0,0,1,0,0]
    : st.transform.match(/matrix\(([^)]+)\)/)[1].split(',').map(Number);
  const [a,b] = matrix;             // matrix(a, b, c, d, e, f)
  return Math.atan2(b, a);          // radians
}

const ring  = document.querySelector('.nav-ring');
const stage = document.querySelector('.stage');

stage.addEventListener('mouseenter', () => {
  // freeze the infinite spin
  ring.style.animationPlayState = 'paused';

  // store the exact angle in a css var
  const angleRad  = getCurrentAngle(ring);             // radians
  const angleTurn = angleRad / (2*Math.PI);            // turns (0-1 range)
  ring.style.setProperty('--current-angle', angleTurn + 'turn');

  // run a one-off ease-out of ¼ turn over 0.8 s
  ring.style.animation = 'easeOutQuarterTurn 0.8s ease-out forwards';
});

stage.addEventListener('mouseleave', () => {
  // after the ease-out we resume infinite spin from current angle

  // compute where we stopped
  const angleRad  = getCurrentAngle(ring);
  const angleTurn = angleRad / (2*Math.PI);

  // restart the endless spin but offset its timeline so it’s seamless
  ring.style.animation = `spin 20s linear infinite`;
  ring.style.animationDelay = `-${angleTurn*20}s`;   // 20 s = spin duration
  ring.style.animationPlayState = 'running';
});