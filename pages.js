/* تمام صفحات کا کوڈ یہاں ہے۔ ہر .html فائل اور ہر فولڈر کی index.html ایک ہی خالی ڈھانچہ ہے، صفحہ لنک دیکھ کر خود بنتا ہے */
lay();
/* ---- SEO / شیئر کے مددگار (SITE_URL صرف data.js میں ہے) ---- */
const SU=()=>String(typeof SITE_URL!=="undefined"?SITE_URL:"").replace(/\/+$/,"");
function seoC(u){try{let l=document.querySelector('link[rel=canonical]');if(!l){l=document.createElement('link');l.rel='canonical';document.head.appendChild(l)}l.href=u}catch(e){}}
function seoRoute(R){const k=R[0],s=SU();if(!s)return;let u;
 if(k=='home')u=s+'/';else if(k=='cat'){const c=CATS.find(x=>x[0]==R[1])||CATS[0];u=s+'/'+c[3]}
 else if(k=='dis')u=s+'/'+PG.diseases;else if(k=='about'||k=='terms'||k=='cart')u=s+'/'+PG[k];else if(k=='rev')u=s+'/reviews';else return;
 seoC(u)}
function shareUrl(p){return(SU()?SU()+'/':location.origin+BS())+(p.s||p.id)+'/'}
function shareSec(p){const u=shareUrl(p);return`<div class="box shr"><h3>شیئر کریں</h3><div class=row2><a class="btn fb" target=_blank rel=noopener href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}">${IC.fb}فیس بک</a><a class="btn wa" target=_blank rel=noopener href="https://wa.me/?text=${encodeURIComponent(p.n+'\n'+u)}">${IC.wa}واٹس ایپ</a></div></div>`}
let PP=null,vi=0,q=1,code=null,pay='cod';
const HRV=typeof HOME_RV!=='undefined'?HOME_RV:[];
/* تمام فیڈبیک: ہوم پیج والے + ہر پروڈکٹ والے (پروڈکٹ کا نام ساتھ) — خود بخود جمع ہوتے ہیں */
const ARV=()=>[...HRV.map(r=>[r,r.p]),...P.flatMap(p=>(p.r||[]).map(r=>[r,p.n]))];
function route(){
 const Q=new URLSearchParams(location.search);let rel;
 try{rel=decodeURIComponent(location.pathname)}catch(e){rel=location.pathname}
 if(rel+'/'==BASE)rel='';else if(rel.startsWith(BASE))rel=rel.slice(BASE.length);else rel=rel.replace(/^\//,'');
 rel=rel.replace(/(^|\/)index\.html$/,'').replace(/\/+$/,'');
 const tk=rel.match(/^tracking(?:\.html)?(?:\/(.*))?$/i);if(tk)return['trk',tk[1]||Q.get('no')||''];
 const F={'':['home'],'product.html':['prod',Q.get('id')],'category.html':['cat',Q.get('c')||'all'],'diseases.html':['dis'],'about.html':['about'],'terms.html':['terms'],'cart.html':['cart'],'reviews.html':['rev'],'reviews':['rev']};
 if(F[rel])return F[rel];
 rel=rel.replace(/\.html$/,'');
 const c=CATS.find(x=>x[3]==rel);if(c)return['cat',c[0]];
 for(const k of ['diseases','about','terms','cart'])if(PG[k]==rel)return[{diseases:'dis'}[k]||k];
 const p=P.find(x=>(x.s||x.id)==rel)||P.find(x=>x.id==rel);
 return p?['prod',p.id]:['nf'];}
const R=route();
try{seoRoute(R)}catch(e){}
({home,cat,dis,about,terms,cart,prod,nf,rev,trk})[R[0]](R[1]);

function home(){
 let t=P.map((p,i)=>[p,(p.r||[]).length,i]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]||a[2]-b[2]).slice(0,6).map(x=>x[0]);
 if(!t.length)t=['akseer-arfi','honey','shah-akbari'].map(gp).filter(Boolean);
 $('#m').innerHTML=`<div class=sl>${[1,2,3,4,5].map(i=>'<img src=s'+i+'.webp alt="" '+(i==1?'class=on':'')+'>').join('')}</div>
${secHead('ہماری ادویات')}<div class=grid>${CATS.map(c=>`<a class=cat href="${cu(c)}"><i>${c[2]}</i>${c[1]}</a>`).join('')}</div>
<div class=dw><a class=dis href="${gu('diseases')}">بیماریاں اور ان کے علاج</a></div>
${secHead('ٹاپ ریٹڈ پروڈکٹس','وہ ادویات جنہیں ہمارے کسٹمرز نے سب سے زیادہ پسند کیا')}<div class=grid>${t.map(p=>card(p,1)).join('')}</div>
${hrv()}`;
 let k=0;const s=$$('.sl img');setInterval(()=>{s[k].classList.remove('on');k=(k+1)%s.length;s[k].classList.add('on')},2500)}

