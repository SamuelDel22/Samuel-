(function(){
  const wheel=document.getElementById('rpgMoveWheel'); if(!wheel)return;
  const hub=wheel.querySelector('.rpgWheelHub');
  let pointerId=null,holdTimer=null,activeDir=null,dragMoved=false,suppressNextClick=false,suppressClickTimer=0;
  // V94: deliberate, gamepad-like response. A larger dead zone and slower repeat prevent runaway speed.
  const DEAD=12, REPEAT=145;
  function canMove(){const play=document.getElementById('rpgMissionPlay');return play&&!play.hidden&&typeof window.aerisRpgMove==='function'}
  function moveOnce(dir){if(canMove())window.aerisRpgMove(dir)}
  function setHub(dx,dy){
    if(!hub)return;
    const max=8,len=Math.hypot(dx,dy)||1,k=Math.min(max/len,1);
    hub.style.transform='translate(calc(-50% + '+(dx*k)+'px),calc(-50% + '+(dy*k)+'px))';
  }
  function resetHub(){if(hub)hub.style.transform='translate(-50%,-50%)'}
  function stopHold(){clearInterval(holdTimer);holdTimer=null;activeDir=null}
  function startHold(dir){
    if(!dir)return;
    if(activeDir===dir && holdTimer)return;
    stopHold();
    activeDir=dir;
    moveOnce(dir);
    holdTimer=setInterval(()=>{if(activeDir)moveOnce(activeDir)},REPEAT);
  }
  function release(){stopHold();wheel.classList.remove('is-active');resetHub();pointerId=null}
  function directionFromEvent(e){
    const r=wheel.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    return e.clientX-cx;
  }
  wheel.addEventListener('pointerdown',e=>{
    if(pointerId!==null)return;
    pointerId=e.pointerId;dragMoved=false;suppressNextClick=true;clearTimeout(suppressClickTimer);suppressClickTimer=setTimeout(()=>{suppressNextClick=false},650);wheel.setPointerCapture?.(e.pointerId);wheel.classList.add('is-active');
    const dx=directionFromEvent(e); setHub(Math.max(-8,Math.min(8,dx)),0);
    if(Math.abs(dx)>DEAD){activeDir=dx>0?'right':'left';startHold(activeDir)}
  });
  wheel.addEventListener('pointermove',e=>{
    if(e.pointerId!==pointerId)return;
    const r=wheel.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    const dx=e.clientX-cx,dy=e.clientY-cy;
    if(Math.abs(dx)>3||Math.abs(dy)>3)dragMoved=true;
    setHub(Math.max(-8,Math.min(8,dx)),Math.max(-8,Math.min(8,dy)));
    if(Math.abs(dx)>DEAD){
      const nextDir=dx>0?'right':'left';
      if(nextDir!==activeDir)startHold(nextDir);
    } else if(activeDir) {
      stopHold();
    }
  });
  wheel.addEventListener('pointerup',e=>release());
  wheel.addEventListener('pointercancel',release);
  wheel.addEventListener('lostpointercapture',release);
  wheel.addEventListener('click',e=>{
    /* Pointer-down already performs the first movement. Ignore its synthetic click
       to prevent a tap from moving the Guardian twice. Keyboard clicks still work. */
    if(suppressNextClick){suppressNextClick=false;clearTimeout(suppressClickTimer);e.preventDefault();e.stopImmediatePropagation();return}
    if(dragMoved)return;
    const dx=directionFromEvent(e); if(Math.abs(dx)>DEAD)moveOnce(dx>0?'right':'left');
  });
})();
