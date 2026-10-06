(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-bars]').forEach(function(el){
    el.dataset.bars.split(',').forEach(function(h){var s=document.createElement('span');s.style.setProperty('--h',h+'%');el.appendChild(s);});
  });
  var nav=document.getElementById('nav'),b=document.querySelector('.burger'),l=document.getElementById('links');
  var bar=document.createElement('div');bar.className='prog';document.body.appendChild(bar);
  var up=document.createElement('button');up.className='totop';up.setAttribute('aria-label','Back to top');up.textContent='↑';document.body.appendChild(up);
  up.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'});});
  var tick=false;
  function onScroll(){
    if(tick)return;tick=true;
    requestAnimationFrame(function(){
      var h=document.documentElement.scrollHeight-innerHeight;
      bar.style.transform='scaleX('+(h>0?scrollY/h:0)+')';
      nav.classList.toggle('solid',scrollY>20);up.classList.toggle('show',scrollY>700);
      if(!reduce&&scrollY<900)px.forEach(function(el){el.style.translate='0 '+(scrollY*el.dataset.parallax)+'px';});
      tick=false;
    });
  }
  var px=document.querySelectorAll('[data-parallax]');
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  b.addEventListener('click',function(){var o=l.classList.toggle('open');b.setAttribute('aria-expanded',o);});
  l.addEventListener('click',function(e){if(e.target.tagName==='A'){l.classList.remove('open');b.setAttribute('aria-expanded',false);}});
  if(reduce)return;
  document.body.classList.add('ready');
  document.querySelectorAll('.pstats b').forEach(function(n){var m=n.textContent.match(/^([\d.]+)(.*)$/);if(m){n.dataset.count=m[1];n.dataset.suffix=m[2];}});
  function countUp(root){
    root.querySelectorAll('[data-count]').forEach(function(n){
      var to=parseFloat(n.dataset.count),suf=n.dataset.suffix||'',dec=(n.dataset.count.split('.')[1]||'').length,t0=performance.now();
      (function f(t){var p=Math.min((t-t0)/1200,1);n.textContent=(to*(1-Math.pow(1-p,3))).toFixed(dec)+suf;if(p<1)requestAnimationFrame(f);})(t0);
    });
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);countUp(e.target);}});},{threshold:.12});
  document.querySelectorAll('.stats,.pstats,.card,.proc li,.cta>div,.cta-t,.cm-in,.head').forEach(function(el){
    var sib=Array.prototype.indexOf.call(el.parentNode.children,el);
    el.style.setProperty('--d',Math.min(sib,6)*0.09+'s');
    el.classList.add('rv');io.observe(el);
  });
  if(matchMedia('(hover:hover)').matches)document.querySelectorAll('.tilt').forEach(function(c){
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();
      c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*6+'deg');
      c.style.setProperty('--rx',(-((e.clientY-r.top)/r.height-.5))*6+'deg');});
    c.addEventListener('pointerleave',function(){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg');});
  });
})();
