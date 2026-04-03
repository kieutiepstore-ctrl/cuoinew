// ===================== OPEN CARD =====================
const leftDoor = document.getElementById('leftDoor');
const rightDoor = document.getElementById('rightDoor');
const openScreen = document.getElementById('openScreen');
const card = document.getElementById('card');

function openCard() {
  leftDoor.classList.add("open-left");
  rightDoor.classList.add("open-right");

  setTimeout(() => {
    openScreen.style.display = "none";
    card.classList.remove("hidden");

    // Hero text
    const hero = document.querySelector('.hero-text');
    hero.classList.add('show');

    // Thư mời hero + phụ
    setTimeout(() => document.querySelector('.invite-hero').classList.add('show'), 1500);
    setTimeout(() => document.querySelector('.invite-sub').classList.add('show'), 2500);

    // Thư tiệc mời + divider + giờ + ngày
    const inviteTitle = document.querySelector('.invite-title');
    const inviteTime = document.querySelector('.invite-time');
    const inviteDate = document.querySelector('.invite-date');
    const dividerTop = document.querySelector('.divider-top');
    const dividerBottom = document.querySelector('.divider-bottom');

    setTimeout(() => {
      dividerTop.classList.add('show');
      inviteTitle.classList.add('show');
      setTimeout(() => inviteTime.classList.add('show'), 400);
      setTimeout(() => dividerBottom.classList.add('show'), 500);
      setTimeout(() => inviteDate.classList.add('show'), 800);
    }, 200);

    // Tiêu đề chính
    const titles = document.querySelectorAll('.title-main');
    titles.forEach((title, i) => {
      setTimeout(() => title.classList.add('show'), i * 1000);
    });

    // Calendar
    renderCalendarVN({ days: [15,16], month: 3, year: 2026 });

    // Hình ảnh hen
    const henImg = document.getElementById('henImg');
    setTimeout(() => henImg.classList.add('show'), 500);

    // Tim bay
    startHearts();

  }, 900);
}

// ===================== SCROLL REVEAL =====================
// Chia riêng cho trái / phải / normal
const revealLeftElements = document.querySelectorAll('.reveal-left');
const revealRightElements = document.querySelectorAll('.reveal-right');
const revealNormalElements = document.querySelectorAll('.reveal');

const observerLeft = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show'); // slide từ trái
      observerLeft.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const observerRight = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show'); // slide từ phải
      observerRight.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const observerNormal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show'); // fade-in bình thường
      observerNormal.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Gắn observer
revealLeftElements.forEach(el => observerLeft.observe(el));
revealRightElements.forEach(el => observerRight.observe(el));
revealNormalElements.forEach(el => observerNormal.observe(el));

// ===================== TIM BAY QUA LẠI =====================
function startHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.style.left = Math.random() * 90 + 'vw';
    heart.style.fontSize = (20 + Math.random()*20) + 'px';
    heart.style.animationDuration = (6 + Math.random()*4) + 's';
    heart.textContent = '❤️';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }, 1200);
}

// ===================== CANVAS TIM =====================
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 100;
canvas.height = 100;

let particles = [];
function heartFunction(t) {
  let x = 16 * Math.pow(Math.sin(t),3);
  let y = 13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
  return { x: x, y: -y };
}

for(let i=0;i<500;i++){
  let t = Math.random()*Math.PI*2;
  let pos = heartFunction(t);
  particles.push({
    baseX: canvas.width/2 + pos.x*2.5,
    baseY: canvas.height/2 + pos.y*2.5,
    x: 0,
    y: 0,
    size: Math.random()*2+0.5,
    alpha: Math.random(),
    offset: Math.random()*100
  });
}

let time = 0;
function drawHeart() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    let pulse = Math.sin(time+p.offset)*1.5;
    p.x = p.baseX + pulse;
    p.y = p.baseY + pulse;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,80,80,${p.alpha})`;
    ctx.fill();
  });
  time+=0.05;
  requestAnimationFrame(drawHeart);
}
drawHeart();

// ===================== CALENDAR =====================
function renderCalendarVN({ days, month, year }) {
  const container = document.getElementById("calendar-days");
  const monthEl = document.getElementById("calendar-month");
  const yearEl = document.getElementById("calendar-year");

  container.innerHTML = "";
  const today = new Date();
  let firstDay = new Date(year, month, 1).getDay();
  firstDay = (firstDay+6)%7; // VN: T2=0

  const totalDays = new Date(year, month+1, 0).getDate();
  const months = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
  monthEl.innerText = months[month];
  yearEl.innerText = `Năm ${year}`;

  for(let i=0;i<firstDay;i++){
    const empty = document.createElement("div");
    container.appendChild(empty);
  }

  for(let d=1; d<=totalDays; d++){
    const div = document.createElement("div");
    div.className = `
      relative flex items-center justify-center
      h-12 rounded-xl cursor-pointer
      bg-white border text-sm font-semibold
      hover:scale-105 transition
    `;
    div.innerText = d;
    if(days.includes(d)){
      div.classList.add("bg-pink-200","border-pink-400");
      div.innerHTML = `${d}<span class="absolute top-1 right-1 text-red-500 text-xs">❤️</span>`;
    }
    container.appendChild(div);
  }
}