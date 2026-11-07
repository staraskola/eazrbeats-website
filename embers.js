// /embers: WebGL magma background, HEAT counter and the sound loop. Markup in tools/gen_pages.py, styles in embers.css.
(()=>{
/* Background: the real ember texture from the poster as slowly flowing magma (WebGL).
   It breathes, flows, heat waves wander through it, it flares on every kick and flashes on the drop. */
const cv=document.getElementById('world');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let scrollF=0,px=.5,tx=.5;
addEventListener('pointermove',e=>{tx=e.clientX/innerWidth},{passive:true});
const G={g0:null,b0:null,gx:0,gy:0};let GX=0,GY=0;
function onTilt(e){if(e.gamma==null||e.beta==null)return;if(G.g0===null){G.g0=e.gamma;G.b0=e.beta}
  G.g0+=(e.gamma-G.g0)*.006;G.b0+=(e.beta-G.b0)*.006;G.gx=Math.tanh((e.gamma-G.g0)/32);G.gy=Math.tanh((e.beta-G.b0)/32)}
const DOE=window.DeviceOrientationEvent;
if(DOE&&typeof DOE.requestPermission==='function'){const ask=()=>{removeEventListener('click',ask,true);removeEventListener('touchend',ask,true);
  DOE.requestPermission().then(st=>{if(st==='granted')addEventListener('deviceorientation',onTilt)}).catch(()=>{})};
  addEventListener('click',ask,true);addEventListener('touchend',ask,true);}
else if(DOE)addEventListener('deviceorientation',onTilt);
const gl=cv.getContext('webgl',{antialias:false,alpha:false});
if(!gl){cv.style.background='#050403 url(embers-glut.jpg) center/cover';cv.style.opacity=.5;return}
const VS='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
const FS=`precision mediump float;
uniform sampler2D T;uniform vec2 R,off;uniform float t,k,fl,br,ht;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/R;vec2 p=uv-.5;p.x*=R.x/R.y;
  float z=.78-.035*sin(t*.42)-.025*k;            // breathing: slowly pulls in and out, a nudge on the kick
  vec2 q=p*z+off;
  vec2 w=vec2(fbm(q*2.2+vec2(0.,t*.05)),fbm(q*2.2+vec2(5.2,1.3-t*.04)));
  q+= (w-.5)*.045;                                 // magma flow / heat shimmer
  q.y-=t*.006;                                     // slow drift
  vec3 c=texture2D(T,q+.5).rgb;
  float L=dot(c,vec3(.45,.45,.1));
  float wave=fbm(p*1.4+vec2(t*.03,-t*.11));        // heat wave wandering through the cracks
  float I=L*(.35+ .9*wave*wave + .55*k + .9*fl)*br*ht;
  vec3 col=mix(vec3(.10,.012,0.),vec3(.95,.25,.03),smoothstep(.02,.42,I));
  col=mix(col,vec3(1.,.62,.22),smoothstep(.42,.85,I));
  col=mix(col,vec3(1.,.9,.7),smoothstep(.85,1.3,I));
  col*=smoothstep(0.,.12,I)*.9+.1*L;
  float v=smoothstep(1.15,.25,length(p*vec2(.9,1.)));
  gl_FragColor=vec4(col*v,1.);
}`;
function sh(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(s);return s}
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);gl.useProgram(pr);
const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
const al=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(al);gl.vertexAttribPointer(al,2,gl.FLOAT,false,0,0);
const U={};['T','R','off','t','k','fl','br','ht'].forEach(n=>U[n]=gl.getUniformLocation(pr,n));
const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,1,1,0,gl.RGB,gl.UNSIGNED_BYTE,new Uint8Array([10,2,0]));
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.MIRRORED_REPEAT);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
let ready=false;const img=new Image();img.onload=()=>{gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,img);ready=true};img.crossOrigin='anonymous';img.src='embers-glut.jpg';
function size(){const d=Math.min(devicePixelRatio||1,1.5);cv.width=Math.round(innerWidth*d);cv.height=Math.round(innerHeight*d);gl.viewport(0,0,cv.width,cv.height)}
size();addEventListener('resize',size);
const root=document.documentElement.style;const BPM=126.41,beat=60/BPM;let t0=performance.now(),flash=0,lastBrk=false,brN=1,kf=1;
function frame(now){
  const t=(now-t0)/1000;px+=(tx-px)*.03;GX+=(G.gx-GX)*.04;GY+=(G.gy-GY)*.04;
  const ap=window.__emAudio&&window.__emAudio();const ph=ap?ap.ph:(t%beat)/beat,brk=!!(ap&&ap.brk);
  {const v=ap&&ap.voc;kf+=((v?0:1)-kf)*(v?.05:.3)}                      // the vocal part: pulse fades out, the magma just flows
  const kick=ap?Math.pow(1-ph,4)*Math.max(.3,Math.min(1,ap.k*1.15))*kf:Math.pow(1-ph,4)*.35; // kicks + claps; soft heartbeat in breaks   // without sound: a soft heartbeat
  if(lastBrk&&!brk)flash=1;lastBrk=brk;flash*=.94;brN+=((brk?.75:1)-brN)*.02;
  gl.uniform1i(U.T,0);gl.uniform2f(U.R,cv.width,cv.height);
  gl.uniform2f(U.off,(px-.5)*.05-GX*.035,-GY*.022);
  gl.uniform1f(U.t,reduce?0:t);gl.uniform1f(U.k,kick);gl.uniform1f(U.fl,flash);gl.uniform1f(U.br,ready?brN:0);gl.uniform1f(U.ht,.85+scrollF*.45);
  gl.drawArrays(gl.TRIANGLES,0,3);
  root.setProperty('--k',(kick+flash*.6).toFixed(3));
  if(!reduce||!ready)requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
const tEl=document.getElementById('temp'),foot=document.getElementById('foot');
function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;scrollF=max>0?scrollY/max:0;
  tEl.textContent=String(Math.round(600+scrollF*600)).padStart(4,'0');foot.classList.toggle('on',scrollF>.97);}
