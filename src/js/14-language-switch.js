(function(){
  'use strict';
  function boot(){
    const old=document.getElementById('langSwitch');
    if(!old || old.dataset.v59Bound==='1') return;
    /* Remove every legacy click handler attached by previous language patches. */
    const btn=old.cloneNode(true);
    btn.dataset.v59Bound='1';
    old.replaceWith(btn);

    function refresh(){
      try{ if(typeof window.applyLanguage==='function') window.applyLanguage(); }catch(e){}
      try{ if(typeof window.AERIS_V46_APPLY_LANGUAGE==='function') window.AERIS_V46_APPLY_LANGUAGE(); }catch(e){}
      try{ if(typeof window.AERIS_V47_APPLY_LANGUAGE==='function') window.AERIS_V47_APPLY_LANGUAGE(); }catch(e){}
      try{ if(typeof window.updateAlt==='function') window.updateAlt(); }catch(e){}
      try{ if(typeof window.updateFooterLinks==='function') window.updateFooterLinks(); }catch(e){}
      try{ if(typeof window.aiRenderSuggestions==='function') window.aiRenderSuggestions(); }catch(e){}
      try{ if(typeof window.aiWelcome==='function' && document.getElementById('aiChat')?.children.length===0) window.aiWelcome(); }catch(e){}
      document.documentElement.lang=window.currentLang==='es'?'es':'en';
      try{ window.dispatchEvent(new Event('aeris:language')); }catch(e){}
      const es=window.currentLang==='es';
      btn.textContent=es?'🇺🇸 English':'🇪🇸 Español';
      btn.setAttribute('aria-label',es?'Cambiar a inglés':'Cambiar a español');
      btn.setAttribute('title',es?'Switch to English':'Switch to Spanish');
    }

    btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      window.currentLang=(window.currentLang||'en')==='en'?'es':'en';
      /* Keep the legacy language variable synchronized when it exists. */
      try{ if(typeof lang!=='undefined') lang=window.currentLang; }catch(e){}
      refresh();
    },true);

    /* Always open in English. */
    window.currentLang='en';
    try{ if(typeof lang!=='undefined') lang='en'; }catch(e){}
    refresh();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
