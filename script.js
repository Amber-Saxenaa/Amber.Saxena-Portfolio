(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // build mini bar charts
  document.querySelectorAll('[data-bars]').forEach(function(el){
    el.dataset.bars.split(',').forEach(function(h){var s=document.createElement('span');s.style.setProperty('--h',h+'%');el.appendChild(s);});
  });
  // nav: scrolled state + mobile menu
  var nav=document.getElementById('nav'), b=document.querySelector('.burger'), l=document.getElementById('links');
  addEventListener('scroll',function(){nav.classList.toggle('solid',scrollY>20);},{passive:true});
  b.addEventListener('click',function(){var o=l.classList.toggle('open');b.setAttribute('aria-expanded',o);});
  if(reduce) return;
  // hero load sequence (the one orchestrated moment)
  document.body.classList.add('ready');
  // reveal sections on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);countUp(e.target);}});},{threshold:.15});
  document.querySelectorAll('.stats,.card,.proc li,.cta>div').forEach(function(el){el.classList.add('rv');io.observe(el);});
  function countUp(root){
    root.querySelectorAll('[data-count]').forEach(function(n){
      var to=+n.dataset.count,suf=n.dataset.suffix||'',t0=performance.now();
      (function f(t){var p=Math.min((t-t0)/1100,1);n.textContent=Math.round(to*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f);})(t0);
    });
  }
  // gentle parallax on hero cards
  var px=document.querySelectorAll('[data-parallax]');
  addEventListener('scroll',function(){if(scrollY>900)return;px.forEach(function(el){el.style.translate='0 '+(scrollY*el.dataset.parallax)+'px';});},{passive:true});
})();
