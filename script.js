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
    if(!answeredQuizzes.has(quiz)){answeredQuizzes.add(quiz);if(correct) quizScore++;}
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
  const section=document.getElementById('quiz'); if(!section)return;
  let score=section.querySelector('.quiz-score');
  if(!score){score=document.createElement('div');score.className='quiz-score fact';section.insertBefore(score,section.querySelector('.quiz'));}
  score.innerHTML='<b>Điểm tương tác:</b> '+quizScore+'/2'+(quizScore===2?' · Xuất sắc! 🎉':' · Hãy thử cả hai câu.');
}

/* Interactive learning lab */
(function addInteractiveLab(){
  const section=document.getElementById('quiz'); if(!section)return;
  const lab=document.createElement('div'); lab.className='interactive-lab card';
  lab.innerHTML=`<div class="lab-kicker">MINI GAME · 10 GIÂY</div><h3>Thiên thể nào nằm ở giữa?</h3><p>Chọn sơ đồ đúng để tạo <b>nguyệt thực</b>.</p><div class="lab-options" role="group"><button type="button" data-seq="sun-moon-earth">☀ → 🌙 → 🌍</button><button type="button" data-seq="sun-earth-moon">☀ → 🌍 → 🌙</button><button type="button" data-seq="earth-sun-moon">🌍 → ☀ → 🌙</button></div><p class="lab-result" aria-live="polite">Chọn một đáp án.</p>`;
  section.appendChild(lab);
  const result=lab.querySelector('.lab-result');
  lab.querySelectorAll('.lab-options button').forEach(btn=>btn.addEventListener('click',()=>{
    const correct=btn.dataset.seq==='sun-earth-moon';
    lab.querySelectorAll('.lab-options button').forEach(b=>b.classList.remove('picked-correct','picked-wrong'));
    btn.classList.add(correct?'picked-correct':'picked-wrong');
    result.textContent=correct?'✓ Đúng! Trái Đất nằm giữa Mặt Trời và Mặt Trăng → nguyệt thực.':'✗ Chưa đúng. Hãy tìm sơ đồ có Trái Đất nằm giữa.';
  }));
})();

/* Clickable diagrams */
document.querySelectorAll('.diagram-card').forEach(card=>{
  const diagram=card.querySelector('.diagram'); const caption=card.querySelector('.caption'); if(!diagram||!caption)return;
  card.setAttribute('role','button'); card.setAttribute('tabindex','0'); const original=caption.textContent;
  function toggleDiagram(){const active=card.classList.toggle('diagram-active');caption.textContent=active?(diagram.classList.contains('eclipse')?'💡 Mặt Trăng ở giữa: bóng Mặt Trăng có thể rơi lên Trái Đất.':'💡 Trái Đất ở giữa: Mặt Trăng có thể đi vào bóng Trái Đất.'):original;}
  card.addEventListener('click',toggleDiagram); card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleDiagram()}});
});

document.querySelectorAll('#trieu-cuong-trieu-kem .card').forEach(card=>{
  card.setAttribute('role','button'); card.setAttribute('tabindex','0'); const fact=card.querySelector('.fact'); const original=fact?.innerHTML||'';
  function toggle(){const active=card.classList.toggle('diagram-active');if(fact)fact.innerHTML=active?'<b>💡 Mấu chốt:</b> So sánh hướng tác động của Mặt Trời và Mặt Trăng để dự đoán biên độ thủy triều.':original;}
  card.addEventListener('click',toggle); card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
});

