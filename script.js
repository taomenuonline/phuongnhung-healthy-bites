/* script.js - shared logic for site (mobile nav, back to top, admin & menu localStorage, QR generation helpers) */

/* Mobile nav toggle */
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('mobileToggle');
  const nav = document.querySelector('.site-nav');
  if(btn && nav){
    btn.addEventListener('click', ()=> nav.classList.toggle('show'));
  }

  // Back-to-top anchors
  const backBtns = document.querySelectorAll('.floating-btn.back');
  backBtns.forEach(b => b.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top:0,behavior:'smooth'});
  }));
});

/* ---------- Admin / Menu utilities ---------- */

/* Save selected menu to localStorage */
function saveTodayMenu(list) {
  try {
    localStorage.setItem('todayMenu', JSON.stringify(list));
    return true;
  } catch (e) {
    console.error('Lưu menu lỗi', e);
    return false;
  }
}

/* Load today's menu */
function loadTodayMenu() {
  try {
    return JSON.parse(localStorage.getItem('todayMenu') || '[]');
  } catch (e) {
    return [];
  }
}

/* Simple function to download an element as PNG via canvas (QR area) - optional */
function downloadElementImage(el, filename='qrcode.png') {
  // For simplicity, attempt html2canvas if available; else fallback -user can right-click QR.
  if (window.html2canvas) {
    html2canvas(el).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = filename;
      link.click();
    }).catch(()=> alert('Không thể tải xuống tự động. Vui lòng chuột phải lưu ảnh.'));
  } else {
    alert('Tự động tải ảnh yêu cầu thư viện bổ sung. Vui lòng chuột phải vào QR -> Lưu ảnh.');
  }
}