addEventListener('scroll',onScroll,{passive:true});onScroll();
})();
/* Sound: "Fire in the Soul" by DreamsMaker (Pixabay Content License), looped. The background reads a pre-computed beat grid
   (126.41 BPM, kick strength per beat) so the magma flares exactly on the track's kicks and calms down in its breaks. */
(()=>{
  const BEAT=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.0, 0.01, 0.0, 0.0, 0.01, 0.01, 0.01, 0.01, 0.02, 0.03, 0.07, 0.09, 0.1, 0.41, 0.24, 0.15, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.01, 0.01, 0.0, 0.0, 0.0, 0.0, 0.01, 0.01, 0.0, 0.0, 0.01, 0.0, 0.0, 0.0, 0.01, 0.01, 0.01, 0.0, 0.0, 0.0, 0.01, 0.2, 0.15, 0.04, 0.06, 0.04, 0.02, 0.01, 0.04, 0.01, 0.01, 0.01, 0.03, 0.02, 0.01, 0.01, 0.04, 0.02, 0.02, 0.01, 0.03, 0.02, 0.01, 0.01, 0.02, 0.01, 0.01, 0.01, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.55, 0.66, 0.52, 0.61, 0.55, 0.78, 0.55, 0.8, 0.57, 0.8, 0.48, 0.85, 0.45, 0.81, 0.5, 0.85, 0.43, 0.84, 0.47, 0.76, 0.42, 0.8, 0.42, 0.81, 0.42, 0.72, 0.45, 0.76, 0.39, 0.7, 0.06, 0.01, 0.44, 0.64, 0.41, 0.63, 0.35, 0.65, 0.36, 0.56, 0.32, 0.45, 0.3, 0.42, 0.41, 0.57, 0.62, 0.78, 0.8, 0.86, 0.92, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.05, 0.01, 0.02, 0.01, 0.01, 0.0, 0.0, 0.0, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.53, 0.28, 0.08, 0.01, 0.0, 0.0, 0.0, 0.0, 0.52, 0.27, 0.09, 0.01, 0.01, 0.0, 0.0, 0.0, 0.51, 0.26, 0.07, 0.01, 0.0, 0.0, 0.0, 0.0, 0.45, 0.24, 0.06, 0.01, 0.0, 0.0, 0.0, 0.63, 0.74, 0.82, 0.9, 0.91, 1.0, 1.0, 0.03, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.95, 0.88, 0.77, 0.79, 0.74, 0.69, 0.63, 0.0, 0.7, 0.7, 0.66, 0.66, 0.67, 0.67, 0.62, 0.1, 0.64, 0.62, 0.62, 0.56, 0.62, 0.68, 0.6, 0.66, 0.57, 0.66, 0.54, 0.73, 0.52, 0.71, 0.48, 0.74, 0.46, 0.7, 0.42, 0.73, 0.47, 0.69, 0.44, 0.7, 0.46, 0.72, 0.42, 0.7, 0.41, 0.62, 0.38, 0.54, 0.22, 0.28, 0.18, 0.23, 0.15, 0.2, 0.12, 0.2, 0.07, 0.21, 0.08, 0.16, 0.13, 0.3, 0.33, 0.39, 0.43, 0.48, 0.63, 0.6, 0.66, 0.85, 0.83, 0.98, 0.99, 1.0, 0.96, 0.98, 1.0, 0.98, 0.99, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.63, 0.58, 0.56, 0.58, 0.59, 0.58, 0.59, 0.54, 0.56, 0.55, 0.56, 0.65, 0.49, 0.69, 0.52, 0.73, 0.46, 0.73, 0.49, 0.72, 0.47, 0.69, 0.44, 0.77, 0.43, 0.71, 0.06, 0.04, 0.44, 0.72, 0.41, 0.69, 0.38, 0.71, 0.36, 0.54, 0.37, 0.64, 0.34, 0.55, 0.33, 0.51, 0.3, 0.49, 0.28, 0.46, 0.27, 0.45, 0.29, 0.44, 0.42, 0.57, 0.59, 0.6, 0.7, 0.75, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],BPM=126.41,T0=0.064,BEAT_S=60/BPM;
  const CLAP=[0.0,0.0,0.01,0.09,0.01,0.0,0.0,0.0,0.04,0.0,0.0,0.0,0.06,0.0,0.0,0.0,0.07,0.0,0.09,0.46,0.46,0.71,0.53,0.66,0.16,0.51,0.2,0.48,0.53,0.59,0.71,0.44,0.01,0.13,0.11,0.06,0.01,0.13,0.08,0.0,0.0,0.09,0.06,0.17,0.0,0.03,0.05,0.0,0.0,0.0,0.82,0.0,0.0,0.0,0.14,0.0,0.0,0.0,0.04,0.0,0.0,0.22,0.0,0.37,0.39,0.62,0.39,0.39,0.6,0.74,0.55,0.92,0.51,0.56,0.63,0.44,0.18,0.0,0.12,0.01,0.0,0.0,0.02,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1,0.0,0.39,0.54,0.32,0.41,0.23,0.06,0.56,0.12,0.71,0.45,0.85,0.4,0.88,0.45,0.66,0.24,0.87,0.48,0.78,0.35,0.73,0.54,0.69,0.22,0.12,0.01,0.15,0.08,0.04,0.03,0.01,0.05,0.0,0.0,0.6,1.0,1.0,0.97,1.0,1.0,1.0,1.0,0.76,1.0,1.0,0.99,1.0,0.79,1.0,1.0,0.71,1.0,0.47,0.01,0.0,0.0,0.0,0.0,0.01,0.0,0.0,0.39,0.0,0.07,0.04,0.01,0.0,0.04,0.14,0.0,0.0,0.43,0.13,0.08,0.03,0.0,0.09,0.07,0.11,0.06,0.13,0.12,0.11,0.27,0.02,0.13,0.07,0.12,0.1,0.09,0.16,0.29,0.1,0.03,0.11,0.09,0.0,0.04,0.02,0.22,0.06,0.0,0.0,0.0,0.0,0.02,0.05,0.24,0.1,0.01,0.0,0.0,0.1,0.03,0.09,0.03,0.01,0.01,1.0,0.0,0.35,0.11,0.0,0.05,0.01,0.06,1.0,1.0,1.0,0.84,1.0,0.47,0.06,0.07,0.0,0.03,0.01,0.0,0.01,0.0,0.0,0.0,0.01,0.02,0.12,0.35,0.39,0.81,0.57,0.64,0.59,0.53,0.4,0.61,0.62,0.94,0.74,0.79,0.31,0.68,0.27,0.7,0.33,0.45,0.3,0.01,0.42,0.04,0.6,0.11,0.36,0.27,0.41,0.36,0.44,0.26,0.4,0.14,0.33,0.2,0.41,0.31,0.33,0.31,0.09,0.02,0.07,0.0,0.11,0.03,0.0,0.0,0.11,0.0,0.71,0.85,0.33,0.45,0.33,0.31,0.46,0.44,0.4,0.47,0.42,0.27,0.4,0.4,0.53,0.5,0.34,0.09,0.08,0.06,0.03,0.01,0.04,0.01,0.0,0.01,0.0,0.18,0.03,0.0,0.0,0.0,0.0,0.43,0.0,0.54,0.53,0.64,0.33,0.15,0.86,0.41,0.77,0.38,0.42,0.24,0.41,0.21,0.36,0.17,0.0,0.59,0.49,0.67,0.38,0.47,0.39,0.54,0.29,0.55,0.5,0.72,0.37,0.54,0.57,0.46,0.03,0.37,0.29,0.19,0.2,0.12,0.0,0.05,0.0,0.0,0.0,0.0,0.08,0.69,0.84,0.96,0.98,0.88,1.0,0.79,1.0,0.86,0.78,1.0,0.88,0.94,1.0,0.74,0.93,0.0,0.0,0.0,0.0,0.0,0.0]; // clap/percussion strength per beat (1.2-6 kHz onsets)
  const VOC=[[15.2,30.2],[78,93]]; // seconds: the vocal part where the magma stays still (times from Noah)
  const btn=document.getElementById('snd'),lbl=document.getElementById('sndl');
  let ctx=null,buf=null,src=null,gain=null,on=false,startAt=0,loading=null,quiet=0,lastIdx=-1;
  try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
  function load(){if(loading)return loading;lbl.textContent='LOADING …';
    loading=fetch('embers-fire-in-the-soul.mp3').then(r=>r.arrayBuffer()).then(ab=>new Promise((ok,no)=>ctx.decodeAudioData(ab,ok,no))).then(b=>{buf=b;return b});return loading}
  window.__emAudio=()=>{if(!on||!src)return null;const pos=((ctx.currentTime-startAt)%buf.duration+buf.duration)%buf.duration-T0;if(pos<0)return null;
    const i=Math.floor(pos/BEAT_S),voc=VOC.some(([a,b])=>pos+T0>=a&&pos+T0<b),k=voc?0:Math.max(BEAT[i]??0,(CLAP[i]??0)*.8);
    if(i!==lastIdx){const nx=Math.max(BEAT[i+1]??0,(CLAP[i+1]??0)*.8);quiet=(k<.3||nx<.3)?quiet+1:0;lastIdx=i} // single kicks pulse, but only a running groove counts as the beat coming back (flash)
    return {ph:(pos/BEAT_S)%1,brk:quiet>=6,k:k,voc:voc}};
  async function start(){
    if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC){lbl.textContent='NO AUDIO';return}ctx=new AC();gain=ctx.createGain();gain.gain.value=0;gain.connect(ctx.destination)}
    ctx.resume();on=true;btn.classList.add('on');btn.setAttribute('aria-pressed','true');
    try{await load()}catch(e){lbl.textContent='NO AUDIO';on=false;return}
    if(!on)return;
    if(!src){src=ctx.createBufferSource();src.buffer=buf;src.loop=true;src.connect(gain);startAt=ctx.currentTime+.05;src.start(startAt)}
    gain.gain.cancelScheduledValues(ctx.currentTime);gain.gain.setValueAtTime(gain.gain.value,ctx.currentTime);gain.gain.linearRampToValueAtTime(.85,ctx.currentTime+3);
    lbl.textContent='SOUND ON';}
  function stop(){on=false;if(ctx&&gain){gain.gain.cancelScheduledValues(ctx.currentTime);gain.gain.setValueAtTime(gain.gain.value,ctx.currentTime);gain.gain.linearRampToValueAtTime(0,ctx.currentTime+.6);
    setTimeout(()=>{if(!on)ctx.suspend()},700)}
    btn.classList.remove('on');btn.setAttribute('aria-pressed','false');lbl.textContent='SOUND OFF';}
  let touched=false;
  btn.addEventListener('click',e=>{e.stopPropagation();touched=true;on?stop():start()});
  const first=e=>{if(touched)return;touched=true;if(!e.target.closest('a,input,button'))start();removeEventListener('pointerdown',first,true);removeEventListener('keydown',first,true)};
  addEventListener('pointerdown',first,true);addEventListener('keydown',first,true);
})();
