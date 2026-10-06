(function(){
  var chips=document.querySelectorAll('.chip'),cards=document.querySelectorAll('.tc');
  chips.forEach(function(b){b.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.remove('on');});b.classList.add('on');
    cards.forEach(function(c){c.hidden=!(b.dataset.f==='all'||c.dataset.cat===b.dataset.f);});
  });});
})();
