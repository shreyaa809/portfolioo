'use strict';

/* ─────────────────────────────────────────────
   DAY 9: CUSTOM CURSOR
───────────────────────────────────────────── */
const cursorNib   = document.getElementById('cursorNib');
const cursorDot   = document.getElementById('cursorDot');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorNib.style.left   = mouseX + 'px';
  cursorNib.style.top    = mouseY + 'px';
  cursorDot.style.left   = mouseX + 'px';
  cursorDot.style.top    = mouseY + 'px';
});

// Trailing circle follows with a slight delay (requestAnimationFrame)
let trailX = 0, trailY = 0;
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Expand cursor on interactive elements
document.querySelectorAll('a, button, .nav-circle, .ticker-wrap, .col').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorTrail.style.width  = '52px';
    cursorTrail.style.height = '52px';
    cursorTrail.style.borderColor = 'rgba(139,26,26,0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursorTrail.style.width  = '32px';
    cursorTrail.style.height = '32px';
    cursorTrail.style.borderColor = 'rgba(139,26,26,0.35)';
  });
});

/* ─────────────────────────────────────────────
   DAY 9: BREAKING NEWS TEXT ROTATION
───────────────────────────────────────────── */
const breakingMessages = [
  'Exclusive Dispatch: The Latest Creations of Shreya Shukla Unveiled',
  'Breaking: SignSOS API Goes Live — Bridging the Communication Gap',
  'IoT Engineer & Full-Stack Developer · VIT Vellore · Class of 2028',
  'Bulletin: Smart Door Lock System Deployed at Campus Lab',
  'Special Report: Hackathon Season — Shreya Leads Multi-Team Build',
  'Update: Bus Tracker Project Reduces Commute Uncertainty by Design',
];

let tickerIndex = 0;
const tickerText = document.getElementById('tickerText');

function rotateTickerText() {
  tickerIndex = (tickerIndex + 1) % breakingMessages.length;
  const msg = breakingMessages[tickerIndex];
  // Duplicate for seamless loop
  tickerText.textContent = `${msg} \u00a0\u00a0\u00a0✦\u00a0\u00a0\u00a0 ${msg} \u00a0\u00a0\u00a0✦\u00a0\u00a0\u00a0 ${msg} \u00a0\u00a0\u00a0✦\u00a0\u00a0\u00a0 ${msg} \u00a0\u00a0\u00a0✦\u00a0\u00a0\u00a0 `;
}
setInterval(rotateTickerText, 12000);

/* ─────────────────────────────────────────────
   DAY 5: TICKER → STORY MODE
───────────────────────────────────────────── */
const storyOverlay = document.getElementById('storyOverlay');
const storyClose   = document.getElementById('storyClose');

// Default project for ticker click: SignSOS
document.getElementById('ticker').addEventListener('click', () => {
  openStoryMode('signsos');
});

storyClose.addEventListener('click', closeStoryMode);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeStoryMode();
    closeModal();
  }
});

/* ─────────────────────────────────────────────
   DAY 6: PROJECT STORY DATA + CINEMATIC MODE
───────────────────────────────────────────── */
const projectStories = {
  signsos: {
    title: 'SignSOS',
    meta: 'API Project · Web + AI · GitHub Live',
    description: `SignSOS is a real-time sign language interpretation API designed to bridge the communication gap between the hearing-impaired community and the wider world. Built using Python and machine learning, the system captures hand gestures through a camera feed, runs them through a trained classification model, and returns translated text via a lightweight REST API — making accessibility a first-class feature, not an afterthought.`,
    github: 'https://github.com/shreyaa809/signsos-api',
    flow: [
      { label: 'Camera Input', sub: 'Live gesture feed', accent: false },
      { label: 'MediaPipe', sub: 'Hand landmark detection', accent: false },
      { label: 'ML Classifier', sub: 'Trained gesture model', accent: true },
      { label: 'SignSOS API', sub: 'REST endpoint', accent: true },
      { label: 'Text Output', sub: 'Translated response', accent: false },
    ]
  },
  nearmiss: {
    title: 'Near-Miss Safety Dashboard',
    meta: 'AI Project · Computer Vision · Real-time',
    description: `Near-Miss Safety Dashboard is a real-time traffic collision risk detection system built on YOLOv8, achieving roughly 25 FPS inference on live video streams. The pipeline runs frame extraction through object detection, multi-object tracking, and Time-to-Collision computation to produce a dynamic severity score for every tracked vehicle. A Flask REST API streams these structured risk events as JSON, while live weather data from the Open-Meteo API feeds into contextual risk assessment. The result is a geo-mapped dashboard covering fifty kilometres of risk zones with interactive event tracking — with batching and pipeline optimisations cutting overall inference latency by about thirty percent.`,
    github: null,
    flow: [
      { label: 'Frame Extraction', sub: 'Live video stream', accent: false },
      { label: 'YOLOv8 Detection', sub: 'Object detection', accent: false },
      { label: 'Multi-Object Tracking', sub: 'TTC computation', accent: true },
      { label: 'Flask REST API', sub: 'Risk event JSON', accent: true },
      { label: 'Geo Dashboard', sub: 'Live risk zones', accent: false },
    ]
  },
  doorlock: {
    title: 'Smart Door Lock',
    meta: 'IoT Project · Embedded · Face + RFID Auth',
    description: `A multi-factor smart door lock combining facial recognition and RFID card authentication. A Raspberry Pi runs a lightweight OpenCV face detection pipeline while an RC522 module reads authorised RFID tags. Access logs are stored locally and pushed to a Firebase dashboard in real time — giving administrators a clear audit trail of every entry and exit, without relying on expensive proprietary hardware.`,
    github: null,
    flow: [
      { label: 'Face Camera', sub: 'OpenCV pipeline', accent: false },
      { label: 'RFID Reader', sub: 'RC522 module', accent: false },
      { label: 'Raspberry Pi', sub: 'Auth decision logic', accent: true },
      { label: 'Firebase', sub: 'Access log & alerts', accent: true },
      { label: 'Door Lock', sub: 'Servo / relay', accent: false },
    ]
  }
};

