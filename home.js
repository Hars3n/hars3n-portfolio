var PROJECTS = [
  {id:1, title:"Larmes de crocodile",                     date:"2025",      sub:"Affiche de th\u00e9\u00e2tre",                                           page:"croco.html"},
  {id:2, title:"Mouvement de la typographie et rotation", date:"2026",      sub:"Corpus de recherches",                                                   page:"corpus.html"},
  {id:3, title:"Carte de visite",                         date:"2026",      sub:"Pap\u00e9terie",                                                          page:"carte.html"},
  {id:4, title:"Du visible au lisible",                   date:"2025/2026", sub:"R\u00e9aliser la m\u00e9diation d\u2019une exposition\u00a0: Affiche\u00a0/ catalogue\u00a0/ objet de m\u00e9diation", page:"du-visible-au-lisible.html"},
  {id:5, title:"Cycadia typographie",                     date:"2025",      sub:"Typographie modulaire",                                                   page:"cycadia.html"},
  {id:6, title:"3251W typographie",                       date:"2025",      sub:"Typographie modulaire",                                                   page:"romanetype.html"},
  {id:7, title:"Plaque au dragon",                        date:"2025",      sub:"Jeu de soci\u00e9t\u00e9 / objet de m\u00e9diation culturelle",          page:"plaque-dragon.html"},
  {id:8, title:"Zoetrope",                                date:"2026",      sub:"Animation",                                                               page:"zoetrope.html"}
];

/* CURSOR */
var cur = document.getElementById('cursor');
var mx=0, my=0, cx=0, cy=0;
document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; });
(function raf(){
  cx += (mx-cx)*.18;
  cy += (my-cy)*.18;
  cur.style.left = cx+'px';
  cur.style.top  = cy+'px';
  requestAnimationFrame(raf);
})();

/* BURGER */
var burger   = document.getElementById('burger');
var navPanel = document.getElementById('navPanel');
var overlay  = document.getElementById('overlay');

function toggleNav(f){
  var open = f !== undefined ? f : !burger.classList.contains('open');
  burger.classList.toggle('open', open);
  navPanel.classList.toggle('open', open);
  overlay.classList.toggle('active', open);
}
burger.addEventListener('click', function(){ toggleNav(); });
overlay.addEventListener('click', function(){ toggleNav(false); });
document.querySelectorAll('.nav-link').forEach(function(l){
  l.addEventListener('click', function(e){
    if(l.dataset.page === 'projets'){
      e.preventDefault();
      toggleNav(false);
      document.getElementById('projets').scrollIntoView({behavior:'smooth'});
    } else {
      toggleNav(false);
    }
  });
});

/* BIG NAME */
var LETTER_VARIANTS = [
  {w:'300',s:'normal'},
  {w:'300',s:'italic'},
  {w:'400',s:'italic'},
  {w:'500',s:'italic'},
  {w:'400',s:'normal'}
];

function buildName(){
  var el = document.getElementById('bigName');
  if(!el) return;
  el.innerHTML = '';
  var words = "Harsen Schmidt".split(' ');
  words.forEach(function(word, wi){
    if(wi > 0){
      var sp = document.createElement('span');
      sp.style.cssText = 'display:inline-block;width:.28em;';
      el.appendChild(sp);
    }
    var ww = document.createElement('span');
    ww.style.cssText = 'display:inline-block;white-space:nowrap;';
    Array.from(word).forEach(function(ch){
      var s = document.createElement('span');
      s.style.cssText = 'display:inline-block;transition:transform .35s,font-weight .35s,font-style .35s,letter-spacing .35s;';
      s.textContent = ch;
      s.addEventListener('mouseenter', function(){
        s.style.transform     = 'translateY(-8px)';
        s.style.fontWeight    = '300';
        s.style.fontStyle     = 'italic';
        s.style.letterSpacing = '.04em';
      });
      s.addEventListener('mouseleave', function(){
        s.style.transform     = '';
        s.style.fontWeight    = '';
        s.style.fontStyle     = '';
        s.style.letterSpacing = '';
      });
      s.addEventListener('click', function(){
        var v = LETTER_VARIANTS[Math.floor(Math.random()*LETTER_VARIANTS.length)];
        s.style.fontWeight = v.w;
        s.style.fontStyle  = v.s;
      });
      ww.appendChild(s);
    });
    el.appendChild(ww);
  });
}
buildName();