/* Thông tin mở rộng: bấm để xem thêm */
const extraInfo={
  'nhat-thuc':{title:'🌞 Thông tin thêm về nhật thực',items:['Nhật thực xảy ra khi Mặt Trăng đi qua giữa Mặt Trời và Trái Đất.','Bóng Mặt Trăng gồm vùng bóng tối và vùng bóng nửa tối nên mức độ che khuất khác nhau tùy vị trí quan sát.','Nhật thực toàn phần chỉ quan sát được từ một dải tương đối hẹp trên Trái Đất.']},
  'cac-loai-nhat-thuc':{title:'🔎 Phân biệt 3 loại nhật thực',items:['Toàn phần: Mặt Trời bị che kín trong vùng quan sát thích hợp.','Một phần: chỉ một phần đĩa Mặt Trời bị che.','Hình khuyên: Mặt Trăng ở trước Mặt Trời nhưng nhìn nhỏ hơn nên còn thấy một vòng sáng.']},
  'nguyet-thuc':{title:'🌕 Vì sao Mặt Trăng có thể đỏ?',items:['Trong nguyệt thực toàn phần, Mặt Trăng đi sâu vào bóng Trái Đất.','Một phần ánh sáng Mặt Trời đi qua khí quyển Trái Đất và bị tán xạ, khúc xạ.','Ánh sáng đỏ cam truyền tới Mặt Trăng nhiều hơn các màu có bước sóng ngắn, nên ta có thể thấy Mặt Trăng đỏ cam.']},
  'tai-sao-khong-hang-thang':{title:'📐 Góc nghiêng quỹ đạo',items:['Mặt phẳng quỹ đạo Mặt Trăng nghiêng khoảng 5° so với mặt phẳng hoàng đạo.','Vì vậy mỗi tháng thường không có sự thẳng hàng chính xác để tạo nhật thực hoặc nguyệt thực.','Hiện tượng thực thường xảy ra khi Mặt Trăng đi gần các giao điểm của hai mặt phẳng quỹ đạo.']},
  'thuy-trieu':{title:'🌊 Thủy triều còn phụ thuộc gì?',items:['Ngoài lực hấp dẫn, hình dạng bờ biển và độ sâu đáy biển ảnh hưởng mạnh đến mực nước thực tế.','Các vùng biển khác nhau có thời gian và biên độ triều khác nhau.','Vì vậy không nên dùng một con số thủy triều cố định cho mọi địa điểm.']},
  'trieu-cuong-trieu-kem':{title:'🌙 Vì sao có triều cường và triều kém?',items:['Triều cường thường gắn với lúc Mặt Trời, Trái Đất và Mặt Trăng gần thẳng hàng.','Triều kém thường gắn với lúc Mặt Trời và Mặt Trăng tạo góc gần vuông nhìn từ Trái Đất.','Điểm cần nhớ: vị trí tương đối làm thay đổi biên độ của thủy triều.']},
  'ung-dung':{title:'⚓ Ứng dụng thực tế',items:['Dự báo thủy triều hỗ trợ tàu thuyền ra vào cảng và hoạt động ven biển.','Người dân ven biển có thể chủ động hơn khi biết thời điểm mực nước thay đổi.','Hiểu nhật thực và nguyệt thực giúp dự đoán, quan sát các hiện tượng thiên văn.']}
};
Object.entries(extraInfo).forEach(([id,data])=>{
  const section=document.getElementById(id); if(!section)return;
  const box=document.createElement('div'); box.className='extra-info card';
  box.innerHTML='<button class="info-toggle" type="button">＋ '+data.title+'</button><div class="info-body">'+data.items.map(x=>'<p>• '+x+'</p>').join('')+'</div>';
  section.appendChild(box);
  const toggle=box.querySelector('.info-toggle'); const body=box.querySelector('.info-body');
  toggle.addEventListener('click',()=>{const open=box.classList.toggle('open');toggle.textContent=(open?'− ':'＋ ')+data.title;body.style.maxHeight=open?body.scrollHeight+'px':'0px';});
});

/* Tương tác mới: đoán hiện tượng */
(function addPredictGame(){
  const section=document.getElementById('compare'); if(!section)return;
  const game=document.createElement('div'); game.className='predict-game card';
  game.innerHTML='<div class="lab-kicker">THỬ THÁCH · SUY LUẬN</div><h3>Nếu đổi vị trí, hiện tượng nào xảy ra?</h3><p>Trái Đất nằm giữa Mặt Trời và Mặt Trăng. Bạn chọn gì?</p><div class="predict-options"><button data-answer="nguyet">🌕 Nguyệt thực</button><button data-answer="nhat">🌞 Nhật thực</button><button data-answer="none">🌊 Chỉ có thủy triều</button></div><p class="predict-result">Hãy chọn một đáp án.</p>';
  section.appendChild(game);
  const result=game.querySelector('.predict-result');
  game.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{const ok=btn.dataset.answer==='nguyet';game.querySelectorAll('button').forEach(b=>b.classList.remove('picked-correct','picked-wrong'));btn.classList.add(ok?'picked-correct':'picked-wrong');result.textContent=ok?'✓ Chính xác! Trái Đất ở giữa → nguyệt thực.':'✗ Chưa đúng. Hãy nhớ: Mặt Trời → Trái Đất → Mặt Trăng.';}));
})();