function hrv(){const A=ARV();if(!A.length)return'';const sh=HRV.length?HRV.slice(0,3).map(r=>[r,r.p]):A.slice(0,3);
 return secHead('ہیپی کسٹمرز','ہمارے معزز کسٹمرز کی تاثرات')+'<div class=rvs>'+sh.map(x=>rvCard(x[0],x[1])).join('')+'</div>'+(A.length>sh.length?'<p style="text-align:center;margin:14px"><a class="btn lt" style="display:inline-block;width:auto;padding:8px 28px" href="'+BS()+'reviews">تمام کسٹمرز کے فیڈبیک دیکھیں</a></p>':'')}
function rev(){document.title='ہیپی کسٹمرز | عارفی دارالشفاء';const A=ARV(),N=10;let n=0;
 $('#m').innerHTML=secHead('ہیپی کسٹمرز','ہمارے معزز کسٹمرز کی تاثرات')+(A.length?'<div class=rvs id=rl></div><p class=rmw id=rmw><button type=button class="btn lt" id=rm>مزید دکھائیں</button></p>':'<div class=box style=text-align:center>ابھی کوئی فیڈبیک موجود نہیں۔</div>');
 if(!A.length)return;
 const more=()=>{const e=A.slice(n,n+N);$('#rl').insertAdjacentHTML('beforeend',e.map(x=>rvCard(x[0],x[1])).join(''));n+=e.length;if(n>=A.length)$('#rmw').remove()};
 $('#rm').onclick=more;more()}

function cat(c){const ct=CATS.find(x=>x[0]==c)||CATS[0];c=ct[0];
 document.title=ct[1];const L=c=='all'?P:P.filter(p=>p.c.includes(c));
 $('#m').innerHTML='<div class="sh ch"><h2>'+ct[1]+'</h2><div class=sd><i></i></div></div>'+(L.length?'<div class=grid>'+L.map(p=>card(p)).join('')+'</div>':'<div class=box>اس زمرے کی ادویات جلد شامل کی جائیں گی۔ مشورے کے لیے نیچے واٹس ایپ بٹن دبائیں۔</div>')}

function dis(){document.title='بیماریاں اور ان کے علاج | عارفی دارالشفاء';
 $('#m').innerHTML='<h2>بیماریاں اور ان کے علاج</h2>'+D.map(d=>{const ids=d[1].split(',').filter(gp);
 return '<div class=dz><b>مرض:</b> '+d[0]+'<br><b>علاج:</b> '+ids.map(i=>'<a class=t href="'+pu(gp(i))+'">'+gp(i).n+'</a>').join(' ')+(d[2]?'<br><b>ہدایات:</b> '+d[2]:'')+(ids.length>1?'<br><button class="btn lt" onclick="both(\''+d[1]+'\')">دونوں ادویات اکٹھی آرڈر کریں</button>':'')+'</div>'}).join('')+'<div class=box style=text-align:center>دیگر امراض کے علاج کے لیے عارفی دارالشفاء کے طبی ماہرین سے رابطہ کریں۔</div>'}
function both(s){s.split(',').forEach(i=>add(i,0,1));setTimeout(()=>location.href=gu('cart'),500)}

function about(){document.title='ہمارا تعارف | عارفی دارالشفاء';$('#m').innerHTML='<h2>حکیم محمد حذیفہ کا مختصر تعارف</h2><div class=box>'+["تمام معزز قارئین پر سلامتی ہو! آپ کا اعتماد میرا قیمتی اثاثہ ہے، مجھے اس اعتماد کے قابل سمجھنے کے لیے صد بار شکریہ۔ اگر آپ پہلی مرتبہ میری ویب سائٹ پر تشریف لائے ہیں تو میں آپ کے اس انتخاب کو سعادت سمجھتا ہوں۔ آپ سے گزارش ہے کہ یہ تعارفی تحریر مکمل پڑھ لیں تاکہ آپ میری شخصیت اور خدمات سے روشناس ہو سکیں.","معزز قارئین، دراصل اپنی پہچان چھپا کر کام کرنا دھوکہ دہی کے زمرے میں آتا ہے اور الحمدللہ ہم دھوکہ دینے والوں میں سے ہرگز نہیں۔ بندۂ ناچیز کے والدِ گرامی حکیم ابنِ حکیم محمد اسماعیل نے اپنے اس سپوت کو محمد حذیفہ کے نام سے دنیا میں پہچان بخشی۔ اپنے اجداد کی اطاعت کرتے ہوئے عارف والا ضلع پاکپتن (بابا فرید الدین گنج شکر کی نگری) کو اپنا مسکن بنائے رکھا ہے۔","والدِ گرامی کی خصوصی توجہ اور کامل تربیت کی بدولت دینی علوم میں رغبت رہی اور فضلِ ربی سے قرآن کریم حفظ کر لیا، جبکہ مزید درسِ نظامی کی تکمیل بھی نصیب ہوئی۔ علاوہ ازیں، عصری تعلیم کے میدان میں ایف اے تک رسائی حاصل کر سکا۔","دکھی انسانیت کے کام آنا میری تربیت کا حاصل رہا، تاہم طب کی دنیا میں ایک ماہر کی حیثیت سے خدمات پیش کرنا میرا ایک خواب بن گیا۔ نہایت محنت اور لگن سے اپنے اس عظیم خواب کو شرمندۂ تعبیر کر کے بطور فاضلِ طب والجراحت سند فضیلت حاصل کی (الحمدللہ رب العالمین) اور مطب عارفی دارالشفاء میں طبی خدمات سر انجام دیتا ہوں۔","عارفی دارالشفاء میرے بزرگوں کی بشارت تھی اور انہی کی دعاؤں سے بفضلہ تعالیٰ میری انتھک محنتوں کا ثمر ہے۔ یہی میرا خواب تھا، یہی میرا مقصد۔ اللہ تعالیٰ میری توفیقات میں مزید اضافہ فرمائے تاکہ میں تکلیف میں مبتلا اللہ کے بندوں کی تکلیفیں دور کر سکوں۔ آمین ثم آمین"].map(x=>'<p>'+x+'</p>').join('')+'</div>'}

