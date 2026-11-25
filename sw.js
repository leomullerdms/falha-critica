// Falha Crítica: serve a versão do código como página normal quando ela está ativa neste aparelho.
const C='fc-orig-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.mode!=='navigate'||r.method!=='GET')return;
 const sc=new URL(self.registration.scope),u=new URL(r.url);
 if(u.origin!==sc.origin||!(u.pathname===sc.pathname||u.pathname===sc.pathname+'index.html'))return;
 e.respondWith((async()=>{
  const c=await caches.open(C),kh=new URL('fc-orig.html',sc).href,kt=new URL('fc-orig.tok',sc).href;
  const o=await c.match(kh);if(!o)return fetch(r);
  let net=null;try{net=await fetch(u.href,{cache:'no-cache',credentials:'same-origin'})}catch(x){}
  if(!net||!net.ok)return o;
  let tv='';try{const tk=await c.match(kt);tv=tk?await tk.text():''}catch(x){}
  const m=(await net.clone().text()).match(/var TOK='(\w+)'/);
  if(m&&m[1]===tv)return o;
  await c.delete(kh);return net})())});
