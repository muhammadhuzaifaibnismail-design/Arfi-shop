const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const fmt=n=>"Rs. "+Number(n).toLocaleString("en-US");
const gp=id=>P.find(p=>p.id==id);
const BS=()=>window.BASE||"",pu=p=>BS()+(p.s||p.id),cu=c=>BS()+c[3],gu=k=>BS()+PG[k];
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const ld=()=>{try{return JSON.parse(localStorage.getItem("arfi_cart")||"[]")}catch(e){return[]}};
const sv=c=>{try{localStorage.setItem("arfi_cart",JSON.stringify(c))}catch(e){}badge()};
const badge=()=>{const n=ld().reduce((s,l)=>s+l.q,0),b=$("#cb");if(b){b.textContent=n;b.style.display=n?"block":"none"}};
const toast=t=>{const e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),1800)};
const lp=l=>gp(l.id).v[l.v][1];
const md=t=>t.split(/\n{2,}/).map(b=>b.startsWith('# ')?'<h3>'+b.slice(2)+'</h3>':b.startsWith('- ')?'<ul>'+b.split('\n').map(l=>'<li>'+l.replace(/^- /,'')+'</li>').join('')+'</ul>':'<p>'+b.replace(/\n/g,'<br>')+'</p>').join('').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const desc=p=>p.t?md(p.t):'';
function add(id,v,q){const c=ld(),l=c.find(x=>x.id==id&&x.v==v);l?l.q+=q:c.push({id,v,q});sv(c);toast("✔ کارٹ میں شامل ہو گیا")}
function card(p,rb){const pr=p.v[0][1],n=(p.r||[]).length;return`<a class=pc href="${pu(p)}"><div class=im>${p.img?`<img src=${p.img} alt="${p.n}" loading=lazy>`:""}${rb&&n?`<span class=rb>★ ${n}</span>`:""}</div><h3>${p.n}</h3><div class=pr>${pr?(p.v.length>1?"From ":"")+fmt(pr):""}</div></a>`}
function calc(c,code,pay){
 const sub=c.reduce((s,l)=>s+lp(l)*l.q,0),n=c.reduce((s,l)=>s+l.q,0);
 const multi=Math.min(sub,Math.max(0,n-1)*100);let a=sub-multi;
 const cp=code?Math.round(a*code.pct/100):0;a-=cp;
 const adv=pay=="adv"?Math.round(a*.05):0;a-=adv;
 return{sub,n,multi,cp,adv,total:a}}
