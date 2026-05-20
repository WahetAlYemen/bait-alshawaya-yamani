document.addEventListener('DOMContentLoaded', () => {

    // ── Sticky Header ──
    const header = document.querySelector('.header');
    if (header) {
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ── Mobile Menu ──
    const toggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (toggle && mobileNav) {
        toggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
        document.addEventListener('click', e => {
            if (!header.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // ── Active Nav Link ──
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a, .mobile-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ── Menu Category Filter + Scroll ──
    const catTabs = document.querySelectorAll('.cat-tab');
    const catBlocks = document.querySelectorAll('.menu-category-block');
    if (catTabs.length && catBlocks.length) {
        catTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                catTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const sel = tab.dataset.cat;
                catBlocks.forEach(block => {
                    block.classList.toggle('hidden', sel !== 'all' && block.dataset.cat !== sel);
                });
                if (sel !== 'all') {
                    const target = document.querySelector(`.menu-category-block[data-cat="${sel}"]`);
                    if (target) {
                        const headerH = document.getElementById('header')?.offsetHeight || 76;
                        const navBarH = document.getElementById('menuNavBar')?.offsetHeight || 54;
                        const top = target.getBoundingClientRect().top + window.scrollY - headerH - navBarH - 20;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // ── Branch Picker Dropdown ──
    const branchPicker = document.getElementById('branchPicker');
    const branchPickerBtn = document.getElementById('branchPickerBtn');
    if (branchPicker && branchPickerBtn) {
        branchPickerBtn.addEventListener('click', e => {
            e.stopPropagation();
            branchPicker.classList.toggle('open');
        });
        document.addEventListener('click', () => branchPicker.classList.remove('open'));
    }

    // ── Branch Slideshow ──
    document.querySelectorAll('.branch-slideshow').forEach((sw, swIndex) => {
        const slides = sw.querySelectorAll('.branch-slide');
        const dots   = sw.querySelectorAll('.sw-dot');
        if (slides.length < 2) return;
        let current = 0;
        function goTo(idx) {
            slides[current].classList.remove('active');
            dots[current]?.classList.remove('active');
            current = idx;
            slides[current].classList.add('active');
            dots[current]?.classList.add('active');
        }
        slides[0].classList.add('active');
        dots[0]?.classList.add('active');
        // Stagger each slideshow by 900ms so none are in sync
        setTimeout(() => {
            setInterval(() => goTo((current + 1) % slides.length), 2800);
        }, swIndex * 900);
        dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    });

    // ── Scroll Reveal ──
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => obs.observe(el));
    }

    // ── Smooth Scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = (header ? header.offsetHeight : 0) + 16;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
            }
        });
    });

    // ── Cart System ──
    const CART_KEY = 'bait_shawaya_cart';
    const CART_BRANCH_KEY = 'bait_cart_branch';
    const UPSELL_ITEMS = [
        { id: 'upsell-water',   name: 'مياه معدنية',   price: 10 },
        { id: 'upsell-juice',   name: 'عصير طازج',     price: 35 },
        { id: 'upsell-salad',   name: 'سلطة خضراء',    price: 35 },
        { id: 'upsell-bread',   name: 'خبز + صلصة',    price: 20 },
        { id: 'upsell-sahawiq', name: 'سحاوق يمني',    price: 30 },
    ];
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e) { cart = []; }

    function saveCart() {
        try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch(e) {}
    }

    function cartItemCount() {
        return cart.reduce((s, i) => s + i.qty, 0);
    }

    function cartTotal() {
        return cart.reduce((s, i) => s + i.qty * i.price, 0);
    }

    function updateCartBadge() {
        const total = cartItemCount();
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = total;
            el.classList.toggle('show', total > 0);
        });
    }

    function renderUpsell() {
        const el = document.getElementById('cartUpsell');
        if (!el) return;
        if (cart.length === 0) { el.hidden = true; return; }
        const available = UPSELL_ITEMS.filter(u => !cart.find(i => i.id === u.id));
        if (available.length === 0) { el.hidden = true; return; }
        el.hidden = false;
        el.innerHTML = `
            <div class="cart-upsell-title">إضافات سريعة</div>
            <div class="cart-upsell-chips">
                ${available.slice(0, 4).map(item => `
                    <button class="upsell-chip" onclick="addUpsell('${item.id}')">
                        <span class="upsell-chip-add">+</span>
                        <span class="upsell-chip-name">${item.name}</span>
                        <span class="upsell-chip-price">${item.price} ج</span>
                    </button>
                `).join('')}
            </div>`;
    }

    window.addUpsell = function(id) {
        const item = UPSELL_ITEMS.find(u => u.id === id);
        if (!item) return;
        const curBranch = sessionStorage.getItem(BRANCH_KEY);
        if (curBranch) localStorage.setItem(CART_BRANCH_KEY, curBranch);
        const existing = cart.find(i => i.id === id);
        if (existing) { existing.qty++; } else { cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 }); }
        saveCart();
        updateCartBadge();
        renderCartItems();
    };

    // Add to cart — called from onclick in HTML
    // ── Branch conflict modal ──
    function injectBranchConflictModal() {
        if (document.getElementById('bcmOverlay')) return;
        const el = document.createElement('div');
        el.innerHTML = `
        <div class="bcm-overlay" id="bcmOverlay">
            <div class="bcm-box">
                <div class="bcm-icon">⚠️</div>
                <div class="bcm-title">تعارض الفروع</div>
                <div class="bcm-msg" id="bcmMsg"></div>
                <div class="bcm-actions">
                    <button class="bcm-btn bcm-btn-transfer" id="bcmTransfer"></button>
                    <button class="bcm-btn bcm-btn-new" id="bcmNew">بدء طلب جديد من الفرع الجديد</button>
                    <button class="bcm-btn bcm-btn-cancel" id="bcmCancel">إلغاء</button>
                </div>
            </div>
        </div>`;
        document.body.appendChild(el.firstElementChild);
    }

    function showBranchConflict(curBranch, cartBranch, callback) {
        injectBranchConflictModal();
        const curName  = (BRANCHES[curBranch])  ? BRANCHES[curBranch].name  : 'الفرع الجديد';
        const prevName = (BRANCHES[cartBranch]) ? BRANCHES[cartBranch].name : 'الفرع السابق';
        document.getElementById('bcmMsg').innerHTML =
            `سلتك تحتوي طلباً من <strong>${prevName}</strong>، وأنت تضيف من <strong>${curName}</strong>.`;
        document.getElementById('bcmTransfer').textContent = `نقل السلة إلى ${curName}`;

        const overlay = document.getElementById('bcmOverlay');
        overlay.classList.add('show');

        let resolved = false;
        function close(choice) {
            if (resolved) return;
            resolved = true;
            overlay.classList.remove('show');
            callback(choice);
        }
        document.getElementById('bcmTransfer').onclick = () => close('transfer');
        document.getElementById('bcmNew').onclick      = () => close('new');
        document.getElementById('bcmCancel').onclick   = () => close('cancel');
        overlay.onclick = e => { if (e.target === overlay) close('cancel'); };
    }

    function doAddToCart(id, name, price, btn, curBranch) {
        if (curBranch) localStorage.setItem(CART_BRANCH_KEY, curBranch);
        const existing = cart.find(i => i.id === id);
        if (existing) { existing.qty++; } else { cart.push({ id, name, price, qty: 1 }); }
        saveCart();
        updateCartBadge();
        showAddFeedback(btn);
        bumpCartIcon();
        showAddToast();
    }

    function bumpCartIcon() {
        const cartBtn = document.getElementById('cartBtn');
        if (!cartBtn) return;
        cartBtn.classList.remove('bump');
        void cartBtn.offsetWidth;
        cartBtn.classList.add('bump');
        cartBtn.addEventListener('animationend', () => cartBtn.classList.remove('bump'), { once: true });
    }

    let _toastTimer;
    function showAddToast() {
        let toast = document.getElementById('addToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'addToast';
            toast.className = 'add-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = window.currentLang === 'en' ? '✓  Added to cart' : '✓  أُضيف إلى السلة';
        clearTimeout(_toastTimer);
        toast.classList.remove('show');
        void toast.offsetWidth;
        toast.classList.add('show');
        _toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
    }

    window.addToCart = function(btn) {
        const card = btn.closest('.dish-card');
        if (!card) return;
        const id    = card.dataset.id;
        const name  = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        if (!id || !name || isNaN(price)) return;

        const curBranch  = sessionStorage.getItem(BRANCH_KEY);
        const cartBranch = localStorage.getItem(CART_BRANCH_KEY);

        if (cart.length > 0 && cartBranch && curBranch && cartBranch !== curBranch) {
            showBranchConflict(curBranch, cartBranch, function(choice) {
                if (choice === 'transfer') {
                    // Keep cart items, re-brand to new branch
                    doAddToCart(id, name, price, btn, curBranch);
                } else if (choice === 'new') {
                    // Clear cart, start fresh from new branch
                    cart = [];
                    saveCart();
                    doAddToCart(id, name, price, btn, curBranch);
                }
                // 'cancel' → do nothing
            });
            return;
        }

        doAddToCart(id, name, price, btn, curBranch);
    };

    function showAddFeedback(btn) {
        const orig = btn.textContent;
        btn.textContent = '✓';
        btn.style.background = '#22c55e';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 900);
    }

    window.updateQty = function(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) { cart = cart.filter(i => i.id !== id); }
        if (cart.length === 0) localStorage.removeItem(CART_BRANCH_KEY);
        saveCart();
        updateCartBadge();
        renderCartItems();
    };

    window.removeFromCart = function(id) {
        cart = cart.filter(i => i.id !== id);
        if (cart.length === 0) localStorage.removeItem(CART_BRANCH_KEY);
        saveCart();
        updateCartBadge();
        renderCartItems();
    };

    function updateCartBranchBar() {
        const bar = document.getElementById('cartBranchBar');
        if (!bar) return;
        const branchId = localStorage.getItem(CART_BRANCH_KEY);
        if (branchId && typeof BRANCHES !== 'undefined' && BRANCHES[branchId] && cart.length > 0) {
            bar.hidden = false;
            const nameEl = bar.querySelector('.cart-branch-name');
            if (nameEl) nameEl.textContent = BRANCHES[branchId].name;
        } else {
            bar.hidden = true;
        }
    }

    function renderCartItems() {
        const list   = document.getElementById('cartItemsList');
        const empty  = document.getElementById('cartEmpty');
        const footer = document.getElementById('cartFooter');
        const totalEl = document.getElementById('cartTotalAmount');
        if (!list) return;

        updateCartBranchBar();

        if (cart.length === 0) {
            list.innerHTML = '';
            empty?.classList.remove('hidden');
            footer?.classList.add('hidden');
        } else {
            empty?.classList.add('hidden');
            footer?.classList.remove('hidden');
            list.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${(item.qty * item.price).toFixed(0)} جنيه</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="updateQty('${item.id}',-1)">−</button>
                        <span class="cart-qty-val">${item.qty}</span>
                        <button class="cart-qty-btn" onclick="updateQty('${item.id}',1)">+</button>
                    </div>
                </div>
            `).join('');
            if (totalEl) totalEl.textContent = cartTotal().toFixed(0) + ' جنيه';
        }
        renderUpsell();
    }

    // Cart drawer open/close
    window.openCart = function() {
        document.getElementById('cartDrawer')?.classList.add('open');
        document.getElementById('cartOverlay')?.classList.add('show');
        document.body.style.overflow = 'hidden';
        renderCartItems();
    };

    window.closeCart = function() {
        document.getElementById('cartDrawer')?.classList.remove('open');
        document.getElementById('cartOverlay')?.classList.remove('show');
        document.body.style.overflow = '';
    };

    // Checkout modal open/close
    window.openCheckout = function() {
        if (cart.length === 0) return;
        closeCart();
        renderCheckoutSummary();
        document.getElementById('checkoutModal')?.classList.add('open');
        document.getElementById('checkoutOverlay')?.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeCheckout = function() {
        document.getElementById('checkoutModal')?.classList.remove('open');
        document.getElementById('checkoutOverlay')?.classList.remove('show');
        document.body.style.overflow = '';
    };

    function renderCheckoutSummary() {
        const summaryEl = document.getElementById('checkoutSummary');
        const totalEl   = document.getElementById('checkoutTotal');
        if (summaryEl) {
            summaryEl.innerHTML = cart.map(item => `
                <div class="co-item">
                    <span>${item.qty}× ${item.name}</span>
                    <span>${(item.qty * item.price).toFixed(0)} جنيه</span>
                </div>
            `).join('');
        }
        if (totalEl) totalEl.textContent = cartTotal().toFixed(0) + ' جنيه';
    }

    function showOrderSuccess(orderNum) {
        const isAr = window.currentLang !== 'en';
        let overlay = document.getElementById('orderSuccessOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'orderSuccessOverlay';
            overlay.className = 'order-success-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = `
            <div class="order-success-box">
                <div class="order-success-icon">✅</div>
                <h2 class="order-success-title">${isAr ? 'تم إرسال طلبك!' : 'Order Sent!'}</h2>
                <div class="order-success-num">
                    ${isAr ? 'رقم طلبك' : 'Order Number'}
                    <strong>#${orderNum}</strong>
                </div>
                <p class="order-success-msg">${isAr ? 'سيتم التواصل معك قريباً لتأكيد طلبك وتحديد موعد التوصيل' : 'We will contact you shortly to confirm your order and arrange delivery'}</p>
                <button class="btn btn-primary order-success-close" onclick="document.getElementById('orderSuccessOverlay').classList.remove('show')">${isAr ? 'حسناً' : 'OK'}</button>
            </div>
        `;
        overlay.classList.add('show');
        overlay.onclick = e => { if (e.target === overlay) overlay.classList.remove('show'); };
    }

    window.submitOrder = async function() {
        const isAr    = window.currentLang !== 'en';
        const name    = document.getElementById('custName')?.value.trim();
        const phone   = document.getElementById('custPhone')?.value.trim();
        const address = document.getElementById('custAddress')?.value.trim();
        if (!name)    { alert(isAr ? 'من فضلك أدخل اسمك' : 'Please enter your name'); return; }
        if (!phone)   { alert(isAr ? 'من فضلك أدخل رقم هاتفك' : 'Please enter your phone number'); return; }
        if (!address) { alert(isAr ? 'من فضلك أدخل عنوانك' : 'Please enter your delivery address'); return; }
        if (cart.length === 0) { alert(isAr ? 'السلة فارغة' : 'Your cart is empty'); return; }
        const notes    = document.getElementById('custNotes')?.value.trim() || '';
        const cartBrId = localStorage.getItem(CART_BRANCH_KEY) || sessionStorage.getItem(BRANCH_KEY) || '';
        const branch   = BRANCHES[cartBrId]?.name || 'لم يحدد';

        const TG_BOT  = '8945375110:AAGfLSgrsTRo5rhPnoQpV2p4AyyS4jJCMgs';
        const TG_CHAT = '-1003531365639';
        const ORDER_BASE = 9019;

        const btn = document.getElementById('checkoutSubmit');
        const originalText = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري الإرسال...'; }

        try {
            // Step 1: Send placeholder to claim a message_id (global sequential counter)
            const res = await fetch(`https://api.telegram.org/bot${TG_BOT}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TG_CHAT, text: '⏳' })
            });
            if (!res.ok) throw new Error('Telegram API error');
            const tgData   = await res.json();
            const msgId    = tgData?.result?.message_id || 1;
            const orderNum = ORDER_BASE + msgId;

            // Step 2: Build full message with order number
            let lines = [
                `📦 *رقم الطلب: #${orderNum}*`,
                '',
                '🛵 *طلب جديد من الموقع*',
                `👤 الاسم: ${name}`,
                `📞 الهاتف: ${phone}`,
                `📍 العنوان: ${address}`,
                `🏪 الفرع: ${branch}`,
                '',
                '*🧾 الطلب:*'
            ];
            cart.forEach(i => lines.push(`  • ${i.qty}× ${i.name} — ${(i.qty * i.price).toFixed(0)} جنيه`));
            lines.push('', `💰 *الإجمالي: ${cartTotal().toFixed(0)} جنيه*`, '💵 الدفع: كاش عند التوصيل');
            if (notes) lines.push(`📝 ملاحظات: ${notes}`);
            const fullMsg = lines.join('\n');

            // Step 3: Edit placeholder with full order details
            try {
                await fetch(`https://api.telegram.org/bot${TG_BOT}/editMessageText`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: TG_CHAT, message_id: msgId, text: fullMsg, parse_mode: 'Markdown' })
                });
            } catch (e) {
                // Fallback: send as new message if edit fails
                await fetch(`https://api.telegram.org/bot${TG_BOT}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: TG_CHAT, text: fullMsg, parse_mode: 'Markdown' })
                });
            }

            // Step 4: Clear cart, close modals, show success
            cart = [];
            saveCart();
            updateCartBadge();
            closeCheckout();
            closeCart();
            if (btn) { btn.disabled = false; btn.textContent = originalText; }
            showOrderSuccess(orderNum);

        } catch (err) {
            if (btn) { btn.disabled = false; btn.textContent = originalText; }
            alert(isAr ? 'حدث خطأ أثناء إرسال الطلب. تحقق من اتصالك بالإنترنت وحاول مجدداً.' : 'An error occurred. Please check your connection and try again.');
        }
    };

    // Wire up static buttons
    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
    document.getElementById('checkoutBtn')?.addEventListener('click', openCheckout);
    document.getElementById('checkoutBack')?.addEventListener('click', () => { closeCheckout(); openCart(); });
    document.getElementById('checkoutClose')?.addEventListener('click', closeCheckout);
    document.getElementById('checkoutOverlay')?.addEventListener('click', closeCheckout);
    document.getElementById('checkoutSubmit')?.addEventListener('click', submitOrder);

    // ── Branch-specific Menu ──
    const BRANCH_KEY = 'bait_selected_branch';
    const BRANCHES = {
        faisal:      { name: 'فرع فيصل',        area: 'فيصل · الجيزة',        phone: '01115551189', hasPrices: true,  prices: {} },
        doqqi:       { name: 'فرع الدقي',         area: 'الدقي · الجيزة',        phone: '01153334389', hasPrices: false, prices: {} },
        mohandiseen: { name: 'فرع المهندسين',     area: 'المهندسين · الجيزة',    phone: '01110288823', hasPrices: false, prices: {} },
        nasr:        { name: 'فرع مدينة نصر',    area: 'مدينة نصر · القاهرة',  phone: '01222606500', hasPrices: false, prices: {} },
        agouza:      { name: 'فرع العجوزة',       area: 'العجوزة · الجيزة',      phone: '01110288823', hasPrices: false, prices: {} },
        ardlewa:     { name: 'فرع أرض اللواء',   area: 'أرض اللواء · الجيزة',  phone: '01117776571', hasPrices: false, prices: {} },
    };

    function applyBranch(id) {
        const branch = BRANCHES[id];
        if (!branch) return;

        // Update dropdown picker UI
        document.querySelectorAll('.bpd-item').forEach(item => {
            item.classList.toggle('active', item.dataset.branch === id);
        });
        const label = document.getElementById('branchPickerLabel');
        if (label) label.textContent = branch.name.replace('فرع ', '');
        document.getElementById('branchPicker')?.classList.remove('open');

        // Show/hide price elements based on branch
        const showPrices = branch.hasPrices !== false;
        document.querySelectorAll('.dish-price').forEach(el => {
            el.style.visibility = showPrices ? '' : 'hidden';
        });
        const noPriceNote = document.getElementById('noPriceNote');
        if (noPriceNote) noPriceNote.classList.toggle('show', !showPrices);

        // Apply price overrides when prices object is populated
        if (showPrices && Object.keys(branch.prices).length > 0) {
            document.querySelectorAll('.dish-card[data-id]').forEach(card => {
                const override = branch.prices[card.dataset.id];
                if (override !== undefined) {
                    card.dataset.price = override;
                    const priceEl = card.querySelector('.dish-price');
                    if (priceEl) priceEl.innerHTML = `${override} <small>جنيه</small>`;
                }
            });
        }

    }

    window.selectBranch = function(id) {
        sessionStorage.setItem(BRANCH_KEY, id);
        applyBranch(id);
        // Scroll to top of menu when switching branches so the new menu is seen from the start
        if (document.getElementById('menuNavBar')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Branch cards on homepage and branches page → navigate to menu with that branch pre-selected
    document.querySelectorAll('[data-branch-goto]').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            if (e.target.closest('a, button')) return;
            const branchId = card.dataset.branchGoto;
            if (BRANCHES[branchId]) {
                sessionStorage.setItem(BRANCH_KEY, branchId);
                window.location.href = 'menu.html';
            }
        });
    });

    // Init on menu page — auto-select saved branch or default to faisal
    if (document.getElementById('menuNavBar')) {
        const saved = sessionStorage.getItem(BRANCH_KEY);
        const defaultId = (saved && BRANCHES[saved]) ? saved : 'faisal';
        sessionStorage.setItem(BRANCH_KEY, defaultId);
        applyBranch(defaultId);

        // Deep-link from homepage featured cards: ?dish=grilled-2 etc.
        const dishParam = new URLSearchParams(window.location.search).get('dish');
        if (dishParam) {
            setTimeout(() => {
                const dishCard = document.querySelector(`.dish-card[data-id="${dishParam}"]`);
                if (!dishCard) return;
                const headerH  = document.getElementById('header')?.offsetHeight   || 76;
                const navBarH  = document.getElementById('menuNavBar')?.offsetHeight || 54;
                const top = dishCard.getBoundingClientRect().top + window.scrollY - headerH - navBarH - 24;
                window.scrollTo({ top, behavior: 'smooth' });
                // Add to cart automatically
                const addBtn = dishCard.querySelector('.dish-add-btn');
                if (addBtn) addBtn.click();
                // Pulse highlight so the user sees which dish was selected
                dishCard.style.transition = 'outline 0s';
                dishCard.style.outline = '2px solid var(--red)';
                dishCard.style.outlineOffset = '3px';
                setTimeout(() => { dishCard.style.outline = ''; dishCard.style.outlineOffset = ''; }, 2500);
            }, 350);
        }
    }

    // ── Inject cart enhancements into drawer ──
    const cartDrawerBody = document.querySelector('.cart-drawer-body');
    if (cartDrawerBody) {
        // Branch bar — at very top of drawer body
        const branchBarEl = document.createElement('div');
        branchBarEl.id = 'cartBranchBar';
        branchBarEl.className = 'cart-branch-bar';
        branchBarEl.hidden = true;
        branchBarEl.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            طلبك من: <strong class="cart-branch-name"></strong>`;
        cartDrawerBody.insertBefore(branchBarEl, cartDrawerBody.firstChild);

        // Upsell chips — appended at end of drawer body
        const upsellEl = document.createElement('div');
        upsellEl.id = 'cartUpsell';
        upsellEl.className = 'cart-upsell';
        upsellEl.hidden = true;
        cartDrawerBody.appendChild(upsellEl);
    }

    // ── WhatsApp Floating Button ──
    const fab = document.createElement('a');
    fab.href = 'https://wa.me/201115551189';
    fab.target = '_blank';
    fab.rel = 'noopener';
    fab.className = 'whatsapp-fab';
    fab.setAttribute('aria-label', 'تواصل عبر واتساب');
    fab.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
    document.body.appendChild(fab);

    // Init badge on page load
    updateCartBadge();

});
