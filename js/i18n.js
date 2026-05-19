// ── Bait Al-Shawaya Al-Yamani — i18n (AR / EN) ──────────────────────────────

window.currentLang = localStorage.getItem('bait_lang') || 'ar';

// ── Dish name translations ──────────────────────────────────────────────────
const DISH_EN = {
  'featured-1':'Bait Al-Shawaya Meal',
  'featured-2':'Half Chicken Combo with Mixed Rice',
  'grilled-1':'Whole Chicken with Shawarma Rice',
  'grilled-2':'Whole Chicken with Bukhari Rice',
  'grilled-3':'Whole Chicken with Mixed Rice',
  'grilled-4':'Half Chicken with Shawarma Rice',
  'grilled-5':'Half Chicken with Bukhari Rice',
  'grilled-6':'Half Chicken with Mixed Rice',
  'grilled-7':'Quarter Chicken (Breast) with Shawarma Rice',
  'grilled-8':'Quarter Chicken (Breast) with Bukhari Rice',
  'grilled-9':'Quarter Chicken (Breast) with Mixed Rice',
  'grilled-10':'Quarter Chicken (Thigh) with Shawarma Rice',
  'grilled-11':'Quarter Chicken (Thigh) with Bukhari Rice',
  'grilled-12':'Quarter Chicken (Thigh) with Mixed Rice',
  'grilled-13':'Plain Whole Chicken',
  'grilled-14':'Plain Half Chicken',
  'grilled-15':'Plain Quarter Chicken (Breast)',
  'grilled-16':'Plain Quarter Chicken (Thigh)',
  'grilled-17':'Shawarma Rice',
  'grilled-18':'Bukhari Rice',
  'grilled-19':'Mixed Oven Rice',
  'grilled-20':'Mulukhiyah',
  'sahawiq-1':'Green Sahawiq',
  'sahawiq-2':'Cheese Sahawiq',
  'sahawiq-3':'Red Sahawiq',
  'sahawiq-4':'Yogurt with Sahawiq',
  'salad-1':'Green Salad',
  'salad-2':'Lemon & Onion Salad',
  'salad-3':'Fruit Plate',
  'salad-4':'Sliced Salad',
  'salad-5':'Cucumber with Yogurt',
  'drinks-1':'Red Tea',
  'drinks-2':'Adeni Spiced Tea',
  'drinks-3':'Mineral Water',
  'drinks-4':'V Cola',
  'drinks-5':'Rive',
  'juice-1':'Plain Mango Juice',
  'juice-2':'Mango Milkshake',
  'juice-3':'Strawberry Juice (Large)',
  'juice-4':'Strawberry Milkshake (Large)',
  'juice-5':'Guava Milkshake (Large)',
  'juice-6':'Cantaloupe Juice (Large)',
  'juice-7':'Cantaloupe Milkshake (Large)',
  'juice-8':'Cocktail Juice (Large)',
  'juice-9':'Banana Milkshake (Large)',
  'juice-10':'Royal Fruit Mix (Large)',
  'juice-11':'Premium Mix (Large)',
  'juice-12':'Avocado Milkshake',
  'juice-13':'Avocado with Honey & Nuts',
  'juice-14':'Avocado Kiwi',
  'juice-15':'Avocado Strawberry',
  'juice-16':'Avocado Mango',
  'juice-17':'Touches Juice',
  'juice-18':'Mix Juice',
  'juice-19':'Bait Al-Shawaya Special Juice',
  'juice-20':'Apple Juice',
  'juice-21':'Lemon Milkshake',
  'juice-22':'Lemon Mint (Large)',
  'juice-23':'Squeezed Orange',
  'juice-24':'Orange Juice',
  'juice-25':'Orange & Carrot',
  'juice-26':'Yogurt Blended Juice',
  'dessert-1':'Kunafa',
  'dessert-2':'Nutella Kunafa',
  'sides-1':'Fresh Bread',
  'sides-2':'Plain Tahini',
  'sides-3':'Clotted Cream',
  'sides-4':'Ushaar',
  'sides-5':'Hummus',
  'sides-6':'Hot Sauce',
  'sides-7':'Tuna',
  'sides-8':'French Fries',
  'sides-9':'Garlic Sauce',
};

// ── helper: set text preserving SVG children ────────────────────────────────
function svgText(el, text) {
  if (!el) return;
  const svg = el.querySelector('svg');
  el.textContent = text;
  if (svg) el.prepend(svg);
}

// ── helper: safe single-element query ──────────────────────────────────────
function q(sel) { return document.querySelector(sel); }
function qa(sel) { return document.querySelectorAll(sel); }

