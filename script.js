/* ============================================
   AMRIT PATRO — DevSecOps Portfolio
   Interactive Logic + Data-Driven Rendering
   ============================================ */

(function () {
  'use strict';

  /* ============================================
     CERTIFICATE DATA
     ============================================
     To add a new certificate:
     1. Put the certificate image in ./assets/
     2. Add a new object below with these fields:
        - title   (required) — exact name from the certificate image
        - issuer  (required) — who issued it
        - date    (required) — display date, e.g. "Jun 2025"
        - image   (required) — relative path to the image
     ============================================ */
  var certificates = [
    {
      title: "Foundations of Cybersecurity",
      issuer: "Google · Coursera",
      date: "Jun 2025",
      image: "./assets/Foundation of cybersecurity certificate.jpg"
    },
    {
      title: "Play It Safe: Manage Security Risks",
      issuer: "Google · Coursera",
      date: "Jun 2025",
      image: "./assets/cybersecurity certificate.jpg"
    },
    {
      title: "Connect and Protect: Networks and Network Security",
      issuer: "Google · Coursera",
      date: "Aug 2025",
      image: "./assets/connect and protect certificate.jpg"
    },
    {
      title: "Web Development Internship — Prodigy InfoTech",
      issuer: "Prodigy InfoTech",
      date: "Feb 2025",
      image: "./assets/prodigy certificate.jpg"
    },
    {
      title: "Smart India Hackathon 2025 Internal Edition — Participant",
      issuer: "GITAM University",
      date: "Sep 2025",
      image: "./assets/SIH2025.jpg"
    },
    {
      title: "Full Ethical Hacking & Penetration Testing Course",
      issuer: "Udemy",
      date: "Apr 2026",
      image: "./assets/intership_certificate.jpg"
    },
    {
      title: "Learn Ethical Hacking / Pen Testing & Bug Bounty Hunting A:Z",
      issuer: "Udemy",
      date: "Apr 2026",
      image: "./assets/intership_certificate_1.jpg"
    }
  ];

  /* ============================================
     PROJECT DATA
     ============================================
     To add a new project:
     1. Add a new object below.
     Required fields:
       - title       — project name
       - badge       — short status label, e.g. "Shipped", "Prototype"
       - description — what it does
       - stack       — array of tech tags
     Optional fields (omit or set to "" to skip):
       - result      — measurable outcome
       - security    — security angle
       - limitation  — current limitation
       - nextUpgrade — planned improvement
       - github      — GitHub repo URL (omit to hide button)
       - liveDemo    — live demo URL (omit to hide button)
     ============================================ */
  var projects = [
    {
      title: "FitForge",
      badge: "Shipped",
      description: "Rule-based workout engine generating personalized weekly plans from 3 inputs — goal, equipment, and schedule. Zero-dependency offline-first app.",
      stack: ["JavaScript ES6+", "HTML5/CSS3", "GitHub Pages", "localStorage", "CI/CD"],
      result: "Sub-100ms plan generation. Fully client-side, zero-backend architecture.",
      security: "No backend attack surface. All data persisted in localStorage — zero data exfiltration risk.",
      limitation: "Rule-based logic only — no ML-driven personalization yet.",
      nextUpgrade: "ML-based adaptive difficulty. Progressive web app conversion.",
      github: "https://github.com/amritpatro/FitForge",
      liveDemo: "https://amritpatro.github.io/FitForge/"
    },
    {
      title: "NutriSnap",
      badge: "Shipped",
      description: "Meal-logging tool with hostel-menu parser mapping 50+ food items to nutritional data. Threshold-based macro alerts.",
      stack: ["JavaScript ES6+", "HTML5/CSS3", "sessionStorage"],
      result: "Near-zero lookup time. Flags deviations >15% from macro targets.",
      security: "No server-side credentials. All data scoped to sessionStorage — zero third-party exfiltration.",
      limitation: "Limited food database. No external API integration.",
      nextUpgrade: "Nutritional API integration. Encrypted user accounts.",
      github: "https://github.com/amritpatro/nutrisnap",
      liveDemo: "https://amritpatro.github.io/nutrisnap/"
    },
    {
      title: "EduQuest",
      badge: "SIH 2025",
      description: "AI-enabled education platform built in a 36-hour national-level hackathon sprint. 4-member team delivery.",
      stack: ["HTML5/CSS3/JS", "REST APIs", "JWT", "LLM API", "Git/GitHub", "Agile"],
      result: "40% reduction in data latency. Zero security issues at national evaluation.",
      security: "JWT authentication + OWASP Top 10 aligned APIs throughout.",
      limitation: "Hackathon prototype — needs production hardening and load testing.",
      nextUpgrade: "Production deployment. Load testing. Comprehensive security audit.",
      github: "https://github.com/amritpatro/EDUQUEST"
      // liveDemo omitted — no public demo available
    }
  ];

  /* ============================================
     RENDER: CERTIFICATES
     ============================================ */
  function renderCertificates() {
    var grid = document.getElementById('certsGrid');
    if (!grid) return;
    var html = '';
    certificates.forEach(function (cert, i) {
      html += '<div class="card cert-card" data-cert-index="' + i + '">'
        + '<div class="cert-img-wrap"><img src="' + cert.image + '" alt="' + escapeAttr(cert.title) + '" loading="lazy"></div>'
        + '<div class="cert-info">'
        + '<div class="cert-name">' + escapeHtml(cert.title) + '</div>'
        + '<div class="cert-issuer">' + escapeHtml(cert.issuer) + '</div>'
        + '<div class="cert-date">' + escapeHtml(cert.date) + '</div>'
        + '</div></div>';
    });
    grid.innerHTML = html;
  }

  /* ============================================
     RENDER: PROJECTS
     ============================================ */
  function renderProjects() {
    var grid = document.getElementById('projectsGrid');
    if (!grid) return;
    var html = '';
    projects.forEach(function (p) {
      html += '<div class="card casefile">';
      // Header
      html += '<div class="casefile-header"><div class="casefile-title">' + escapeHtml(p.title) + '</div>'
        + '<div class="casefile-badge">' + escapeHtml(p.badge) + '</div></div>';
      // Body
      html += '<div class="casefile-body">';
      html += field('What It Does', p.description);
      // Stack tags
      if (p.stack && p.stack.length) {
        html += '<div class="casefile-field"><div class="casefile-field-label">Stack</div>'
          + '<div class="casefile-stack">';
        p.stack.forEach(function (t) { html += '<span class="tag">' + escapeHtml(t) + '</span>'; });
        html += '</div></div>';
      }
      html += field('Result', p.result);
      html += field('Security Angle', p.security);
      html += field('Current Limitation', p.limitation);
      html += field('Next Upgrade', p.nextUpgrade);
      html += '</div>';
      // Action buttons — only rendered if links exist
      if (p.github || p.liveDemo) {
        html += '<div class="casefile-actions">';
        if (p.github) {
          html += '<a href="' + p.github + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">GitHub</a>';
        }
        if (p.liveDemo) {
          html += '<a href="' + p.liveDemo + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Demo \u2192</a>';
        }
        html += '</div>';
      }
      html += '</div>';
    });
    grid.innerHTML = html;
  }

  // Helper: render a single casefile field (skips if value is empty/missing)
  function field(label, value) {
    if (!value) return '';
    return '<div class="casefile-field"><div class="casefile-field-label">' + escapeHtml(label) + '</div>'
      + '<div class="casefile-field-value">' + escapeHtml(value) + '</div></div>';
  }

  // Minimal HTML/attribute escaping
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escapeAttr(str) {
    return escapeHtml(str);
  }

  /* ============================================
     RENDER ON LOAD
     ============================================ */
  renderCertificates();
  renderProjects();

  /* ============================================
     THEME TOGGLE
     ============================================ */
  var themeToggle = document.getElementById('themeToggle');
  var iconSun = document.getElementById('iconSun');
  var iconMoon = document.getElementById('iconMoon');
  var root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    } else {
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    }
  }

  var savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  setTheme(savedTheme);

  themeToggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ============================================
     MOBILE NAV
     ============================================ */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  /* ============================================
     SCROLL PROGRESS
     ============================================ */
  var scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* ============================================
     ACTIVE NAV LINK
     ============================================ */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  function updateActiveNav() {
    var scrollY = window.scrollY + 100;
    var currentId = '';
    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }

  /* ============================================
     FADE-UP ON SCROLL
     ============================================ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fadeElements = document.querySelectorAll('.fade-up');

  if (prefersReducedMotion) {
    fadeElements.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================
     PIPELINE ANIMATION
     ============================================ */
  var stages = document.querySelectorAll('.pipeline-stage');
  var connectors = document.querySelectorAll('.pipeline-connector');
  var pipelineRunning = false;

  function resetPipeline() {
    stages.forEach(function (s) { s.classList.remove('active'); });
    connectors.forEach(function (c) { c.classList.remove('active'); });
  }

  function runPipeline() {
    if (pipelineRunning) return;
    pipelineRunning = true;
    resetPipeline();

    var delay = 0;
    var stageDelay = 700;
    var connectorDelay = 400;

    stages.forEach(function (stage, i) {
      setTimeout(function () {
        stage.classList.add('active');
      }, delay);
      delay += stageDelay;

      if (i < connectors.length) {
        setTimeout(function () {
          connectors[i].classList.add('active');
        }, delay);
        delay += connectorDelay;
      }
    });

    setTimeout(function () {
      pipelineRunning = false;
      setTimeout(runPipeline, 2000);
    }, delay + 1000);
  }

  var pipelineEl = document.getElementById('pipeline');
  if (pipelineEl && !prefersReducedMotion) {
    var pipelineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runPipeline();
          pipelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    pipelineObserver.observe(pipelineEl);
  } else if (pipelineEl && prefersReducedMotion) {
    stages.forEach(function (s) { s.classList.add('active'); });
    connectors.forEach(function (c) { c.classList.add('active'); });
  }

  /* ============================================
     SCROLL EVENT
     ============================================ */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateScrollProgress();
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateScrollProgress();
  updateActiveNav();

  /* ============================================
     CERTIFICATE MODAL
     Both card and modal read from the same
     certificates[] array — zero desync possible.
     ============================================ */
  var certModal = document.getElementById('certModal');
  var certModalImg = document.getElementById('certModalImg');
  var certModalTitle = document.getElementById('certModalTitle');
  var certModalClose = document.getElementById('certModalClose');

  function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (certModal) {
    // Delegate click on dynamically rendered cert cards
    var certsGrid = document.getElementById('certsGrid');
    if (certsGrid) {
      certsGrid.addEventListener('click', function (e) {
        var card = e.target.closest('.cert-card');
        if (!card) return;
        var idx = parseInt(card.getAttribute('data-cert-index'), 10);
        var cert = certificates[idx];
        if (!cert) return;
        certModalImg.src = cert.image;
        certModalImg.alt = cert.title;
        certModalTitle.textContent = cert.title;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    certModalClose.addEventListener('click', closeCertModal);
    certModal.addEventListener('click', function (e) {
      if (e.target === certModal) closeCertModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && certModal.classList.contains('active')) closeCertModal();
    });
  }

})();
