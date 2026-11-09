(function(){
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function boot(){
    const body=document.body;if(!body)return;
    // Reading progress HUD
    const progress=document.createElement('div');progress.className='a48-progress';progress.setAttribute('aria-hidden','true');body.appendChild(progress);
    const updateProgress=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%'};
    window.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
    if(!reduce){
      // Ambient particles: restrained and decorative.
      for(let i=0;i<3;i++){const o=document.createElement('span');o.className='a48-orb';o.style.left=(12+i*37)+'%';o.style.animationDelay=(-i*3.2)+'s';body.appendChild(o)}
      // Scroll reveals for existing content only.
      const targets=document.querySelectorAll('.reveal,.card,.evidenceCard,.labNode,.whatMetric,.mapNode,.relic');
      const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('a48-reveal','is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});
      targets.forEach(e=>{e.classList.add('a48-reveal');io.observe(e)});
      // Lightweight pointer tilt on larger screens.
    }
    // Button ripple feedback.
    document.querySelectorAll('.btn,.langSwitch,.guardianOrb').forEach(btn=>btn.addEventListener('click',e=>{
      if(reduce)return;const r=btn.getBoundingClientRect(),s=Math.max(r.width,r.height),x=e.clientX-r.left-s/2,y=e.clientY-r.top-s/2;const rip=document.createElement('span');rip.className='a48-ripple';Object.assign(rip.style,{width:s+'px',height:s+'px',left:x+'px',top:y+'px'});btn.appendChild(rip);setTimeout(()=>rip.remove(),700);
    }));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