// ── Main apply function ─────────────────────────────────────────────────────
function applyLang(lang) {
  window.currentLang = lang;
  const isEn = lang === 'en';
  const html = document.documentElement;
  html.lang   = lang;
  html.dir    = isEn ? 'ltr' : 'rtl';

  // Toggle button label
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = isEn ? 'عر' : 'EN';

  // ── Logo sub ──────────────────────────────────────────────────────────────
  qa('.logo-sub').forEach(el => {
    el.textContent = isEn ? 'From the Gulf to Egypt' : 'من الخليج إلى مصر';
  });

  // ── Nav links (desktop) ───────────────────────────────────────────────────
  const navEn = ['Home','Menu','Branches','About Us','Contact Us'];
  const navAr = ['الرئيسية','قائمة الطعام','فروعنا','من نحن','تواصل معنا'];
  qa('nav.nav a').forEach((a,i)=> { if(navEn[i]) a.textContent = isEn ? navEn[i] : navAr[i]; });

  // ── Mobile nav ────────────────────────────────────────────────────────────
  const mobEn = ['Home','Menu','Branches','About Us','Contact Us'];
  const mobAr = ['الرئيسية','قائمة الطعام','فروعنا','من نحن','تواصل معنا'];
  qa('.mobile-nav a').forEach((a,i)=> {
    if (i < mobEn.length) {
      a.textContent = isEn ? mobEn[i] : mobAr[i];
    } else {
      // Last item is the phone call link — translate prefix, keep number
      const num = a.textContent.replace(/^(اتصل|Call)[:\s:]+/,'').trim();
      a.textContent = isEn ? `Call: ${num}` : `اتصل: ${num}`;
    }
  });

  // ── Header "Order Now" button ─────────────────────────────────────────────
  const orderBtn = q('.header-cta a.btn-primary');
  if (orderBtn) orderBtn.textContent = isEn ? 'Order Now' : 'اطلب الآن';

  // ── Footer ───────────────────────────────────────────────────────────────
  qa('.footer-tagline').forEach(el => {
    el.textContent = isEn
      ? 'Authentic grilled chicken from the Arabian Gulf, served with passion every day in our Cairo & Giza branches.'
      : 'دجاج مشوي أصيل من الخليج العربي في فروعنا بالقاهرة والجيزة.';
  });
  const ftEn = ['Quick Links','Branches','Contact Us'];
  const ftAr = ['روابط سريعة','الفروع','تواصل معنا'];
  qa('.footer-title').forEach((el,i)=>{ if(ftEn[i]) el.textContent = isEn ? ftEn[i] : ftAr[i]; });
  qa('.footer-copyright').forEach(el=>{
    el.textContent = isEn
      ? '© 2025 Bait Al-Shawaya Al-Yamani · All Rights Reserved'
      : '© 2025 بيت الشواية اليمني · جميع الحقوق محفوظة';
  });
  const ftHours = q('.footer-contact-item:last-child span');
  if (ftHours) ftHours.textContent = isEn ? 'Daily: 11 AM – 2 AM' : 'يومياً: 11 ص – 2 ص';

  // Footer quick links
  const fLinks = qa('.footer-links');
  if (fLinks[0]) {
    const as = fLinks[0].querySelectorAll('a');
    const lEn = ['Home','Menu','Branches','About Us'];
    const lAr = ['الرئيسية','قائمة الطعام','فروعنا','من نحن'];
    as.forEach((a,i)=>{ if(lEn[i]) a.textContent = isEn ? lEn[i] : lAr[i]; });
  }
  if (fLinks[1]) {
    const as = fLinks[1].querySelectorAll('a');
    const bEn = ['Faisal Branch','Doqqi Branch','Mohandiseen Branch','Nasr City Branch','Agouza Branch','Ard El-Lewa Branch'];
    const bAr = ['فرع فيصل','فرع الدقي','فرع المهندسين','فرع مدينة نصر','فرع العجوزة','فرع أرض اللواء'];
    as.forEach((a,i)=>{ if(bEn[i]) a.textContent = isEn ? bEn[i] : bAr[i]; });
  }

  // ── Cart drawer ───────────────────────────────────────────────────────────
  const cartTitle = q('.cart-drawer-title');
  if (cartTitle) cartTitle.textContent = isEn ? 'Your Order' : 'سلة طلبك';
  const cartEmptyP = q('.cart-empty p');
  if (cartEmptyP) cartEmptyP.textContent = isEn ? 'Your cart is empty' : 'سلتك فارغة';
  const cartEmptySub = q('#cartEmpty span');
  if (cartEmptySub) cartEmptySub.textContent = isEn ? 'Select items from the menu above' : 'اختر أصنافك من القائمة أعلاه';
  const cartTotalLbl = q('.cart-total-row span:first-child');
  if (cartTotalLbl) cartTotalLbl.textContent = isEn ? 'Total' : 'الإجمالي';
  svgText(q('.cart-cod-note'), isEn ? ' Cash on delivery' : 'الدفع كاش عند التوصيل');
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.textContent = isEn ? 'Place Order' : 'إتمام الطلب';

  // ── Checkout modal ────────────────────────────────────────────────────────
  const coHead = q('.checkout-modal-head h3');
  if (coHead) coHead.textContent = isEn ? 'Confirm Order' : 'تأكيد الطلب';
  svgText(q('#checkoutBack'), isEn ? ' Back' : 'رجوع');

  const coTitles = qa('.co-section-title');
  if (coTitles[0]) coTitles[0].textContent = isEn ? 'Your Details' : 'بياناتك';
  if (coTitles[1]) coTitles[1].textContent = isEn ? 'Order Summary' : 'ملخص الطلب';

  // Form labels (use data-i18n-label attribute)
  qa('[data-i18n-label]').forEach(el => {
    const key = el.dataset.i18nLabel;
    const map = {
      name:    [isEn ? 'Name ' : 'الاسم ',    '<span class="co-required">*</span>'],
      phone:   [isEn ? 'Phone Number ' : 'رقم هاتفك ', isEn ? '<span class="co-required">*</span>' : '<span class="co-required">*</span>'],
      address: [isEn ? 'Delivery Address ' : 'عنوانك بالتفصيل ', isEn ? '<span class="co-required">*</span>' : '<span class="co-required">*</span>'],
      notes:   [isEn ? 'Notes ' : 'ملاحظات ',  isEn ? '<span class="co-optional">(optional)</span>' : '<span class="co-optional">(اختياري)</span>'],
    };
    if (map[key]) el.innerHTML = map[key][0] + map[key][1];
  });

  // Placeholders
  qa('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    const phMap = {
      name:    [isEn ? 'Your name' : 'اسمك'],
      address: [isEn ? 'Street name, building, floor, apartment...' : 'اسم الشارع، رقم العمارة، الدور، الشقة...'],
      notes:   [isEn ? 'Extra spices, no spicy...' : 'توابل أكتر، بدون حار...'],
    };
    if (phMap[key]) el.placeholder = phMap[key][0];
  });

  // Checkout summary/total labels
  const coTotalRows = qa('.co-total-row');
  if (coTotalRows[0]) {
    const s = coTotalRows[0].querySelector('span');
    if (s) s.textContent = isEn ? 'Items Total' : 'إجمالي الأصناف';
  }
  if (coTotalRows[1]) {
    const s = coTotalRows[1].querySelector('span:first-child');
    if (s) s.textContent = isEn ? 'Delivery Fee' : 'رسوم التوصيل';
    const note = coTotalRows[1].querySelector('.co-delivery-note');
    if (note) note.textContent = isEn ? 'Determined upon contact' : 'تُحدد عند التواصل';
  }
  svgText(q('.co-cod-badge'), isEn ? ' Cash on delivery' : 'الدفع كاش عند استلام الطلب');
  const coSubmit = document.getElementById('checkoutSubmit');
  if (coSubmit) coSubmit.textContent = isEn ? 'Place Order via WhatsApp' : 'إتمام الطلب';

  // ── Branch conflict modal ─────────────────────────────────────────────────
  // (dynamically created, handled in window.showBranchConflict via currentLang)

  // ── Page-specific ─────────────────────────────────────────────────────────
  applyHome(isEn);
  applyMenu(isEn);
  applyBranches(isEn);
  applyAbout(isEn);
  applyDishNames(lang);

  localStorage.setItem('bait_lang', lang);
}

