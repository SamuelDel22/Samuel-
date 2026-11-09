(()=>{const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
document.body.classList.add('aeris-v98-ready');
const host=$('.intro')||$('#intro')||$('.introScreen')||$('.landing')||document.body;
for(let i=0;i<6;i++){const s=document.createElement('i');s.className='retroV98Spark';s.style.left=(3+Math.random()*94)+'%';s.style.top=(4+Math.random()*88)+'%';s.style.animationDelay=(Math.random()*2)+'s';host.style.position=host.style.position==='static'?'relative':host.style.position;host.appendChild(s)}
function burst(parent,x,y,n=5){for(let i=0;i<n;i++){const p=document.createElement('i');p.className='retroV98Particle';p.style.left=x+'px';p.style.top=y+'px';p.style.setProperty('--dx',((Math.random()-.5)*38)+'px');p.style.setProperty('--dy',(-8-Math.random()*28)+'px');parent.appendChild(p);setTimeout(()=>p.remove(),700)}}
const world=$('#rpgWorld')||$('.rpgWorld');
if(world){
 world.addEventListener('click',e=>{const r=world.getBoundingClientRect();burst(world,e.clientX-r.left,e.clientY-r.top,6)});
}
const observer=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.style.animation='v98RetroReveal .34s steps(5,end) both';observer.unobserve(en.target)}}),{threshold:.12});
$$('section, .sectionCard, .infoCard, .featureCard').forEach(el=>observer.observe(el));
document.addEventListener('click',e=>{const b=e.target.closest('button,.rpgChoice,.navTab');if(!b)return;const r=b.getBoundingClientRect();const parent=b.closest('.rpgWorld,section,body');if(parent){const pr=parent.getBoundingClientRect();burst(parent,r.left+r.width/2-pr.left,r.top+r.height/2-pr.top,4)}});
})();
