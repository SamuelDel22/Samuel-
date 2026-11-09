(function(){
  const body=document.body;
  const navLinks=[...document.querySelectorAll('#navLinks .aerisTopLink')];
  const modes={
    information:{target:'information'},
    game:{target:'game'},
    
  };

  // These are the ONLY page areas that belong to each destination.
  const infoIds=['top','information','story','river','facts','gallery','mercury','timeline','codex','moves'];
  const gameIds=['game'];
  const chatbotIds=[];

  function mark(ids,mode){
    ids.forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.setAttribute('data-aeris-mode-section',mode);
    });
  }
  mark(infoIds,'information');
  mark(gameIds,'game');
  mark(chatbotIds,'chatbot');

  // UI controls stay available while content switches.
  ['ambient','toast'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.setAttribute('data-aeris-mode-ui','true');
  });
  const sound=document.getElementById('soundFX');
  if(sound) sound.setAttribute('data-aeris-game-ui','true');

  // Always restore the exact two navigation labels after language changes.
  function fixNavLabels(){
    const labels=window.currentLang==='es'?['Información','Juego']:['Information','Game'];
    const icons=['assets/section-icons/information.webp','assets/section-icons/game.webp'];
    navLinks.forEach((a,i)=>{
      if(!a) return;
      let img=a.querySelector('.aerisNavIcon');
      let label=a.querySelector('span');
      if(!img){
        img=document.createElement('img');
        img.className='aerisNavIcon';
        img.alt=labels[i];
        img.setAttribute('aria-hidden','true');
        a.prepend(img);
      }
      img.src=icons[i];
      if(!label){
        label=document.createElement('span');
        a.appendChild(label);
      }
      label.textContent=labels[i];
    });
  }

  function activate(mode,scroll=true){
    if(!modes[mode]) mode='information';
    body.classList.add('aeris-single-mode');
    body.dataset.aerisMode=mode;
    navLinks.forEach((a,i)=>a.classList.toggle('active',['information','game'][i]===mode));
    if(sound) sound.style.display=mode==='game'?'grid':'';
    fixNavLabels();
    if(scroll){
      const target=document.getElementById(modes[mode].target);
      if(target) requestAnimationFrame(()=>window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+window.scrollY-92),behavior:'smooth'}));
    }
    try{localStorage.setItem('aeris_single_mode',mode)}catch(e){}
  }

  navLinks.forEach((a,i)=>{
    const mode=['information','game'][i];
    if(!a) return;
    a.setAttribute('role','button');
    a.setAttribute('aria-label',mode==='information'?'Information':'Game');
    a.addEventListener('click',e=>{
      e.preventDefault();
      activate(mode,true);
    });
  });

  // Internal calls to Game/Chatbot also switch the page instead of exposing another destination.
  document.querySelectorAll('a[href="#game"]').forEach(a=>{
    if(a.classList.contains('aerisTopLink')) return;
    a.addEventListener('click',e=>{e.preventDefault();activate('game',true)});
  });
  document.querySelectorAll('a[href="#information"]').forEach(a=>{
    if(a.classList.contains('aerisTopLink')) return;
    a.addEventListener('click',e=>{e.preventDefault();activate('information',true)});
  });

  // Language switching used to overwrite the two nav labels with Story/Real World/Mercury.
  // Wrap it so the navigation ALWAYS remains Information / Game / Chatbot.
  const originalApplyLanguage=window.applyLanguage;
  if(typeof originalApplyLanguage==='function'){
    window.applyLanguage=function(){
      originalApplyLanguage.apply(this,arguments);
      fixNavLabels();
      const current=body.dataset.aerisMode||'information';
      navLinks.forEach((a,i)=>a.classList.toggle('active',['information','game','chatbot'][i]===current));
    };
  }

  fixNavLabels();
  activate('information',false);
})();