/* Thêm 4 slide kiến thức mở rộng */
(function addExtraSlides(){
  const main=document.querySelector('main'); if(!main)return;
  const compare=document.getElementById('compare');
  const make=(id,num,eyebrow,title,subtitle,body)=>{
    const s=document.createElement('section'); s.className='section slide'; s.id=id;
    s.innerHTML=`<div class="section-head"><span>${num}</span><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2><p class="slide-subtitle">${subtitle}</p></div></div>${body}`;
    return s;
  };
  const slides=[
    make('anh-sang-nguyet-thuc','10','GIẢI THÍCH HIỆN TƯỢNG','Vì sao nguyệt thực có thể có màu đỏ?','Ánh sáng đi qua khí quyển Trái Đất tạo nên màu sắc đặc trưng.','<div class="grid two"><article class="card"><div class="icon">🔴</div><h3>Ánh sáng bị lọc</h3><p>Khi ánh sáng Mặt Trời đi qua khí quyển, các thành phần ánh sáng xanh bị tán xạ mạnh hơn. Ánh sáng đỏ cam dễ truyền tới vùng bóng hơn.</p></article><article class="card"><div class="card"><h3>Điều ta quan sát được</h3><p>Trong nguyệt thực toàn phần, Mặt Trăng có thể trông đỏ cam. Màu sắc thực tế còn phụ thuộc trạng thái khí quyển Trái Đất.</p></article></div>'),
    make('luc-hap-dan','11','LỰC HẤP DẪN','Vì sao Mặt Trăng ảnh hưởng thủy triều mạnh?','Khoảng cách đến Trái Đất khiến tác động thủy triều của Mặt Trăng rất đáng kể.','<div class="grid three"><article class="card"><div class="icon">🌙</div><h3>Mặt Trăng gần hơn</h3><p>So với Mặt Trời, Mặt Trăng ở gần Trái Đất hơn rất nhiều nên tác động tạo thủy triều của nó rất rõ.</p></article><article class="card"><div class="icon">🌊</div><h3>Nước dễ biến dạng</h3><p>Các khối nước lớn có thể dịch chuyển dưới tác động hấp dẫn, góp phần tạo ra sự lên xuống của mực nước.</p></article><article class="card"><div class="icon">↕</div><h3>Không chỉ một phía</h3><p>Hệ thống Trái Đất–Mặt Trăng tạo ra sự phân bố mực nước phức tạp, nên thủy triều không đơn giản chỉ là nước dồn về một phía.</p></article></div>'),
    make('nhip-thuy-trieu','12','QUAN SÁT THỰC TẾ','Thủy triều thay đổi theo thời gian','Chu kỳ quan sát thực tế liên quan đến chuyển động của Trái Đất và Mặt Trăng.','<div class="grid two"><article class="card"><h3>Không phải lúc nào cũng giống nhau</h3><p>Thời điểm nước lên và xuống thay đổi theo từng ngày. Địa hình bờ biển và đáy biển cũng làm mỗi nơi có đặc điểm riêng.</p><div class="fact"><b>Nhớ:</b> Dự báo thủy triều phải gắn với địa điểm cụ thể.</div></article><article class="card"><h3>Liên hệ đời sống</h3><p>Biết trước mực nước giúp hỗ trợ hoạt động cảng biển, đánh bắt, nuôi trồng và sinh hoạt ở vùng ven biển.</p><div class="fact"><b>Câu hỏi:</b> Vì sao cùng một thời điểm nhưng hai bờ biển có thể có mực nước khác nhau?</div></article></div>'),
    make('tong-ket-nhanh','13','TỔNG KẾT','Một sơ đồ để nhớ cả chuyên đề','Chỉ cần nhớ vị trí thiên thể và lực hấp dẫn.','<div class="grid three"><article class="card"><div class="icon">☀ → 🌙 → 🌍</div><h3>Nhật thực</h3><p>Mặt Trăng ở giữa Mặt Trời và Trái Đất.</p></article><article class="card"><div class="icon">☀ → 🌍 → 🌙</div><h3>Nguyệt thực</h3><p>Trái Đất ở giữa Mặt Trời và Mặt Trăng.</p></article><article class="card"><div class="icon">🌙 + ☀ → 🌊</div><h3>Thủy triều</h3><p>Lực hấp dẫn và vị trí tương đối ảnh hưởng mực nước biển.</p></article></div><div class="fact"><b>Mẹo thuyết trình:</b> Khi giải thích mỗi hiện tượng, hãy nói theo 3 bước: vị trí → cơ chế → điều quan sát được.</div>')
  ];
  if(compare) slides.forEach(s=>main.insertBefore(s,compare)); else slides.forEach(s=>main.appendChild(s));
})();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.card,.section-head').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(18px)';el.style.transition='opacity .7s ease, transform .7s ease';observer.observe(el)});
const style=document.createElement('style');style.textContent=`
.show{opacity:1!important;transform:none!important}.quiz .answers button,.lab-options button,.predict-options button,.info-toggle{transition:transform .2s ease,border-color .2s ease,background .2s ease}.quiz .answers button:hover,.lab-options button:hover,.predict-options button:hover,.info-toggle:hover{transform:translateY(-2px)}.picked-correct{border-color:#66d9ff!important;box-shadow:0 0 0 2px rgba(102,217,255,.18) inset}.picked-wrong{border-color:#ffb36b!important;box-shadow:0 0 0 2px rgba(255,179,107,.15) inset}.quiz-score{margin-bottom:18px}.interactive-lab,.predict-game,.extra-info{margin-top:18px}.lab-kicker{font-size:.72rem;letter-spacing:.16em;font-weight:800;opacity:.7;margin-bottom:8px}.lab-options,.predict-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}.lab-options button,.predict-options button{min-height:52px;border:1px solid rgba(102,217,255,.28);border-radius:12px;background:rgba(255,255,255,.04);color:inherit;padding:10px 12px;cursor:pointer;font:inherit}.lab-result,.predict-result{margin:12px 0 0;font-weight:700;min-height:1.4em}.diagram-card,#trieu-cuong-trieu-kem .card{cursor:pointer}.diagram-active{outline:2px solid rgba(102,217,255,.45);outline-offset:2px}.info-toggle{width:100%;text-align:left;border:1px solid rgba(102,217,255,.28);border-radius:12px;background:rgba(255,255,255,.04);color:inherit;padding:13px 15px;cursor:pointer;font:inherit;font-weight:800}.info-body{max-height:0;overflow:hidden;transition:max-height .35s ease}.info-body p{margin:10px 4px}.extra-info.open .info-toggle{border-color:rgba(102,217,255,.55)}@media(max-width:720px){.lab-options,.predict-options{grid-template-columns:1fr}}
`;document.head.appendChild(style);

