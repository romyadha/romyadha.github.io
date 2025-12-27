
// Trip data
const tripData = {
  'raja-ampat-3d': {
    title: 'Papua Barat Daya — Raja Ampat — 3 Hari',
    desc: 'Foto destinasi, highlight, dan jadwal singkat. Termasuk transportasi dan guide lokal berpengalaman.',
    photo: 'assets/Bangga-20-Tempat-Wisata-Indonesia-yang-Mendunia-jpg.png',
    price: 'Rp 850.000',
    location: 'Raja Ampat, Papua Barat',
    maps: 'https://www.google.com/maps/search/?api=1&query=Raja+Ampat+Papua+Barat',
    website: 'https://opentrip.example/raja-ampat-3d',
    wa: 'https://wa.me/6281234567890'
  },
  'raja-ampat-2d': {
    title: 'Indonesia — Raja Ampat — 2 Hari',
    desc: 'Termasuk transportasi & guide. Paket singkat untuk eksplorasi spots terbaik.',
    photo: 'assets/tempat-wisata-di-indonesia-2.jpg',
    price: 'Rp 650.000',
    location: 'Raja Ampat, Papua Barat',
    maps: 'https://www.google.com/maps/search/?api=1&query=Raja+Ampat+Papua+Barat',
    website: 'https://opentrip.example/raja-ampat-2d',
    wa: 'https://wa.me/6281234567890'
  },
  'yogyakarta-2d': {
    title: 'Yogyakarta — 2 Hari',
    desc: 'Kunjungi candi dan wisata kuliner. Cocok untuk keluarga dan teman.',
    photo: 'assets/Traveling Photo.png',
    price: 'Rp 490.000',
    location: 'Yogyakarta, DI Yogyakarta',
    maps: 'https://www.google.com/maps/search/?api=1&query=Yogyakarta',
    website: 'https://opentrip.example/yogyakarta-2d',
    wa: 'https://wa.me/6281234567890'
  }
};

// Modal functions
function openModal(tripId) {
  const modal = document.getElementById('tripModal');
  const data = tripData[tripId];
  if (!data) return;
  
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDesc').textContent = data.desc;
  document.getElementById('modalPhoto').src = data.photo;
  document.getElementById('modalPrice').textContent = data.price;
  document.getElementById('modalReservasi').href = data.wa;
  document.getElementById('modalWebsite').href = data.website;
  
  const locationEl = document.getElementById('modalLocation');
  locationEl.innerHTML = `📍 ${data.location} — <a href="${data.maps}" target="_blank" rel="noopener" aria-label="Lihat di Google Maps">🗺️</a>`;
  
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('tripModal').style.display = 'none';
}

// Interactive buttons with ripple effect and feedback
function initializeButtons() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Skip feedback button — handled by form submission
      if (this.closest('form')) return;

      // Allow ripple to show: prevent immediate navigation, handle manually
      e.preventDefault();

      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      // Remove ripple after animation completes
      ripple.addEventListener('animationend', () => ripple.remove());

      // Visual feedback (brief scale + checkmark)
      this.style.transform = 'scale(0.98)';
      setTimeout(() => { this.style.transform = 'scale(1)'; }, 100);
      const originalText = this.textContent;
      this.textContent = '✓';
      this.style.opacity = '0.8';
      setTimeout(() => { this.textContent = originalText; this.style.opacity = '1'; }, 600);

      // Manual navigation after a short delay to allow the effect to show
      const href = this.getAttribute && this.getAttribute('href');
      const target = this.getAttribute && this.getAttribute('target');
      setTimeout(() => {
        if (!href || href === '#') return;
        if (href.startsWith('#')) {
          location.hash = href;
        } else if (target === '_blank') {
          window.open(href, '_blank', 'noopener');
        } else {
          location.href = href;
        }
      }, 350);
    });
  });
}

// Make trip cards clickable
function initializeTripCards() {
  const tripCards = document.querySelectorAll('.trip-card');
  
  tripCards.forEach(card => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', function(e) {
      // Don't trigger when clicking internal links or buttons
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.btn')) return;

      // Trigger ripple on card
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      // Remove ripple after animation
      ripple.addEventListener('animationend', () => ripple.remove());

      // On card click, open the detail page if present; otherwise fallback to Reservasi
      const websiteLink = this.querySelector('.trip-website');
      if (websiteLink) {
        const href = websiteLink.getAttribute('href');
        const target = websiteLink.getAttribute('target');
        if (href) {
          setTimeout(() => {
            if (target === '_blank') window.open(href, '_blank', 'noopener');
            else location.href = href;
          }, 250);
        }
      } else {
        const reservasiBtn = this.querySelector('.btn');
        if (reservasiBtn) reservasiBtn.click();
      }
    });
  });
}

// Simple feedback form handler — stores feedback to localStorage and shows a message
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedbackForm');
  const msg = document.getElementById('feedbackMsg');
  const listWrap = document.getElementById('feedbackList');
  const modal = document.getElementById('tripModal');
  const modalClose = document.querySelector('.modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');

  // Initialize button interactivity
  initializeButtons();
  
  // Initialize trip card clickability
  initializeTripCards();

  // Modal event listeners
  if (modal) {
    // Close modal on close button
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    // Close modal on backdrop click
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeModal);
    }
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Detail trigger buttons
  const detailTriggers = document.querySelectorAll('.btn-detail-trigger');
  detailTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const tripId = this.getAttribute('data-trip');
      if (tripId) openModal(tripId);
    });
  });

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fd = new FormData(form);
    const data = {
      name: fd.get('name') || '',
      email: fd.get('email') || '',
      message: fd.get('message') || '',
      rating: fd.get('rating') || '5',
      createdAt: new Date().toISOString()
    };
    console.log('Feedback submitted:', data);

    // basic validation
    if (!data.name.trim() || !data.message.trim()) {
      msg.textContent = 'Mohon isi nama dan pesan.';
      msg.style.color = '#b00020';
      return;
    }

    // save locally (demo) — replace with API call as needed
    const list = JSON.parse(localStorage.getItem('opentrip_feedback') || '[]');
    list.push(data);
    localStorage.setItem('opentrip_feedback', JSON.stringify(list));

    // show success and reset
    msg.textContent = 'Terima kasih atas feedback Anda!';
    msg.style.color = '#0b6623';
    form.reset();

    // re-render list
    renderFeedbackList();

    // optional: hide message after 4s
    setTimeout(() => { msg.textContent = ''; }, 4000);
  });

  // Render recent feedback entries (last 5)
  function renderFeedbackList() {
    if (!listWrap) return;
    const list = JSON.parse(localStorage.getItem('opentrip_feedback') || '[]');
    if (!list.length) {
      listWrap.innerHTML = '<div class="item">Belum ada feedback.</div>';
      return;
    }
    const latest = list.slice(-5).reverse();
    listWrap.innerHTML = latest.map(item => {
      const when = new Date(item.createdAt).toLocaleString();
      return `<div class="item"><strong>${escapeHtml(item.name)}</strong> — <small>Rating: ${escapeHtml(item.rating)} • ${when}</small><div style="margin-top:6px">${escapeHtml(item.message)}</div></div>`;
    }).join('');
  }

  // small helper to avoid injecting raw HTML
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m];});
  }

  // initial render
  renderFeedbackList();
});
