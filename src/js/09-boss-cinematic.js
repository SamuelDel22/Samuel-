(function(){
  const shell=document.getElementById('rpgGameShell');
  const encounter=document.getElementById('rpgEncounter');
  if(!shell||!encounter)return;
  const clear=()=>{clearTimeout(window.__aerisBossIntro);shell.classList.remove('boss-cinematic');encounter.classList.remove('cinematic-wait')};
  shell.addEventListener('click',e=>{if(e.target.closest('#rpgQuitMission'))clear()});
})();
