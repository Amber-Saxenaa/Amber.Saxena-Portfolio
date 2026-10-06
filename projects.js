(function(){
  var chips=document.querySelectorAll('.chip'),cards=document.querySelectorAll('.pj'),q=document.getElementById('q'),empty=document.getElementById('empty'),f='all';
  function run(){
    var t=q.value.trim().toLowerCase(),n=0;
    cards.forEach(function(c){
      var ok=(f==='all'||c.dataset.cat===f)&&(!t||c.dataset.q.indexOf(t)>-1);
      c.hidden=!ok; if(ok)n++;
    });
    empty.hidden=n>0;
  }
  chips.forEach(function(b){b.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.remove('on');});b.classList.add('on');f=b.dataset.f;run();
  });});
  q.addEventListener('input',run);
})();