function applyHome(isEn) {
  // Hero
  const heroBadge = q('.hero-badge');
  if (heroBadge) heroBadge.textContent = isEn ? 'Authentic from the Arabian Gulf' : 'الأصل من الخليج العربي';

  const heroTitle = q('.hero-title');
  if (heroTitle) heroTitle.innerHTML = isEn ? '<span>Bait Al-Shawaya</span><br>Al-Yamani' : '<span>بيت الشواية</span><br>اليمني';

  const heroSub = q('.hero-subtitle');
  if (heroSub) heroSub.textContent = isEn
    ? 'Authentic Grilled Chicken · Basmati Rice · Unforgettable Flavor'
    : 'دجاج مشوي أصيل · أرز بسمتي مع توابل الخليج · طعم لا يُنسى';

  const heroActions = qa('.hero-actions a');
  if (heroActions[0]) svgText(heroActions[0], isEn ? ' Menu' : ' قائمة الطعام');
  if (heroActions[1]) svgText(heroActions[1], isEn ? ' Branches' : ' فروعنا');

  // About section
  const aboutLabel = q('.about-label');
  if (aboutLabel) aboutLabel.textContent = isEn ? 'Our Story' : 'قصتنا';
  const aboutTitle = q('.about-title');
  if (aboutTitle) aboutTitle.innerHTML = isEn ? 'The Origin<br>From the Gulf to Egypt' : 'أصل الحكاية<br>من الخليج إلى مصر';
  const aboutBadge = q('.about-img-badge');
  if (aboutBadge) aboutBadge.innerHTML = isEn ? 'Best in<br>Yemeni Grilling' : 'الأفضل في<br>الشواية اليمنية';

  const aboutTexts = qa('.about-text');
  if (aboutTexts[0]) aboutTexts[0].textContent = isEn
    ? 'Bait Al-Shawaya Al-Yamani began with genuine passion and love for Yemeni grills combining the finest ingredients with the most authentic Gulf spices. We set out to bring Egypt a unique grilled chicken experience.'
    : 'بدأت حكاية بيت الشواية اليمني بشغف حقيقي وحب أصيل للمشويات اليمنية التي تجمع بين أجود الخامات وأعرق التوابل الخليجية. انطلقنا لنحضر إلى مصر تجربة فريدة من نوعها في عالم الدجاج المشوي.';
  if (aboutTexts[1]) aboutTexts[1].textContent = isEn
    ? 'Today our branches span Cairo and Giza, offering the most delicious meals at the highest quality and most competitive prices — every dish carries the taste of authenticity and the aroma of Yemeni spices.'
    : 'اليوم تنتشر فروعنا في أرجاء القاهرة والجيزة، لنقدم لكم أشهى الوجبات بأعلى جودة وأكثر الأسعار تنافسية – كل وجبة تحمل طعم الأصالة وعطر البهارات اليمنية.';

  const featTexts = [
    [isEn ? 'Fresh daily grilling' : 'شواية يومية طازجة'],
    [isEn ? 'Authentic Gulf spices' : 'توابل خليجية أصيلة'],
    [isEn ? 'Fast home delivery' : 'توصيل سريع لباب بيتك'],
    [isEn ? 'Excellent customer ratings' : 'تقييمات عملاء ممتازة'],
    [isEn ? 'Cash or card payment' : 'دفع كاش أو بطاقة'],
    [isEn ? 'Open until 2 AM' : 'مفتوح حتى الساعة 2 ص'],
  ];
  qa('.about-feature-text').forEach((el,i)=>{ if(featTexts[i]) el.textContent = featTexts[i][0]; });

  // Featured section
  const secLabels = qa('.section-label');
  if (secLabels[0]) secLabels[0].textContent = isEn ? 'Signature Dishes' : 'أشهر أطباقنا';

  const secTitles = qa('.section-title');
  if (secTitles[0]) secTitles[0].textContent = isEn ? 'Picks for Your Taste' : 'اختيارات على ذوقك';

  const secDescs = qa('.section-desc');
  if (secDescs[0]) secDescs[0].textContent = isEn
    ? 'From authentic grilled chicken with basmati rice to special meals — every dish tells a story worth tasting.'
    : 'من الدجاج المشوي الأصيل بالأرز البسمتي إلى الوجبات المميزة، كل طبق حكاية تستحق التذوق.';

  // Featured dish names (on index.html only)
  const featNames = qa('.featured-name');
  const featDescs = qa('.featured-desc');
  const featLinks = qa('.featured-link');
  const featPriceSmall = qa('.featured-price small');

  if (featNames[0]) featNames[0].textContent = isEn ? 'Whole Chicken with Bukhari Rice' : 'دجاجة كاملة مع أرز بخاري';
  if (featDescs[0]) featDescs[0].textContent = isEn
    ? 'Whole grilled chicken with golden basmati rice seasoned with the finest Gulf spices'
    : 'دجاجة مشوية كاملة مع أرز بسمتي أصفر متبل بأجود التوابل الخليجية';
  if (featNames[1]) featNames[1].textContent = isEn ? 'Bait Al-Shawaya Meal' : 'وجبة بيت الشواية';
  if (featDescs[1]) featDescs[1].textContent = isEn
    ? 'Special meal with chicken, bread, fries, hummus and garlic sauce'
    : 'وجبة مميزة من الدجاج مع الخبز والبطاطس المقلية والحمص وصوص الثومية';
  if (featNames[2]) featNames[2].textContent = isEn ? 'Half Chicken with Mixed Rice' : 'نص دجاجة مع أرز ميكس';
  if (featDescs[2]) featDescs[2].textContent = isEn
    ? 'Half grilled chicken with Gulf-style mixed rice'
    : 'نصف دجاجة مشوية مع أرز بسمتي مشكل بالتوابل الخليجية';

  featLinks.forEach(a => { if(a) a.textContent = isEn ? 'Order Now →' : 'اطلب الآن ←'; });
  featPriceSmall.forEach(s => { if(s) s.textContent = isEn ? 'EGP' : 'جنيه'; });

  const featTags = qa('.featured-tag');
  if (featTags[0]) featTags[0].textContent = isEn ? 'Best Seller' : 'الأكثر طلباً';
  if (featTags[1]) featTags[1].textContent = isEn ? 'Special Deal' : 'عرض خاص';
  if (featTags[2]) featTags[2].textContent = isEn ? 'Popular' : 'الأكثر طلباً';

  // Branches section label/title
  if (secLabels[1]) secLabels[1].textContent = isEn ? 'Our Branches' : 'فروعنا';
  if (secTitles[1]) secTitles[1].textContent = isEn ? 'Always Near You' : 'دايماً قريبين منك';

  // Branch action buttons
  qa('.branch-btn-call').forEach(a => {
    const svg = a.querySelector('svg'); a.textContent = isEn ? ' Call' : ' اتصل'; if(svg) a.prepend(svg);
  });
  qa('.branch-btn-map').forEach(a => {
    const svg = a.querySelector('svg'); a.textContent = isEn ? ' Location' : ' الموقع'; if(svg) a.prepend(svg);
  });
  qa('.branch-cta-btn').forEach(a => {
    if(a) a.textContent = isEn ? 'Order from this branch' : 'اطلب من هذا الفرع';
  });

  // Branch hours
  qa('.branch-info-row span').forEach(span => {
    if (span.textContent.includes('11 ص') || span.textContent.includes('11 AM')) {
      span.textContent = isEn ? 'Daily: 11 AM – 2 AM' : 'يومياً: 11 ص – 2 ص';
    }
  });

  // Social section
  const socialLabels = qa('.section-label');
  // handle the social section label separately:
  const allSectionLabels = qa('.section-label');
  allSectionLabels.forEach(el => {
    const t = el.textContent.trim();
    if (t === 'أشهر أطباقنا' || t === 'Signature Dishes') el.textContent = isEn ? 'Signature Dishes' : 'أشهر أطباقنا';
    if (t === 'فروعنا' || t === 'Our Branches') el.textContent = isEn ? 'Our Branches' : 'فروعنا';
    if (t === 'كن جزءاً من عائلتنا' || t === 'Join Our Family') el.textContent = isEn ? 'Join Our Family' : 'كن جزءاً من عائلتنا';
  });

  const sTitle = q('.social-section .section-title');
  if (sTitle) sTitle.textContent = isEn ? 'Be Part of Our Family' : 'كن جزءاً من عائلتنا';
  const sSub = q('.social-section .section-desc');
  if (sSub) sSub.textContent = isEn
    ? 'Follow us on social media and be the first to know about deals and news.'
    : 'تابعنا على منصات التواصل وكن أول من يعرف العروض والأخبار الجديدة.';

  const tileNames = qa('.social-tile-name');
  const tileHandles = qa('.social-tile-handle');
  const tileStats = qa('.social-tile-stat');
  const tileStatLabels = qa('.social-tile-stat-label');
  const tileBtns = qa('.social-tile-btn');

  // FB tile
  if (tileStatLabels[0]) tileStatLabels[0].textContent = isEn ? 'Followers' : 'متابع';
  if (tileBtns[0]) tileBtns[0].textContent = isEn ? 'Follow Now' : 'تابعنا الآن';
  // TK tile
  if (tileStats[1]) tileStats[1].textContent = isEn ? 'Latest Videos' : 'أحدث الفيديوهات';
  if (tileStatLabels[1]) tileStatLabels[1].textContent = isEn ? 'Watch Our Content' : 'شاهد محتوانا';
  if (tileBtns[1]) tileBtns[1].textContent = isEn ? 'Follow Now' : 'تابعنا الآن';
  // IG tile
  if (tileStats[2]) tileStats[2].textContent = isEn ? 'Photos & Videos' : 'صور وفيديوهات';
  if (tileStatLabels[2]) tileStatLabels[2].textContent = isEn ? 'Follow Us' : 'تابعنا';
  if (tileBtns[2]) tileBtns[2].textContent = isEn ? 'Follow Now' : 'تابعنا الآن';
  // WA tile
  if (tileStats[3]) tileStats[3].textContent = isEn ? 'Order or Inquire' : 'اطلب أو استفسر';
  if (tileStatLabels[3]) tileStatLabels[3].textContent = isEn ? 'Quick Reply' : 'ردّ سريع';
  if (tileBtns[3]) tileBtns[3].textContent = isEn ? 'Message Us' : 'راسلنا الآن';

  // CTA section
  const ctaTitle = q('.cta-title');
  if (ctaTitle) ctaTitle.innerHTML = isEn
    ? 'Ready to Experience<br>Authentic Flavor?'
    : 'جاهز لتجربة<br>الطعم الأصيل؟';
  const ctaSub = q('.cta-subtitle');
  if (ctaSub) ctaSub.textContent = isEn
    ? 'Grilled with passion, spiced with care, served with a smile — every day without exception.'
    : 'شاوينا بشغف، بهارنا باتقان، وقدمنا بابتسامة – كل يوم بدون استثناء.';
  const ctaBtns = qa('.cta-actions a');
  if (ctaBtns[0]) ctaBtns[0].textContent = isEn ? 'View Menu' : 'شوف القائمة';
  if (ctaBtns[1]) ctaBtns[1].textContent = isEn ? 'Nearest Branch' : 'اقرب فرع ليك';

  // CTA social links
  const socialLinks = qa('.social-link');
  if (socialLinks[0]) { const s=socialLinks[0].querySelector('svg'); socialLinks[0].textContent=' Facebook'; if(s) socialLinks[0].prepend(s); }
  if (socialLinks[1]) { const s=socialLinks[1].querySelector('svg'); socialLinks[1].textContent=isEn?' TikTok':' تيك توك'; if(s) socialLinks[1].prepend(s); }
  if (socialLinks[2]) { const s=socialLinks[2].querySelector('svg'); socialLinks[2].textContent=isEn?' Instagram':' انستغرام'; if(s) socialLinks[2].prepend(s); }
}

