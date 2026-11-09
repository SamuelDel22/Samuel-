(function(){
  function boot(){
    const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!document.getElementById('aerisScrollProgress')){
      const bar=document.createElement('div');bar.id='aerisScrollProgress';document.body.appendChild(bar);
    }
    const progress=document.getElementById('aerisScrollProgress');
    const nav=document.querySelector('.nav');
    function onScroll(){
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      progress.style.transform='scaleX('+Math.min(1,scrollY/max)+')';
      if(nav)nav.classList.toggle('scrolled',scrollY>30);
    }
    addEventListener('scroll',onScroll,{passive:true});onScroll();

    // Stagger existing reveal elements so the page feels intentionally choreographed.
    document.querySelectorAll('.reveal').forEach((el,i)=>{
      if(!el.style.getPropertyValue('--a47-delay')) el.style.setProperty('--a47-delay',Math.min(i%5,4)*.06+'s');
      el.style.transitionDelay='var(--a47-delay)';
    });

    // Give static visual groups a gentle breathing rhythm without touching logic.
    if(!reduced){
      document.querySelectorAll('.evidenceStats div,.profileMetrics div,.profileStats div,.whatMetrics article').forEach((el,i)=>{
        el.style.animation='v47Breath 4.5s ease-in-out '+(i*.25)+'s infinite';
      });
      if(!document.getElementById('v47BreathKeyframes')){
        const s=document.createElement('style');s.id='v47BreathKeyframes';s.textContent='@keyframes v47Breath{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}';document.head.appendChild(s);
      }
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
