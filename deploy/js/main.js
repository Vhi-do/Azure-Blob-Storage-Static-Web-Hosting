/* ============================================================
   DAVID OLOFINTILA – Portfolio JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Utility: run after DOM ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initMobileNav();
    initReveal();
    initSkillBars();
    initLightbox();
    initBackToTop();
    initContactForm();
    initTypingEffect();
    initActiveNav();
  });

  /* ============================================================
     NAVIGATION – scrolled state
     ============================================================ */
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link on scroll ── */
  function initActiveNav() {
    var links = document.querySelectorAll('.nav__links a[href^="#"]');
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });

    function onScroll() {
      var scrollY = window.scrollY + 120;
      sections.forEach(function (item) {
        var top = item.section.offsetTop;
        var bottom = top + item.section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          links.forEach(function (l) { l.classList.remove('active'); });
          item.link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ============================================================
     MOBILE NAV
     ============================================================ */
  function initMobileNav() {
    var hamburger = document.querySelector('.nav__hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    var closeBtn  = document.querySelector('.mobile-nav__close');
    var mobileLinks = document.querySelectorAll('.mobile-nav a');
    if (!hamburger || !mobileNav) return;

    function openMenu() {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ============================================================
     INTERSECTION OBSERVER – reveal + stagger + skill bars
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll('.reveal, .stagger');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     SKILL BARS – animate width when visible
     ============================================================ */
  function initSkillBars() {
    var fills = document.querySelectorAll('.skill-bar__fill');
    if (!fills.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fill = entry.target;
          var pct  = fill.getAttribute('data-pct') || '0';
          // Small delay so CSS transition fires after paint
          setTimeout(function () {
            fill.style.width = pct + '%';
          }, 120);
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });

    fills.forEach(function (fill) { observer.observe(fill); });
  }

  /* ============================================================
     LIGHTBOX – for awards / certs
     ============================================================ */
  function initLightbox() {
    var lightbox   = document.getElementById('lightbox');
    var lightImg   = document.getElementById('lightbox-img');
    var closeBtn   = document.querySelector('.lightbox__close');
    if (!lightbox || !lightImg) return;

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-lightbox]');
      if (trigger) {
        var src = trigger.getAttribute('data-lightbox');
        lightImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightImg.src = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  function initBackToTop() {
    var btn = document.querySelector('.btt');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     CONTACT FORM – client-side feedback
     ============================================================ */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var btn    = form.querySelector('.form-submit-btn');
    var status = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {

      // Basic validation
      var name    = form.querySelector('#name').value.trim();
      var email   = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate send (replace with real endpoint / EmailJS / Formspree)
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(function () {
        showStatus('Message received! David will get back to you shortly.', 'success');
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }, 1400);
    });

    function showStatus(msg, type) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status form-status--' + type;
      status.style.display = 'block';
      setTimeout(function () { status.style.display = 'none'; }, 5000);
    }
  }

  /* ============================================================
     TYPING EFFECT – hero subtitle
     ============================================================ */
  function initTypingEffect() {
    var target = document.getElementById('typed-roles');
    if (!target) return;

    var roles = [
      'Cloud Computing Enthusiast',
      'Computer & Robotics Educator',
      'Student Leader & Innovator',
      'IoT & Embedded Systems Learner',
      'Capacity Development Facilitator'
    ];

    var roleIdx  = 0;
    var charIdx  = 0;
    var deleting = false;
    var PAUSE_END   = 2200;
    var PAUSE_START = 400;
    var TYPE_SPEED  = 55;
    var DEL_SPEED   = 28;

    function tick() {
      var current = roles[roleIdx];
      if (deleting) {
        charIdx--;
        target.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx  = (roleIdx + 1) % roles.length;
          setTimeout(tick, PAUSE_START);
          return;
        }
        setTimeout(tick, DEL_SPEED);
      } else {
        charIdx++;
        target.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(tick, PAUSE_END);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      }
    }

    tick();
  }

  /* ============================================================
     SMOOTH SCROLL for all anchor links
     ============================================================ */
  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    var id = anchor.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    var offset = 72;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });

})();
