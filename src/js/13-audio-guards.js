(function(){
  "use strict";
  // Prevent stale audio playback when the page is hidden or navigation leaves the game.
  const audio=document.getElementById("aerisRetroBgm");
  if(!audio)return;
  const stopOutsideGame=()=>{
    const mode=document.body&&document.body.dataset?document.body.dataset.aerisMode:"";
    if(mode!=="game" && !audio.paused) audio.pause();
  };
  document.addEventListener("visibilitychange",()=>{if(document.hidden)audio.pause();});
  new MutationObserver(stopOutsideGame).observe(document.body,{attributes:true,attributeFilter:["data-aeris-mode"]});
  stopOutsideGame();
})();
