const progress=document.getElementById('progress');
const themeBtn=document.getElementById('themeBtn');
const result=document.getElementById('result');
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/h*100)+'%'});
themeBtn.addEventListener('click',()=>{document.body.classList.toggle('light');themeBtn.textContent=document.body.classList.contains('light')?'☀':'☾'});
document.querySelectorAll('.answers button').forEach(btn=>btn.addEventListener('click',()=>{
  const correct=btn.dataset.answer==='b';
  result.textContent=correct?'✓ Chính xác! Nguyệt thực xảy ra khi Trái Đất nằm giữa Mặt Trời và Mặt Trăng.':'✗ Chưa đúng. Hãy nhớ: Trái Đất ở giữa → nguyệt thực.';
  result.style.color=correct?'#66d9ff':'#ffb36b';
}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.card,.section-head').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(18px)';el.style.transition='opacity .7s ease, transform .7s ease';observer.observe(el)});
const style=document.createElement('style');style.textContent='.show{opacity:1!important;transform:none!important}';document.head.appendChild(style);

/* PowerPoint-style slide navigation */
const slides=Array.from(document.querySelectorAll('main .slide'));
const prevSlide=document.getElementById('prevSlide');
const nextSlide=document.getElementById('nextSlide');
const slideCount=document.getElementById('slideCount');
const fullscreenBtn=document.getElementById('fullscreenBtn');
const startPresentation=document.getElementById('startPresentation');
let currentSlide=Math.max(0,slides.findIndex(s=>s.classList.contains('active-slide')));
function showSlide(index){
  currentSlide=Math.max(0,Math.min(index,slides.length-1));
  slides.forEach((slide,i)=>{
    slide.classList.toggle('active-slide',i===currentSlide);
    slide.setAttribute('aria-hidden',i===currentSlide?'false':'true');
    if(i===currentSlide) slide.scrollTop=0;
  });
  slideCount.textContent=String(currentSlide+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
  prevSlide.disabled=currentSlide===0;
  nextSlide.disabled=currentSlide===slides.length-1;
  progress.style.width=((currentSlide+1)/slides.length*100)+'%';
  history.replaceState(null,'','#'+(slides[currentSlide].id||('slide-'+(currentSlide+1))));
}
if(startPresentation) startPresentation.addEventListener('click',()=>showSlide(1));
prevSlide.addEventListener('click',()=>showSlide(currentSlide-1));
nextSlide.addEventListener('click',()=>showSlide(currentSlide+1));
document.addEventListener('keydown',event=>{
  if(['ArrowRight','PageDown',' '].includes(event.key)){event.preventDefault();showSlide(currentSlide+1);}
  if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();showSlide(currentSlide-1);}
  if(event.key==='Home')showSlide(0);
  if(event.key==='End')showSlide(slides.length-1);
});
fullscreenBtn.addEventListener('click',async()=>{
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(e){fullscreenBtn.textContent='Toàn màn hình không khả dụng';}
});
const hashId=decodeURIComponent(location.hash.slice(1));
const hashIndex=slides.findIndex(slide=>slide.id===hashId);
if(hashIndex>=0) currentSlide=hashIndex;
showSlide(currentSlide);
