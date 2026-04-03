// const leftDoor = document.getElementById('leftDoor');
// const rightDoor = document.getElementById('rightDoor');
// const openScreen = document.getElementById('openScreen');
// const card = document.getElementById('card');

// function openCard(){
//   leftDoor.classList.add("open-left");
//   rightDoor.classList.add("open-right");
//   setTimeout(()=>{
//     openScreen.style.display="none"; 
//     card.classList.remove("hidden"); 

//     // bật hiệu ứng hero-text
//     const hero = document.querySelector('.hero-text');
//     hero.classList.add('show'); 

//     // Thư mời hero + phụ
//     setTimeout(()=> document.querySelector('.invite-hero').classList.add('show'), 1500);
//     setTimeout(()=> document.querySelector('.invite-sub').classList.add('show'), 2500);

//     // --- Hiển thị chữ "Thư tiệc mời cưới" + gạch + giờ + ngày ---
//     const inviteTitle = document.querySelector('.invite-title');
//     const inviteTime = document.querySelector('.invite-time');
//     const inviteDate = document.querySelector('.invite-date');
//     const dividerTop = document.querySelector('.divider-top');
//     const dividerBottom = document.querySelector('.divider-bottom');

//     setTimeout(()=>{
//       dividerTop.classList.add('show');         // gạch trên trượt ra
//       inviteTitle.classList.add('show');        // chữ Thư tiệc mời cưới to lên
//       setTimeout(()=> inviteTime.classList.add('show'), 400);     // giờ
//       setTimeout(()=> dividerBottom.classList.add('show'), 500); // gạch dưới
//       setTimeout(()=> inviteDate.classList.add('show'), 800);     // ngày tháng
//     }, 200);

//     const titles = document.querySelectorAll('.title-main');
//     titles.forEach((title, i) => {
//       setTimeout(() => {
//         title.classList.add('show'); // bật animation từng chữ
//       }, i * 1000); // delay 0.4s giữa các chữ
//     });
//     renderCalendarVN({
//       days: [15, 16],
//       month: 3,
//       year: 2026
//     });
//     const henImg = document.getElementById('henImg');
//     setTimeout(()=> henImg.classList.add('show'), 500);

//     // Bắt đầu tim bay qua lại
//     startHearts();
//   },900);
// }

// // Scroll reveal
// const reveals = document.querySelectorAll('.reveal');
// const revealLeft = document.querySelector('.reveal-left');
// const revealRight = document.querySelector('.reveal-right');

// window.addEventListener('scroll', ()=>{
//   const trigger = window.innerHeight * 0.85;

//   reveals.forEach(el=>{
//     if(el.getBoundingClientRect().top < trigger){ el.classList.add('show'); setTimeout(() => el.classList.add('show'), 500);  }
//   });

//   if(revealLeft.getBoundingClientRect().top < trigger){ revealLeft.classList.add('show'); }
//   if(revealRight.getBoundingClientRect().top < trigger){ revealRight.classList.add('show'); }
// });

// // Tạo tim bay qua lại
// function startHearts() {
//   setInterval(()=>{
//     const heart = document.createElement('div');
//     heart.classList.add('falling-heart');
//     heart.style.left = Math.random() * 90 + 'vw';
//     heart.style.fontSize = (20 + Math.random()*20) + 'px';
//     heart.style.animationDuration = (6 + Math.random()*4) + 's';
//     heart.textContent = '❤️';
//     document.body.appendChild(heart);
//     setTimeout(()=> heart.remove(), 10000);
//   }, 1200); // mỗi 1.2 giây xuất hiện 1 trái tim
// }
// const canvas = document.getElementById("heartCanvas");
// const ctx = canvas.getContext("2d");

// // Đặt canvas đúng kích thước
// canvas.width = 100;
// canvas.height = 100;

// let particles = [];

// // Công thức trái tim
// function heartFunction(t) {
//   let x = 16 * Math.pow(Math.sin(t), 3);
//   let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
//   return { x: x, y: -y };
// }

// // Tạo particles
// for (let i = 0; i < 500; i++) {
//   let t = Math.random() * Math.PI * 2;
//   let pos = heartFunction(t);

//   particles.push({
//     baseX: canvas.width/2 + pos.x * 2.5,
//     baseY: canvas.height/2 + pos.y * 2.5,
//     x: 0,
//     y: 0,
//     size: Math.random() * 2 + 0.5,
//     alpha: Math.random(),
//     offset: Math.random() * 100
//   });
// }

// let time = 0;

// function drawHeart() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   particles.forEach(p => {
//     // hiệu ứng nhịp tim
//     let pulse = Math.sin(time + p.offset) * 1.5;
//     p.x = p.baseX + pulse;
//     p.y = p.baseY + pulse;

//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//     ctx.fillStyle = `rgba(255, 80, 80, ${p.alpha})`;
//     ctx.fill();
//   });

//   time += 0.05;
//   requestAnimationFrame(drawHeart);
// }

// drawHeart();

// // Scroll reveal cho album ảnh
// const albumItems = document.querySelectorAll('.wedding-album .album-item');

// window.addEventListener('scroll', () => {
//   const trigger = window.innerHeight * 0.85;

//   albumItems.forEach(item => {
//     if(item.getBoundingClientRect().top < trigger){
//       const img = item.querySelector('img');
//       item.classList.add('show');
//       img.classList.add('show');
//     }
//   });
// });
// function renderCalendarVN({ days, month, year }) {
//   const container = document.getElementById("calendar-days");
//   const monthEl = document.getElementById("calendar-month");
//   const yearEl = document.getElementById("calendar-year");

//   container.innerHTML = "";

//   const today = new Date();

//   // 🔥 FIX QUAN TRỌNG: chuyển về hệ VN (T2 = 0)
//   let firstDay = new Date(year, month, 1).getDay();
//   firstDay = (firstDay + 6) % 7;

//   const totalDays = new Date(year, month + 1, 0).getDate();

//   const months = [
//     "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
//     "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"
//   ];

//   monthEl.innerText = months[month];
//   yearEl.innerText = `Năm ${year}`;

//   // Ô trống đầu tháng
//   for (let i = 0; i < firstDay; i++) {
//     const empty = document.createElement("div");
//     container.appendChild(empty);
//   }

//   // Render ngày
//   for (let d = 1; d <= totalDays; d++) {
//     const div = document.createElement("div");

//     div.className = `
//       relative flex items-center justify-center
//       h-12 rounded-xl cursor-pointer
//       bg-white border text-sm font-semibold
//       hover:scale-105 transition
//     `;

//     div.innerText = d;

//     // 🎯 Ngày cưới
//     if (days.includes(d)) {
//       div.classList.add("bg-pink-200", "border-pink-400");

//       div.innerHTML = `
//         ${d}
//         <span class="absolute top-1 right-1 text-red-500 text-xs">❤️</span>
//       `;
//     }

//     container.appendChild(div);
//   }
// }