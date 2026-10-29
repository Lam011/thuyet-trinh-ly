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