function openStoryMode(projectKey) {
  const data = projectStories[projectKey];
  if (!data) return;

  // Set title & meta
  document.getElementById('storyTitle').textContent = data.title;
  document.getElementById('storyMeta').textContent  = data.meta;

  // Clear & start typewriter
  const typer = document.getElementById('storyTypewriter');
  typer.textContent = '';
  typewriterAnimate(typer, data.description, 18);

  // Build flowchart
  buildFlowchart(document.getElementById('storyFlowchart'), data.flow);

  // Build actions
  const actionsEl = document.getElementById('storyActions');
  actionsEl.innerHTML = '';
  if (data.github) {
    const btn = document.createElement('a');
    btn.href = data.github;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'story-btn github';
    btn.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.04c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>View on GitHub`;
    actionsEl.appendChild(btn);
  }

  storyOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStoryMode() {
  storyOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* Typewriter animation */
function typewriterAnimate(el, text, speed = 20) {
  let i = 0;
  el.textContent = '';
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

/* Build HTML/CSS flowchart */
function buildFlowchart(container, steps) {
  container.innerHTML = '';

  const titleEl = document.createElement('div');
  titleEl.className = 'flowchart-title';
  titleEl.textContent = '✦ System Flow Architecture ✦';
  container.appendChild(titleEl);

  const row = document.createElement('div');
  row.className = 'flowchart-row';

  steps.forEach((step, idx) => {
    const box = document.createElement('div');
    box.className = 'flow-box' + (step.accent ? ' accent-box' : '');
    box.innerHTML = `${step.label}<span class="flow-sub">${step.sub}</span>`;
    row.appendChild(box);

    if (idx < steps.length - 1) {
      const arrow = document.createElement('span');
      arrow.className = 'flow-arrow';
      arrow.textContent = '→';
      row.appendChild(arrow);
    }
  });

  container.appendChild(row);
}

/* ─────────────────────────────────────────────
   DAY 7 + 8: FLOATING CIRCLES + POPUP MODALS
───────────────────────────────────────────── */
const sectionModal  = document.getElementById('sectionModal');
const modalContent  = document.getElementById('modalContent');
const modalClose    = document.getElementById('modalClose');

const sectionData = {
  about: {
    eyebrow: 'About the Editor',
    title: 'Shreya Shukla',
    html: `
      <p>A second-year Computer Science student at VIT Vellore specialising in IoT, Shreya Shukla is a developer driven by curiosity and creativity. She began coding in the 6th grade, fascinated by how machines think and systems work.</p>
      <p>From building smart IoT solutions to participating in hackathons, her journey blends logic with imagination. With experience in web development, AI/ML, and problem-solving, she focuses on creating impactful and meaningful technology.</p>
      <hr class="modal-rule">
      <div class="modal-item">
        <div class="modal-item-sub">Currently</div>
        <div class="modal-item-title">B.Tech CSE · IoT Specialisation</div>
        <p>Vellore Institute of Technology · Second Year · Expected 2028</p>
      </div>
      <hr class="modal-rule">
      <span class="modal-tag">Python</span>
      <span class="modal-tag">IoT</span>
      <span class="modal-tag">Web Dev</span>
      <span class="modal-tag">AI/ML</span>
      <span class="modal-tag">Embedded Systems</span>
    `
  },
  achievements: {
    eyebrow: 'Honours & Recognition',
    title: 'Achievements',
    html: `
      <div class="modal-item">
        <div class="modal-item-sub">Competitive Events</div>
        <div class="modal-item-title">Hackathons</div>
        <p>Multiple hackathon participations across domains including smart systems, health tech, and civic technology. Experienced in 48-hour sprint builds, cross-functional team collaboration, and delivering working demos under pressure.</p>
      </div>
      
      <hr class="modal-rule">
      <div class="modal-item">
        <div class="modal-item-sub">Campus Involvement</div>
        <div class="modal-item-title">Technical Clubs & Societies</div>
        <p>Active member of technical clubs at VIT Vellore, participating in workshops, coding challenges, project showcases, and peer-led learning sessions. Contributor to club initiatives in IoT,  and web development.</p>
      </div>
    `
  },
  education: {
    eyebrow: 'Academic Record',
    title: 'Education',
    html: `
      <div class="modal-item">
        <div class="modal-item-sub">Undergraduate · 2023 – 2028</div>
        <div class="modal-item-title">Vellore Institute of Technology</div>
        <p>Bachelor of Technology in Computer Science and Engineering with specialisation in Internet of Things. Coursework spanning data structures, algorithms, embedded systems, networks, and machine learning.</p>
        <span class="modal-tag">VIT Vellore</span>
        <span class="modal-tag">B.Tech CSE</span>
        <span class="modal-tag">IoT Specialisation</span>
        <span class="modal-tag">2nd Year</span>
      </div>
      <hr class="modal-rule">
      <div class="modal-item">
        <div class="modal-item-sub">Foundations</div>
        <div class="modal-item-title">Self-Taught · Grade 6 Onwards</div>
        <p>Began independent exploration of programming in sixth grade out of genuine curiosity about how computers work. That early self-directed learning shaped a problem-first, hands-on approach to engineering that persists today.</p>
      </div>
    `
  },
  projects: {
    eyebrow: 'Selected Works',
    title: 'Projects',
    html: `
      <div class="modal-item">
        <div class="modal-item-sub">API · AI/ML · Accessibility</div>
        <div class="modal-item-title">SignSOS — Sign Language API</div>
        <p>Real-time sign language interpretation REST API using MediaPipe and a trained ML classifier. Translates hand gestures captured via camera feed into text, making communication more accessible. Live on GitHub.</p>
        <button class="story-btn github" style="margin-top:10px;font-size:10px;padding:8px 18px;" onclick="openStoryMode('signsos');closeModal()">
          View Story Mode
        </button>
      </div>
      <hr class="modal-rule">
      <div class="modal-item">
        <div class="modal-item-sub">Computer Vision · AI · Real-time</div>
        <div class="modal-item-title">Near-Miss Safety Dashboard</div>
        <p>Real-time traffic collision risk detection system using YOLOv8, with an end-to-end pipeline from frame extraction through object tracking and Time-to-Collision computation. Streams structured risk events via a Flask REST API to a geo-mapped dashboard.</p>
        <button class="story-btn github" style="margin-top:10px;font-size:10px;padding:8px 18px;border-color:#555;color:#888;cursor:pointer;" onclick="openStoryMode('nearmiss');closeModal()">
          View Story Mode
        </button>
      </div>
      <hr class="modal-rule">
      
    `
  },
  profiles: {
    eyebrow: 'Online Presence',
    title: 'Profiles',
    html: `
      <p>Find Shreya's work, contributions, and professional presence across these platforms.</p>
      <hr class="modal-rule">
      <a href="https://github.com/shreyaa809" target="_blank" rel="noopener" class="profile-link">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.04c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
        <div>
          <div class="profile-name">GitHub</div>
          <div class="profile-handle">github.com/shreyaa809</div>
        </div>
      </a>
      <a href="https://www.linkedin.com/in/shreya-shukla-68781a329/" target="_blank" rel="noopener" class="profile-link">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.93v5.68H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.56V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z"/></svg>
        <div>
          <div class="profile-name">LinkedIn</div>
          <div class="profile-handle">Connect with Shreya</div>
        </div>
      </a>
    `
  }
};

function openModal(sectionKey) {
  const data = sectionData[sectionKey];
  if (!data) return;
  modalContent.innerHTML = `
    <span class="modal-eyebrow">${data.eyebrow}</span>
    <h2>${data.title}</h2>
    ${data.html}
  `;
  sectionModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  sectionModal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.nav-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    const section = circle.dataset.section;
    openModal(section);
  });
});

modalClose.addEventListener('click', closeModal);
sectionModal.addEventListener('click', e => {
  if (e.target === sectionModal) closeModal();
});

/* ─────────────────────────────────────────────
   DAY 9: SCROLL REVEAL ANIMATIONS
───────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Animate skill bars when skills section enters view
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.classList.add('animate');
      });
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────────
   DAY 9: ZOOM-IN ARTICLE EFFECT
   Clicking an article col expands it slightly
───────────────────────────────────────────── */
document.querySelectorAll('.col').forEach(col => {
  col.addEventListener('click', function(e) {
    // Don't trigger if clicking a button inside
    if (e.target.closest('button, a')) return;
    const wasZoomed = this.classList.contains('zoomed');
    // Close any other zoomed col
    document.querySelectorAll('.col.zoomed').forEach(c => {
      c.classList.remove('zoomed');
      c.style.transform = '';
      c.style.zIndex = '';
      c.style.boxShadow = '';
    });
    if (!wasZoomed) {
      this.classList.add('zoomed');
      this.style.transform = 'scale(1.018)';
      this.style.zIndex = '50';
      this.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)';
    }
  });
});

// Close zoomed col on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.col')) {
    document.querySelectorAll('.col.zoomed').forEach(c => {
      c.classList.remove('zoomed');
      c.style.transform = '';
      c.style.zIndex = '';
      c.style.boxShadow = '';
    });
  }
});
