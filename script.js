// ===================== KHỞI ĐỘNG KHI TRANG LOAD =====================
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-text');
  if (hero) hero.classList.add('show');

  renderCalendarVN({ days: [15, 16], month: 3, year: 2026 });

  const henImg = document.getElementById('henImg');
  if (henImg) setTimeout(() => henImg.classList.add('show'), 500);

  startHearts();
  initScrollReveal();

  // Tên khách từ URL
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if (name) {
    document.getElementById("guestName").innerText = name;
  }
});

// ===================== SCROLL REVEAL =====================
function initScrollReveal() {
  const revealTop    = document.querySelectorAll('.reveal-top');
  const revealBottom = document.querySelectorAll('.reveal-bottom');
  const revealLeft   = document.querySelectorAll('.reveal-left');
  const revealRight  = document.querySelectorAll('.reveal-right');
  const revealNormal = document.querySelectorAll('.reveal, .cd-left, .cd-right, .cd-top, .cd-bottom');

  const createObserver = (elements) => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: "0px 0px -80px 0px"
    });
    elements.forEach(el => observer.observe(el));
  };

  createObserver(revealTop);
  createObserver(revealBottom);
  createObserver(revealLeft);
  createObserver(revealRight);
  createObserver(revealNormal);
}

// ===================== TIM BAY =====================
function startHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.style.left = Math.random() * 90 + 'vw';
    heart.style.fontSize = (20 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 4) + 's';
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
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x, y: -y };
}

for (let i = 0; i < 500; i++) {
  let t = Math.random() * Math.PI * 2;
  let pos = heartFunction(t);
  particles.push({
    baseX: canvas.width / 2 + pos.x * 2.5,
    baseY: canvas.height / 2 + pos.y * 2.5,
    x: 0, y: 0,
    size: Math.random() * 2 + 0.5,
    alpha: Math.random(),
    offset: Math.random() * 100
  });
}

let time = 0;
function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    let pulse = Math.sin(time + p.offset) * 1.5;
    p.x = p.baseX + pulse;
    p.y = p.baseY + pulse;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,80,80,${p.alpha})`;
    ctx.fill();
  });
  time += 0.05;
  requestAnimationFrame(drawHeart);
}
drawHeart();

// ===================== CALENDAR =====================
function renderCalendarVN({ days, month, year }) {
  const container = document.getElementById("calendar-days");
  const monthEl   = document.getElementById("calendar-month");
  const yearEl    = document.getElementById("calendar-year");

  container.innerHTML = "";
  let firstDay = new Date(year, month, 1).getDay();
  firstDay = (firstDay + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();
  const months = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
                  "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
  monthEl.innerText = months[month];
  yearEl.innerText = `Năm ${year}`;

  for (let i = 0; i < firstDay; i++) {
    container.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= totalDays; d++) {
    const div = document.createElement("div");
    div.className = `day reveal relative flex items-center justify-center h-12 rounded-xl cursor-pointer bg-white border text-sm font-semibold hover:scale-105 transition duration-700`;
    div.innerText = d;

    if (days.includes(d)) {
      div.classList.add("bg-pink-200", "border-pink-400");
      div.innerHTML = `${d}<span class="absolute top-1 right-1 text-red-500 text-xs">❤️</span>`;
    }

    div.style.setProperty('--delay', `${d * 0.05}s`);
    container.appendChild(div);
  }

  const dayEls = container.querySelectorAll('.day');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('show');
        if (el.querySelector('span')) {
          const heart = document.createElement('span');
          heart.classList.add('day-heart');
          heart.textContent = '❤️';
          el.appendChild(heart);
          setTimeout(() => heart.remove(), 1000);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3, rootMargin: "0px 0px -40px 0px" });

  dayEls.forEach(el => observer.observe(el));
}

// ===================== COUNTDOWN =====================
const wedding = new Date("2026-06-15T10:30:00").getTime();

function runCountdown() {
  const now  = new Date().getTime();
  const diff = wedding - now;
  if (diff < 0) return;

  document.getElementById("d").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("h").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("m").innerText = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("s").innerText = Math.floor((diff / 1000) % 60);
}

setInterval(runCountdown, 1000);
runCountdown();

// ===================== SLIDESHOW =====================
const slides = document.getElementById("slides");
const thumbs = document.querySelectorAll("#thumbs img");
let index = 0;
const total = thumbs.length;

function updateSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  thumbs.forEach(t => t.classList.remove("active"));
  thumbs[index].classList.add("active");
}

thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => { index = i; updateSlide(); });
});

document.querySelector(".next").onclick = () => { index = (index + 1) % total; updateSlide(); };
document.querySelector(".prev").onclick = () => { index = (index - 1 + total) % total; updateSlide(); };

setInterval(() => { index = (index + 1) % total; updateSlide(); }, 4000);