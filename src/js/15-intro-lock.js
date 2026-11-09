(function(){
  'use strict';
  const overlay=document.getElementById('guardianBriefing');
  const start=document.getElementById('arcadeStartButton');
  const startContent=document.getElementById('arcadeStartContent');
  const menu=document.getElementById('arcadeMenu');
  const back=document.getElementById('arcadeBack');
  if(!overlay||!start||!startContent||!menu)return;

  let lockedY=0;
  let introOpen=!overlay.classList.contains('hide');
  let scrollLocked=false;

  function lockScroll(){
    if(scrollLocked)return;
    lockedY=window.scrollY||document.documentElement.scrollTop||0;
    document.documentElement.classList.add('aeris-intro-lock');
    document.body.classList.add('aeris-intro-lock');
    document.body.style.setProperty('--aeris-scroll-lock-top',(-lockedY)+'px');
    scrollLocked=true;
  }
  function unlockScroll(){
    if(!scrollLocked)return;
    document.documentElement.classList.remove('aeris-intro-lock');
    document.body.classList.remove('aeris-intro-lock');
    document.body.style.removeProperty('--aeris-scroll-lock-top');
    window.scrollTo(0,lockedY);
    scrollLocked=false;
  }
  function showMenu(){
    overlay.classList.remove('introMenuMode');
    void overlay.offsetWidth;
    overlay.classList.add('introMenuMode');
    menu.hidden=false;
    startContent.hidden=true;
    requestAnimationFrame(()=>menu.querySelector('.arcadeOption')?.focus());
    window.playFX?.('select');
    setTimeout(()=>overlay.classList.remove('introMenuMode'),900);
  }
  function showStart(){
    overlay.classList.remove('introMenuMode');
    menu.hidden=true;
    startContent.hidden=false;
    start.focus();
  }
  function closeIntro(target){
    if(!introOpen)return;
    introOpen=false;
    overlay.classList.add('hide');
    overlay.setAttribute('aria-hidden','true');
    unlockScroll();
    if(target){
      // Let the hash/navigation happen after the modal has released the viewport.
      requestAnimationFrame(()=>{
        if(target==='information'||target==='game'){
          const el=document.getElementById(target);
          if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
          history.replaceState(null,'','#'+target);
        }
      });
    }
  }

  // Lock immediately, before the first touch/scroll event can reach the page underneath.
  lockScroll();
  overlay.setAttribute('aria-hidden','false');

  start.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();showMenu();});
  back?.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();showStart();});

  menu.querySelectorAll('.arcadeOption').forEach(function(option){
    option.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      const target=option.dataset.arcadeMode || (option.getAttribute('href')||'').replace('#','');
      closeIntro(target);
    });
  });

  // Keep wheel/touch/keyboard from scrolling the underlying page while the intro owns the screen.
  ['wheel','touchmove'].forEach(type=>overlay.addEventListener(type,e=>{if(introOpen)e.preventDefault();},{passive:false}));
  overlay.addEventListener('scroll',e=>{if(introOpen)overlay.scrollTop=0},{passive:true});
  document.addEventListener('keydown',function(e){
    if(!introOpen)return;
    if(e.key==='Escape'){
      e.preventDefault();
      showStart();
    }
    if(e.key==='Enter' && document.activeElement===start){
      e.preventDefault();
      showMenu();
    }
  });
  window.addEventListener('resize',()=>{if(introOpen)window.scrollTo(0,lockedY)});

  // Prevent old scripts from accidentally re-enabling page scrolling while intro is visible.
  const observer=new MutationObserver(()=>{
    if(introOpen){
      if(!document.documentElement.classList.contains('aeris-intro-lock'))lockScroll();
      if(overlay.classList.contains('hide'))overlay.classList.remove('hide');
    }
  });
  observer.observe(overlay,{attributes:true,attributeFilter:['class']});
})();