const IC={wa:'<svg viewBox="0 0 24 24"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.09.55 4.13 1.59 5.93L0 24l6.35-1.66a11.87 11.87 0 0 0 5.7 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.42-8.43zM12.06 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.77.99 1.01-3.67-.24-.38a9.87 9.87 0 0 1-1.51-5.27c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.92-9.9 9.92zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/></svg>',
fb:'<svg viewBox="0 0 24 24"><path d="M13.5 22v-8.2h2.8l.5-3.4h-3.3V8.3c0-1 .4-1.7 1.8-1.7h1.6V3.5c-.3 0-1.300-.2-2.500-.2-2.500 0-4.200 1.500-4.200 4.300v2.800H7.400v3.400h2.800V22z"/></svg>',
ig:'<svg class=ln viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
tt:'<svg viewBox="0 0 24 24"><path d="M16.6 2h-3.2v13.2a2.700 2.700 0 1 1-2.700-2.700c.3 0 .6 0 .8.100V9.300a6 6 0 1 0 5.100 5.900V8.800a7.400 7.400 0 0 0 4.300 1.400V7a4.300 4.300 0 0 1-4.300-5z"/></svg>'};
function lay(){
 const mi=[[BS()||"./","🏠 ہوم"],...CATS.map(c=>[cu(c),c[2]+" "+c[1]]),[gu("diseases"),"📖 بیماریاں اور ان کے علاج"],[gu("about"),"ℹ️ ہمارا تعارف"],[gu("terms"),"📄 شرائط و ضوابط"]];
 document.body.insertAdjacentHTML("afterbegin",`<div class=top>🚚 پورے پاکستان میں فری ہوم ڈیلیوری</div><header><button class=mb id=mb aria-label="مینیو"><i></i><i></i><i></i></button><a href="${BS()||'./'}" class=lg><img src=logo.webp alt="عارفی دارالشفاء"></a><a class=cartb href="${gu('cart')}" aria-label="کارٹ">🛒<b id=cb></b></a><div class=sb><svg viewBox="0 0 24 24" class=si><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id=sq type=search placeholder="پروڈکٹ کا نام تلاش کریں…" autocomplete=off enterkeyhint=search aria-label="پروڈکٹ تلاش کریں"><div class=sg id=sg></div></div></header><div class=dr id=dr><div class=dp><button class=dx id=dx aria-label="بند کریں">×</button><img src=logo.webp alt="" style="height:44px;margin:0 16px"><nav>${mi.map(m=>`<a href="${m[0]}">${m[1]}</a>`).join("")}</nav></div></div>`);
 const op=v=>$("#dr").classList.toggle("on",v);$("#mb").onclick=()=>op(1);$("#dx").onclick=()=>op(0);$("#dr").onclick=e=>{if(e.target.id=="dr")op(0)};
 const so=(h,i,l)=>`<a href="${h}" target=_blank rel=noopener aria-label="${l}">${IC[i]}</a>`;
 document.body.insertAdjacentHTML("beforeend",`<footer><div class=fw><div class=fb><img src=logo.webp alt=""><p>خالص جڑی بوٹیوں سے تیار کردہ ادویات، پورے پاکستان میں ہوم ڈیلیوری کے ساتھ۔</p><div class=so>${so(wa("I'm From www.arfidarushifa.pk"),"wa","WhatsApp")}${so("https://www.facebook.com/arfidarushifa/","fb","Facebook")}${so("https://www.instagram.com/arfidarushifa/","ig","Instagram")}${so("https://www.tiktok.com/@arfi_darushifa","tt","TikTok")}</div></div>
 <div class=fc><h4>ادویات</h4>${CATS.map(c=>`<a href="${cu(c)}">${c[1]}</a>`).join("")}<a href="${gu('diseases')}">بیماریاں اور علاج</a></div>
 <div class=fc><h4>معلومات</h4><a href="${gu('about')}">ہمارا تعارف</a><a href="${gu('terms')}">شرائط و ضوابط</a><a href="${gu('cart')}">میرا کارٹ</a></div>
 <div class=fc><h4>رابطہ</h4><a href="${wa("میں آپ سے رابطہ کرنا چاہتا ہوں")}" target=_blank>واٹس ایپ: <bdi dir=ltr>0311-1307530</bdi></a><span>ہفتہ تا جمعرات<br>صبح 9 تا شام 5 بجے</span></div></div>
 <div class=fp><span>💵 کیش آن ڈیلیوری</span><span>🚚 فری ہوم ڈیلیوری</span><span>🌿 100% ہربل</span></div><div class=cr>© عارفی دارالشفاء — جملہ حقوق محفوظ ہیں</div></footer><a class=fab href="${wa("میں اپنی صحت کے متعلق مشورہ کرنا چاہتا ہوں")}" target=_blank>💬 ابھی اپنی صحت کے متعلق مشورہ کریں</a><div id=toast></div>`);
 badge();search();
 try{if(SITE_CODE&&!sessionStorage.getItem("pp")){sessionStorage.setItem("pp",1);setTimeout(popup,800)}}catch(e){}}
function popup(){document.body.insertAdjacentHTML("beforeend",`<div class=ov id=pp><div class=pop><button class=cl onclick="$('#pp').remove()" aria-label="بند کریں">×</button><div style="font-size:2.4rem">🎁</div><b style="font-size:1.3rem;color:#1C352D">ہر آرڈر پر ${CODES[SITE_CODE].pct}% ڈسکاؤنٹ!</b><div>یہ کوڈ چیک آؤٹ پر لگائیں</div><div class=cd>${SITE_CODE}</div><button class="btn wa" id=cp>📋 کوڈ کاپی کریں</button></div></div>`);
 $("#cp").onclick=()=>{const d=()=>{$("#cp").textContent="✔ کاپی ہو گیا";setTimeout(()=>$("#pp")&&$("#pp").remove(),900)};
 navigator.clipboard?navigator.clipboard.writeText(SITE_CODE).then(d,d):d()}}