/* BIO */
function buildBio(){
  var el = document.getElementById('bioText');
  if(!el) return;
  el.innerHTML = '';
  var lines = [
    "Je suis \u00e9tudiant en deuxi\u00e8me ann\u00e9e de design graphique \u00e0 l\u2019Initiative Paris,",
    "\u00e0 travers ce site je souhaite vous pr\u00e9senter les projets que j\u2019ai pu r\u00e9aliser et qui me tiennent \u00e0 c\u0153ur ainsi que mon univers",
    "et ce qui me pla\u00eet dans le graphisme.",
    "Je vous souhaite une bonne visite\u00a0:)"
  ];
  lines.forEach(function(line, li){
    if(li > 0){ el.appendChild(document.createElement('br')); }
    el.appendChild(document.createTextNode(line));
  });
}
buildBio();

document.getElementById('bioText').addEventListener('mouseenter', function(){ cur.classList.add('text-mode'); });
document.getElementById('bioText').addEventListener('mouseleave', function(){ cur.classList.remove('text-mode'); });
document.getElementById('scrollHint').addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById('projets').scrollIntoView({behavior:'smooth'});
});

/* PREVIEW PANEL */
var previewInner = document.getElementById('previewInner');
var marqueeEl    = document.getElementById('marquee');
var mq1          = document.getElementById('mq1');
var mq2          = document.getElementById('mq2');

var previewEls = {};
PROJECTS.forEach(function(p){

  if(p.id === 1){
    var wrap = document.createElement('div'); wrap.className = 'custom-wrap';
    var topImg = document.createElement('img'); topImg.src='croco1.jpg'; topImg.alt='Larmes de crocodile'; topImg.className='top-img';
    var row = document.createElement('div'); row.className='portrait-row';
    var r1 = document.createElement('img'); r1.src='croco2.jpg'; r1.alt='';
    var r2 = document.createElement('img'); r2.src='croco3.jpg'; r2.alt='';
    row.appendChild(r1); row.appendChild(r2);
    wrap.appendChild(topImg); wrap.appendChild(row);
    previewEls[p.id] = wrap;

  } else if(p.id === 2){
    var wrap = document.createElement('div'); wrap.className='custom-wrap';
    var topImg = document.createElement('img'); topImg.src='P1-corpus.jpg'; topImg.alt='Corpus'; topImg.className='top-img';
    var row = document.createElement('div'); row.className='portrait-row';
    var pm1 = document.createElement('img'); pm1.src='P3-corpus.jpg'; pm1.alt='';
    var pm2 = document.createElement('img'); pm2.src='P5-corpus.jpg'; pm2.alt='';
    row.appendChild(pm1); row.appendChild(pm2);
    wrap.appendChild(topImg); wrap.appendChild(row);
    previewEls[p.id] = wrap;

  } else if(p.id === 3){
    var wrap = document.createElement('div'); wrap.className='custom-wrap';
    var topRow = document.createElement('div'); topRow.className='portrait-row';
    var ti1 = document.createElement('img'); ti1.src='carte-v6.jpg'; ti1.alt='';
    var ti2 = document.createElement('img'); ti2.src='carte-v5.jpg'; ti2.alt='';
    topRow.appendChild(ti1); topRow.appendChild(ti2);
    var botImg = document.createElement('img'); botImg.src='carte-v2.jpg'; botImg.alt=''; botImg.className='top-img';
    wrap.appendChild(topRow); wrap.appendChild(botImg);
    previewEls[p.id] = wrap;

  } else if(p.id === 5){
    var wrap = document.createElement('div'); wrap.className='custom-wrap';
    var topImg = document.createElement('img'); topImg.src='cycadia-5.jpg'; topImg.alt=''; topImg.className='top-img';
    var row = document.createElement('div'); row.className='portrait-row';
    var pm1 = document.createElement('img'); pm1.src='cycadia-3.jpg'; pm1.alt='';
    var pm2 = document.createElement('img'); pm2.src='cycadia-2.jpg'; pm2.alt='';
    row.appendChild(pm1); row.appendChild(pm2);
    wrap.appendChild(topImg); wrap.appendChild(row);
    previewEls[p.id] = wrap;

  } else if(p.id === 6){
    var wrap = document.createElement('div'); wrap.className='custom-wrap';
    var topImg = document.createElement('img'); topImg.src='3152W-4.jpg'; topImg.alt=''; topImg.className='top-img';
    var row = document.createElement('div'); row.className='portrait-row';
    var pm1 = document.createElement('img'); pm1.src='3152W-5.jpg'; pm1.alt='';
    var pm2 = document.createElement('img'); pm2.src='3152W-6.jpg'; pm2.alt='';
    row.appendChild(pm1); row.appendChild(pm2);
    wrap.appendChild(topImg); wrap.appendChild(row);
    previewEls[p.id] = wrap;

  } else {
    var img = document.createElement('img');
    img.src = 'img/project'+p.id+'.jpg';
    img.alt = p.title;
    previewEls[p.id] = img;
  }
});

