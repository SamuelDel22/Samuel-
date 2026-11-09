/* ===== CAUCA GUARDIANS SOUND ENGINE =====
   Short Web Audio effects; no external audio files required.
*/
let fxCtx=null, fxMaster=null, soundFXOn=true;
const fxButton=document.getElementById("soundFX");

function ensureFX(){
  if(!soundFXOn) return null;
  if(!fxCtx){
    fxCtx=new (window.AudioContext||window.webkitAudioContext)();
    fxMaster=fxCtx.createGain();
    fxMaster.gain.value=.16;
    fxMaster.connect(fxCtx.destination);
  }
  if(fxCtx.state==="suspended") fxCtx.resume();
  return fxCtx;
}
function tone(freq,duration=.09,type="sine",volume=.08,delay=0){
  const c=ensureFX(); if(!c)return;
  const now=c.currentTime+delay;
  const o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.setValueAtTime(freq,now);
  g.gain.setValueAtTime(0.0001,now);
  g.gain.exponentialRampToValueAtTime(volume,now+.012);
  g.gain.exponentialRampToValueAtTime(.0001,now+duration);
  o.connect(g);g.connect(fxMaster);o.start(now);o.stop(now+duration+.03);
}
function noise(duration=.08,volume=.04,delay=0){
  const c=ensureFX(); if(!c)return;
  const len=Math.max(1,Math.floor(c.sampleRate*duration));
  const b=c.createBuffer(1,len,c.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*(1-i/len);
  const s=c.createBufferSource(),g=c.createGain(),now=c.currentTime+delay;
  s.buffer=b;g.gain.setValueAtTime(volume,now);
  g.gain.exponentialRampToValueAtTime(.0001,now+duration);
  s.connect(g);g.connect(fxMaster);s.start(now);
}
function playFX(kind){
  if(!soundFXOn)return;
  if(kind==="select"){tone(520,.055,"sine",.055);tone(760,.045,"sine",.035,.035)}
  if(kind==="correct"){tone(523,.11,"sine",.075);tone(659,.13,"sine",.075,.08);tone(784,.19,"sine",.09,.17)}
  if(kind==="wrong"){tone(220,.12,"triangle",.065);tone(175,.18,"triangle",.05,.10)}
  if(kind==="next"){tone(330,.06,"sine",.04);tone(440,.08,"sine",.04,.05)}
  if(kind==="relic"){
    tone(392,.12,"sine",.075);tone(523,.12,"sine",.075,.10);
    tone(659,.14,"sine",.08,.20);tone(988,.25,"sine",.09,.32);noise(.12,.018,.32)
  }
  if(kind==="level"){
    [392,494,587,784].forEach((n,j)=>tone(n,.18,"sine",.07,j*.09))
  }
  if(kind==="win"){
    [392,494,587,659,784,988].forEach((n,j)=>tone(n,.22,"sine",.075,j*.105));
    noise(.22,.025,.48)
  }
  if(kind==="water"){
    noise(.16,.018);tone(294,.16,"sine",.035,.02);tone(392,.22,"sine",.04,.13)
  }
}
if(fxButton){
  fxButton.addEventListener("click",()=>{
    soundFXOn=!soundFXOn;
    fxButton.classList.toggle("off",!soundFXOn);
    fxButton.textContent=soundFXOn?"SFX":"OFF";
    if(soundFXOn){playFX("select");showToast(window.I18N?.[window.currentLang]?.toast?.soundsOn || "Game sounds on ✦")}
    else showToast(window.I18N?.[window.currentLang]?.toast?.soundsOff || "Game sounds off");
  });
}

/* Small toast helper used by the sound buttons. */
function showToast(msg){
  const el=document.getElementById("toast"); if(!el)return;
  el.textContent=msg; el.classList.add("show");
  clearTimeout(window.__aerisToast); window.__aerisToast=setTimeout(()=>el.classList.remove("show"),2200);
}

/* Give the first user interaction a tiny water cue, if sounds are enabled. */
let firstWaterCue=true;
document.addEventListener("pointerdown",()=>{
  if(firstWaterCue){firstWaterCue=false;playFX("water")}
},{once:true});
