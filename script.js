const progress=document.getElementById('progress');
const themeBtn=document.getElementById('themeBtn');
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?scrollY/h*100:0)+'%'});
themeBtn.addEventListener('click',()=>{document.body.classList.toggle('light');themeBtn.textContent=document.body.classList.contains('light')?'☀':'☾'});

/* Quiz: instant feedback + score */
let quizScore=0;
const answeredQuizzes=new WeakSet();
document.querySelectorAll('.quiz').forEach(quiz=>{
  const result=quiz.querySelector('.result');
  quiz.querySelectorAll('.answers button').forEach(btn=>btn.addEventListener('click',()=>{
    const second=quiz.querySelector('.q')?.textContent.includes('Câu 2');
    const correct=second ? btn.dataset.answer==='a' : btn.dataset.answer==='b';
    if(!answeredQuizzes.has(quiz)){
      answeredQuizzes.add(quiz);
      if(correct) quizScore++;
    }
    quiz.querySelectorAll('.answers button').forEach(b=>b.classList.remove('picked-correct','picked-wrong'));
    btn.classList.add(correct?'picked-correct':'picked-wrong');
    result.textContent=second
      ? (correct?'✓ Chính xác! Gần thẳng hàng → triều cường.':'✗ Chưa đúng. Gần thẳng hàng → biên độ thủy triều lớn hơn.')
      : (correct?'✓ Chính xác! Trái Đất nằm giữa → nguyệt thực.':'✗ Chưa đúng. Trái Đất nằm giữa Mặt Trời và Mặt Trăng → nguyệt thực.');
    result.style.color=correct?'#66d9ff':'#ffb36b';
    updateQuizScore();
  }));
});

function updateQuizScore(){
  const section=document.getElementById('quiz');
  if(!section)return;
  let score=section.querySelector('.quiz-score');
  if(!score){
    score=document.createElement('div');
    score.className='quiz-score fact';
    section.insertBefore(score,section.querySelector('.quiz'));
  }
  score.innerHTML='<b>Điểm tương tác:</b> '+quizScore+'/2'+(quizScore===2?' · Xuất sắc! 🎉':' · Hãy thử cả hai câu.');
}

/* Interactive learning lab: choose the correct celestial alignment */
(function addInteractiveLab(){
  const section=document.getElementById('quiz');
  if(!section)return;
  const lab=document.createElement('div');
  lab.className='interactive-lab card';
  lab.innerHTML=`
    <div class="lab-kicker">MINI GAME · 10 GIÂY</div>
    <h3>Thiên thể nào nằm ở giữa?</h3>
    <p>Chọn sơ đồ đúng để tạo <b>nguyệt thực</b>.</p>
    <div class="lab-options" role="group" aria-label="Chọn sơ đồ nguyệt thực">
      <button type="button" data-seq="sun-moon-earth">☀ → 🌙 → 🌍</button>
      <button type="button" data-seq="sun-earth-moon">☀ → 🌍 → 🌙</button>
      <button type="button" data-seq="earth-sun-moon">🌍 → ☀ → 🌙</button>
    </div>
    <p class="lab-result" aria-live="polite">Chọn một đáp án.</p>`;
  section.appendChild(lab);
  const result=lab.querySelector('.lab-result');
  lab.querySelectorAll('.lab-options button').forEach(btn=>btn.addEventListener('click',()=>{
    const correct=btn.dataset.seq==='sun-earth-moon';
    lab.querySelectorAll('.lab-options button').forEach(b=>b.classList.remove('picked-correct','picked-wrong'));
    btn.classList.add(correct?'picked-correct':'picked-wrong');
    result.textContent=correct?'✓ Đúng! Trái Đất nằm giữa Mặt Trời và Mặt Trăng → nguyệt thực.':'✗ Chưa đúng. Hãy tìm sơ đồ có Trái Đất nằm giữa.';
  }));
})();

/* Clickable diagrams: reveal the key idea */
document.querySelectorAll('.diagram-card').forEach(card=>{
  const diagram=card.querySelector('.diagram');
  const caption=card.querySelector('.caption');
  if(!diagram||!caption)return;
  card.setAttribute('role','button');
  card.setAttribute('tabindex','0');
  const original=caption.textContent;
  function toggleDiagram(){
    const active=card.classList.toggle('diagram-active');
    caption.textContent=active
      ? (diagram.classList.contains('eclipse')?'💡 Mặt Trăng ở giữa: bóng Mặt Trăng có thể rơi lên Trái Đất.':'💡 Trái Đất ở giữa: Mặt Trăng có thể đi vào bóng Trái Đất.')
      : original;
  }
  card.addEventListener('click',toggleDiagram);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleDiagram()}});
});

/* Clickable triều cards */
document.querySelectorAll('#trieu-cuong-trieu-kem .card').forEach(card=>{
  card.setAttribute('role','button');
  card.setAttribute('tabindex','0');
  const fact=card.querySelector('.fact');
  const original=fact?.innerHTML||'';
  function toggle(){
    const active=card.classList.toggle('diagram-active');
    if(fact)fact.innerHTML=active
      ? '<b>💡 Mấu chốt:</b> So sánh hướng tác động của Mặt Trời và Mặt Trăng để dự đoán biên độ thủy triều.'
      : original;
  }
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.card,.section-head').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(18px)';el.style.transition='opacity .7s ease, transform .7s ease';observer.observe(el)});
const style=document.createElement('style');style.textContent=`
.show{opacity:1!important;transform:none!important}
.quiz .answers button,.lab-options button{transition:transform .2s ease,border-color .2s ease,background .2s ease}
.quiz .answers button:hover,.lab-options button:hover{transform:translateY(-2px)}
.picked-correct{border-color:#66d9ff!important;box-shadow:0 0 0 2px rgba(102,217,255,.18) inset}
.picked-wrong{border-color:#ffb36b!important;box-shadow:0 0 0 2px rgba(255,179,107,.15) inset}
.quiz-score{margin-bottom:18px}
.interactive-lab{margin-top:18px}
.lab-kicker{font-size:.72rem;letter-spacing:.16em;font-weight:800;opacity:.7;margin-bottom:8px}
.lab-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}
.lab-options button{min-height:52px;border:1px solid rgba(102,217,255,.28);border-radius:12px;background:rgba(255,255,255,.04);color:inherit;padding:10px 12px;cursor:pointer;font:inherit}
.lab-result{margin:12px 0 0;font-weight:700;min-height:1.4em}
.diagram-card,.#trieu-cuong-trieu-kem .card{cursor:pointer}
.diagram-active{outline:2px solid rgba(102,217,255,.45);outline-offset:2px}
@media(max-width:720px){.lab-options{grid-template-columns:1fr}}
`;document.head.appendChild(style);

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
  if(['ArrowRight','PageDown',' '].includes(event.key)){event.preventDefault();showSlide(currentSlide+1)}
  if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();showSlide(currentSlide-1)}
  if(event.key==='Home')showSlide(0);
  if(event.key==='End')showSlide(slides.length-1);
});
fullscreenBtn.addEventListener('click',async()=>{
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(e){fullscreenBtn.textContent='Toàn màn hình không khả dụng'}
});
const hashId=decodeURIComponent(location.hash.slice(1));
const hashIndex=slides.findIndex(slide=>slide.id===hashId);
if(hashIndex>=0) currentSlide=hashIndex;
showSlide(currentSlide);
