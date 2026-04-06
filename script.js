// ─── SMOOTH SCROLL FOR NAV LINKS ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── NAV ACTIVE STATE ON SCROLL ────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#1a1a1a';
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ─── CONTACT FORM FEEDBACK ─────────────────────────────────────────────────
const form = document.querySelector('.contact-form');
const btn  = form ? form.querySelector('.f-btn') : null;

if (form && btn) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#c8a97e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });

  // Add a submit listener so the button actually works on click
  btn.addEventListener('click', function () {
    form.dispatchEvent(new Event('submit'));
  });
}

// ─── SCROLL-TRIGGERED FADE-IN FOR CARDS ────────────────────────────────────
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.proj-card, .edu-item, .exp-row, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});


// ─── LEETCODE LIVE STATS ────────────────────────────────────────────────────
async function fetchLeetCodeStats() {
  const username = 'CODER284';
  const statusEl = document.getElementById('lc-status');

  // Try multiple public APIs in order
  const apis = [
    `https://leetcode-stats-api.herokuapp.com/${username}`,
    `https://leetcode-api-faisalshohag.vercel.app/${username}`,
    `https://alfa-leetcode-api.onrender.com/${username}`,
  ];

  let data = null;

  for (const url of apis) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!res.ok) continue;
      const json = await res.json();
      if (json && (json.totalSolved !== undefined || json.solvedProblem !== undefined)) {
        data = json;
        break;
      }
    } catch (_) {
      continue;
    }
  }

  if (!data) {
    // Fallback: use your known stats from the screenshot
    data = {
      totalSolved: 459,
      easySolved: null,
      mediumSolved: null,
      hardSolved: null,
      acceptanceRate: null,
      ranking: null,
      _fallback: true,
    };
  }

  // Normalise field names across different APIs
  const total  = data.totalSolved  ?? data.solvedProblem ?? 0;
  const easy   = data.easySolved   ?? data.easySolvedCount ?? data.easy ?? null;
  const medium = data.mediumSolved ?? data.mediumSolvedCount ?? data.medium ?? null;
  const hard   = data.hardSolved   ?? data.hardSolvedCount ?? data.hard ?? null;
  const rate   = data.acceptanceRate ?? data.acceptRate ?? null;
  const rank   = data.ranking ?? data.userCalendar?.ranking ?? null;

  // Populate stat cards
  document.getElementById('lc-total').textContent  = total;
  document.getElementById('lc-easy').textContent   = easy   ?? '—';
  document.getElementById('lc-medium').textContent = medium ?? '—';
  document.getElementById('lc-hard').textContent   = hard   ?? '—';
  document.getElementById('lc-rank').textContent   = rank   ? `#${Number(rank).toLocaleString()}` : '—';
  document.getElementById('lc-rate').textContent   = rate   ? `${parseFloat(rate).toFixed(1)}%`  : '—';

  // Difficulty bars
  if (easy !== null && medium !== null && hard !== null) {
    const sum = easy + medium + hard || 1;
    const ep = ((easy   / sum) * 100).toFixed(1);
    const mp = ((medium / sum) * 100).toFixed(1);
    const hp = ((hard   / sum) * 100).toFixed(1);

    document.getElementById('lc-easy-pct').textContent = `${easy} (${ep}%)`;
    document.getElementById('lc-med-pct').textContent  = `${medium} (${mp}%)`;
    document.getElementById('lc-hard-pct').textContent = `${hard} (${hp}%)`;

    setTimeout(() => {
      document.getElementById('lc-bar-easy').style.width = ep + '%';
      document.getElementById('lc-bar-med').style.width  = mp + '%';
      document.getElementById('lc-bar-hard').style.width = hp + '%';
    }, 300);
  }

  if (statusEl) {
    statusEl.textContent = data._fallback
      ? 'Showing cached stats — live fetch unavailable'
      : `Live data · LeetCode @${username}`;
  }
}

// Run when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchLeetCodeStats);
} else {
  fetchLeetCodeStats();
}