function applyMenu(isEn) {
  // Page hero
  const heroTitle = q('.page-hero-title');
  if (heroTitle) heroTitle.textContent = isEn ? 'Our Menu' : 'قائمة الطعام';
  const heroSub = q('.page-hero-sub');
  if (heroSub) heroSub.textContent = isEn
    ? 'All dishes prepared daily with the finest ingredients and authentic spices'
    : 'كل الأطباق محضرة يومياً بأجود الخامات وأعرق التوابل';

  // Breadcrumb
  const bcLinks = qa('.breadcrumb a');
  if (bcLinks[0]) bcLinks[0].textContent = isEn ? 'Home' : 'الرئيسية';
  const bcSpans = qa('.breadcrumb span:not(:first-child)');
  if (bcSpans[0]) {
    const t = bcSpans[0].textContent;
    if (t === 'قائمة الطعام' || t === 'Our Menu') bcSpans[0].textContent = isEn ? 'Our Menu' : 'قائمة الطعام';
    if (t === 'فروعنا' || t === 'Branches') bcSpans[0].textContent = isEn ? 'Branches' : 'فروعنا';
    if (t === 'من نحن' || t === 'About Us') bcSpans[0].textContent = isEn ? 'About Us' : 'من نحن';
  }

  // Category tabs
  const catTabsEn = ['All','Deals','Grills','Sahawiq','Salads','Drinks','Juices','Desserts','Sides'];
  const catTabsAr = ['الكل','العروض','الشواية','سحاوق','السلطات','المشروبات','العصائر','حلوى','إضافات'];
  qa('.cat-tab').forEach((el,i)=>{ if(catTabsEn[i]) el.textContent = isEn ? catTabsEn[i] : catTabsAr[i]; });

  // Branch picker dropdown labels
  const bpdNames = qa('.bpd-name');
  const bpdAreas = qa('.bpd-area');
  const bnEn = ['Faisal Branch','Doqqi Branch','Mohandiseen Branch','Nasr City Branch','Agouza Branch','Ard El-Lewa Branch'];
  const bnAr = ['فرع فيصل','فرع الدقي','فرع المهندسين','فرع مدينة نصر','فرع العجوزة','فرع أرض اللواء'];
  const baEn = ['Faisal · Giza','Doqqi · Giza','Mohandiseen · Giza','Nasr City · Cairo','Agouza · Giza','Ard El-Lewa · Giza'];
  const baAr = ['فيصل · الجيزة','الدقي · الجيزة','المهندسين · الجيزة','مدينة نصر · القاهرة','العجوزة · الجيزة','أرض اللواء · الجيزة'];
  bpdNames.forEach((el,i)=>{ if(bnEn[i]) el.textContent = isEn ? bnEn[i] : bnAr[i]; });
  bpdAreas.forEach((el,i)=>{ if(baEn[i]) el.textContent = isEn ? baEn[i] : baAr[i]; });

  // No-price note
  const npNote = document.getElementById('noPriceNote');
  if (npNote) {
    const svg = npNote.querySelector('svg');
    npNote.textContent = isEn ? ' Prices for this branch will be added soon — menu available for browsing' : ' أسعار هذا الفرع ستُضاف قريباً — القائمة متاحة للاطلاع';
    if (svg) npNote.prepend(svg);
  }

  // Category section titles
  const catTitleMap = {
    'العروض والوجبات': 'Deals & Meals',
    'قسم الشواية': 'Grill Section',
    'سحاوق': 'Sahawiq',
    'قسم السلطات': 'Salads',
    'قسم المشروبات': 'Drinks',
    'قسم العصائر': 'Juices',
    'حلوى': 'Desserts',
    'إضافات وأخرى': 'Extras & Sides',
  };
  const catTitleMapEn = Object.fromEntries(Object.entries(catTitleMap).map(([k,v])=>[v,k]));
  qa('.cat-section-title').forEach(el => {
    const badge = el.querySelector('.cat-count');
    const badgeText = badge ? badge.textContent : '';
    const currentText = el.textContent.replace(badgeText,'').trim();
    const newText = isEn ? (catTitleMap[currentText] || currentText) : (catTitleMapEn[currentText] || currentText);
    el.textContent = newText;
    if (badge) {
      badge.textContent = badgeText;
      el.appendChild(badge);
    }
  });

  // Dish badges
  qa('.dish-badge').forEach(el => {
    const t = el.textContent.trim();
    if (t === 'عرض خاص' || t === 'Special Deal') el.textContent = isEn ? 'Special Deal' : 'عرض خاص';
    if (t === 'الأكثر طلباً' || t === 'Best Seller') el.textContent = isEn ? 'Best Seller' : 'الأكثر طلباً';
    if (t === 'قيمة رائعة' || t === 'Great Value') el.textContent = isEn ? 'Great Value' : 'قيمة رائعة';
  });

  // Currency small tags
  qa('.dish-price small').forEach(el => { el.textContent = isEn ? 'EGP' : 'جنيه'; });
  qa('.dish-price-old').forEach(el => {
    // Remove " جنيه" suffix if present
    el.textContent = el.textContent.replace(' جنيه','').replace(' EGP','');
    if (!isEn) el.textContent += ' جنيه';
  });
}

