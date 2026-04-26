// =============================================
// WEDDING EFFECTS - Thiệp Cưới Đoàn Quang & Như Quỳnh
// =============================================

// =============================================
// 1. FLOATING HEARTS
// =============================================
(function initFloatingHearts() {
  const colors = ['#ff6b9d', '#ff8fab', '#ffb3c6', '#ff4d79', '#ff1a5e', '#ff85a1'];

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const size = Math.random() * 18 + 10;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const drift = (Math.random() - 0.5) * 120;

    heart.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;

    heart.style.cssText = `
      position: fixed;
      left: ${startX}px;
      bottom: -60px;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      animation: floatHeart ${duration}s ease-in ${delay}s forwards;
      --drift: ${drift}px;
      filter: drop-shadow(0 0 4px ${color}88);
    `;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + delay) * 1000 + 200);
  }

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatHeart {
      0%   { transform: translateX(0) scale(0.5); opacity: 0; bottom: -60px; }
      10%  { opacity: 1; }
      50%  { transform: translateX(calc(var(--drift) * 0.5)) scale(1); }
      80%  { opacity: 0.7; }
      100% { transform: translateX(var(--drift)) scale(0.8) rotate(20deg); opacity: 0; bottom: 100vh; }
    }
    @keyframes swanFloat {
      0%,100% { transform: translateY(0) rotate(-2deg); }
      50%      { transform: translateY(-12px) rotate(2deg); }
    }
    @keyframes swanGlow {
      0%,100% { filter: drop-shadow(0 0 12px #ff8fabcc) drop-shadow(0 0 30px #ff4d7988); }
      50%      { filter: drop-shadow(0 0 24px #ff4d79ee) drop-shadow(0 0 60px #ff1a5eaa); }
    }
    @keyframes sparkle {
      0%,100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50%      { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    @keyframes giftBounce {
      0%,100% { transform: translateY(0) scale(1); }
      50%      { transform: translateY(-8px) scale(1.08); }
    }
    @keyframes overlayIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes panelSlideUp {
      from { opacity: 0; transform: translateY(60px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes particlePop {
      0%   { transform: translate(0,0) scale(1); opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
    }
    @keyframes qrSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* Gift button floating */
    #weddingGiftBtn {
      position: fixed;
      bottom: 28px;
      right: 22px;
      z-index: 8888;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff6b9d, #ff1a5e);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 24px #ff4d7966, 0 2px 8px #0002;
      animation: giftBounce 2.2s ease-in-out infinite;
      transition: box-shadow 0.2s;
    }
    #weddingGiftBtn:hover {
      box-shadow: 0 10px 36px #ff4d79aa;
    }
    #weddingGiftBtn svg { width: 32px; height: 32px; }

    /* Overlay */
    #weddingGiftOverlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9000;
      background: rgba(0,0,0,0.55);
      backdrop-filter: blur(4px);
      animation: overlayIn 0.25s ease;
      align-items: flex-end;
      justify-content: center;
    }
    #weddingGiftOverlay.active { display: flex; }

    /* Panel */
    #weddingGiftPanel {
      width: 100%;
      max-width: 480px;
      background: #fff;
      border-radius: 28px 28px 0 0;
      padding: 28px 20px 36px;
      animation: panelSlideUp 0.35s cubic-bezier(.22,1,.36,1);
      position: relative;
      box-shadow: 0 -8px 40px #ff4d7922;
    }

    /* Tab bar */
    .gift-tabs { display: flex; gap: 0; margin-bottom: 20px; border-radius: 14px; overflow: hidden; background: #f3f3f3; padding: 4px; }
    .gift-tab {
      flex: 1; padding: 10px 0; border: none; background: transparent;
      font-size: 15px; font-weight: 600; color: #aaa; cursor: pointer;
      border-radius: 10px; transition: all 0.22s;
    }
    .gift-tab.active { background: #fff; color: #ff4d79; box-shadow: 0 2px 8px #ff4d7922; }

    /* Swan hero */
    .swan-hero {
      text-align: center;
      padding: 10px 0 16px;
    }
    .swan-hero svg { animation: swanFloat 3s ease-in-out infinite, swanGlow 3s ease-in-out infinite; }

    /* Gift grid */
    .gift-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      max-height: 260px;
      overflow-y: auto;
      padding: 4px 2px;
    }
    .gift-item {
      display: flex; flex-direction: column; align-items: center;
      gap: 4px; cursor: pointer; padding: 8px 4px;
      border-radius: 14px; border: 2px solid transparent;
      transition: all 0.18s; position: relative;
    }
    .gift-item:hover, .gift-item.selected {
      border-color: #ff4d79;
      background: #fff0f4;
      transform: scale(1.06);
    }
    .gift-item .gift-icon { font-size: 32px; line-height: 1; }
    .gift-item .gift-name { font-size: 10px; color: #555; text-align: center; font-weight: 500; }
    .gift-item .gift-price {
      font-size: 10px; color: #ff4d79; font-weight: 700;
      display: flex; align-items: center; gap: 2px;
    }
    .gift-item .gift-price::before { content: '🪙'; font-size: 9px; }

    /* Name input row */
    .gift-name-row {
      display: flex; gap: 10px; align-items: center; margin-top: 16px;
    }
    .gift-name-row input {
      flex: 1; padding: 12px 16px; border: 1.5px solid #eee;
      border-radius: 50px; font-size: 14px; outline: none;
      transition: border-color 0.2s;
    }
    .gift-name-row input:focus { border-color: #ff4d79; }
    .gift-send-btn {
      padding: 12px 24px; background: linear-gradient(135deg, #ff6b9d, #ff1a5e);
      color: #fff; border: none; border-radius: 50px; font-size: 15px;
      font-weight: 700; cursor: pointer; transition: opacity 0.2s;
      white-space: nowrap;
    }
    .gift-send-btn:hover { opacity: 0.85; }

    /* QR tab */
    .qr-content { text-align: center; padding: 10px 0; }
    .qr-box {
      display: inline-block; padding: 18px; background: #fff;
      border-radius: 20px; box-shadow: 0 4px 24px #ff4d7922;
      border: 3px solid #ff8fab;
    }
    .qr-box img { width: 180px; height: 180px; border-radius: 8px; }
    .qr-placeholder {
      width: 180px; height: 180px; background: #f8f8f8;
      border-radius: 8px; display: flex; align-items: center;
      justify-content: center; font-size: 13px; color: #bbb;
      flex-direction: column; gap: 8px;
    }
    .qr-placeholder svg { animation: qrSpin 4s linear infinite; }
    .qr-bank-info { margin-top: 16px; font-size: 14px; color: #555; line-height: 1.7; }
    .qr-bank-info strong { color: #ff4d79; }

    /* Close btn */
    .gift-close {
      position: absolute; top: 14px; right: 18px;
      background: #f3f3f3; border: none; border-radius: 50%;
      width: 32px; height: 32px; font-size: 18px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: #aaa; transition: background 0.2s;
    }
    .gift-close:hover { background: #ffd6e0; color: #ff4d79; }

    /* Sparkles overlay */
    .sparkle-wrap { position: absolute; inset: 0; pointer-events: none; overflow: hidden; border-radius: 28px 28px 0 0; }
    .sp {
      position: absolute; width: 6px; height: 6px;
      background: #ff8fab; border-radius: 50%;
      animation: sparkle var(--dur, 2s) ease-in-out var(--del, 0s) infinite;
    }

    /* Toast */
    #weddingToast {
      position: fixed; bottom: 110px; left: 50%; transform: translateX(-50%) translateY(20px);
      background: linear-gradient(135deg, #ff6b9d, #ff1a5e);
      color: #fff; padding: 12px 28px; border-radius: 50px;
      font-size: 15px; font-weight: 600; z-index: 9999;
      opacity: 0; transition: all 0.35s; pointer-events: none;
      white-space: nowrap; box-shadow: 0 4px 20px #ff4d7955;
    }
    #weddingToast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    /* Swan section */
    #swanSection {
      text-align: center; padding: 40px 20px;
      position: relative; overflow: hidden;
    }
    #swanSection .swan-sparkles { position: absolute; inset: 0; pointer-events: none; }

    /* Scroll hearts trail */
    .scroll-heart {
      position: fixed; pointer-events: none; z-index: 9998;
      animation: floatHeart 1.5s ease-out forwards;
      --drift: 0px;
    }
  `;
  document.head.appendChild(style);

  // Launch hearts at interval
  setInterval(createHeart, 900);
  // Burst on load
  for (let i = 0; i < 8; i++) setTimeout(createHeart, i * 180);
})();


// =============================================
// 2. SWAN SECTION (inject before gift button)
// =============================================
(function initSwanSection() {
  const swanHTML = `
  <section id="swanSection" style="background: linear-gradient(180deg, #fff 0%, #fff0f4 50%, #fff 100%); margin-top: 40px; padding: 40px 20px;">
    <div class="swan-sparkles" id="swanSparkles"></div>
    <div class="swan-hero">
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 20px #ff8fabaa);">
        <!-- Left Swan -->
        <ellipse cx="58" cy="95" rx="38" ry="22" fill="#fff" stroke="#ffb3c6" stroke-width="1.5"/>
        <path d="M58 95 Q40 60 55 30 Q60 20 68 28 Q62 50 70 75" fill="#fff" stroke="#ffb3c6" stroke-width="1.5"/>
        <ellipse cx="67" cy="28" rx="6" ry="5" fill="#ff8fab"/>
        <path d="M73 28 Q80 26 78 30 Q74 31 73 28Z" fill="#ff4d79"/>
        <!-- Right Swan (mirrored) -->
        <ellipse cx="122" cy="95" rx="38" ry="22" fill="#fff" stroke="#ffb3c6" stroke-width="1.5"/>
        <path d="M122 95 Q140 60 125 30 Q120 20 112 28 Q118 50 110 75" fill="#fff" stroke="#ffb3c6" stroke-width="1.5"/>
        <ellipse cx="113" cy="28" rx="6" ry="5" fill="#ff8fab"/>
        <path d="M107 28 Q100 26 102 30 Q106 31 107 28Z" fill="#ff4d79"/>
        <!-- Heart between necks -->
        <path d="M90 45 C90 45 82 37 82 31 C82 26 90 24 90 31 C90 24 98 26 98 31 C98 37 90 45 90 45Z" fill="#ff4d79"/>
        <!-- Water ripple -->
        <ellipse cx="90" cy="118" rx="70" ry="10" fill="#ffb3c633"/>
        <ellipse cx="90" cy="122" rx="50" ry="7" fill="#ffb3c622"/>
        <!-- Sparkles -->
        <circle cx="30" cy="50" r="3" fill="#ff8fab" opacity="0.7"/>
        <circle cx="150" cy="50" r="3" fill="#ff8fab" opacity="0.7"/>
        <circle cx="90" cy="10" r="4" fill="#ffb3c6" opacity="0.8"/>
        <circle cx="20" cy="90" r="2" fill="#ff4d79" opacity="0.6"/>
        <circle cx="160" cy="90" r="2" fill="#ff4d79" opacity="0.6"/>
      </svg>
      <p style="font-family: 'Great Vibes', cursive; font-size: 28px; color: #ff4d79; margin-top: 12px; letter-spacing: 1px;">Forever & Always</p>
      <p style="font-size: 13px; color: #aaa; margin-top: 4px;">Đoàn Quang ❤️ Như Quỳnh</p>
    </div>
  </section>`;

  // Insert before RSVP section
  const rsvp = document.querySelector('.rsvp-section');
  if (rsvp) {
    rsvp.insertAdjacentHTML('beforebegin', swanHTML);
  } else {
    document.querySelector('#card').insertAdjacentHTML('beforeend', swanHTML);
  }

  // Add sparkles around swan
  const sparklesEl = document.getElementById('swanSparkles');
  if (!sparklesEl) return;
  for (let i = 0; i < 16; i++) {
    const sp = document.createElement('div');
    sp.className = 'sp';
    sp.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${(Math.random() * 2 + 1.5).toFixed(1)}s;
      --del: ${(Math.random() * 2).toFixed(1)}s;
      width: ${Math.random() * 6 + 4}px;
      height: ${Math.random() * 6 + 4}px;
      background: ${['#ff8fab','#ffb3c6','#ff4d79','#fff'][Math.floor(Math.random()*4)]};
    `;
    sparklesEl.appendChild(sp);
  }
})();


// =============================================
// 3. GIFT + QR PANEL
// =============================================
(function initGiftPanel() {
  const gifts = [
    { icon: '💐', name: 'Bó hoa', price: 2950 },
    { icon: '📷', name: 'Máy ảnh', price: 2980 },
    { icon: '🦄', name: '3D cầu uyên ương', price: 3636 },
    { icon: '🎁', name: 'Hộp kỳ lân', price: 3980 },
    { icon: '💍', name: 'Nhẫn cầu hôn', price: 3980 },
    { icon: '🪄', name: 'Gậy phép thuật', price: 5980 },
    { icon: '🦢', name: 'Đôi thiên nga', price: 6980 },
    { icon: '🎈', name: 'Khinh khí cầu', price: 8099 },
    { icon: '✈️', name: 'Máy bay tình yêu', price: 9800 },
    { icon: '🎡', name: 'Vòng quay hạnh phúc', price: 12000 },
    { icon: '🏰', name: 'Lâu đài tình yêu', price: 15000 },
    { icon: '🚗', name: 'Xe hoa cưới', price: 18000 },
  ];

  // Create gift button
  const btn = document.createElement('button');
  btn.id = 'weddingGiftBtn';
  btn.title = 'Tặng quà cưới';
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="white"><path d="M20 6h-2.18c.07-.34.18-.68.18-1a2.997 2.997 0 00-5.45-1.73L12 4.03l-.55-.76C10.87 2.5 9.97 2 9 2A3 3 0 006 5c0 .32.11.66.18 1H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM4 19c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9H4v9zm8-7h2v2h-2v-2zm0 4h2v2h-2v-2zm-4-4h2v2H8v-2zm0 4h2v2H8v-2zm-2 0H4v-2h2v2zm8 0v-2h2v2h-2zm4 0h-2v-2h2v2zM6 12H4v-2h2v2zm2-2h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>`;
  document.body.appendChild(btn);

  // Create overlay + panel
  const overlay = document.createElement('div');
  overlay.id = 'weddingGiftOverlay';

  let selectedGift = null;

  overlay.innerHTML = `
    <div id="weddingGiftPanel">
      <div class="sparkle-wrap" id="panelSparkles"></div>
      <button class="gift-close" id="giftClose">✕</button>
      <div class="gift-tabs">
        <button class="gift-tab active" data-tab="gifts">🎁 Tặng Quà</button>
        <button class="gift-tab" data-tab="qr">📱 QR Chuyển Khoản</button>
      </div>

      <!-- GIFTS TAB -->
      <div id="tab-gifts">
        <div class="gift-grid" id="giftGrid"></div>
        <div class="gift-name-row">
          <input type="text" id="giftSenderName" placeholder="Tên của bạn…">
          <button class="gift-send-btn" id="giftSendBtn">Gửi 💝</button>
        </div>
      </div>

      <!-- QR TAB -->
      <div id="tab-qr" style="display:none;">
        <div class="qr-content">
          <div class="qr-box">
            <div class="qr-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffb3c6">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13 4h-2v2h2v-2zm0-4h-2v2h2v-2zm2 2h-2v2h2v-2zm-4-4h-2v2h2v-2zm2 2h-2v2h2v-2zm2-2h-2v2h2v-2zm2 2h-2v2h2v-2z"/>
              </svg>
              <span>Quét mã QR<br>để chuyển khoản</span>
            </div>
          </div>
          <div class="qr-bank-info">
            <p>Ngân hàng: <strong>Vietcombank / MB Bank</strong></p>
            <p>Số tài khoản: <strong>1234 5678 9000</strong></p>
            <p>Chủ tài khoản: <strong>DOAN VAN QUANG</strong></p>
            <p style="margin-top:8px; font-size:12px; color:#ccc;">*(Vui lòng ghi nội dung: Tên bạn + Chúc mừng cưới)*</p>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  // Fill gift grid
  const grid = document.getElementById('giftGrid');
  gifts.forEach((g, i) => {
    const item = document.createElement('div');
    item.className = 'gift-item';
    item.dataset.idx = i;
    item.innerHTML = `
      <div class="gift-icon">${g.icon}</div>
      <div class="gift-name">${g.name}</div>
      <div class="gift-price">${g.price.toLocaleString()}</div>`;
    item.addEventListener('click', () => {
      document.querySelectorAll('.gift-item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
      selectedGift = g;
    });
    grid.appendChild(item);
  });

  // Panel sparkles
  const panelSparkles = document.getElementById('panelSparkles');
  for (let i = 0; i < 12; i++) {
    const sp = document.createElement('div');
    sp.className = 'sp';
    sp.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${(Math.random()*2+1).toFixed(1)}s;--del:${(Math.random()*3).toFixed(1)}s;`;
    panelSparkles.appendChild(sp);
  }

  // Tab switch
  overlay.querySelectorAll('.gift-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      overlay.querySelectorAll('.gift-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const which = tab.dataset.tab;
      document.getElementById('tab-gifts').style.display = which === 'gifts' ? '' : 'none';
      document.getElementById('tab-qr').style.display = which === 'qr' ? '' : 'none';
    });
  });

  // Open/close
  btn.addEventListener('click', () => overlay.classList.add('active'));
  document.getElementById('giftClose').addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });

  // Send gift
  document.getElementById('giftSendBtn').addEventListener('click', () => {
    const name = document.getElementById('giftSenderName').value.trim() || 'Ẩn danh';
    const gift = selectedGift;
    if (!gift) { showToast('Vui lòng chọn một món quà! 🎁'); return; }
    showToast(`${name} đã tặng ${gift.icon} ${gift.name}! 💝`);
    burstHearts();
    overlay.classList.remove('active');
    document.getElementById('giftSenderName').value = '';
    document.querySelectorAll('.gift-item').forEach(el => el.classList.remove('selected'));
    selectedGift = null;
  });

  function showToast(msg) {
    let toast = document.getElementById('weddingToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'weddingToast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function burstHearts() {
    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        const h = document.createElement('div');
        h.classList.add('floating-heart');
        const size = Math.random() * 20 + 12;
        h.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#ff4d79"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        h.style.cssText = `position:fixed;left:${30+Math.random()*40}%;bottom:80px;z-index:9999;pointer-events:none;opacity:0;animation:floatHeart ${1.5+Math.random()*2}s ease-out forwards;--drift:${(Math.random()-0.5)*200}px;`;
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 4000);
      }, i * 80);
    }
  }
})();


// =============================================
// 4. CLICK / TOUCH HEART TRAIL
// =============================================
(function initClickHearts() {
  function spawnAt(x, y) {
    const h = document.createElement('div');
    const size = Math.random() * 16 + 10;
    h.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#ff6b9d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    h.style.cssText = `position:fixed;left:${x - size/2}px;top:${y - size/2}px;z-index:9997;pointer-events:none;opacity:0;animation:floatHeart 1.2s ease-out forwards;--drift:${(Math.random()-0.5)*80}px;`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1400);
  }
  document.addEventListener('click', e => spawnAt(e.clientX, e.clientY));
  document.addEventListener('touchstart', e => {
    Array.from(e.touches).forEach(t => spawnAt(t.clientX, t.clientY));
  }, { passive: true });
})();