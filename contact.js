(function(){
  var f=document.getElementById('cf'),msg=document.getElementById('fmsg');
  f.querySelectorAll('input,select,textarea').forEach(function(el){
    function t(){el.parentNode.classList.toggle('has',!!el.value);el.parentNode.classList.remove('bad');}
    el.addEventListener('input',t);el.addEventListener('change',t);
  });
  f.addEventListener('submit',function(e){
    e.preventDefault();msg.className='fmsg';msg.textContent='';
    var bad=false;
    f.querySelectorAll('[required]').forEach(function(el){
      var ok=el.value.trim()&&(el.type!=='email'||/^\S+@\S+\.\S+$/.test(el.value));
      el.parentNode.classList.toggle('bad',!ok);if(!ok)bad=true;
    });
    if(bad){msg.className='fmsg err';msg.textContent='Please fill in the highlighted fields.';return;}
    if(f.action.indexOf('YOUR_FORM_ID')>-1){msg.className='fmsg err';msg.textContent='The form is not connected yet. Add your Formspree link first.';return;}
    var btn=f.querySelector('button');btn.disabled=true;btn.textContent='Sending...';
    fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(function(r){
      if(!r.ok)throw 0;f.reset();f.querySelectorAll('label').forEach(function(l){l.classList.remove('has');});
      msg.className='fmsg ok';msg.textContent='Thank you! Your message is on its way. I will reply soon.';
    }).catch(function(){msg.className='fmsg err';msg.textContent='Something went wrong. Please try again or use another contact method.';})
    .then(function(){btn.disabled=false;btn.textContent='Send Message →';});
  });
  document.querySelectorAll('.cp').forEach(function(b){b.addEventListener('click',function(){
    var t=document.getElementById(b.dataset.c).textContent;
    (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.classList.add('done');b.textContent='✓';setTimeout(function(){b.classList.remove('done');b.textContent='⧉';},1500);}).catch(function(){});
  });});
})();