function applyBranches(isEn) {
  const ht = q('.page-hero-title');
  if (ht && (ht.textContent.includes('فروعنا') || ht.textContent.includes('Branches'))) {
    ht.textContent = isEn ? 'Our Branches in Egypt' : 'فروعنا في مصر';
  }
  const hs = q('.page-hero-sub');
  if (hs && (hs.textContent.includes('فروع') || hs.textContent.includes('branches'))) {
    hs.textContent = isEn ? '6 branches in Cairo & Giza — always close to you' : '6 فروع في القاهرة والجيزة — دايماً قريبين منك';
  }

  // Area filter buttons
  const filterBtns = qa('.area-filter-btn, [data-area-filter]');
  filterBtns.forEach(btn => {
    const v = btn.dataset.areaFilter || btn.dataset.area;
    if (v === 'all' || btn.textContent.includes('كل') || btn.textContent.includes('All')) {
      btn.textContent = isEn ? 'All Branches' : 'كل الفروع';
    } else if (v === 'giza' || btn.textContent.includes('الجيزة') || btn.textContent.includes('Giza')) {
      btn.textContent = isEn ? 'Giza' : 'الجيزة';
    } else if (v === 'cairo' || btn.textContent.includes('القاهرة') || btn.textContent.includes('Cairo')) {
      btn.textContent = isEn ? 'Cairo' : 'القاهرة';
    }
  });

  // Branch name strips / badges
  qa('.badge-main').forEach(el => { el.textContent = isEn ? 'Main Branch' : 'الفرع الرئيسي'; });

  // Branch hours in br-cards
  qa('.br-card .br-info span, .br-detail span').forEach(span => {
    if (span.textContent.includes('11 ص') || span.textContent.includes('11 AM')) {
      span.textContent = isEn ? 'Daily: 11 AM – 2 AM' : 'يومياً: 11 ص – 2 ص';
    }
  });

  // Action buttons
  qa('.br-actions .branch-btn-call, .branch-btn.branch-btn-call').forEach(a => {
    const s = a.querySelector('svg'); a.textContent = isEn ? ' Call' : ' اتصل'; if(s) a.prepend(s);
  });
  qa('.br-actions .branch-btn-map, .branch-btn.branch-btn-map').forEach(a => {
    const s = a.querySelector('svg'); a.textContent = isEn ? ' Map' : ' الموقع'; if(s) a.prepend(s);
  });
  qa('.br-actions .branch-btn-wa, .branch-btn.branch-btn-wa').forEach(a => {
    const s = a.querySelector('svg'); a.textContent = isEn ? ' WhatsApp' : ' واتساب'; if(s) a.prepend(s);
  });

  // CTA on branches page
  const ctaTitle = q('.cta-title');
  if (ctaTitle) ctaTitle.innerHTML = isEn ? "Can't Find Your Branch?" : 'مش لاقي فرعك؟';
  const ctaSub = q('.cta-subtitle');
  if (ctaSub) ctaSub.textContent = isEn
    ? 'Contact us directly and we\'ll help you find the nearest branch or arrange delivery to your door.'
    : 'كلمنا مباشرة وهنساعدك تلاقي أقرب فرع أو توصيل لبيتك.';
}

