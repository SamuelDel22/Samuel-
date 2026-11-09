(function(){
 const world=document.getElementById('rpgWorld'); const shell=document.getElementById('rpgGameShell');
 if(!world||!shell)return;
 const player=()=>document.getElementById('rpgGuardianPlayer');
 function burst(x,y,kind){
   const el=document.createElement('i'); el.className=kind==='dust'?'rpgFootDust':'rpgPixelBurst'; el.style.left=x+'%';el.style.top=y+'%';world.appendChild(el);setTimeout(()=>el.remove(),700);
 }
 function actionFX(good){
   world.classList.remove('rpgActionPulse');void world.offsetWidth;world.classList.add('rpgActionPulse');
   const b=document.getElementById('rpgBossField'), p=player();
   if(b){const r=b.getBoundingClientRect(),wr=world.getBoundingClientRect();const x=(r.left+r.width*.5-wr.left)/wr.width*100,y=(r.top+r.height*.38-wr.top)/wr.height*100;
     const slash=document.createElement('i');slash.className='rpgSlash';slash.style.left=(x-7)+'%';slash.style.top=(y-3)+'%';world.appendChild(slash);setTimeout(()=>slash.remove(),450);
     const dmg=document.createElement('b');dmg.className='rpgDamageText';dmg.textContent=good?'−25':'−10';dmg.style.left=(x+2)+'%';dmg.style.top=(y-8)+'%';world.appendChild(dmg);setTimeout(()=>dmg.remove(),750);
     for(let i=0;i<4;i++)setTimeout(()=>burst(x+(Math.random()*8-4),y+(Math.random()*8-4),'burst'),i*45);
   }
 }
 shell.addEventListener('click',e=>{
   if(e.target.closest('#rpgMoveWheel')){const p=player();if(p){const r=p.getBoundingClientRect(),wr=world.getBoundingClientRect();burst((r.left+r.width*.5-wr.left)/wr.width*100,(r.bottom-wr.top)/wr.height*100,'dust')}}
   if(e.target.closest('.rpgChoice')){const good=e.target.closest('.rpgChoice')?.dataset.good==='true';setTimeout(()=>actionFX(good),35)}
 });
})();
