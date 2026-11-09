(function(){
  document.body.classList.add('aeris-v100-ready');
  const world=document.getElementById('rpgWorld');
  const player=document.getElementById('rpgGuardianPlayer');
  if(!world||!player)return;
  let lastX=null,lastStep=0;
  const dust=(x,y)=>{
    const el=document.createElement('i');
    el.className='rpgFootDust';
    el.style.left=x+'%';el.style.top=y+'%';
    el.style.width=(3+Math.random()*4)+'px';
    el.style.height=(2+Math.random()*3)+'px';
    world.appendChild(el);
    setTimeout(()=>el.remove(),450);
  };
  const emitStep=()=>{
    const wr=world.getBoundingClientRect(),pr=player.getBoundingClientRect();
    const x=((pr.left+pr.width*.5-wr.left)/wr.width)*100;
    const y=((pr.bottom-wr.top)/wr.height)*100-1;
    dust(x-2,y);dust(x+2,y);
  };
  const observer=new MutationObserver(()=>{
    const moving=player.classList.contains('moving');
    if(moving){
      const now=performance.now();
      if(now-lastStep>110){emitStep();lastStep=now;}
    }
  });
  observer.observe(player,{attributes:true,attributeFilter:['class','style']});
})();
