/* ===== seo.js — canonical، Open Graph، twitter:card اور Product JSON-LD بنانے والا مشترکہ کوڈ =====
   اسے سائٹ (pages.js)، ایڈمن پینل (admin.html) اور پروڈکٹ صفحات تیار کرنے والا سکرپٹ، تینوں استعمال کرتے ہیں۔
   سائٹ کا بنیادی پتہ صرف data.js کی SITE_URL سے آتا ہے۔ یہاں کوئی پتہ لکھا ہوا نہیں ہے۔ */
(function(){
var BRAND="عارفی دارالشفاء",CUR="PKR";
var esc=function(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};
var site=function(u){return String(u||"").replace(/\/+$/,"")};
var fallback=function(n){return n+" — عارفی دارالشفاء کی خالص ہربل دوا۔ پورے پاکستان میں فری ہوم ڈیلیوری اور کیش آن ڈیلیوری۔"};
function plain(t,max){t=String(t||"").replace(/\*\*/g,"").replace(/^#+\s*/gm,"").replace(/^-\s+/gm,"").replace(/\s+/g," ").trim();
 if(t.length>max){t=t.slice(0,max);var k=t.lastIndexOf(" ");if(k>max*.6)t=t.slice(0,k);t=t.replace(/[\s،۔.,\-]+$/,"")+"…"}return t}

/* پروڈکٹ کی بنیادی معلومات (opts.price: بنیادی قیمت کو موجودہ قیمت میں بدلنے والا فنکشن، مثلاً سیل کے لیے) */
function info(p,s,o){s=site(s);o=o||{};var slug=p.s||p.id,url=s+"/"+slug+"/";
 var pf=o.price||function(x){return x},offers=[],seen={};
 (p.v||[]).forEach(function(v){var base=Number(v&&v[1])||0;if(base<=0)return;var pr=pf(base),k=(v[0]||"")+"|"+pr;if(seen[k])return;seen[k]=1;
  var of={"@type":"Offer",url:url,price:String(pr),priceCurrency:CUR,availability:"https://schema.org/InStock"};if(v[0])of.name=v[0];offers.push(of)});
 var low=offers.length?Math.min.apply(null,offers.map(function(x){return Number(x.price)})):0;
 /* aggregateRating صرف اس صورت میں جب پروڈکٹ کے ساتھ سائٹ پر اصلی ریویوز موجود ہوں (وہی گنتی جو صفحے پر دکھتی ہے) */
 var r=p.r||[],rating=r.length?{value:Math.round(r.reduce(function(a,x){return a+(x.s||5)},0)/r.length*10)/10,count:r.length}:null;
 return{slug:slug,url:url,img:p.img?s+"/"+encodeURI(p.img):s+"/logo.webp",desc:p.md||plain(p.t,200)||fallback(p.n),offers:offers,low:low,rating:rating}}

/* canonical + Open Graph + twitter:card + JSON-LD (صرف ٹیگز، <head> کے اندر رکھنے کے لیے) */
function productTags(p,s,o){var I=info(p,s,o),t=[];
 t.push('<link rel=canonical href="'+esc(I.url)+'">');
 t.push('<meta property="og:title" content="'+esc(p.n)+'">');
 t.push('<meta property="og:description" content="'+esc(I.desc)+'">');
 t.push('<meta property="og:image" content="'+esc(I.img)+'">');
 t.push('<meta property="og:url" content="'+esc(I.url)+'">');
 t.push('<meta property="og:type" content="product">');
 if(I.low>0){t.push('<meta property="product:price:amount" content="'+I.low+'">');t.push('<meta property="product:price:currency" content="'+CUR+'">')}
 t.push('<meta name="twitter:card" content="summary_large_image">');
 var ld={"@context":"https://schema.org","@type":"Product",name:p.n,image:[I.img],description:I.desc,brand:{"@type":"Brand",name:BRAND}};
 if(I.offers.length)ld.offers=I.offers.length==1?I.offers[0]:I.offers;
 if(I.rating)ld.aggregateRating={"@type":"AggregateRating",ratingValue:I.rating.value,reviewCount:I.rating.count};
 t.push('<script type="application/ld+json" id="ld-product">'+JSON.stringify(ld).replace(/</g,"\\u003c")+'</script>');
 return t.join("\n")}

/* ---- صفحات کے ڈھانچے (موجودہ شیل جیسے ہی) ---- */
var BASEJS='<script>var BASE="/";(function(){var h=location.hostname,p=location.pathname;if(/\\.github\\.io$/.test(h))BASE="/"+p.split("/")[1]+"/";else if(location.protocol=="file:")BASE=p.replace(/[^\\/]*$/,"");document.write(\'<base href="\'+BASE+\'"><link rel=icon href=logo.webp><link rel=stylesheet href=style.css>\')})()<\/script>';
var FONT='<link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap" rel=stylesheet>';
var HEAD0='<!doctype html><html lang=ur dir=rtl><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">';
var LIST='["products","home-reviews","data","seo","app","pages"]';
var BODY1='</head><body><main id=m></main><script>';
var BODY2='.forEach(function(s){document.write(\'<script src="\'+s+\'.js"><\\/script>\')})<\/script></body></html>';
function top(p,s,o){var I=info(p,s,o);return HEAD0+"<title>"+esc(p.n)+" | "+BRAND+"</title><meta name=description content=\""+esc(I.desc)+"\">\n"+productTags(p,s,o)+"\n"}

/* x/index.html: اصل پتہ */
function productShell(p,s,o){return top(p,s,o)+BASEJS+FONT+BODY1+LIST+BODY2}

/* x.html: پرانا پتہ۔ ٹیگز وہی (canonical x/ کی طرف)، اور براؤزر میں x/ پر redirect۔
   .html والے پتے پر ہمیشہ redirect؛ بغیر .html والے پتے پر ایک ہی بار (تاکہ کلاؤڈ فیئر وغیرہ پر کبھی redirect لوپ نہ بنے)۔ */
function redirectShell(p,s,o){var I=info(p,s,o),rd='<script>(function(){var p=location.pathname;if(location.protocol=="file:"||/\\/$/.test(p))return;var go=1;if(!/\\.html$/.test(p)){var k="arfi-rd:"+p;try{if(sessionStorage.getItem(k))go=0;else sessionStorage.setItem(k,1)}catch(e){go=0}}if(go){window.__rd=1;location.replace('+JSON.stringify(I.slug+"/")+'+location.search+location.hash)}})()<\/script>\n<noscript><meta http-equiv=refresh content="0;url='+esc(I.slug+"/")+'"></noscript>\n';
 return top(p,s,o)+rd+BASEJS+FONT+BODY1+"if(!window.__rd)"+LIST+BODY2}

/* دوسرے صفحات کے لیے: موجودہ canonical بدلنا یا <title> کے بعد لگانا */
function withCanonical(html,url){var tag='<link rel=canonical href="'+esc(url)+'">';
 if(/<link rel=canonical[^>]*>/.test(html))return html.replace(/<link rel=canonical[^>]*>/,function(){return tag});
 return html.replace(/(<title>[^<]*<\/title>)/,function(m){return m+tag})}

/* صفحے کا canonical پتہ: ہوم کے لیے s/، باقی کے لیے s/slug */
var pageUrl=function(s,slug){return site(s)+"/"+(slug||"")};

/* براؤزر میں: <head> کے ٹیگز تازہ ڈیٹا (سیل کی قیمت، SITE_URL) کے مطابق بدلنا */
function apply(doc,p,s,o){var h=doc.head;
 Array.prototype.slice.call(h.querySelectorAll('link[rel=canonical],meta[property^="og:"],meta[property^="product:"],meta[name="twitter:card"],script#ld-product')).forEach(function(e){e.parentNode.removeChild(e)});
 h.insertAdjacentHTML("beforeend",productTags(p,s,o))}

var SEO={info:info,productTags:productTags,productShell:productShell,redirectShell:redirectShell,withCanonical:withCanonical,pageUrl:pageUrl,apply:apply,site:site,esc:esc};
if(typeof module!=="undefined"&&module.exports)module.exports=SEO;else window.SEO=SEO;
})();
