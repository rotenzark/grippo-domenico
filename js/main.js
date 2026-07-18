/* Grippo Domenico — main.js
   PLUMBING_V 1 (fix FOUC: watchdog solo fallback se GSAP manca).
   Barbiere: mar-ven spezzato, sab spezzato, dom+lun chiuso.
   Gesto-firma: «senza appuntamento, da una vita» + count-up fedeltà.
   GSAP SUBITO; reveal once. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'grippo-domenico',
    hours: {
      0: [],
      1: [],
      2: [['08:00', '12:30'], ['14:00', '19:30']],
      3: [['08:00', '12:30'], ['14:00', '19:30']],
      4: [['08:00', '12:30'], ['14:00', '19:30']],
      5: [['08:00', '12:30'], ['14:00', '19:30']],
      6: [['08:00', '12:30'], ['14:00', '19:00']],
    },
    hoursStatusIds: ['orarioStato', 'orarioStato2'],
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    inViewClass: 'in-view',
    breakpointMenu: 920,
    EN: {
      'nav.senza': 'No booking', 'nav.vita': 'For a lifetime', 'nav.servizio': 'The service', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.rec': '45 reviews',
      'hero.kicker': 'The barber of Corso Vercelli',
      'hero.sub': 'No appointment, <strong>for a lifetime</strong>. You sit down, you don’t have to say a thing — he does it all. A classic or a modern cut, just like it used to be.',
      'hero.cta1': 'Call: 02 469 4668', 'hero.cta2': 'Where we are',
      'sap.kicker': 'Just like it used to be', 'sap.t1': 'No bookings.', 'sap.t2': 'You sit down, he does the rest',
      'sap.p1': 'At Mimmo’s you don’t need a diary: <strong>you walk in, sit down, wait your turn</strong>. And you don’t even have to say what you want — he already knows. It’s always busy, and there’s a reason.',
      'sap.q': '«I sit down and don’t have to say a word: he does it all, and I’m always happy with it.»',
      'vita.kicker': 'Loyalty', 'vita.t1': 'Some have come back', 'vita.t2': 'for a lifetime',
      'vita.p1': '«I’ve gone to Mimmo for twenty years, he’s never got a cut wrong.» Some say it after ten years, some after thirty. A <strong>heritage of the Italian school of barbers</strong>.',
      'vita.anni': 'years', 'vita.cap': '…that customers keep coming back to Mimmo.',
      'serv.kicker': 'The service', 'serv.t1': 'Cut, beard,', 'serv.t2': 'and the little ones',
      'serv.p1': 'A <strong>classic and modern</strong> cut, the beard, the shampoo. And children: Mimmo is «a magician with the little ones» — there’s even a child’s seat. Punctual, clean, easy-going.',
      'serv.c1t': 'Men’s cut', 'serv.c1d': 'Classic or modern, done to suit you with no need to explain.',
      'serv.c2t': 'Beard & shampoo', 'serv.c2d': 'The full grooming, with the hand of someone who’s done it for a lifetime.',
      'serv.c3t': 'Children', 'serv.c3d': 'The child’s seat and the right patience: a magician with the little ones.',
      'serv.prezzo': 'Shampoo and cut', 'serv.note': '— prices like they used to be',
      'bot.kicker': 'The shop', 'bot.t1': 'The room', 'bot.t2': 'as it was',
      'bot.p1': 'The chairs in a row, the big mirrors, the certificates on the wall and the photos of always. A barber on the corner of Corso Vercelli who never wanted to change — because this is just right, this is how people like it.',
      'gal.kicker': 'The barbershop', 'gal.t1': 'A look', 'gal.t2': 'inside',
      'rec.kicker': 'What people say', 'rec.t2': 'from 45 Google reviews',
      'rec.r1': '«I’ve gone to Mimmo for twenty years: he’s never got a cut wrong. Great warmth and skill, a heritage of the Italian school of barbers.»',
      'rec.r2': '«No booking, classic and modern cuts. I’ve gone for ten years: I sit down, don’t have to say a word, he does it all and I’m always happy.»',
      'rec.r3': '«Mimmo is good and friendly. No booking, always busy. Twenty euros shampoo and cut: excellent value.»',
      'rec.r4': '«A great barber like they used to be, super punctual — and a magician with children. Highly recommended!»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On the corner', 'dove.t2': 'of Corso Vercelli',
      'dove.metro': 'Via Paolo Giovio 8, 20144 Milan · on the corner of Corso Vercelli, between De Angeli and Conciliazione.',
      'dove.chiama': 'Call 02 469 4668', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'Do I need an appointment?', 'faq.a1': 'No: at Mimmo’s you walk in without booking. You sit down, wait your turn and he does it all. It’s always busy, but it’s worth the wait.',
      'faq.q2': 'What cuts do you do?', 'faq.a2': 'Classic and modern cuts, the beard, the shampoo. And children: Mimmo is a magician with the little ones. All just like it used to be.',
      'faq.q3': 'How much is it?', 'faq.a3': 'Prices like they used to be: twenty euros for shampoo and cut. Value that customers have been mentioning for years.',
      'faq.q4': 'When are you open?', 'faq.a4': 'Tuesday to Friday 8:00am–12:30pm and 2:00–7:30pm; Saturday 8:00am–12:30pm and 2:00–7:00pm. Closed Sunday and Monday.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Paolo Giovio 8, on the corner of Corso Vercelli in Milan. Phone 02 469 4668.',
      'foot.dove': 'Via Paolo Giovio 8, 20144 Milan · <a href="tel:+39024694668">02 469 4668</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; el.style.transform = 'none'; });
  }
  /* FIX FOUC: il watchdog è SOLO un fallback se GSAP non è disponibile (o reduced-motion).
     Quando GSAP anima, NON forziamo l'opacità in anticipo → niente flash sugli scroll-trigger. */
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1400);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  } else {
    showAllReveals();
  }

  /* count-up anni fedeltà */
  var counts = document.querySelectorAll('.count');
  if (counts.length) {
    counts.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (!hasST || reducedMotion) { el.textContent = target; return; }
      var obj = { v: 0 };
      gsap.to(obj, { v: target, duration: 1.2, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: function () { el.textContent = Math.round(obj.v); } });
    });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero__badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .to('.hero__kicker', { opacity: 1, y: 0, duration: .5 }, .15)
      .fromTo('.hero__title', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .8 }, .25)
      .to('.hero__sub', { opacity: 1, y: 0, duration: .6 }, .55)
      .to('.tuner', { opacity: 1, y: 0, duration: .5 }, .7)
      .to('.hero__cta', { opacity: 1, y: 0, duration: .6 }, .8);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 650); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = ((m % 1440) + 1440) % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    SITE.hoursStatusIds.forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = txt; });
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<em>/<a>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
