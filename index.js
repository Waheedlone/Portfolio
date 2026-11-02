/**
 * Waheed Lone - Portfolio Scripts
 * Minimal, zero-bloat vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFilters();
    initCopyEmail();
    initContactForm();
    initScrollSpy();
});

/* ==========================================================================
   Navigation
   ========================================================================== */
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const menuIcon = document.getElementById('menuIcon');
    const siteNav = document.getElementById('siteNav');
    const navLinks = document.querySelectorAll('.nav-item');

    if (!mobileToggle || !siteNav) return;

    mobileToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        if (isOpen) {
            menuIcon.className = 'fa-solid fa-xmark';
        } else {
            menuIcon.className = 'fa-solid fa-bars';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (siteNav.classList.contains('open')) {
                siteNav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                menuIcon.className = 'fa-solid fa-bars';
            }
        });
    });
}

/* ==========================================================================
   Case Study Filters
   ========================================================================== */
function initFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const caseCards = document.querySelectorAll('.case-study-card');

    if (!filterTabs.length || !caseCards.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            caseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ==========================================================================
   Quick Copy Email
   ========================================================================== */
function initCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    if (!copyBtn) return;

    const email = copyBtn.getAttribute('data-email') || 'waheedlone782@gmail.com';

    copyBtn.addEventListener('click', async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const input = document.createElement('input');
                input.value = email;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
            }

            const label = copyBtn.querySelector('.copy-label');
            if (label) label.textContent = 'Copied to clipboard';
            showToast(`Copied ${email} to clipboard.`);

            setTimeout(() => {
                if (label) label.textContent = 'Copy Email';
            }, 2500);
        } catch (err) {
            showToast(`Email: ${email}`);
        }
    });
}

/* ==========================================================================
   Contact Form (Validation + mailto)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const projectTypeSelect = document.getElementById('projectType');
        const msgInput = document.getElementById('msg');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const topic = projectTypeSelect ? projectTypeSelect.value : 'Project Inquiry';
        const msg = msgInput.value.trim();

        if (!name || !email || !msg) {
            showToast('Please fill out all fields before sending.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        const subject = encodeURIComponent(`[Inquiry] ${topic} - ${name}`);
        const bodyContent = `Hi Waheed,\n\n${msg}\n\n---\nFrom: ${name}\nEmail: ${email}\nTopic: ${topic}`;
        const body = encodeURIComponent(bodyContent);

        showToast('Opening your email client...');
        setTimeout(() => {
            window.location.href = `mailto:waheedlone782@gmail.com?subject=${subject}&body=${body}`;
        }, 300);
    });
}

/* ==========================================================================
   Scroll Spy for Active Nav Item
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    if (!sections.length || !navItems.length) return;

    window.addEventListener('scroll', () => {
        let currentId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentId}`) {
                item.classList.add('active');
            }
        });
    }, { passive: true });
}

/* ==========================================================================
   Minimal Toast Utility
   ========================================================================== */
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}
