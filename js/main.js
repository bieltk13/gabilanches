'use strict';
// Site institucional: sem checkout, carrinho, pagamentos ou captura de dados.
const toggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Abrir menu');
    toggle.innerHTML = '<svg class="icon"><use href="#i-menu"/></svg>';
  };
  toggle.addEventListener('click', () => {
    const opening = !nav.classList.contains('open');
    if (opening) {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-label','Fechar menu');
      toggle.innerHTML = '<svg class="icon"><use href="#i-cross"/></svg>';
    } else closeMenu();
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e => { if(e.key==='Escape')closeMenu(); });
}

// Corrige a seleção do menu conforme a posição de rolagem.
const links = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('header#inicio,section#cardapio,section#sobre,section#avaliacoes,footer#contato')];
if ('IntersectionObserver' in window) {
  const ob = new IntersectionObserver(entries => {
    const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach(l=>l.classList.toggle('is-active',l.getAttribute('href')==='#'+visible.target.id));
  },{rootMargin:'-18% 0px -64% 0px',threshold:[0,.1,.2,.4]});
  sections.forEach(el=>ob.observe(el));
}

// O carrossel funciona tanto com mouse quanto com teclado.
const reviewCards = [...document.querySelectorAll('.review-card')];
const reviewDots = [...document.querySelectorAll('[data-review]')];
const prev = document.querySelector('#prev-review');
const next = document.querySelector('#next-review');
let reviewIndex=0;
function setReview(index){
  if(!reviewCards.length)return;
  reviewIndex=(index+reviewCards.length)%reviewCards.length;
  reviewDots.forEach((b,i)=>{
    b.classList.toggle('active',i===reviewIndex);
    if(i===reviewIndex)b.setAttribute('aria-current','true');
    else b.removeAttribute('aria-current');
  });
  if (window.innerWidth <= 720) reviewCards[reviewIndex].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  else {
    reviewCards.forEach((c,i)=>{
      const target = (i+reviewIndex)%reviewCards.length;
      c.style.order = target;
    });
  }
}
prev?.addEventListener('click',()=>setReview(reviewIndex-1));
next?.addEventListener('click',()=>setReview(reviewIndex+1));
reviewDots.forEach((b,i)=>b.addEventListener('click',()=>setReview(i)));
document.querySelector('#copyright-year').textContent=String(new Date().getFullYear());
