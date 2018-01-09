const loadAnimate=function(){
  document.getElementById('animated').addEventListener("click",animate);
};

const animate=function(){
  let animated=document.getElementById('animated');
  animated.style.visibility= 'hidden';
  setTimeout(function(){ animated.style.visibility= 'visible'; }, 1000);
};

window.onload=loadAnimate;
