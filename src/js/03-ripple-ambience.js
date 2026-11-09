(function(){
 const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const cursor=document.createElement('div');cursor.className='aeris-cursor';document.body.appendChild(cursor);
 function ripple(x,y){if(reduce)return;const r=document.createElement('span');r.className='aeris-ripple';r.style.left=x+'px';r.style.top=y+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),750)}
 document.addEventListener('click',e=>{if(e.target.closest('button,.btn,a,.option,.mapNode,.pathStep,.legacyBtn'))ripple(e.clientX,e.clientY)});
 // Briefing soundscape: gentle water-like noise + soft synth, starts only after a user gesture.
 let river=null, riverOn=false;
 function ensureRiver(){
   if(river)return river;
   const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;
   const c=new AC(), master=c.createGain();master.gain.value=.018;master.connect(c.destination);
   const buffer=c.createBuffer(1,c.sampleRate*2,c.sampleRate),data=buffer.getChannelData(0);
   for(let i=0;i<data.length;i++){const n=Math.random()*2-1;data[i]=(data[i-1]||0)*.985+n*.12}
   const src=c.createBufferSource();src.buffer=buffer;src.loop=true;
   const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1200;
   src.connect(filter);filter.connect(master);src.start();
   river={c,master,src,filter};return river;
 }
 window.aerisRiverOn=function(){if(riverOn)return;const r=ensureRiver();if(!r)return;if(r.c.state==='suspended')r.c.resume();riverOn=true;};
 window.aerisRiverOff=function(){if(!river)return;river.master.gain.setTargetAtTime(0,river.c.currentTime,.25);riverOn=false;};
 // Make the first intentional interaction wake the river ambience, respecting the existing sound toggle.
 document.addEventListener('click',e=>{if(e.target.closest('#briefingEnter,#soundFX,#ambient,.briefingEnter'))window.aerisRiverOn?.()},{once:true});
 // Add subtle hover pitch to mission buttons.
 document.querySelectorAll('.briefingEnter,.btn.primary,.mapNode,.legacyBtn').forEach(el=>el.addEventListener('mouseenter',()=>window.playFX?.('select')));
})();
