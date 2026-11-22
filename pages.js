/* تمام صفحات کا کوڈ یہاں ہے۔ ہر .html فائل اور ہر فولڈر کی index.html ایک ہی خالی ڈھانچہ ہے، صفحہ لنک دیکھ کر خود بنتا ہے */
lay();
let PP=null,vi=0,q=1,code=null,pay='cod';
const HRV=typeof HOME_RV!=='undefined'?HOME_RV:[];
/* تمام فیڈبیک: ہوم پیج والے + ہر پروڈکٹ والے (پروڈکٹ کا نام ساتھ) — خود بخود جمع ہوتے ہیں */
const ARV=()=>[...HRV.map(r=>[r,r.p]),...P.flatMap(p=>(p.r||[]).map(r=>[r,p.n]))];
function route(){
 const Q=new URLSearchParams(location.search);let rel;
 try{rel=decodeURIComponent(location.pathname)}catch(e){rel=location.pathname}
 if(rel+'/'==BASE)rel='';else if(rel.startsWith(BASE))rel=rel.slice(BASE.length);else rel=rel.replace(/^\//,'');
 rel=rel.replace(/(^|\/)index\.html$/,'').replace(/\/+$/,'');
 const F={'':['home'],'product.html':['prod',Q.get('id')],'category.html':['cat',Q.get('c')||'all'],'diseases.html':['dis'],'about.html':['about'],'terms.html':['terms'],'cart.html':['cart'],'reviews.html':['rev'],'reviews':['rev']};
 if(F[rel])return F[rel];
 const c=CATS.find(x=>x[3]==rel);if(c)return['cat',c[0]];
 for(const k of ['diseases','about','terms','cart'])if(PG[k]==rel)return[{diseases:'dis'}[k]||k];
 const p=P.find(x=>(x.s||x.id)==rel)||P.find(x=>x.id==rel);
 return p?['prod',p.id]:['nf'];}
const R=route();
({home,cat,dis,about,terms,cart,prod,nf,rev})[R[0]](R[1]);

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

function terms(){document.title='شرائط و ضوابط | عارفی دارالشفاء';const T=["تمام پارسلوں کی ہوم ڈیلیوری فری ہو گی۔", "تمام پارسل پرائیویٹ کورئیر کمپنیز میں سے جس کے ساتھ آسانی ہو اس کمپنی سے بھیجے جاتے ہیں۔ اگر آپ کسی خاص کورئیر کمپنی سے منگوانا چاہتے ہیں تو اضافی ڈیلیوری چارجز ادا کرنا ہوں گے۔ آرڈر موصول ہونے کے بعد 1 سے 3 دن میں روانہ کر دیا جاتا ہے۔ پارسل بکنگ کے بعد اگر تین دن میں پارسل موصول نہ ہو تو فوراً عارفی دارالشفاء میں بذریعہ کال یا واٹس ایپ اطلاع دیں۔ بسا اوقات پارسل کی ڈیلیوری میں تاخیر ہو جاتی ہے، ایسی صورت میں صبر و تحمل کا مظاہرہ کریں اور تیسرے دن تک پارسل نہ ملنے پر اطلاع کریں تاکہ مسئلہ حل کیا جا سکے۔", "تمام کورئیر کمپنیاں صرف شہروں میں ڈیلیوری فراہم کرتی ہیں۔ اگر آپ گاؤں سے ہیں تو آپ کو قریبی شہر سے پارسل وصول کرنا ہو گا۔", "اگر آپ پارسل بذریعہ ڈاکخانہ منگوانا چاہتے ہیں تو واضح رہے کہ ڈاکخانہ سے پارسل کے لیٹ پہنچنے، گم ہو جانے یا ٹوٹ پھوٹ کی ذمہ داری خریدار پر ہو گی۔ عارفی دارالشفاء یہ ذمہ داری قبول نہیں کرتا اور صرف رسید دینے کا پابند ہے۔ جبکہ کورئیر کمپنی کی صورت میں ہر قسم کی ذمہ داری عارفی دارالشفاء قبول کرتا ہے۔ لہٰذا کسی بھی پریشانی سے بچنے کے لیے کورئیر کمپنی کے ذریعے ہی پارسل بک کروائیں۔", "اگر آپ پارسل کیش آن ڈیلیوری منگوانا چاہتے ہیں تو آپ کو کم از کم "+DELIV+" روپے ڈیلیوری چارجز کی مد میں ایڈوانس جمع کروانے ہوں گے، جبکہ باقی پیمنٹ آپ میڈیسن وصول کرتے وقت ادا کر سکتے ہیں۔", "ڈاکخانہ / پوسٹ آفس سے کیش آن ڈیلیوری پارسل نہیں بھیجے جاتے، صرف کورئیر کمپنی سے کیش آن ڈیلیوری پارسل بھیجے جاتے ہیں۔", "عارفی دارالشفاء تمام آرڈرز جانچ پڑتال کے بعد صحیح طور پر پیکنگ کر کے روانہ کرتا ہے۔ تاہم کسی وجہ سے اگر غلط آرڈر ڈیلیور ہو جائے یا پارسل ٹوٹ پھوٹ کا شکار ہو جائے تو فوراً عارفی دارالشفاء میں بذریعہ کال یا واٹس ایپ اطلاع دیں۔", "اگر ڈیلیوری کے وقت پارسل کی پیکنگ برقرار نہ ہو تو کسی صورت پارسل وصول نہ کریں اور عارفی دارالشفاء کو بذریعہ کال یا واٹس ایپ اطلاع دیں۔ پیکنگ خراب ہونے کے باوجود پارسل وصول کر لینے کی صورت میں عارفی دارالشفاء ذمہ دار نہ ہو گا۔", "تمام ادویات کے اجزاء کے خالص ہونے کی گارنٹی دی جاتی ہے۔ شفاء من جانب اللہ ہے، اس لیے شفاء کی گارنٹی دینا ممکن نہیں ہوتا۔ بہترین اور خالص اجزاء کی وجہ سے ادویات کی شفایابی کا رزلٹ 95% تک بہترین ہوتا ہے۔ آپ کسی بھی صحت کے مسئلے کا شکار ہیں تو ایک دفعہ عارفی دارالشفاء کو ضرور آزمائیں، ان شاء اللہ مایوسی نہیں ہو گی۔", "تمام قدرتی پروڈکٹس مثلاً شہد، سلاجیت وغیرہ کی چیک وارنٹی دی جاتی ہے۔ اگر پسند نہ آئے تو آپ واپس کر کے پیمنٹ ری فنڈ کروا سکتے ہیں۔", "پارسل کورئیر کمپنی میں بک ہونے کے بعد کینسل کرنے کی صورت میں ڈیلیوری چارجز ادا کرنا ہوں گے۔", "تمام ادویات سیل بند ہونے کی حالت میں قابلِ واپسی ہیں۔ واپس بھیجنے کا خرچ خریدار کے ذمہ ہو گا۔", "عارفی دارالشفاء کے طبی ماہرین سے مشورے کے لیے یا کسی بھی مسئلے کی صورت میں ہفتہ تا جمعرات صبح 9 سے شام 5 بجے کے درمیان بذریعہ کال یا واٹس ایپ رابطہ کیا جا سکتا ہے: <bdi dir=ltr>0311-1307530</bdi>"];
$('#m').innerHTML='<h2>شرائط و ضوابط</h2><div class=box><ol style="padding-right:20px;margin:0">'+T.map(x=>'<li style="margin-bottom:8px">'+x+'</li>').join('')+'</ol></div>'}

function nf(){document.title='صفحہ نہیں ملا | عارفی دارالشفاء';$('#m').innerHTML='<div class=box style=text-align:center><p>معذرت، یہ صفحہ نہیں ملا۔</p><a class=btn href="'+(BS()||'./')+'">ہوم پیج پر جائیں</a></div>'}

/* ---- پروڈکٹ ---- */
function prod(id){PP=gp(id);if(!PP){location.href=BS()||'./';return}document.title=PP.n;let m=document.querySelector('meta[name=description]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}m.content=PP.md||(PP.n+' — عارفی دارالشفاء کی خالص ہربل دوا۔ پورے پاکستان میں فری ہوم ڈیلیوری اور کیش آن ڈیلیوری۔');pdraw()}
function pdraw(){const p=PP,op=p.v[vi][1],S=saleOf(p),pr=S?sp(p,op):op,lb=p.v[vi][0];
$('#m').innerHTML=`<div class=box style=text-align:center>${p.img?'<img src='+p.img+' alt="" style="width:100%;max-width:360px;border-radius:14px">':"<div style='background:var(--c) url(logo.webp) center/40% no-repeat;aspect-ratio:16/10;border-radius:14px'></div>"}<h1 style='font-weight:400;color:var(--g);font-size:1.6rem'>${p.n}</h1>
${lb||p.v.length>1?'<div>'+p.v.map((v,i)=>'<button class="pill '+(i==vi?'on':'')+'" onclick="vi='+i+';pdraw()">'+(v[0]||(v[1]?fmt(sp(p,v[1])):''))+'</button>').join('')+'</div>':''}
${pr?'<div class=pbx><span class=big>'+fmt(pr)+'</span>'+(S?'<div class=pcut><s class=op2>'+fmt(op)+'</s><span class=sbd2>'+S.pct+'% OFF</span></div>':'')+'</div>'+(S&&S.end?'<div class=cdn id=cdn data-e="'+S.end+'"></div>':'')+'<div class=qty><button onclick="q>1&&(q--,pdraw())">−</button>'+q+'<button onclick="q++,pdraw()">+</button></div>':'<p>قیمت کے لیے واٹس ایپ پر رابطہ کریں</p>'}
<p><a class='btn wa' target=_blank href="${wa('میں "'+p.n+'" '+(lb?'('+lb+') ':'')+'× '+q+(pr?' آرڈر کرنا چاہتا ہوں۔ قیمت: '+fmt(pr*q):' کے بارے میں معلومات چاہتا ہوں'))}">واٹس ایپ پر ابھی آرڈر کریں</a></p>
${pr?'<button class="btn lt en" onclick="add(PP.id,vi,q)">🛒 Add to Cart</button>':''}</div>
<div class=tr><div><i>🌿</i>100% ہربل</div><div><i>💵</i>کیش آن ڈیلیوری</div><div class=w><i>🚚</i>پورے پاکستان میں فری ہوم ڈیلیوری</div></div>${desc(p)?'<div class="box ds">'+desc(p)+(p.vid?'<p style=text-align:center><a class="btn lt" target=_blank href="'+p.vid+'">▶ ویڈیو دیکھیں</a></p>':'')+'</div>':''}${reviewsSec(p)}${rvForm(p)}${faqSec()}`;ctStart()}

/* ---- کارٹ ---- */
function cart(){document.title='کارٹ | عارفی دارالشفاء';cdraw()}
function cdraw(){const c=ld();if(!c.length){$('#m').innerHTML='<div class=box style=text-align:center><p>آپ کا کارٹ خالی ہے۔</p><a class=btn href="'+cu(CATS[0])+'">ادویات دیکھیں</a></div>';return}
const hs=c.some(l=>saleOf(gp(l.id)));if(hs)code=null;
const t=calc(c,code,pay),rest=Math.max(0,t.total-DELIV);
$('#m').innerHTML=`<h2>آپ کا کارٹ</h2><div class=box>${c.map((l,i)=>'<div class=rw><div>'+gp(l.id).n+'<small>'+gp(l.id).v[l.v][0]+' | '+(saleOf(gp(l.id))?'<s class=op2>'+fmt(gp(l.id).v[l.v][1])+'</s> ':'')+fmt(lp(l))+(saleOf(gp(l.id))?' <b style="color:#b71c1c">('+saleOf(gp(l.id)).pct+'% سیل)</b>':'')+'</small></div><span class=qty><button onclick="ch('+i+',-1)">−</button>'+l.q+'<button onclick="ch('+i+',1)">+</button></span><button class=x onclick="ch('+i+',-99)">🗑</button></div>').join('')}</div>
${hs?'':`<div class=box><b>ڈسکاؤنٹ کوڈ</b><div style=display:flex;gap:6px><input id=cd placeholder="کوڈ یہاں پیسٹ کریں" ${code?'disabled value="'+code.k+'"':''}><button class=btn style=width:auto onclick=ap() ${code?'disabled':''}>لگائیں</button></div><div id=cm>${code?'✔ کوڈ "'+code.k+'" لگ گیا — '+dlab(code)+' ڈسکاؤنٹ':''}</div></div>`}
<div class=box><b>ادائیگی کا طریقہ</b><br><label><input type=radio name=py style=width:auto ${pay=='cod'?'checked':''} onchange="pay='cod';cdraw()"> کیش آن ڈیلیوری</label><br><label><input type=radio name=py style=width:auto ${pay=='adv'?'checked':''} onchange="pay='adv';cdraw()"> ایڈوانس پیمنٹ (اضافی 5% ڈسکاؤنٹ)</label>
<div class=info>${pay=='adv'?'آرڈر پلیس کرنے کے بعد ہماری ٹیم آپ سے رابطہ کر کے اکاؤنٹ نمبر فراہم کر دے گی۔':'کیش آن ڈیلیوری کی صورت میں ڈیلیوری چارجز ایڈوانس وصول کیے جاتے ہیں۔ ہماری ہوم ڈیلیوری فری ہے، مگر کورئیر کو Rs. '+DELIV+' ڈیلیوری چارجز دینا ہوتے ہیں۔ آپ باقی Rs. '+rest+' ڈیلیوری کے وقت کورئیر کو ادا کریں گے۔ ڈیلیوری چارجز کی ادائیگی کے لیے ہماری ٹیم آپ سے رابطہ کر کے اکاؤنٹ نمبر فراہم کر دے گی۔'}</div></div>
<div class=box><table class=sum width=100%><tr><td>پروڈکٹس (${t.n})<td>${fmt(t.orig)}${t.sale?'<tr><td>سیل ڈسکاؤنٹ<td>- '+fmt(t.sale):''}${t.cp?'<tr><td>کوڈ ڈسکاؤنٹ ('+code.k+' — '+dlab(code)+')<td>- '+fmt(t.cp):''}${t.adv?'<tr><td>ایڈوانس ڈسکاؤنٹ 5%<td>- '+fmt(t.adv):''}<tr><td>ڈیلیوری<td>فری<tr class=tt><td>کل رقم<td>${fmt(t.total)}</table></div>
<div class=box><b>ڈیلیوری کی تفصیل</b><input id=nm placeholder="آپ کا نام"><input id=ph type=tel placeholder="موبائل نمبر"><input id=ad placeholder="گلی نمبر، مکان نمبر"><input id=lm placeholder="مشہور جگہ / محلے کا نام"><input id=ct placeholder="شہر کا نام"><input id=sh placeholder="دکان کا نام، بازار (اگر دکان پر منگوانا ہو)"><button class="btn wa" id=pob onclick=place()>✅ آرڈر پلیس کریں</button></div>`}
function ch(i,d){const c=ld();c[i].q+=d;if(c[i].q<1)c.splice(i,1);sv(c);cdraw()}
async function ap(){const k=$('#cd').value.trim().toUpperCase(),o=DCODES.find(x=>k&&String(x.k).toUpperCase()==k&&x.on!==false);
if(!o||(o.exp&&new Date(o.exp+'T23:59:59')<new Date())){$('#cm').textContent='❌ کوڈ درست نہیں یا اس کی مدت ختم ہو چکی ہے';return}
if(o.max>0&&FBOK()){try{const u=Number(await fbGet('uses/'+o.id))||0;if(u>=o.max){$('#cm').textContent='❌ یہ کوڈ استعمال کی مقررہ حد پوری کر چکا ہے';return}}catch(e){$('#cm').textContent='❌ کوڈ چیک نہیں ہو سکا، دوبارہ کوشش کریں';return}}
code={k:o.k,id:o.id,type:o.type||'pct',val:Number(o.val),max:o.max||0};cdraw()}
async function place(){const c=ld(),nm=$('#nm').value.trim(),ph=$('#ph').value.trim(),ct=$('#ct').value.trim(),ad=$('#ad').value.trim();
if(!nm||!ph||!ct||!ad){toast('نام، موبائل، پتہ اور شہر لازمی ہیں');return}
const t=calc(c,code,pay),rest=Math.max(0,t.total-DELIV);
let m='السلام علیکم! میں یہ آرڈر کرنا چاہتا ہوں:\n\n'+c.map((l,i)=>{const pr=gp(l.id),S=saleOf(pr);return (i+1)+') '+pr.n+' ('+pr.v[l.v][0]+') × '+l.q+' = '+fmt(lp(l)*l.q)+(S?' [سیل '+S.pct+'% آف]':'')}).join('\n')+'\n\nپروڈکٹس کی رقم: '+fmt(t.orig);
if(t.sale)m+='\nسیل ڈسکاؤنٹ: -'+fmt(t.sale);
if(t.cp)m+='\nکوڈ ڈسکاؤنٹ (کوڈ: '+code.k+' — '+dlab(code)+'): -'+fmt(t.cp);if(t.adv)m+='\nایڈوانس ڈسکاؤنٹ: -'+fmt(t.adv);
m+='\n*کل رقم: '+fmt(t.total)+'*\nادائیگی: '+(pay=='adv'?'ایڈوانس پیمنٹ':'کیش آن ڈیلیوری (ڈیلیوری چارجز '+fmt(DELIV)+' ایڈوانس، باقی '+fmt(rest)+' کورئیر کو)')+'\n\nنام: '+nm+'\nموبائل: '+ph+'\nپتہ: '+ad+'، '+$('#lm').value+'، '+ct+($('#sh').value?'\nدکان/بازار: '+$('#sh').value:'');
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