function applyAbout(isEn) {
  const ht = q('.page-hero-title');
  if (ht && (ht.textContent.includes('قصتنا') || ht.textContent.includes('Story'))) {
    ht.textContent = isEn ? 'Our Story' : 'قصتنا';
  }
  const hs = q('.page-hero-sub');
  if (hs && (hs.textContent.includes('يمني') || hs.textContent.includes('Yemeni'))) {
    hs.textContent = isEn ? 'Authentic Yemeni grills — from the Gulf to the heart of Egypt' : 'مشويات يمنية أصيلة — من الخليج إلى قلب مصر';
  }

  // About intro section
  const intros = qa('.about-intro-title');
  if (intros[0]) intros[0].innerHTML = isEn
    ? 'Bait Al-Shawaya Al-Yamani<br>The Origin of the Story'
    : 'بيت الشواية اليمني<br>أصل الحكاية';
  if (intros[1]) intros[1].innerHTML = isEn
    ? 'Our Journey from the Gulf<br>to Egypt'
    : 'رحلتنا من الخليج إلى مصر';

  const introBody = q('.about-intro-body');
  if (introBody) introBody.textContent = isEn
    ? 'Bait Al-Shawaya Al-Yamani is a restaurant chain specializing in Yemeni-style grilled chicken. Launched from the Arabian Gulf, carrying the most authentic grill recipes and finest spices to put Egypt on the map of authentic Gulf cuisine.'
    : 'بيت الشواية اليمني هي سلسلة مطاعم متخصصة في الدجاج المشوي بالطريقة اليمنية الأصيلة. انطلقت من الخليج العربي حاملةً معها أعرق وصفات الشواية وأجود التوابل لتضع مصر على خريطة الطعم الخليجي الحقيقي.';

  // Timeline section label
  const storyLabel = q('.story-section .section-label');
  if (storyLabel) storyLabel.textContent = isEn ? 'Our Story' : 'قصتنا';

  // Values
  qa('.value-title').forEach((el, i) => {
    const valEn = ['Authentic Flavor','Gulf Spices','Best Quality','Fast Delivery'];
    const valAr = ['طعم أصيل','توابل الخليج','أفضل جودة','توصيل سريع'];
    if (valEn[i]) el.textContent = isEn ? valEn[i] : valAr[i];
  });

  // Social cards
  const cardNames = qa('.social-card-name');
  const cardHandles = qa('.social-card-handle');
  const cardFollows = qa('.social-card-follow');
  if (cardFollows[0]) cardFollows[0].textContent = isEn ? 'Follow' : 'تابعنا';
  if (cardFollows[1]) cardFollows[1].textContent = isEn ? 'Follow' : 'تابعنا';
  if (cardFollows[2]) cardFollows[2].textContent = isEn ? 'Follow' : 'تابعنا';
  if (cardFollows[3]) cardFollows[3].textContent = isEn ? 'Message' : 'راسلنا';

  // Contact section
  const contactTitle = q('.contact-section .section-title, .contact-title');
  if (contactTitle) contactTitle.textContent = isEn ? 'Contact Us' : 'تواصل معنا';
}

function applyDishNames(lang) {
  const isEn = lang === 'en';
  document.querySelectorAll('.dish-card[data-id]').forEach(card => {
    const id = card.dataset.id;
    const nameEl = card.querySelector('.dish-name');
    if (!nameEl) return;
    if (isEn) {
      if (DISH_EN[id]) nameEl.textContent = DISH_EN[id];
    } else {
      if (card.dataset.name) nameEl.textContent = card.dataset.name;
    }
  });
}

// ── Toggle function (called by button) ─────────────────────────────────────
window.toggleLang = function() {
  applyLang(window.currentLang === 'ar' ? 'en' : 'ar');
};

// ── Init on DOM ready ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyLang(window.currentLang);
});