function terms(){document.title='شرائط و ضوابط | عارفی دارالشفاء';const T=["Rs. 2,000 یا اس سے زائد (ڈسکاؤنٹ کے بعد) کے آرڈر پر ہوم ڈیلیوری فری ہو گی، جبکہ Rs. 2,000 سے کم کے آرڈر پر Rs. 350 ڈیلیوری چارجز لاگو ہوں گے۔", "تمام پارسل پرائیویٹ کورئیر کمپنیز میں سے جس کے ساتھ آسانی ہو اس کمپنی سے بھیجے جاتے ہیں۔ اگر آپ کسی خاص کورئیر کمپنی سے منگوانا چاہتے ہیں تو اضافی ڈیلیوری چارجز ادا کرنا ہوں گے۔ آرڈر موصول ہونے کے بعد 1 سے 3 دن میں روانہ کر دیا جاتا ہے۔ پارسل بکنگ کے بعد اگر تین دن میں پارسل موصول نہ ہو تو فوراً عارفی دارالشفاء میں بذریعہ کال یا واٹس ایپ اطلاع دیں۔ بسا اوقات پارسل کی ڈیلیوری میں تاخیر ہو جاتی ہے، ایسی صورت میں صبر و تحمل کا مظاہرہ کریں اور تیسرے دن تک پارسل نہ ملنے پر اطلاع کریں تاکہ مسئلہ حل کیا جا سکے۔", "تمام کورئیر کمپنیاں صرف شہروں میں ڈیلیوری فراہم کرتی ہیں۔ اگر آپ گاؤں سے ہیں تو آپ کو قریبی شہر سے پارسل وصول کرنا ہو گا۔", "اگر آپ پارسل بذریعہ ڈاکخانہ منگوانا چاہتے ہیں تو واضح رہے کہ ڈاکخانہ سے پارسل کے لیٹ پہنچنے، گم ہو جانے یا ٹوٹ پھوٹ کی ذمہ داری خریدار پر ہو گی۔ عارفی دارالشفاء یہ ذمہ داری قبول نہیں کرتا اور صرف رسید دینے کا پابند ہے۔ جبکہ کورئیر کمپنی کی صورت میں ہر قسم کی ذمہ داری عارفی دارالشفاء قبول کرتا ہے۔ لہٰذا کسی بھی پریشانی سے بچنے کے لیے کورئیر کمپنی کے ذریعے ہی پارسل بک کروائیں۔", "اگر آپ پارسل کیش آن ڈیلیوری منگوانا چاہتے ہیں تو آپ کو کم از کم "+SHIP.fee+" روپے ڈیلیوری چارجز کی مد میں ایڈوانس جمع کروانے ہوں گے، جبکہ باقی پیمنٹ آپ میڈیسن وصول کرتے وقت ادا کر سکتے ہیں۔", "ڈاکخانہ / پوسٹ آفس سے کیش آن ڈیلیوری پارسل نہیں بھیجے جاتے، صرف کورئیر کمپنی سے کیش آن ڈیلیوری پارسل بھیجے جاتے ہیں۔", "عارفی دارالشفاء تمام آرڈرز جانچ پڑتال کے بعد صحیح طور پر پیکنگ کر کے روانہ کرتا ہے۔ تاہم کسی وجہ سے اگر غلط آرڈر ڈیلیور ہو جائے یا پارسل ٹوٹ پھوٹ کا شکار ہو جائے تو فوراً عارفی دارالشفاء میں بذریعہ کال یا واٹس ایپ اطلاع دیں۔", "اگر ڈیلیوری کے وقت پارسل کی پیکنگ برقرار نہ ہو تو کسی صورت پارسل وصول نہ کریں اور عارفی دارالشفاء کو بذریعہ کال یا واٹس ایپ اطلاع دیں۔ پیکنگ خراب ہونے کے باوجود پارسل وصول کر لینے کی صورت میں عارفی دارالشفاء ذمہ دار نہ ہو گا۔", "تمام ادویات کے اجزاء کے خالص ہونے کی گارنٹی دی جاتی ہے۔ شفاء من جانب اللہ ہے، اس لیے شفاء کی گارنٹی دینا ممکن نہیں ہوتا۔ بہترین اور خالص اجزاء کی وجہ سے ادویات کی شفایابی کا رزلٹ 95% تک بہترین ہوتا ہے۔ آپ کسی بھی صحت کے مسئلے کا شکار ہیں تو ایک دفعہ عارفی دارالشفاء کو ضرور آزمائیں، ان شاء اللہ مایوسی نہیں ہو گی۔", "تمام قدرتی پروڈکٹس مثلاً شہد، سلاجیت وغیرہ کی چیک وارنٹی دی جاتی ہے۔ اگر پسند نہ آئے تو آپ واپس کر کے پیمنٹ ری فنڈ کروا سکتے ہیں۔", "پارسل کورئیر کمپنی میں بک ہونے کے بعد کینسل کرنے کی صورت میں ڈیلیوری چارجز ادا کرنا ہوں گے۔", "تمام ادویات سیل بند ہونے کی حالت میں قابلِ واپسی ہیں۔ واپس بھیجنے کا خرچ خریدار کے ذمہ ہو گا۔", "عارفی دارالشفاء کے طبی ماہرین سے مشورے کے لیے یا کسی بھی مسئلے کی صورت میں ہفتہ تا جمعرات صبح 9 سے شام 5 بجے کے درمیان بذریعہ کال یا واٹس ایپ رابطہ کیا جا سکتا ہے: <bdi dir=ltr>0311-1307530</bdi>"];
$('#m').innerHTML='<h2>شرائط و ضوابط</h2><div class=box><ol style="padding-right:20px;margin:0">'+T.map(x=>'<li style="margin-bottom:8px">'+x+'</li>').join('')+'</ol></div>'}

