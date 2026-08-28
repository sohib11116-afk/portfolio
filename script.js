const services = {
  commercials: { no:'01', label:'COMMERCIALS', word:'SELL', title:'ADS THAT SELL', className:'nova', description:'إعلانات مبنية على فكرة قوية وهوك يمسك المشاهد من أول ثانية، مع مونتاج وإيقاع يخدموا هدف البراند والبيع.', items:['Creative concept','Editing & sound design','Multiple ad formats'] },
  reels: { no:'02', label:'REELS', word:'LOOP', title:'SHORT. SHARP. SHAREABLE.', className:'sodo', description:'فيديوهات قصيرة سريعة ومصممة لسلوك المشاهدة على السوشيال—من أول Hook لحد آخر Cut.', items:['Vertical 9:16','Captions & pacing','Social-ready exports'] },
  motion: { no:'03', label:'MOTION GRAPHICS', word:'MOVE', title:'DESIGN IN MOTION', className:'kay', description:'نحوّل الهوية والكلام لحركة حية: تايبوجرافي، انتقالات، وعناصر بصرية تدي الفيديو شخصية واضحة.', items:['Motion direction','2D animation','Brand-led transitions'] }
};
const videos = {
  adidas: { type:'COMMERCIAL / 01', title:'ADIDAS COMMERCIAL', src:'https://sohib-creative-editor.sohib11116.chatgpt.site/videos/adidas-commercial.mp4', poster:'https://sohib-creative-editor.sohib11116.chatgpt.site/videos/adidas-poster.jpg' },
  davinci: { type:'REEL / 02', title:'DAVINCI COURSE', src:'https://sohib-creative-editor.sohib11116.chatgpt.site/videos/davinci-course.mp4', poster:'https://sohib-creative-editor.sohib11116.chatgpt.site/videos/davinci-poster.jpg' },
  capcut: { type:'REEL / 03', title:'CAPCUT COURSE', src:'https://sohib-creative-editor.sohib11116.chatgpt.site/videos/capcut-course.mp4', poster:'https://sohib-creative-editor.sohib11116.chatgpt.site/videos/capcut-poster.jpg' }
};

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('is-visible');
}), { threshold:.12 });
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

const serviceModal = document.querySelector('#service-modal');
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const item = services[button.dataset.service];
  const panel = serviceModal.querySelector('.service-panel');
  panel.className = `service-panel ${item.className}`;
  document.querySelector('#service-kicker').textContent = `SERVICE / ${item.no}`;
  document.querySelector('#service-word').textContent = item.word;
  document.querySelector('#service-label').textContent = item.label;
  document.querySelector('#service-title').textContent = item.title;
  document.querySelector('#service-description').textContent = item.description;
  document.querySelector('#service-deliverables').innerHTML = item.items.map((text,i) => `<p class="deliverable"><span>0${i+1}</span>${text}</p>`).join('');
  const cta = document.querySelector('#service-cta');
  cta.textContent = `START A ${item.label} PROJECT ↗`;
  cta.onclick = () => { closeModal('service'); openContact(item.label); };
  serviceModal.classList.remove('hidden');
}));

const videoModal = document.querySelector('#video-modal');
const player = document.querySelector('#video-player');
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
  const item = videos[button.dataset.video];
  document.querySelector('#video-meta').textContent = item.type;
  document.querySelector('#video-name').textContent = item.title;
  player.src = item.src;
  player.poster = item.poster;
  videoModal.classList.remove('hidden');
  player.play().catch(() => {});
}));

const contactDrawer = document.querySelector('#contact-drawer');
function openContact(topic) {
  document.querySelector('#contact-topic').textContent = `LET'S WORK / ${topic}`;
  contactDrawer.classList.remove('hidden');
}
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => openContact(button.dataset.contact)));

function closeModal(target) {
  if (target === 'service') serviceModal.classList.add('hidden');
  if (target === 'video') { videoModal.classList.add('hidden'); player.pause(); player.removeAttribute('src'); player.load(); }
  if (target === 'contact') contactDrawer.classList.add('hidden');
}
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => closeModal(button.dataset.close)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeModal('service'); closeModal('video'); closeModal('contact'); } });
document.querySelector('#copy-email').addEventListener('click', async event => {
  await navigator.clipboard.writeText('sohibamed11@icloud.com');
  event.currentTarget.querySelector('strong').textContent = 'EMAIL COPIED';
});
