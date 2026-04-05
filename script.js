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

    // Hero text (nếu muốn vẫn hiện khi mở thiệp)
    const hero = document.querySelector('.hero-text');
    if(hero) hero.classList.add('show');

    // Calendar
    renderCalendarVN({ days: [15,16], month: 3, year: 2026 });

    // Hình ảnh hen
    const henImg = document.getElementById('henImg');
    if(henImg) setTimeout(() => henImg.classList.add('show'), 500);

    // Tim bay
    startHearts();

    // **Không tự động reveal các invite/title**
    // Scroll reveal sẽ thực hiện khi vuốt đến
    initScrollReveal();

  }, 900);
}

// ===================== SCROLL REVEAL =====================
function initScrollReveal() {
  const revealTop = document.querySelectorAll('.reveal-top');       // từ trên xuống
  const revealBottom = document.querySelectorAll('.reveal-bottom'); // từ dưới lên
  const revealLeft = document.querySelectorAll('.reveal-left');     // từ trái
  const revealRight = document.querySelectorAll('.reveal-right');   // từ phải
  const revealNormal = document.querySelectorAll(
  '.reveal, .cd-left, .cd-right, .cd-top, .cd-bottom'
);
const inviteTitle = document.querySelectorAll('.invite-title');
  const createObserver = (elements) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.3,                  // 👈 phải thấy 30% mới chạy
    rootMargin: "0px 0px -80px 0px"  // 👈 kéo xuống sâu hơn mới trigger
  });

  elements.forEach(el => observer.observe(el));
};

  createObserver(revealTop);
  createObserver(revealBottom);
  createObserver(revealLeft);
  createObserver(revealRight);
  createObserver(revealNormal);
}

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
// function renderCalendarVN({ days, month, year }) {
//   const container = document.getElementById("calendar-days");
//   const monthEl = document.getElementById("calendar-month");
//   const yearEl = document.getElementById("calendar-year");

//   container.innerHTML = "";
//   let firstDay = new Date(year, month, 1).getDay();
//   firstDay = (firstDay+6)%7; // VN: T2=0
//   const totalDays = new Date(year, month+1, 0).getDate();
//   const months = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
//   monthEl.innerText = months[month];
//   yearEl.innerText = `Năm ${year}`;

//   for(let i=0;i<firstDay;i++){
//     const empty = document.createElement("div");
//     container.appendChild(empty);
//   }

//   for(let d=1; d<=totalDays; d++){
//     const div = document.createElement("div");
//     div.className = `
//       relative flex items-center justify-center
//       h-12 rounded-xl cursor-pointer
//       bg-white border text-sm font-semibold
//       hover:scale-105 transition duration-700
//     `;
//     div.innerText = d;
//     if(days.includes(d)){
//       div.classList.add("bg-pink-200","border-pink-400");
//       div.innerHTML = `${d}<span class="absolute top-1 right-1 text-red-500 text-xs">❤️</span>`;
//     }
//     container.appendChild(div);
//   }
// }

function renderCalendarVN({ days, month, year }) {
  const container = document.getElementById("calendar-days");
  const monthEl = document.getElementById("calendar-month");
  const yearEl = document.getElementById("calendar-year");

  container.innerHTML = "";
  let firstDay = new Date(year, month, 1).getDay();
  firstDay = (firstDay + 6) % 7; // VN: T2 = 0
  const totalDays = new Date(year, month + 1, 0).getDate();
  const months = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
                  "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
  monthEl.innerText = months[month];
  yearEl.innerText = `Năm ${year}`;

  // Tạo ô trống đầu tháng
  for(let i = 0; i < firstDay; i++){
    const empty = document.createElement("div");
    container.appendChild(empty);
  }

  // Tạo các ô ngày
  for(let d = 1; d <= totalDays; d++){
    const div = document.createElement("div");
    div.className = `
      day reveal
      relative flex items-center justify-center
      h-12 rounded-xl cursor-pointer
      bg-white border text-sm font-semibold
      hover:scale-105 transition duration-700
    `;
    div.innerText = d;

    if(days.includes(d)){
      div.classList.add("bg-pink-200","border-pink-400");
      div.innerHTML = `${d}<span class="absolute top-1 right-1 text-red-500 text-xs">❤️</span>`;
    }

    // Thêm delay reveal theo thứ tự
    div.style.setProperty('--delay', `${d * 0.05}s`);

    container.appendChild(div);
  }

  // ===================== REVEAL + TRÁI TIM =====================
  const dayEls = container.querySelectorAll('.day');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        el.classList.add('show');

        // Nếu là ngày có ❤️, tạo thêm trái tim bay
        if(el.querySelector('span')){
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
// đếm ngược ngày cưới
 const wedding = new Date("2026-04-15T10:30:00").getTime();

  function runCountdown() {
    const now = new Date().getTime();
    const diff = wedding - now;

    if (diff < 0) return;

    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("d").innerText = d;
    document.getElementById("h").innerText = h;
    document.getElementById("m").innerText = m;
    document.getElementById("s").innerText = s;
  }

  setInterval(runCountdown, 1000);
  runCountdown();
  const slides = document.getElementById("slides");
const thumbs = document.querySelectorAll("#thumbs img");

let index = 0;
const total = thumbs.length;

function updateSlide(){
  slides.style.transform = `translateX(-${index * 100}%)`;

  thumbs.forEach(t => t.classList.remove("active"));
  thumbs[index].classList.add("active");
}

// click thumbnail
thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    index = i;
    updateSlide();
  });
});

// nút
document.querySelector(".next").onclick = () => {
  index = (index + 1) % total;
  updateSlide();
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + total) % total;
  updateSlide();
};

// auto chạy
setInterval(() => {
  index = (index + 1) % total;
  updateSlide();
}, 4000);
const params = new URLSearchParams(window.location.search);
const name = params.get("name");

if (name) {
  document.getElementById("guestName").innerText = name;
}