function nf(){document.title='صفحہ نہیں ملا | عارفی دارالشفاء';$('#m').innerHTML='<div class=box style=text-align:center><p>معذرت، یہ صفحہ نہیں ملا۔</p><a class=btn href="'+(BS()||'./')+'">ہوم پیج پر جائیں</a></div>'}

/* ---- آرڈر ٹریکنگ: /tracking اور /tracking/Arfi-0112123 (ڈیٹا: Firestore کا public_tracking، صرف REST GET) ---- */
function trk(q0){
 const PRJ='arfi-darushifa',KEY='AIzaSyBOFklRCUWWgXlMXXqOE3-P3jpUb1_kcdc',
 SS=['بک','ڈسپیچ','ڈسپیچ ارائیوڈ','ڈیلیور'],RET='ریٹرن',
 TT=['آرڈر پیک ہو گیا','پارسل روانہ ہو گیا','پارسل آپ کے شہر پہنچ گیا','پارسل آپ کو مل گیا'],
 TI=['📦','🚚','📍','✅'],
 E=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'),
 RX=/^Arfi-(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d+$/;
 document.title='اپنا آرڈر ٹریک کریں | عارفی دارالشفاء';
 let mt=document.querySelector('meta[name=robots]');if(!mt){mt=document.createElement('meta');mt.name='robots';document.head.appendChild(mt)}mt.content='noindex,nofollow';
 let tok=0,cur='';
 const norm=v=>{const t=String(v||'').replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/arfi/ig,''),g=t.replace(/\D/g,'');return g?'Arfi-'+g:''},
 fd=v=>{if(!v)return'';try{const s=String(v);if(s.length<=10){const d=new Date(s+'T00:00:00Z');return isNaN(d)?s:d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}
  const d=new Date(s);if(isNaN(d))return s;return d.toLocaleString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',hour12:true,timeZone:'Asia/Karachi'}).replace(/\b(am|pm)\b/i,m=>m.toUpperCase())}catch(e){return String(v)}},
 bd=v=>v?'<bdi dir=ltr>'+E(fd(v))+'</bdi>':'',
 sv=f=>f&&f.stringValue!=null?f.stringValue:'',
 parse=j=>{const f=j.fields||{},m=(f.ts&&f.ts.mapValue&&f.ts.mapValue.fields)||{},ts={};Object.keys(m).forEach(k=>{ts[k]=sv(m[k])});return{no:sv(f.no),status:sv(f.status),city:sv(f.city),self:!!(f.self&&f.self.booleanValue),courier:sv(f.courier),ct:sv(f.courierTracking),ts,up:sv(f.updatedAt)}},
 waB=no=>`<a class="btn wa" target=_blank rel=noopener href="${wa('میں اپنے آرڈر '+no+' کے بارے میں معلومات چاہتا ہوں')}">${IC.wa}واٹس ایپ پر رابطہ کریں</a>`,
 cpB=t=>t?`<button type=button class=trk-cp data-c="${E(t)}">📋 کاپی</button>`:'',
 nfH=no=>`<div class="box trk-nf"><div style="font-size:2.2rem">🔍</div><p>یہ آرڈر نمبر نہیں ملا — درست نمبر لکھیں یا واٹس ایپ پر رابطہ کریں</p>${waB(no||'')}</div>`,
 erH=()=>`<div class="box trk-nf"><div style="font-size:2.2rem">⚠️</div><p>معذرت، اس وقت آرڈر کی معلومات حاصل نہیں ہو سکیں۔ انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔</p><button type=button class=btn id=trr style="display:inline-block;width:auto;padding:8px 24px">🔄 دوبارہ کوشش کریں</button></div>`,
 dsc=(k,t)=>{const x=bd(t);return k==0?(x?`آپ کا آرڈر ${x} کو پیک کر دیا گیا ہے۔`:'آپ کا آرڈر پیک کر دیا گیا ہے۔'):k==1?(x?`آپ کا پارسل ${x} کو روانہ کیا گیا۔`:'آپ کا پارسل روانہ کیا گیا۔'):x},
 draw=d=>{const i=SS.indexOf(d.status),ret=d.status==RET,self=d.self&&!!d.courier;
  let h=`<div class="box trk-h"><div><small>آرڈر نمبر</small><b dir=ltr>${E(d.no)}</b></div><div><small>منزل</small><b>${E(d.city)||'—'}</b></div></div>`;
  if(ret)h+=`<div class="box trk-cur ret"><i>↩️</i><div><small>موجودہ صورتحال</small><b>پارسل واپس آ چکا ہے</b></div></div><div class="box trk-nf"><p>یہ پارسل واپس آ چکا ہے۔ مزید معلومات کے لیے براہِ کرم واٹس ایپ پر رابطہ کریں۔</p>${waB(d.no)}</div>`;
  else if(i<0)h+=`<div class="box trk-cur"><i>📦</i><div><small>موجودہ صورتحال</small><b>${E(d.status)}</b></div></div>`;
  else{
   h+=`<div class="box trk-cur"><i>${TI[i]}</i><div><small>موجودہ صورتحال</small><b>${TT[i]}</b></div></div>`;
   if(i==2)h+=self?`<div class="box trk-nt">پارسل آپ کے شہر ${E(d.city)} میں پہنچ چکا ہے۔ براہِ کرم ${E(d.courier)} کے ${E(d.city)} آفس سے اپنا پارسل وصول کر لیں۔ آفس میں یہ ٹریکنگ نمبر دکھائیں: <b>${E(d.ct)}</b> ${cpB(d.ct)} جلد از جلد وصول کریں۔</div>`:`<div class="box trk-nt">پارسل آپ کے شہر میں پہنچ چکا ہے۔ براہِ کرم اپنا موبائل نمبر آن رکھیں، رائیڈر آپ کو جلد ڈیلیور کر دے گا۔</div>`;
   if(self&&i>=1)h+=`<div class="box trk-cb"><div><small>کورئیر</small><b>${E(d.courier)}</b></div><div><small>کورئیر ٹریکنگ نمبر</small><b>${E(d.ct)}</b>${cpB(d.ct)}</div></div>`;
   h+='<div class=box><ol class=trk-tl>'+SS.map((s,k)=>{const st=k<i?'done':k==i?'cur':'todo',t=d.ts[s],x=st=='todo'?'':dsc(k,t);return`<li class="${st}"><i>${st=='done'?'✓':k+1}</i><b>${TT[k]}</b>${x?'<small>'+x+'</small>':''}</li>`}).join('')+'</ol></div>';
  }
  h+=`${d.up?'<p class=trk-up>آخری اپڈیٹ: '+bd(d.up)+'</p>':''}<p class=trk-act><button type=button class="btn lt" id=trf>🔄 ریفریش</button></p>`;
  $('#tr').innerHTML=h},
 go=async(v,manual)=>{const no=norm(v),box=$('#tr'),my=++tok;
  if(!no||!RX.test(no)){cur='';box.innerHTML=nfH(String(v||'').trim());return}
  cur=no;$('#tq').value=no;box.innerHTML='<div class=trk-sp></div>';
  if(manual){try{history.replaceState(null,'',BS()+'tracking/'+no)}catch(e){}}
  try{const c=new AbortController(),tm=setTimeout(()=>c.abort(),15000);
   const r=await fetch('https://firestore.googleapis.com/v1/projects/'+PRJ+'/databases/(default)/documents/public_tracking/'+encodeURIComponent(no)+'?key='+KEY,{signal:c.signal});clearTimeout(tm);
   if(my!=tok)return;
   if(r.status==404){box.innerHTML=nfH(no);return}
   if(!r.ok)throw 0;
   const d=parse(await r.json());if(my!=tok)return;
   if(!d.status){box.innerHTML=nfH(no);return}
   draw(d)}catch(e){if(my==tok)box.innerHTML=erH()}};
 $('#m').innerHTML=`<div class="sh ch"><h2>اپنا آرڈر ٹریک کریں</h2><div class=sd><i></i></div></div><div class="box trk-f"><form id=tf autocomplete=off><label for=tq>آرڈر نمبر لکھیں</label><div class=trk-r><input id=tq type=text dir=ltr placeholder="Arfi-0112123" autocapitalize=off autocorrect=off spellcheck=false enterkeyhint=search value="${E(q0)}"><button class=btn type=submit>ٹریک کریں</button></div><small>آرڈر نمبر آپ کو واٹس ایپ میسج میں بھیجا گیا تھا۔</small></form></div><div id=tr></div>`;
 $('#tf').addEventListener('submit',e=>{e.preventDefault();go($('#tq').value,true)});
 $('#tr').addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button');if(!b)return;
  if(b.id=='trf'||b.id=='trr')go(cur,false);
  else if(b.dataset&&b.dataset.c){const t=b.dataset.c,o=b.textContent,ok=()=>{b.textContent='✔ کاپی ہو گیا';setTimeout(()=>b.textContent=o,1500)},fb=()=>{const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(x){}a.remove()};navigator.clipboard?navigator.clipboard.writeText(t).then(ok,fb):fb()}});
 if(String(q0||'').trim())go(q0,false)}

