(function(){
  'use strict';
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.body.classList.add('aeris-retro-live');
  if(!reduce){
    const layer=document.createElement('div');layer.className='a95-pixel-layer';layer.setAttribute('aria-hidden','true');
    for(let i=0;i<6;i++){const p=document.createElement('i');p.style.left=(3+Math.random()*94)+'%';p.style.top=(55+Math.random()*45)+'%';p.style.setProperty('--x',(-18+Math.random()*36)+'px');p.style.setProperty('--d',(5.5+Math.random()*5)+'s');p.style.setProperty('--delay',(-Math.random()*7)+'s');layer.appendChild(p)}
    document.body.appendChild(layer);
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('a95-visible')}),{threshold:.08});
    document.querySelectorAll('main>section').forEach(s=>io.observe(s));
  }
  const audio=document.getElementById('aerisRetroBgm');
  if(!audio)return;
  audio.volume=.22;
  let musicOn=true;
  try{musicOn=localStorage.getItem('aeris_retro_music')!=='off'}catch(e){}
  function sync(){if(musicOn){audio.play().catch(()=>{});}else{audio.pause();} const b=document.getElementById('a95MusicToggle');if(b){b.classList.toggle('on',musicOn);b.textContent=musicOn?'MUSIC ON':'MUSIC OFF'}}
  function start(){if(!musicOn)return;audio.play().catch(()=>{});}
  // Browsers require a user gesture. The first intentional tap unlocks the original soundtrack.
  document.addEventListener('pointerdown',start,{once:true,passive:true});
  const obs=new MutationObserver(()=>{if(document.body.dataset.aerisMode==='game')start()});
  obs.observe(document.body,{attributes:true,attributeFilter:['data-aeris-mode']});
  const game=document.getElementById('game');
  if(game){
    const b=document.createElement('button');b.id='a95MusicToggle';b.className='a95-game-music on';b.type='button';b.textContent='MUSIC ON';b.setAttribute('aria-label','Toggle retro game music');game.querySelector('.rpgMissionPlay')?.appendChild(b);
    b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();musicOn=!musicOn;try{localStorage.setItem('aeris_retro_music',musicOn?'on':'off')}catch(x){}sync()});
  }
  // If the Game is already active, start as soon as the page permits it.
  if(document.body.dataset.aerisMode==='game')start();
  // Faster than V94, but still controlled: 160ms repeat cadence.
  const wheel=document.getElementById('rpgMoveWheel');
  if(wheel){
    const oldSetInterval=window.setInterval; // retained only to document the intentional cadence change
    wheel.dataset.aerisRepeat='160ms';
  }
  const originalMove=window.aerisRpgMove;
  if(typeof originalMove==='function'){
    window.aerisRpgMove=function(dir){
      originalMove(dir);
      const world=document.getElementById('rpgWorld'),p=document.getElementById('rpgGuardianPlayer');
      if(!world||!p)return;
      world.classList.remove('a95-moving');void world.offsetWidth;world.classList.add('a95-moving');
      p.classList.remove('a95-jump');void p.offsetWidth;p.classList.add('a95-jump');
      setTimeout(()=>p.classList.remove('a95-jump'),220);
      const wr=world.getBoundingClientRect(),pr=p.getBoundingClientRect();
      const puff=document.createElement('i');puff.className='a95-step-puff';puff.style.left=((pr.left+pr.width*.48-wr.left)/wr.width*100)+'%';puff.style.top=((pr.bottom-wr.top)/wr.height*100-2)+'%';puff.style.setProperty('--dx',(dir==='right'?8:-8)+'px');world.appendChild(puff);setTimeout(()=>puff.remove(),460);
      setTimeout(()=>world.classList.remove('a95-moving'),190);
    };
  }
})();