/* PowerPoint-style slide navigation */
const slides=Array.from(document.querySelectorAll('main .slide'));const prevSlide=document.getElementById('prevSlide');const nextSlide=document.getElementById('nextSlide');const slideCount=document.getElementById('slideCount');const fullscreenBtn=document.getElementById('fullscreenBtn');const startPresentation=document.getElementById('startPresentation');let currentSlide=Math.max(0,slides.findIndex(s=>s.classList.contains('active-slide')));
function showSlide(index){currentSlide=Math.max(0,Math.min(index,slides.length-1));slides.forEach((slide,i)=>{slide.classList.toggle('active-slide',i===currentSlide);slide.setAttribute('aria-hidden',i===currentSlide?'false':'true');if(i===currentSlide)slide.scrollTop=0});slideCount.textContent=String(currentSlide+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');prevSlide.disabled=currentSlide===0;nextSlide.disabled=currentSlide===slides.length-1;progress.style.width=((currentSlide+1)/slides.length*100)+'%';history.replaceState(null,'','#'+(slides[currentSlide].id||('slide-'+(currentSlide+1))));}
if(startPresentation)startPresentation.addEventListener('click',()=>showSlide(1));prevSlide.addEventListener('click',()=>showSlide(currentSlide-1));nextSlide.addEventListener('click',()=>showSlide(currentSlide+1));document.addEventListener('keydown',event=>{if(['ArrowRight','PageDown',' '].includes(event.key)){event.preventDefault();showSlide(currentSlide+1)}if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();showSlide(currentSlide-1)}if(event.key==='Home')showSlide(0);if(event.key==='End')showSlide(slides.length-1)});fullscreenBtn.addEventListener('click',async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch(e){fullscreenBtn.textContent='Toàn màn hình không khả dụng'}});const hashId=decodeURIComponent(location.hash.slice(1));const hashIndex=slides.findIndex(slide=>slide.id===hashId);if(hashIndex>=0)currentSlide=hashIndex;showSlide(currentSlide);