/* ---- پروڈکٹ ---- */
function prod(id){PP=gp(id);if(!PP){location.href=BS()||'./';return}document.title=PP.n;let m=document.querySelector('meta[name=description]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}m.content=PP.md||(PP.n+' — عارفی دارالشفاء کی خالص ہربل دوا۔ پورے پاکستان میں فری ہوم ڈیلیوری اور کیش آن ڈیلیوری۔');try{if(window.SEO&&SU())SEO.apply(document,PP,SU(),{price:x=>sp(PP,x)})}catch(e){}pdraw()}
function pdraw(){const p=PP,op=p.v[vi][1],S=saleOf(p),pr=S?sp(p,op):op,lb=p.v[vi][0];
$('#m').innerHTML=`<div class=box style=text-align:center>${p.img?'<img src='+p.img+' alt="" style="width:100%;max-width:360px;border-radius:14px">':"<div style='background:var(--c) url(logo.webp) center/40% no-repeat;aspect-ratio:16/10;border-radius:14px'></div>"}<h1 style='font-weight:400;color:var(--g);font-size:1.6rem'>${p.n}</h1>
${lb||p.v.length>1?'<div>'+p.v.map((v,i)=>'<button class="pill '+(i==vi?'on':'')+'" onclick="vi='+i+';pdraw()">'+(v[0]||(v[1]?fmt(sp(p,v[1])):''))+'</button>').join('')+'</div>':''}
${pr?'<div class=pbx><span class=big>'+fmt(pr)+'</span>'+(S?'<div class=pcut><s class=op2>'+fmt(op)+'</s><span class=sbd2>'+S.pct+'% OFF</span></div>':'')+'</div>'+(S&&S.end?'<div class=cdn id=cdn data-e="'+S.end+'"></div>':'')+'<div class=qty><button onclick="q>1&&(q--,pdraw())">−</button>'+q+'<button onclick="q++,pdraw()">+</button></div>':'<p>قیمت کے لیے واٹس ایپ پر رابطہ کریں</p>'}
<p><a class='btn wa' target=_blank href="${wa('میں "'+p.n+'" '+(lb?'('+lb+') ':'')+'× '+q+(pr?' آرڈر کرنا چاہتا ہوں۔ قیمت: '+fmt(pr*q)+shipNote(pr*q):' کے بارے میں معلومات چاہتا ہوں'))}">واٹس ایپ پر ابھی آرڈر کریں</a></p>
${pr?'<button class="btn lt en" onclick="add(PP.id,vi,q)">🛒 Add to Cart</button>':''}</div>
<div class=tr><div><i>🌿</i>100% ہربل</div><div><i>💵</i>کیش آن ڈیلیوری</div><div class=w><i>🚚</i>Rs. 2,000 یا زائد کے آرڈر پر فری ہوم ڈیلیوری</div></div>${desc(p)?'<div class="box ds">'+desc(p)+(p.vid?'<p style=text-align:center><a class="btn lt" target=_blank href="'+p.vid+'">▶ ویڈیو دیکھیں</a></p>':'')+'</div>':''}${reviewsSec(p)}${rvForm(p)}${shareSec(p)}${relSec(p)}${faqSec()}`;ctStart();relInit()}

/* ---- Related Products: اسی زمرے کی اگلی 3 پروڈکٹس (آخر پر پہنچ کر شروع سے مل جاتی ہیں)، دائیں سے بائیں سکرول ---- */
function relSec(p){
 const cs=(p.c||[]).filter(x=>x!='all');if(!cs.length)return'';
 let L=[];for(const c of cs){L=P.filter(x=>(x.c||[]).includes(c));if(L.length>1)break}
 if(L.length<2)return'';
 const i=L.findIndex(x=>x.id==p.id),n=L.length,k=Math.min(3,n-1),R=[];
 for(let j=1;j<=k;j++)R.push(L[(i+j)%n]);
 return`<div class=rel>${secHead('Related Products')}`+(R.length>1?`<div class=rsw><button type=button class="rsb pv" aria-label="پچھلی دوا" onclick="rsGo(this,-1)" disabled>»</button><div class="rsl rl2" onscroll="rsUp(this);relUp(this)">${R.map(x=>card(x)).join('')}</div><button type=button class="rsb nx" aria-label="اگلی دوا" onclick="rsGo(this,1)">«</button></div><div class=rdt></div>`:`<div class=grid style="grid-template-columns:repeat(2,1fr)">${R.map(x=>card(x)).join('')}</div>`)+'</div>'}

/* ---- کارٹ ---- */
function cart(){document.title='کارٹ | عارفی دارالشفاء';cdraw()}
function cdraw(){const c=ld();if(!c.length){$('#m').innerHTML='<div class=box style=text-align:center><p>آپ کا کارٹ خالی ہے۔</p><a class=btn href="'+cu(CATS[0])+'">ادویات دیکھیں</a></div>';return}
const hs=c.some(l=>saleOf(gp(l.id)));if(hs)code=null;
const t=calc(c,code,pay),rest=Math.max(0,t.total-SHIP.fee);
$('#m').innerHTML=`<h2>آپ کا کارٹ</h2><div class=box>${c.map((l,i)=>'<div class=rw><div>'+gp(l.id).n+'<small>'+gp(l.id).v[l.v][0]+' | '+(saleOf(gp(l.id))?'<s class=op2>'+fmt(gp(l.id).v[l.v][1])+'</s> ':'')+fmt(lp(l))+(saleOf(gp(l.id))?' <b style="color:#b71c1c">('+saleOf(gp(l.id)).pct+'% سیل)</b>':'')+'</small></div><span class=qty><button onclick="ch('+i+',-1)">−</button>'+l.q+'<button onclick="ch('+i+',1)">+</button></span><button class=x onclick="ch('+i+',-99)">🗑</button></div>').join('')}</div>
${shipBox(t)}${hs?'':`<div class=box><b>ڈسکاؤنٹ کوڈ</b><div style=display:flex;gap:6px><input id=cd placeholder="کوڈ یہاں پیسٹ کریں" ${code?'disabled value="'+code.k+'"':''}><button class=btn style=width:auto onclick=ap() ${code?'disabled':''}>لگائیں</button></div><div id=cm>${code?'✔ کوڈ "'+code.k+'" لگ گیا — '+dlab(code)+' ڈسکاؤنٹ':''}</div></div>`}
<div class=box><b>ادائیگی کا طریقہ</b><br><label><input type=radio name=py style=width:auto ${pay=='cod'?'checked':''} onchange="pay='cod';cdraw()"> کیش آن ڈیلیوری</label><br><label><input type=radio name=py style=width:auto ${pay=='adv'?'checked':''} onchange="pay='adv';cdraw()"> ایڈوانس پیمنٹ (اضافی 5% ڈسکاؤنٹ)</label>
<div class=info>${pay=='adv'?'آرڈر پلیس کرنے کے بعد ہماری ٹیم آپ سے رابطہ کر کے اکاؤنٹ نمبر فراہم کر دے گی۔':codInfo(t,rest)}</div></div>
<div class=box><table class=sum width=100%><tr><td>پروڈکٹس (${t.n})<td>${fmt(t.orig)}${t.sale?'<tr><td>سیل ڈسکاؤنٹ<td>- '+fmt(t.sale):''}${t.cp?'<tr><td>کوڈ ڈسکاؤنٹ ('+code.k+' — '+dlab(code)+')<td>- '+fmt(t.cp):''}${t.adv?'<tr><td>ایڈوانس ڈسکاؤنٹ 5%<td>- '+fmt(t.adv):''}<tr><td>ڈیلیوری<td>${t.ship?fmt(t.ship):'فری'}<tr class=tt><td>کل رقم<td>${fmt(t.total)}</table></div>
<div class=box><b>ڈیلیوری کی تفصیل</b><input id=nm placeholder="آپ کا نام"><input id=ph type=tel placeholder="موبائل نمبر"><input id=ad placeholder="گلی نمبر، مکان نمبر"><input id=lm placeholder="مشہور جگہ / محلے کا نام"><input id=ct placeholder="شہر کا نام"><input id=sh placeholder="دکان کا نام، بازار (اگر دکان پر منگوانا ہو)"><button class="btn wa" id=pob onclick=place()>✅ آرڈر پلیس کریں</button></div>`}
function ch(i,d){const c=ld();c[i].q+=d;if(c[i].q<1)c.splice(i,1);sv(c);cdraw()}
async function ap(){const k=$('#cd').value.trim().toUpperCase(),o=DCODES.find(x=>k&&String(x.k).toUpperCase()==k&&x.on!==false);
if(!o||(o.exp&&new Date(o.exp+'T23:59:59')<new Date())){$('#cm').textContent='❌ کوڈ درست نہیں یا اس کی مدت ختم ہو چکی ہے';return}
if(o.max>0&&FBOK()){try{const u=Number(await fbGet('uses/'+o.id))||0;if(u>=o.max){$('#cm').textContent='❌ یہ کوڈ استعمال کی مقررہ حد پوری کر چکا ہے';return}}catch(e){$('#cm').textContent='❌ کوڈ چیک نہیں ہو سکا، دوبارہ کوشش کریں';return}}
code={k:o.k,id:o.id,type:o.type||'pct',val:Number(o.val),max:o.max||0};cdraw()}
async function place(){const c=ld(),nm=$('#nm').value.trim(),ph=$('#ph').value.trim(),ct=$('#ct').value.trim(),ad=$('#ad').value.trim();
if(!nm||!ph||!ct||!ad){toast('نام، موبائل، پتہ اور شہر لازمی ہیں');return}
const t=calc(c,code,pay),rest=Math.max(0,t.total-SHIP.fee);
let m='السلام علیکم! میں یہ آرڈر کرنا چاہتا ہوں:\n\n'+c.map((l,i)=>{const pr=gp(l.id),S=saleOf(pr);return (i+1)+') '+pr.n+' ('+pr.v[l.v][0]+') × '+l.q+' = '+fmt(lp(l)*l.q)+(S?' ['+(S.lucky?'لکی ڈرا ':'سیل ')+S.pct+'% آف]':'')}).join('\n')+'\n\nپروڈکٹس کی رقم: '+fmt(t.orig);
if(t.sale)m+='\nسیل ڈسکاؤنٹ: -'+fmt(t.sale);m+=(typeof lkNote=='function'?lkNote(c):'');
if(t.cp)m+='\nکوڈ ڈسکاؤنٹ (کوڈ: '+code.k+' — '+dlab(code)+'): -'+fmt(t.cp);if(t.adv)m+='\nایڈوانس ڈسکاؤنٹ: -'+fmt(t.adv);
m+='\nڈیلیوری چارجز: '+(t.ship?fmt(t.ship):'فری 🎉')+'\n*کل رقم: '+fmt(t.total)+'*\nادائیگی: '+(pay=='adv'?'ایڈوانس پیمنٹ':codLine(t,rest))+'\n\nنام: '+nm+'\nموبائل: '+ph+'\nپتہ: '+ad+'، '+$('#lm').value+'، '+ct+($('#sh').value?'\nدکان/بازار: '+$('#sh').value:'');
if(!FBOK()){window.open(wa(m),'_blank');return}
const b=$('#pob');b.disabled=true;b.textContent='⏳ آرڈر بھیجا جا رہا ہے...';
try{
 if(code&&code.max>0){const u=Number(await fbGet('uses/'+code.id))||0;if(u>=code.max){code=null;toast('❌ یہ کوڈ استعمال کی مقررہ حد پوری کر چکا ہے');cdraw();return}}
 await fbPost('orders',{text:m,n:nm,p:ph,ct,tot:t.total,at:new Date().toISOString()});
 if(code&&code.max>0){try{await fbPut('uses/'+code.id,{'.sv':{increment:1}})}catch(e){}}
 sv([]);code=null;cdraw();
 thanks('آپ کے آرڈر کرنے کا بہت شکریہ!','آپ کے آرڈر کی تفصیلات ہمارے پاس پہنچ چکی ہیں۔ اگلے 24 گھنٹوں میں ہماری ٹیم آپ سے رابطہ کرے گی۔')
}catch(e){b.disabled=false;b.textContent='✅ آرڈر پلیس کریں';const o=$('#pfb');if(o)o.remove();
 b.insertAdjacentHTML('afterend','<div class=info id=pfb style="margin-top:8px">آرڈر براہِ راست جمع نہیں ہو سکا۔ دوبارہ کوشش کریں، یا واٹس ایپ پر بھیج دیں:<br><a class="btn wa" target=_blank href="'+wa(m)+'" style="margin-top:6px">واٹس ایپ پر آرڈر بھیجیں</a></div>')}}

/* ---- Related Products: نیچے ڈاٹس (ہر سلائیڈ کے لیے ایک) ---- */
function relInit(){document.querySelectorAll('.rel .rsl').forEach(el=>{const w=el.parentNode,d=w.nextElementSibling;if(!d||!d.classList.contains('rdt'))return;
 const k=el.children.length,st=el.children[0].offsetWidth+12,vis=Math.max(1,Math.round((el.clientWidth+12)/st)),n=Math.max(1,k-vis+1);
 w.classList.toggle('one',n<2);d.style.display=n<2?'none':'';
 d.innerHTML=Array.from({length:n},(_,i)=>'<button type=button aria-label="'+(i+1)+'" onclick="relGo(this,'+i+')"></button>').join('');relUp(el)})}
function relGo(b,i){const d=b.parentNode,el=d.previousElementSibling.querySelector('.rsl'),rtl=getComputedStyle(el).direction=='rtl';el.scrollTo({left:i*(rtl?-1:1)*(el.children[0].offsetWidth+12),behavior:'smooth'})}
function relUp(el){const d=el.parentNode.nextElementSibling;if(!d||!d.classList.contains('rdt'))return;const st=el.children[0].offsetWidth+12,x=Math.abs(el.scrollLeft),B=d.children;let i=Math.round(x/st);if(x+el.clientWidth>=el.scrollWidth-4)i=B.length-1;i=Math.max(0,Math.min(B.length-1,i));for(let j=0;j<B.length;j++)B[j].classList.toggle('on',j==i)}
addEventListener('resize',()=>{try{relInit()}catch(e){}});