/* ===== سرچ (صرف پروڈکٹ کا نام) ===== */
const nz=s=>String(s||"").toLowerCase().replace(/[\u064B-\u065F\u0670\u0640\u200c\u200d]/g,"").replace(/[يىېۍێ]/g,"ی").replace(/[ےۓئ]/g,"ی").replace(/[آأإٱ]/g,"ا").replace(/ؤ/g,"و").replace(/ك/g,"ک").replace(/[ةۃۀ]/g,"ہ").replace(/ھ/g,"ہ").replace(/[ذضظ]/g,"ز").replace(/[ثص]/g,"س").replace(/\s+/g," ").trim();
let SI=null;
function sfind(q){q=nz(q);if(!q)return[];if(!SI)SI=P.map(p=>{const n=nz(p.n);return{p,n,w:n.split(" ")}});
 const r=[];for(const x of SI){if(x.n.startsWith(q))r.push([0,x.p]);else if(x.w.some(w=>w.startsWith(q)))r.push([1,x.p]);else if(q.includes(" ")&&x.n.includes(q))r.push([2,x.p])}
 return r.sort((a,b)=>a[0]-b[0]).slice(0,8).map(a=>a[1])}
function search(){const i=$("#sq"),g=$("#sg");if(!i)return;
 const sh=()=>{const v=i.value.trim();if(!v){g.classList.remove("on");return}const r=sfind(v);
  g.innerHTML=r.length?r.map(p=>`<a class=sgi href="${pu(p)}"><span class=sgm>${p.img?`<img src=${p.img} alt="">`:""}</span><span class=sgn>${p.n}</span>${p.v[0][1]?`<b>${fmt(p.v[0][1])}</b>`:""}</a>`).join(""):'<div class=sgo>اس نام کی کوئی پروڈکٹ نہیں ملی</div>';g.classList.add("on")};
 i.addEventListener("input",sh);i.addEventListener("focus",sh);
 i.addEventListener("keydown",e=>{if(e.key=="Enter"){const r=sfind(i.value);if(r.length)location.href=pu(r[0]);e.preventDefault()}else if(e.key=="Escape")g.classList.remove("on")});
 document.addEventListener("click",e=>{if(!e.target.closest(".sb"))g.classList.remove("on")})}
/* ===== فیڈبیک / سوالات ===== */
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
const AV={m:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.2"/><path d="M3.8 21c.4-4.6 3.6-7 8.2-7s7.8 2.4 8.2 7z"/></svg>',f:'<svg viewBox="0 0 24 24"><path d="M12 2.8c-3.4 0-5.4 2.4-5.4 5.7 0 1.4.3 2.6.8 3.5-1.6 1-2.7 2.5-3.2 4.6l-.5 4.6h16.6l-.5-4.6c-.5-2.1-1.6-3.6-3.2-4.6.5-.9.8-2.1.8-3.5 0-3.3-2-5.7-5.4-5.7z"/></svg>'};
const stars=n=>'<span class=rs>'+STAR.repeat(Math.max(1,Math.min(5,n||5)))+'</span>';
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function rvCard(r,tag){return`<div class=rv><div class=rh><span class="av ${r.g=="f"?"f":""}">${AV[r.g=="f"?"f":"m"]}</span><div class=rn>${esc(r.n)}</div>${stars(r.s)}</div>${tag?'<span class=rp>'+esc(tag)+'</span>':''}<div class=rb2>${String(r.t).split(/\n{2,}/).map(x=>'<p class=rt dir=auto>'+esc(x).replace(/\n/g,"<br>")+'</p>').join("")}</div></div>`}
function secHead(t,sub){return`<div class=sh><div class=sa>★ ★ ★ ★ ★</div><h2>${t}</h2><div class=sd><i></i></div>${sub?'<small>'+sub+'</small>':''}</div>`}
function reviewsSec(p){const r=p.r||[];if(!r.length)return"";const av=(r.reduce((s,x)=>s+(x.s||5),0)/r.length).toFixed(1);
 return secHead("کسٹمرز کے فیڈبیک","اس پروڈکٹ کے بارے میں ہمارے کسٹمرز کی رائے")+`<div class=ag><b>${av}</b>${stars(5)}<span>${r.length} کسٹمرز کے تاثرات</span></div><div class=rvs>${r.map(x=>rvCard(x)).join("")}</div>`}
function faqSec(){return secHead("زیادہ پوچھے جانے والے سوالات","آرڈر، ڈیلیوری اور ادائیگی کے بارے میں اکثر پوچھے گئے سوالات")+`<div class=faq>${FAQ.map(f=>`<div class=fq><button class=fqb onclick="fqt(this)"><span>${f[0]}</span><i></i></button><div class=fa><div><p>${f[1]}</p></div></div></div>`).join("")}</div>`}
function fqt(b){const it=b.parentNode,on=it.classList.contains("on");$$(".fq.on").forEach(x=>x.classList.remove("on"));if(!on)it.classList.add("on")}
