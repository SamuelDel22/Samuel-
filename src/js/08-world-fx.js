(function(){
  const shell=document.getElementById('rpgGameShell');
  const world=document.getElementById('rpgWorld');
  if(!shell||!world)return;
  const img=document.getElementById('rpgSceneImage');
  if(!img)return;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let fxTimer=0;
  function missionFromSrc(){
    const m=(img.getAttribute('src')||'').match(/mission-(\d+)/);
    return m?Number(m[1]):1;
  }
  function makeFX(){
    let fx=world.querySelector('.rpgEnvFX');
    if(fx)fx.remove();
    fx=document.createElement('div');fx.className='rpgEnvFX';fx.setAttribute('aria-hidden','true');
    fx.innerHTML='<div class="rpgFxHaze"></div><div class="rpgFxWave"></div><div class="rpgFxWave wave2"></div>';
    world.appendChild(fx);
    const type=['water','dust','mercury','trash','leaf'][missionFromSrc()-1]||'water';
    const count=reduced?0:(type==='trash'||type==='leaf'?10:14);
    for(let i=0;i<count;i++){
      const p=document.createElement('i');p.className='rpgFxParticle '+type;
      p.style.left=(8+Math.random()*84)+'%';
      p.style.top=(20+Math.random()*62)+'%';
      p.style.setProperty('--dur',(3.2+Math.random()*4.2).toFixed(2)+'s');
      p.style.animationDelay=(-Math.random()*6).toFixed(2)+'s';
      p.style.setProperty('--dx',((Math.random()-.2)*100).toFixed(0)+'px');
      p.style.setProperty('--dy',((Math.random()-.15)*100).toFixed(0)+'px');
      fx.appendChild(p);
    }
    shell.classList.remove('fx-mission-1','fx-mission-2','fx-mission-3','fx-mission-4','fx-mission-5');
    shell.classList.add('fx-mission-'+missionFromSrc());
  }
  function pulse(cls,duration=700){
    shell.classList.remove(cls);void shell.offsetWidth;shell.classList.add(cls);
    clearTimeout(fxTimer);fxTimer=setTimeout(()=>shell.classList.remove(cls),duration);
  }
  function refresh(){makeFX();}
  const observer=new MutationObserver(()=>{
    clearTimeout(window.__aerisV82Refresh);
    window.__aerisV82Refresh=setTimeout(refresh,30);
  });
  observer.observe(img,{attributes:true,attributeFilter:['src']});
  refresh();
  shell.addEventListener('click',e=>{
    if(e.target.closest('.rpgChoice')){
      const good=e.target.closest('.rpgChoice')?.dataset.good==='true';
      pulse('fx-hit',420);setTimeout(()=>pulse(good?'fx-good':'fx-bad',520),40);
    }
    if(e.target.closest('#rpgQuitMission')){clearTimeout(window.__aerisBossIntro);shell.classList.remove('fx-encounter','fx-moving','fx-hit','fx-good','fx-bad','boss-cinematic');$('rpgEncounter')?.classList.remove('cinematic-wait');}
  });
  const encounter=document.getElementById('rpgEncounter');
  if(encounter){
    const eo=new MutationObserver(()=>{
      if(!encounter.hidden)pulse('fx-encounter',1050);
    });
    eo.observe(encounter,{attributes:true,attributeFilter:['hidden']});
  }
})();