function showPreview(p){
  previewInner.innerHTML = '';
  previewInner.appendChild(previewEls[p.id]);
  previewInner.classList.add('visible');
  var t = (p.title+' \u2014 '+p.date+'    ').repeat(6);
  mq1.textContent = t;
  mq2.textContent = t;
  marqueeEl.classList.add('visible');
  cur.classList.add('big');
}
function hidePreview(){
  previewInner.classList.remove('visible');
  marqueeEl.classList.remove('visible');
  cur.classList.remove('big');
}

/* PROJECTS LIST */
function buildProjects(){
  var list = document.getElementById('projectList');
  var mob  = function(){ return window.innerWidth <= 768; };
  PROJECTS.forEach(function(p){
    var item  = document.createElement('div');  item.className  = 'project-item';
    var hdr   = document.createElement('div');  hdr.className   = 'project-header';
    var title = document.createElement('span'); title.className = 'project-title'; title.textContent = p.title;
    var date  = document.createElement('span'); date.className  = 'project-date';  date.textContent  = p.date;
    hdr.appendChild(title);
    hdr.appendChild(date);
    item.appendChild(hdr);
    if(p.sub){
      var sub = document.createElement('p');
      sub.className   = 'project-sub';
      sub.textContent = p.sub;
      item.appendChild(sub);
    }
    item.addEventListener('mouseenter', function(){ if(mob()) return; cur.classList.add('link-mode');    showPreview(p); });
    item.addEventListener('mouseleave', function(){ if(mob()) return; cur.classList.remove('link-mode'); hidePreview();  });
    item.addEventListener('click',      function(){ window.location.href = p.page; });
    list.appendChild(item);
  });
  document.querySelectorAll('a, .burger').forEach(function(el){
    el.addEventListener('mouseenter', function(){ cur.classList.add('link-mode');    });
    el.addEventListener('mouseleave', function(){ cur.classList.remove('link-mode'); });
  });
}
buildProjects();

/* SCROLL parallax */
window.addEventListener('scroll', function(){
  var y    = window.scrollY;
  var name = document.getElementById('bigName');
  name.style.transform = 'translateY('+(y*.12)+'px)';
  name.style.opacity   = Math.max(0, 1-y/420);
}, {passive:true});
