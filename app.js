const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const fmt=n=>"Rs. "+Number(n).toLocaleString("en-US");
const gp=id=>P.find(p=>p.id==id);
const BS=()=>window.BASE||"",pu=p=>BS()+(p.s||p.id),cu=c=>BS()+c[3],gu=k=>BS()+PG[k];
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const ld=()=>{try{return JSON.parse(localStorage.getItem("arfi_cart")||"[]")}catch(e){return[]}};
const sv=c=>{try{localStorage.setItem("arfi_cart",JSON.stringify(c))}catch(e){}badge()};
const badge=()=>{const n=ld().reduce((s,l)=>s+l.q,0),b=$("#cb");if(b){b.textContent=n;b.style.display=n?"block":"none"}};
const toast=t=>{const e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),1800)};
/* ===== سیل (پوری سائٹ یا مخصوص پروڈکٹس) ===== */
const saleAct=s=>!!(s&&s.on!==false&&Number(s.pct)>0&&(!s.end||new Date(s.end)>new Date()));
function saleOf(p){if(!p||!p.v||!p.v.some(v=>v[1]>0))return null;const S=(typeof DSALE!=="undefined"&&DSALE)||{},it=(S.items||[]).find(x=>x.id==p.id&&saleAct(x));if(it)return it;return saleAct(S.site)?S.site:null}
const siteSaleOn=()=>{const S=(typeof DSALE!=="undefined"&&DSALE)||{};return saleAct(S.site)};
const sp=(p,pr)=>{const s=saleOf(p);return s&&pr?Math.round(pr*(100-Number(s.pct))/100):pr};
const lp=l=>{const p=gp(l.id);return sp(p,p.v[l.v][1])};
const dlab=o=>o.type=="flat"?fmt(o.val):o.val+"%";
const md=t=>t.split(/\n{2,}/).map(b=>b.startsWith('# ')?'<h3>'+b.slice(2)+'</h3>':b.startsWith('- ')?'<ul>'+b.split('\n').map(l=>'<li>'+l.replace(/^- /,'')+'</li>').join('')+'</ul>':'<p>'+b.replace(/\n/g,'<br>')+'</p>').join('').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const desc=p=>p.t?md(p.t):'';
function add(id,v,q){const c=ld(),l=c.find(x=>x.id==id&&x.v==v);l?l.q+=q:c.push({id,v,q});sv(c);toast("✔ کارٹ میں شامل ہو گیا")}
function card(p,rb){const S=saleOf(p),o=p.v[0][1],pr=S?sp(p,o):o,n=(p.r||[]).length;return`<a class=pc href="${pu(p)}"><div class=im>${p.img?`<img src=${p.img} alt="${p.n}" loading=lazy>`:""}${rb&&n?`<span class=rb>★ ${n}</span>`:""}${S?`<span class=sbd>${S.pct}% OFF</span>`:""}</div><h3>${p.n}</h3><div class=pr>${pr?(p.v.length>1?"From ":"")+(S?`<s class=op>${fmt(o)}</s> `:"")+fmt(pr):""}</div></a>`}
function calc(c,code,pay){
 const orig=c.reduce((s,l)=>s+gp(l.id).v[l.v][1]*l.q,0),sub=c.reduce((s,l)=>s+lp(l)*l.q,0),n=c.reduce((s,l)=>s+l.q,0),sale=orig-sub;
 const hs=c.some(l=>saleOf(gp(l.id)));
 let a=sub;
 /* ایک وقت میں ایک ہی ڈسکاؤنٹ: سیل والی پروڈکٹ ہو تو کوڈ لاگو نہیں ہوتا */
 const cp=code&&!hs?(code.type=="flat"?Math.min(a,Number(code.val)):Math.round(a*Number(code.val)/100)):0;a-=cp;
 const adv=pay=="adv"?Math.round(a*.05):0;a-=adv;
 return{orig,sub,sale,hs,n,cp,adv,total:a}}
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
 <div class=fp><span>💵 کیش آن ڈیلیوری</span><span>🚚 فری ہوم ڈیلیوری</span><span>🌿 100% ہربل</span></div><div class=cr>© عارفی دارالشفاء — جملہ حقوق محفوظ ہیں</div></footer><button type=button class=fab id=hf aria-label="اپنی صحت کے متعلق مشورہ کریں">اپنی صحت کے متعلق مشورہ کریں</button><div id=toast></div>`);
 badge();search();hfInit();saleCss();
 try{const pc=popCode();if(pc&&!sessionStorage.getItem("pp")){sessionStorage.setItem("pp",1);setTimeout(()=>popup(pc),800)}}catch(e){}}
const popCode=()=>{if(siteSaleOn())return null;return DCODES.find(c=>c.popup&&c.on!==false&&!(c.exp&&new Date(c.exp+"T23:59:59")<new Date()))||null};
function popup(c){document.body.insertAdjacentHTML("beforeend",`<div class=ov id=pp><div class=pop><button class=cl onclick="$('#pp').remove()" aria-label="بند کریں">×</button><div style="font-size:2.4rem">🎁</div><b style="font-size:1.3rem;color:#1C352D">ہر آرڈر پر ${dlab(c)} ڈسکاؤنٹ!</b><div>یہ کوڈ چیک آؤٹ پر لگائیں</div><div class=cd>${c.k}</div><button class="btn wa" id=cp>📋 کوڈ کاپی کریں</button></div></div>`);
 $("#cp").onclick=()=>{const d=()=>{$("#cp").textContent="✔ کاپی ہو گیا";setTimeout(()=>$("#pp")&&$("#pp").remove(),900)};
 navigator.clipboard?navigator.clipboard.writeText(c.k).then(d,d):d()}}

/* ===== سرچ (صرف پروڈکٹ کا نام) ===== */
const nz=s=>String(s||"").toLowerCase().replace(/[\u064B-\u065F\u0670\u0640\u200c\u200d]/g,"").replace(/[يىېۍێ]/g,"ی").replace(/[ےۓئ]/g,"ی").replace(/[آأإٱ]/g,"ا").replace(/ؤ/g,"و").replace(/ك/g,"ک").replace(/[ةۃۀ]/g,"ہ").replace(/ھ/g,"ہ").replace(/[ذضظ]/g,"ز").replace(/[ثص]/g,"س").replace(/\s+/g," ").trim();
let SI=null;
function sfind(q){q=nz(q);if(!q)return[];if(!SI)SI=P.map(p=>{const n=nz(p.n);return{p,n,w:n.split(" ")}});
 const r=[];for(const x of SI){if(x.n.startsWith(q))r.push([0,x.p]);else if(x.w.some(w=>w.startsWith(q)))r.push([1,x.p]);else if(q.includes(" ")&&x.n.includes(q))r.push([2,x.p])}
 return r.sort((a,b)=>a[0]-b[0]).slice(0,8).map(a=>a[1])}
function search(){const i=$("#sq"),g=$("#sg");if(!i)return;
 const sh=()=>{const v=i.value.trim();if(!v){g.classList.remove("on");return}const r=sfind(v);
  g.innerHTML=r.length?r.map(p=>`<a class=sgi href="${pu(p)}"><span class=sgm>${p.img?`<img src=${p.img} alt="">`:""}</span><span class=sgn>${p.n}</span>${p.v[0][1]?`<b>${fmt(sp(p,p.v[0][1]))}</b>`:""}</a>`).join(""):'<div class=sgo>اس نام کی کوئی پروڈکٹ نہیں ملی</div>';g.classList.add("on")};
 i.addEventListener("input",sh);i.addEventListener("focus",sh);
 i.addEventListener("keydown",e=>{if(e.key=="Enter"){const r=sfind(i.value);if(r.length)location.href=pu(r[0]);e.preventDefault()}else if(e.key=="Escape")g.classList.remove("on")});
 document.addEventListener("click",e=>{if(!e.target.closest(".sb"))g.classList.remove("on")})}
/* ===== فیڈبیک / سوالات ===== */
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
const AV={m:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.2"/><path d="M3.8 21c.4-4.6 3.6-7 8.2-7s7.8 2.4 8.2 7z"/></svg>',f:'<svg viewBox="0 0 24 24"><path d="M12 2.8c-3.4 0-5.4 2.4-5.4 5.7 0 1.4.3 2.6.8 3.5-1.6 1-2.7 2.5-3.2 4.6l-.5 4.6h16.6l-.5-4.6c-.5-2.1-1.6-3.6-3.2-4.6.5-.9.8-2.1.8-3.5 0-3.3-2-5.7-5.4-5.7z"/></svg>'};
const stars=n=>'<span class=rs>'+STAR.repeat(Math.max(1,Math.min(5,n||5)))+'</span>';
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function rvCard(r,tag,sl){const lg=sl&&String(r.t).length>150;return`<div class="rv${sl?' rvx':''}"><div class=rh><span class="av ${r.g=="f"?"f":""}">${AV[r.g=="f"?"f":"m"]}</span><div class=rn>${esc(r.n)}</div>${stars(r.s)}</div>${tag?'<span class=rp>'+esc(tag)+'</span>':''}<div class=rb2>${String(r.t).split(/\n{2,}/).map(x=>'<p class=rt dir=auto>'+esc(x).replace(/\n/g,"<br>")+'</p>').join("")}</div>${lg?'<button type=button class=rmb onclick="rmT(this)">مزید پڑھیں ▾</button>':''}</div>`}
function rmT(b){const c=b.closest('.rv'),o=c.classList.toggle('open');b.textContent=o?'کم دکھائیں ▴':'مزید پڑھیں ▾'}
function secHead(t,sub){return`<div class=sh><div class=sa>★ ★ ★ ★ ★</div><h2>${t}</h2><div class=sd><i></i></div>${sub?'<small>'+sub+'</small>':''}</div>`}
function reviewsSec(p){const r=p.r||[];if(!r.length)return"";const av=(r.reduce((s,x)=>s+(x.s||5),0)/r.length).toFixed(1);
 return secHead("کسٹمرز کے فیڈبیک","اس پروڈکٹ کے بارے میں ہمارے کسٹمرز کی رائے")+`<div class=ag><b>${av}</b>${stars(5)}<span>${r.length} کسٹمرز کے تاثرات</span></div>`+(r.length>1?`<div class=rsw><button type=button class="rsb pv" aria-label="پچھلا ریویو" onclick="rsGo(this,-1)" disabled>»</button><div class=rsl onscroll="rsUp(this)">${r.map(x=>rvCard(x,0,1)).join("")}</div><button type=button class="rsb nx" aria-label="اگلا ریویو" onclick="rsGo(this,1)">«</button></div><div class=rsc>1 / ${r.length}</div>`:`<div class=rvs>${r.map(x=>rvCard(x)).join("")}</div>`)}
/* ریویو سلائیڈر: ایک وقت میں ایک ریویو، اردو میں دائیں سے بائیں */
function rsGo(b,d){const el=b.parentNode.querySelector(".rsl"),rtl=getComputedStyle(el).direction=="rtl";el.scrollBy({left:d*(rtl?-1:1)*(el.children[0].offsetWidth+12),behavior:"smooth"})}
function rsUp(el){const w=el.parentNode,k=el.children.length,st=el.children[0].offsetWidth+12,x=Math.abs(el.scrollLeft),i=Math.min(k-1,Math.round(x/st)),c=w.nextElementSibling;w.querySelector(".pv").disabled=x<4;w.querySelector(".nx").disabled=x+el.clientWidth>=el.scrollWidth-4;if(c&&c.classList.contains("rsc"))c.textContent=(i+1)+" / "+k}
function faqSec(){return secHead("زیادہ پوچھے جانے والے سوالات","آرڈر، ڈیلیوری اور ادائیگی کے بارے میں اکثر پوچھے گئے سوالات")+`<div class=faq>${FAQ.map(f=>`<div class=fq><button class=fqb onclick="fqt(this)"><span>${f[0]}</span><i></i></button><div class=fa><div><p>${f[1]}</p></div></div></div>`).join("")}</div>`}
function fqt(b){const it=b.parentNode,on=it.classList.contains("on");$$(".fq.on").forEach(x=>x.classList.remove("on"));if(!on)it.classList.add("on")}

/* ===== صحت کے مشورے کا بٹن اور تشخیصی فارم (مرد / خواتین / عمومی) ===== */
const HY=["ہاں","نہیں"],HYS=["ہاں","نہیں","کبھی کبھی"],HYK=["ہاں","نہیں","کچھ کچھ"];
const hf=(y,q,o,r,s)=>({y,q,o,r,s:s||q});
const hfBasic=g=>["بنیادی معلومات",[hf("t","نام","اپنا مکمل نام لکھیں",1),hf("a","عمر","عمر سالوں میں",1),hf("p","موبائل نمبر","03XXXXXXXXX",1),hf("t","شہر","شہر کا نام",1),hf("t","پیشہ / عمومی مصروفیت","اپنا پیشہ یا عمومی مصروفیت لکھیں",0,"پیشہ")].concat(g?[hf("s","آپ کی جنس",["مرد","عورت"],1,"جنس")]:[])];
const hfHealth=sl=>["عمومی صحت",[hf("s","جسم کیسا ہے؟",["دبلا پتلا","درمیانہ","موٹاپا"],0,"جسم"),hf("s","قد",["چھوٹا","نارمل","لمبا"]),hf("m","درج ذیل امراض میں سے مستقل کسی کی شکایت ہے؟",["نزلہ و زکام","کھانسی","سر درد","کمزوری / تھکاوٹ","شوگر","بلڈ پریشر","ہائی کولیسٹرول / ٹرائی گلیسرائیڈز","یورک ایسڈ","کوئی نہیں"],0,"مستقل شکایت"),hf("s","نیند کیسی ہے؟",sl,0,"نیند")]];
const HF={
m:{t:"مرد حضرات کا تشخیصی فارم",d:"براہِ کرم تمام معلومات درست اور مکمل درج کریں تاکہ آپ کے مرض کی بہتر تشخیص اور رہنمائی کی جا سکے۔",s:[
 hfBasic(0),hfHealth(["صحیح آتی ہے","نیند صحیح نہیں آتی"]),
 ["نیند، مزاج اور عادات",[hf("s","عموماً کتنے گھنٹے آرام کرتے ہیں؟",["4-6 گھنٹے","6-8 گھنٹے","8-10 گھنٹے"],0,"آرام کے گھنٹے"),hf("s","کیا ان دنوں کوئی پریشانی ہے؟",HYK,0,"پریشانی"),hf("m","درج ذیل میں سے کس کی عادت ہے؟",["چائے","کافی","سگریٹ","نسوار","تمام","کسی کی نہیں"],0,"عادات")]],
 ["دل، سانس اور معدہ",[hf("s","معمول سے زیادہ محنت سے دل کی دھڑکن بڑھ جاتی ہے؟",HY,0,"محنت سے دھڑکن بڑھنا"),hf("s","چلنے یا سیڑھیاں چڑھنے سے سانس بے قابو ہو جاتی ہے؟",HY,0,"سانس بے قابو ہونا"),hf("s","عموماً کھٹے یا بدبودار ڈکار آتے ہیں؟",HY,0,"کھٹے/بدبودار ڈکار"),hf("s","بھوک کھل کر لگتی ہے؟",HY,0,"بھوک"),hf("s","سینہ میں جلن اور تیزابیت محسوس ہوتی ہے؟",HYS,0,"سینہ میں جلن/تیزابیت"),hf("s","مرغن کھانوں اور فاسٹ فوڈ کا شوق رکھتے ہیں؟",["ہاں اکثر","نہیں","کبھی کبھی"],0,"مرغن کھانے/فاسٹ فوڈ"),hf("s","کھانا دن میں کتنی مرتبہ کھاتے ہیں؟",["3 مرتبہ","2 مرتبہ"],0,"کھانا"),hf("s","قبض کی عمومی شکایت ہے؟",HY,0,"قبض")]],
 ["پیشاب، آپریشن و خاندانی بیماری",[hf("s","پیشاب دن رات میں کتنی بار آتا ہے؟",["بار بار","بہت کم"],0,"پیشاب کی تعداد"),hf("s","پیشاب کی مقدار کتنی ہوتی ہے؟",["زیادہ","درمیان","کم"],0,"پیشاب کی مقدار"),hf("s","پیشاب کرتے ہوئے جلن ہوتی ہے یا نہیں؟",["ہوتی ہے","نہیں ہوتی"],0,"پیشاب میں جلن"),hf("m","درج ذیل میں سے کوئی سابقہ یا خاندانی مسئلہ ہو تو منتخب کریں",["آپریشن","خاندانی بیماری","کوئی نہیں"],0,"سابقہ/خاندانی مسئلہ"),hf("x","اگر ہوا تو کب اور کس کا، تفصیل لکھیں","تفصیل لکھیں",0,"تفصیل")]],
 ["شادی شدہ حضرات کے لیے",[hf("s","شادی سے مطمئن ہیں؟",HYK,0,"شادی سے مطمئن"),hf("t","شادی کو کتنا عرصہ ہوا؟","عرصہ لکھیں",0,"شادی کو عرصہ"),hf("t","اولاد کتنی ہے؟","اولاد کی تعداد",0,"اولاد")]],
 ["ضعفِ مردمی / مردانہ مسائل",[hf("m","عضو میں درج ذیل میں سے کوئی مسئلہ ہے؟",["ٹیڑھا پن","چھوٹا پن","کمزوری","کوئی نہیں"],0,"عضو کا مسئلہ"),hf("s","نفس میں سختی کی کیفیت کیا ہے؟",["بہت اچھی","اچھی","مناسب","بری","بالکل نہیں"],0,"نفس میں سختی"),hf("s","سرد پانی سے عضو سکڑتا ہے؟",HY,0,"سرد پانی سے سکڑنا"),hf("s","مادہ تولید (منی) کیسا ہے؟",["گاڑھا","پتلا"],0,"مادہ تولید"),hf("m","درج ذیل میں کوئی شکایت ہے؟",["احتلام","جنسی سرد مہری","کوئی نہیں"],0,"شکایت"),hf("s","عضو یا پٹھوں میں درد ہوتا ہے؟",HYS,0,"عضو/پٹھوں میں درد"),hf("s","کمر میں درد ہوتا ہے؟",HYS,0,"کمر درد"),hf("s","سرعتِ انزال (ٹائمنگ) کی شکایت ہے؟",HYS,0,"سرعتِ انزال"),hf("t","احتلام کتنے روز بعد ہوتا ہے؟","دن لکھیں",0,"احتلام کتنے روز بعد"),hf("s","پیشاب کے بعد قطرے آتے ہیں؟",["منی کے","پیشاب کے","کوئی نہیں"],0,"پیشاب کے بعد قطرے"),hf("s","کبھی مشت زنی کی ہے؟",HY,0,"مشت زنی"),hf("s","ہمبستری کے بعد بیوی کو شرمگاہ میں جلن ہوتی ہے؟",HY,0,"ہمبستری کے بعد بیوی کو جلن"),hf("x","مردانہ بیماری یا مرض کے بارے میں تفصیل سے لکھیں","اپنی علامات اور مسئلہ تفصیل سے لکھیں",0,"مرض کی تفصیل")]],
 ["ضروری نوٹ برائے مریض",[hf("t","آپ کے خیال میں ایک ماہ کی ادویات اندازاً کتنی مالیت تک کی ہوں؟","رقم لکھیں",0,"ایک ماہ کی ادویات کا بجٹ"),hf("s","اگر آپ نے اپنا کوئی ٹیسٹ کروایا ہے",HY,0,"ٹیسٹ کروایا")]]]},
f:{t:"خواتین کا تشخیصی فارم",d:"براہِ کرم تمام معلومات درست اور مکمل درج کریں تاکہ بہتر رہنمائی اور تشخیص کی جا سکے۔",s:[
 hfBasic(0),hfHealth(["نیند صحیح آتی ہے","نیند نہیں آتی"]),
 ["مزاج، عادات اور روزمرہ کیفیت",[hf("s","عموماً کتنے گھنٹے آرام کرتی ہیں؟",["4-6 گھنٹے","6-8 گھنٹے","8-10 گھنٹے"],0,"آرام کے گھنٹے"),hf("m","درج ذیل میں سے کس کی عادت ہے؟",["چائے","کافی","سگریٹ","نسوار","کسی کی نہیں"],0,"عادات"),hf("s","کیا غیر معمولی پریشانی یا ذہنی دباؤ ہے؟",["ہے","نہیں"],0,"پریشانی/ذہنی دباؤ"),hf("x","اگر کوئی ذہنی پریشانی، صدمہ یا گھبراہٹ ہو تو تفصیل لکھیں","تفصیل لکھیں",0,"پریشانی کی تفصیل")]],
 ["معدہ، بھوک اور ہاضمہ",[hf("s","بھوک کھل کر لگتی ہے؟",HYS,0,"بھوک"),hf("s","سینہ میں جلن یا تیزابیت محسوس ہوتی ہے؟",HYS,0,"سینہ میں جلن/تیزابیت"),hf("s","مرغن کھانوں یا فاسٹ فوڈ کا شوق ہے؟",["ہاں اکثر","نہیں","کبھی کبھی"],0,"مرغن کھانے/فاسٹ فوڈ"),hf("s","دن میں کتنی مرتبہ کھانا کھاتی ہیں؟",["2 مرتبہ","3 مرتبہ"],0,"کھانا"),hf("s","قبض کی شکایت ہے؟",["ہے","نہیں"],0,"قبض")]],
 ["خواتین کے مخصوص سوالات",[hf("s","کیا ایام صحیح آتے ہیں؟",HY,0,"ایام صحیح آتے ہیں"),hf("s","دورانِ ایام درد رہتا ہے؟",HYS,0,"دورانِ ایام درد"),hf("s","کمر یا پیڑو میں درد رہتا ہے؟",HYS,0,"کمر/پیڑو میں درد"),hf("t","ایام کتنے دن رہتے ہیں؟","مثلاً 5 دن",0,"ایام کے دن"),hf("t","ایام کے خون کا رنگ","رنگ لکھیں",0,"ایام کے خون کا رنگ"),hf("s","کیا لیکوریا / سفید پانی کی شکایت ہے؟",HYS,0,"لیکوریا/سفید پانی"),hf("s","کیا غیر معمولی کمزوری محسوس ہوتی ہے؟",HYS,0,"غیر معمولی کمزوری"),hf("x","اپنی خواتین سے متعلق بیماری یا مسئلہ تفصیل سے لکھیں","تفصیل لکھیں",0,"مسئلے کی تفصیل")]],
 ["شادی شدہ خواتین کے لیے",[hf("s","کیا آپ شادی شدہ ہیں؟",HY,0,"شادی شدہ"),hf("s","شادی سے مطمئن ہیں؟",HYK,0,"شادی سے مطمئن"),hf("t","شادی کو کتنا عرصہ ہوا؟","عرصہ لکھیں",0,"شادی کو عرصہ"),hf("t","اولاد کتنی ہے؟","اولاد کی تعداد",0,"اولاد"),hf("t","سب سے چھوٹے بچے کی عمر کتنی ہے؟","عمر لکھیں",0,"سب سے چھوٹے بچے کی عمر")]],
 ["خاندانی بیماری اور رپورٹس",[hf("m","درج ذیل میں سے اگر کوئی مسئلہ ہوا ہو؟",["آپریشن","خاندانی بیماری","کوئی نہیں"],0,"سابقہ/خاندانی مسئلہ"),hf("x","اگر ہوا تو کب اور کس کا، تفصیل لکھیں","کب ہوا، کس کا تھا، اور مکمل تفصیل لکھیں",0,"تفصیل"),hf("t","آپ کے خیال میں ایک ماہ کی ادویات اندازاً کتنی مالیت تک کی ہوں؟","رقم لکھیں",0,"ایک ماہ کی ادویات کا بجٹ"),hf("s","کوئی لیبارٹری سے ٹیسٹ کروایا ہے؟",HY,0,"لیبارٹری ٹیسٹ")]]]},
g:{t:"عمومی تشخیصی فارم",d:"براہِ کرم تمام معلومات درست اور مکمل درج کریں تاکہ آپ کے مرض کی بہتر تشخیص اور رہنمائی کی جا سکے۔",s:[
 hfBasic(1),hfHealth(["صحیح آتی ہے","صحیح نہیں آتی"]),
 ["نیند، مزاج اور عادات",[hf("s","عموماً کتنے گھنٹے آرام کرتے ہیں؟",["4-6 گھنٹے","6-8 گھنٹے","8-10 گھنٹے"],0,"آرام کے گھنٹے"),hf("s","کیا ان دنوں کوئی پریشانی یا ذہنی دباؤ ہے؟",HYK,0,"پریشانی/ذہنی دباؤ"),hf("m","درج ذیل میں سے کس کی عادت ہے؟",["چائے","کافی","سگریٹ","نسوار","تمام","کسی کی نہیں"],0,"عادات")]],
 ["دل، سانس اور معدہ",[hf("s","معمول سے زیادہ محنت سے دل کی دھڑکن بڑھ جاتی ہے؟",HY,0,"محنت سے دھڑکن بڑھنا"),hf("s","چلنے یا سیڑھیاں چڑھنے سے سانس بے قابو ہو جاتی ہے؟",HY,0,"سانس بے قابو ہونا"),hf("s","عموماً کھٹے یا بدبودار ڈکار آتے ہیں؟",HY,0,"کھٹے/بدبودار ڈکار"),hf("s","بھوک کھل کر لگتی ہے؟",HYS,0,"بھوک"),hf("s","سینہ میں جلن اور تیزابیت محسوس ہوتی ہے؟",HYS,0,"سینہ میں جلن/تیزابیت"),hf("s","مرغن کھانوں اور فاسٹ فوڈ کا شوق ہے؟",["ہاں اکثر","نہیں","کبھی کبھی"],0,"مرغن کھانے/فاسٹ فوڈ"),hf("s","کھانا دن میں کتنی مرتبہ کھاتے ہیں؟",["3 مرتبہ","2 مرتبہ"],0,"کھانا"),hf("s","قبض کی عمومی شکایت ہے؟",HY,0,"قبض")]],
 ["پیشاب، آپریشن و خاندانی بیماری",[hf("s","پیشاب دن رات میں کتنی بار آتا ہے؟",["بار بار","بہت کم"],0,"پیشاب کی تعداد"),hf("s","پیشاب کی مقدار کتنی ہوتی ہے؟",["زیادہ","درمیان","کم"],0,"پیشاب کی مقدار"),hf("s","پیشاب کرتے ہوئے جلن ہوتی ہے یا نہیں؟",["ہوتی ہے","نہیں ہوتی"],0,"پیشاب میں جلن"),hf("m","درج ذیل میں سے کوئی سابقہ یا خاندانی مسئلہ ہو تو منتخب کریں",["آپریشن","خاندانی بیماری","کوئی نہیں"],0,"سابقہ/خاندانی مسئلہ"),hf("x","اگر ہوا تو کب اور کس کا، تفصیل لکھیں","تفصیل لکھیں",0,"تفصیل")]],
 ["مرض کی تفصیل",[hf("x","اپنے مرض یا مسئلے کے متعلق تفصیل سے بتائیں","اپنی علامات اور مسئلہ تفصیل سے لکھیں",1,"مرض کی تفصیل")]],
 ["ضروری نوٹ برائے مریض",[hf("t","آپ کے خیال میں ایک ماہ کی ادویات اندازاً کتنی مالیت تک کی ہوں؟","رقم لکھیں",0,"ایک ماہ کی ادویات کا بجٹ"),hf("s","اگر آپ نے اپنا کوئی ٹیسٹ کروایا ہے",HY,0,"ٹیسٹ کروایا")]]]}};
const HFM=[["m","👨","مردانہ صحت کے متعلق مشورہ کرنا ہے"],["f","👩","عورتوں کے جنسی امراض کے متعلق مشورہ کرنا ہے"],["g","🩺","عام کسی بھی مرض کے بارے میں مشورہ کرنا ہے"]];
let HFS=null;
const hfD=s=>String(s).replace(/[۰-۹]/g,c=>c.charCodeAt(0)-1776).replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632);
const hfPh=s=>{let v=hfD(s).replace(/[\s\-()]/g,"");if(v.startsWith("+92"))v="0"+v.slice(3);else if(/^92\d{10}$/.test(v))v="0"+v.slice(2);return v};
function hfVal(S){/* لازمی خانوں کی جانچ: غلط خانوں کی فہرست (index) واپس کرتا ہے */
 const bad=[];S.f.forEach((f,i)=>{const v=S.a[i],e=v==null||(Array.isArray(v)?!v.length:!String(v).trim());
  if(f.y=="p"){if(!/^03\d{9}$/.test(hfPh(v||"")))bad.push(i)}
  else if(f.y=="a"){const n=Number(hfD(v||"").trim());if(!(n>=1&&n<=120))bad.push(i)}
  else if(f.r&&e)bad.push(i)});return bad}
function hfMsg(S){const F=HF[S.k];let n=0,m="السلام علیکم! میں نے *"+F.t+"* مکمل کیا ہے:\n";
 F.s.forEach(sc=>{const L=[];sc[1].forEach(f=>{const i=n++;let v=S.a[i];if(v==null||(Array.isArray(v)?!v.length:!String(v).trim()))return;
  if(f.y=="p")v=hfPh(v);else if(f.y=="a")v=hfD(v).trim();else if(Array.isArray(v))v=v.join("، ");else v=String(v).trim();L.push(f.s+": "+v)});
  if(L.length)m+="\n*"+sc[0]+"*\n"+L.join("\n")+"\n"});return m.trim()}
function hfCss(){if($("#hfs"))return;document.head.insertAdjacentHTML("beforeend",`<style id=hfs>
.fab{right:14px;bottom:22px;display:flex;align-items:center;gap:6px;padding:3px 16px;font:inherit;font-size:.92rem;line-height:1.9;cursor:pointer;background:linear-gradient(135deg,#1C352D,#2f6b4f);color:#fff;border:2px solid var(--gold);box-shadow:0 6px 18px #0005}
.hfo{position:fixed;inset:0;background:#000b;z-index:120;display:flex;align-items:flex-end;justify-content:center}
.hfx{background:#faf8f1;width:100%;max-width:560px;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;border-radius:22px 22px 0 0;border-top:5px solid var(--l)}
@media(min-width:700px){.hfo{align-items:center}.hfx{border-radius:22px}}
.hfh{display:flex;align-items:center;gap:6px;padding:4px 10px;background:var(--g);color:#fff}
.hfh b{flex:1;font-weight:400;font-size:1.05rem;text-align:center}
.hfh button{background:none;border:0;color:#fff;font:inherit;font-size:1.5rem;cursor:pointer;width:38px;line-height:1.6}
.hfy{overflow:auto;padding:10px 14px 20px;-webkit-overflow-scrolling:touch}
.hfi{color:#4d5b52;font-size:.92rem;text-align:center;margin:2px 0 8px;line-height:2}
.hfm{display:flex;align-items:center;gap:12px;width:100%;text-align:right;background:#fff;border:2px solid #dbe6c9;border-radius:16px;padding:6px 14px;margin:8px 0;font:inherit;font-size:1rem;line-height:1.9;color:var(--g);cursor:pointer}
.hfm i{font-style:normal;font-size:1.8rem}
.hfm:hover,.hfm:active{border-color:var(--l);background:#f6f9ef}
.hfs2 h4{display:inline-block;margin:16px 0 4px;color:var(--g);font-weight:400;font-size:1.1rem;border-bottom:2px solid var(--gold)}
.hff{margin:4px 0}.hff label{display:block;font-size:.95rem;line-height:1.9;color:#1F2A24}.hff label i{color:#c0392b;font-style:normal}
.hff input,.hff textarea{width:100%;box-sizing:border-box;border:2px solid #dbe6c9;background:#fff;border-radius:12px;padding:4px 12px;margin:0;font:inherit;font-size:.95rem;line-height:1.9;outline:0}
.hff input[type=tel]{direction:ltr;text-align:right}
.hff input:focus,.hff textarea:focus{border-color:var(--l)}
.hcs{display:flex;flex-wrap:wrap;gap:6px;padding:2px;border:2px solid transparent;border-radius:14px}
.hc{font:inherit;font-size:.92rem;line-height:1.8;padding:0 14px;border-radius:50px;border:2px solid #dbe6c9;background:#fff;color:var(--g);cursor:pointer}
.hc.on{background:var(--g);color:#fff;border-color:var(--g)}
.hff .em{display:none;color:#c0392b;font-size:.85rem;line-height:1.8}
.hff.er .em{display:block}.hff.er input,.hff.er textarea,.hff.er .hcs{border-color:#c0392b}
.hsub{display:block;width:100%;margin-top:18px;border:0;border-radius:50px;background:var(--wa);color:#fff;font:700 1.05rem/1.9 'Noto Nastaliq Urdu',serif;padding:6px 14px;cursor:pointer}
.hnt{font-size:.82rem;color:#6b7a6f;text-align:center;line-height:1.9;margin:6px 0 0}
</style>`)}
function hfInit(){hfCss();const b=$("#hf");if(b)b.onclick=hfOpen}
let HFH=false;
function hfRm(){const o=$("#hfo");if(o)o.remove();document.body.style.overflow="";HFS=null}
function hfClose(){const h=HFH;HFH=false;hfRm();if(h){try{history.back()}catch(e){}}}
window.addEventListener("popstate",()=>{if($("#hfo")){HFH=false;hfRm()}});
function hfOpen(){hfRm();if(!HFH){try{history.pushState({hf:1},"");HFH=true}catch(e){}}document.body.style.overflow="hidden";
 document.body.insertAdjacentHTML("beforeend",`<div class=hfo id=hfo><div class=hfx role=dialog aria-modal=true><div class=hfh><button type=button id=hfb aria-label="واپس">→</button><b id=hft></b><button type=button id=hfc aria-label="بند کریں">×</button></div><div class=hfy id=hfy></div></div></div>`);
 const o=$("#hfo");$("#hfc").onclick=hfClose;$("#hfb").onclick=()=>{if(HFS&&Object.keys(HFS.a).length&&!confirm("بھری ہوئی معلومات مٹ جائیں گی۔ واپس جائیں؟"))return;hfMenu()};
 o.addEventListener("click",e=>{if(e.target.id=="hfo"&&!HFS)hfClose()});
 const y=$("#hfy");
 y.addEventListener("click",e=>{const m=e.target.closest("[data-k]");if(m){hfForm(m.dataset.k);return}
  const c=e.target.closest(".hc");if(c&&HFS){const w=c.parentNode,i=+w.dataset.i,v=c.dataset.v,ex=v=="کوئی نہیں"||v=="کسی کی نہیں";
   if(w.dataset.y=="s"){HFS.a[i]=HFS.a[i]==v?"":v;$$(".hc",w).forEach(x=>x.classList.toggle("on",x.dataset.v==HFS.a[i]))}
   else{let a=HFS.a[i]||[];if(a.includes(v))a=a.filter(x=>x!=v);else a=ex?[v]:a.filter(x=>x!="کوئی نہیں"&&x!="کسی کی نہیں").concat(v);HFS.a[i]=a;$$(".hc",w).forEach(x=>x.classList.toggle("on",a.includes(x.dataset.v)))}
   $("#hff"+i).classList.remove("er");return}
  if(e.target.id=="hsub")hfSend()});
 y.addEventListener("input",e=>{const t=e.target;if(t.dataset&&t.dataset.i!=null&&HFS){HFS.a[+t.dataset.i]=t.value;$("#hff"+t.dataset.i).classList.remove("er")}});
 hfMenu()}
function hfMenu(){HFS=null;$("#hfb").style.visibility="hidden";$("#hft").textContent="صحت کے متعلق مشورہ";$("#hfy").scrollTop=0;
 $("#hfy").innerHTML=`<div class=hfi>آپ کس بارے میں مشورہ کرنا چاہتے ہیں؟ ایک آپشن منتخب کریں</div>`+HFM.map(m=>`<button type=button class=hfm data-k=${m[0]}><i>${m[1]}</i><span>${m[2]}</span></button>`).join("")}
function hfForm(k){const F=HF[k],fl=[];HFS={k,a:{},f:fl};$("#hfb").style.visibility="visible";$("#hft").textContent=F.t;
 $("#hfy").innerHTML=`<div class=hfi>${F.d}</div>`+F.s.map(sc=>`<div class=hfs2><h4>${sc[0]}</h4>`+sc[1].map(f=>{const i=fl.push(f)-1;let c;
  if(f.y=="s"||f.y=="m")c=`<div class=hcs data-i=${i} data-y=${f.y}>${f.o.map(v=>`<button type=button class=hc data-v="${v}">${v}</button>`).join("")}</div>`;
  else if(f.y=="x")c=`<textarea data-i=${i} rows=3 placeholder="${f.o}"></textarea>`;
  else c=`<input data-i=${i} type=${f.y=="t"?"text":"tel"} ${f.y=="t"?"":"inputmode=numeric"} placeholder="${f.o}" autocomplete=off>`;
  return`<div class=hff id=hff${i}><label>${f.q}${f.r?" <i>*</i>":""}</label>${c}<div class=em>${f.y=="p"?"درست موبائل نمبر لکھیں (03XXXXXXXXX)":f.y=="a"?"درست عمر لکھیں":"یہ خانہ لازمی ہے"}</div></div>`}).join("")+`</div>`).join("")+`<button type=button class=hsub id=hsub>✅ سبمٹ کریں</button><div class=hnt>${FBOK()?"سبمٹ کرنے سے آپ کا فارم جمع ہو جائے گا اور آپ کی تمام معلومات ہم تک پہنچ جائیں گی۔":"سبمٹ دبانے پر واٹس ایپ کھلے گا جس میں آپ کی ساری معلومات پہلے سے لکھی ہوں گی، بس \"سینڈ\" دبا دیں۔"}</div>`;
 $("#hfy").scrollTop=0}
async function hfSend(){if(!HFS)return;const bad=hfVal(HFS);$$(".hff.er").forEach(x=>x.classList.remove("er"));
 if(bad.length){bad.forEach(i=>$("#hff"+i).classList.add("er"));$("#hff"+bad[0]).scrollIntoView({behavior:"smooth",block:"center"});toast("براہِ کرم لال نشان والے خانے درست کریں");return}
 const msg=hfMsg(HFS);
 if(!FBOK()){window.open(wa(msg),"_blank");hfClose();toast("✔ واٹس ایپ کھل رہا ہے، سینڈ دبا دیں");return}
 const b=$("#hsub");b.disabled=true;b.textContent="⏳ بھیجا جا رہا ہے...";
 try{await fbPost("consults",{text:msg,n:String(HFS.a[0]||"").trim(),p:hfPh(HFS.a[2]||""),ct:String(HFS.a[3]||"").trim(),f:HF[HFS.k].t,at:new Date().toISOString()});
  hfClose();thanks("آپ کا بہت شکریہ!","آپ کی تمام معلومات ہم تک پہنچ چکی ہیں۔ ہماری ٹیم اگلے 24 گھنٹوں میں آپ سے رابطہ کرے گی۔")}
 catch(e){b.disabled=false;b.textContent="✅ سبمٹ کریں";const o=$("#hfb2");if(o)o.remove();b.insertAdjacentHTML("afterend",`<div class=hnt id=hfb2>فارم براہِ راست جمع نہیں ہو سکا۔ دوبارہ کوشش کریں، یا واٹس ایپ پر بھیج دیں:<br><a class="btn wa" target=_blank href="${wa(msg)}" style="margin-top:6px">واٹس ایپ پر بھیجیں</a></div>`)}}
document.addEventListener("keydown",e=>{if(e.key=="Escape"&&$("#hfo"))hfClose()});

/* ===== Firebase (کسٹمر کے ریویوز، آرڈرز اور مشورے ایڈمن پینل تک پہنچانا) ===== */
const FBOK=()=>typeof FB!=="undefined"&&!!FB.db;
const fbu=p=>FB.db.replace(/\/+$/,"")+"/"+p+".json";
async function fbPost(p,o){const r=await fetch(fbu(p),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!r.ok)throw new Error("fb "+r.status);return r.json()}
async function fbPut(p,o){const r=await fetch(fbu(p),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!r.ok)throw new Error("fb "+r.status);return r.json()}
async function fbGet(p){const r=await fetch(fbu(p)+"?t="+Date.now());if(!r.ok)throw new Error("fb "+r.status);return r.json()}
/* شکریہ کا پیغام */
function thanks(t,m){const o=$("#tk");if(o)o.remove();document.body.insertAdjacentHTML("beforeend",`<div class=ov id=tk style="z-index:300"><div class=pop><button class=cl onclick="$('#tk').remove()" aria-label="بند کریں">×</button><div style="font-size:2.6rem">✅</div><b style="font-size:1.25rem;color:#1C352D">${t}</b><p style="margin:6px 0 12px;line-height:2.1">${m}</p><button class="btn wa" onclick="$('#tk').remove()">ٹھیک ہے</button></div></div>`)}
/* پروڈکٹ کے نیچے کسٹمر کا ریویو فارم (ستارے ہمیشہ 5، صرف نام اور ریویو) */
function rvForm(p){if(!FBOK())return"";return`<div class=box id=rvf data-p="${esc(p.id)}"><button class="btn lt" id=rvo onclick="rvOpen()">✍️ اپنا ریویو شیئر کریں</button><div id=rvw style="display:none"><h3 style="margin:0;color:var(--g);font-weight:400;font-size:1.2rem">✍️ اپنا ریویو لکھیں</h3><div class=info style="margin:6px 0 8px">اس پروڈکٹ کے بارے میں اپنا تجربہ ہمارے ساتھ شیئر کریں۔</div><input id=rvn placeholder="آپ کا نام" maxlength=60 autocomplete=name><textarea id=rvt rows=4 placeholder="اپنا ریویو یہاں لکھیں…" maxlength=1500></textarea><input id=rvh tabindex=-1 autocomplete=off aria-hidden=true style="position:absolute;top:0;right:0;width:1px;height:1px;opacity:0;pointer-events:none"><button class="btn wa" id=rvb onclick="rvSend()">📩 ریویو جمع کروائیں</button></div></div>`}
function rvOpen(){const o=$("#rvo"),w=$("#rvw");if(o)o.style.display="none";if(w){w.style.display="block";const n=$("#rvn");if(n)n.focus()}}
function rvClose(){const o=$("#rvo"),w=$("#rvw");if(w)w.style.display="none";if(o)o.style.display="block"}
async function rvSend(){const f=$("#rvf");if(!f||$("#rvh").value)return;const n=$("#rvn").value.trim(),t=$("#rvt").value.trim(),p=gp(f.dataset.p);
 if(n.length<2){toast("براہِ کرم اپنا نام لکھیں");return}
 if(t.length<2){toast("براہِ کرم اپنا ریویو لکھیں");return}
 try{if(Date.now()-(+localStorage.getItem("rv_t")||0)<30000){toast("براہِ کرم تھوڑی دیر بعد دوبارہ کوشش کریں");return}}catch(e){}
 const b=$("#rvb");b.disabled=true;b.textContent="⏳ جمع ہو رہا ہے...";
 try{await fbPost("reviews",{n,t,pid:p?p.id:f.dataset.p,pn:p?p.n:"",at:new Date().toISOString()});try{localStorage.setItem("rv_t",Date.now())}catch(e){}
  $("#rvn").value="";$("#rvt").value="";rvClose();thanks("آپ کے ریویو کا شکریہ!","آپ کی رائے ہمارے لیے بہت قیمتی ہے۔ کچھ ہی دیر میں آپ کا ریویو ویب سائٹ پر شائع کر دیا جائے گا۔")}
 catch(e){toast("❌ ریویو جمع نہیں ہو سکا، دوبارہ کوشش کریں")}
 b.disabled=false;b.textContent="📩 ریویو جمع کروائیں"}
/* سیل ختم ہونے کا کاؤنٹ ڈاؤن */
let CDT=null;
function ctStart(){clearInterval(CDT);const e=$("#cdn");if(!e)return;const end=new Date(e.dataset.e).getTime();
 const tick=()=>{const s=Math.floor((end-Date.now())/1000);if(s<=0){clearInterval(CDT);if(typeof pdraw=="function"&&typeof PP!="undefined"&&PP)pdraw();return}
  const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60;
  e.innerHTML=`<div>⏰ سیل ختم ہونے میں باقی وقت</div><div class=cdb>${d?`<b>${d}<small>دن</small></b>`:""}<b>${h}<small>گھنٹے</small></b><b>${m}<small>منٹ</small></b><b>${x}<small>سیکنڈ</small></b></div>`};
 tick();CDT=setInterval(tick,1000)}
function saleCss(){if($("#sls"))return;document.head.insertAdjacentHTML("beforeend",`<style id=sls>
.sbd{position:absolute;top:8px;right:8px;z-index:2;background:#d32f2f;color:#fff;font:700 .72rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.4px;padding:5px 9px;border-radius:6px;box-shadow:0 2px 6px #0003;direction:ltr}
.pc .pr s.op,.op2{display:inline-block;color:#9a9a9a;font:500 .85rem system-ui,-apple-system,"Segoe UI",sans-serif;text-decoration:line-through;text-decoration-color:#d32f2f;text-decoration-thickness:1.5px;direction:ltr;unicode-bidi:isolate}
.pbx{display:flex;flex-direction:column;align-items:center;gap:8px;margin:10px 0}
.pcut{display:flex;align-items:center;justify-content:center;gap:10px;direction:ltr}
.pcut .op2{font-size:1.1rem}
.sbd2{display:inline-block;background:#d32f2f;color:#fff;font:700 .8rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.5px;padding:6px 10px;border-radius:6px;direction:ltr}
.cdn{margin:10px auto 6px;max-width:380px;background:#fff4f3;border:1.5px solid #e53935;border-radius:16px;padding:4px 10px 8px;color:#b71c1c;font-size:.95rem;line-height:2}
.cdb{display:flex;justify-content:center;gap:8px;direction:ltr}
.cdb b{min-width:60px;background:linear-gradient(160deg,#d32f2f,#8e1313);color:#fff;border-radius:10px;font:700 1.35rem/1.25 sans-serif;padding:5px 4px 2px;display:flex;flex-direction:column;align-items:center}
.cdb b small{font:400 .7rem/1.9 'Noto Nastaliq Urdu',serif;opacity:.92}
.sinfo{background:#fff4f3;border:1px dashed #e53935;color:#8e1313}
</style>`)}
