(function(){
 function boot(){
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduced){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});revealEls.forEach(e=>io.observe(e));}else revealEls.forEach(e=>e.classList.add('show'));
  if(!reduced){for(let i=0;i<14;i++){const p=document.createElement('span');p.className='floatParticle';p.style.left=(Math.random()*100)+'vw';p.style.setProperty('--drift',((Math.random()-.5)*120)+'px');p.style.animationDuration=(10+Math.random()*12)+'s';p.style.animationDelay=(-Math.random()*18)+'s';document.body.appendChild(p)}}
  // V51.2: top navigation is controlled only by the three mode buttons.
  // Do NOT infer the active mode from page scroll position.

 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
