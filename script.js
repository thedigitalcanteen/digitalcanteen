// ==================== //
// CAROUSEL FUNCTIONALITY
// ==================== //

let currentSlide = 0;
let isMobile = window.innerWidth < 768;
let touchStartX = 0;
let touchEndX = 0;

const dashboards = [
    'Student Dashboard',
    'Parent Dashboard',
    'Kitchen Staff Dashboard',
    'Canteen Manager Dashboard',
    'School Manager Dashboard'
];

function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

// Initialize carousel
function initCarousel() {
    const indicatorsContainer = document.getElementById('carouselIndicators');

    if (!indicatorsContainer) return;

    indicatorsContainer.innerHTML = '';

    dashboards.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

// Update carousel position
function updateCarousel() {
    const container = document.getElementById('carouselContainer');
    if (!container) return;

    const translateX = isMobile
        ? -(currentSlide * 100)
        : -(currentSlide * (100 / 3)) - (currentSlide * 0.25);

    container.style.transform = `translateX(${translateX}%)`;

    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');

        if (isMobile) {
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        } else {
            if (index >= currentSlide && index < currentSlide + 3) {
                indicator.classList.add('active');
            }
        }
    });
}

// Next slide
function nextSlide() {
    const itemsPerView = isMobile ? 1 : 3;
    const maxIndex = dashboards.length - itemsPerView;

    if (currentSlide < maxIndex) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }

    updateCarousel();
}

// Previous slide
function prevSlide() {
    const itemsPerView = isMobile ? 1 : 3;
    const maxIndex = dashboards.length - itemsPerView;

    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = maxIndex;
    }

    updateCarousel();
}

// Touch events for mobile swipe
const carouselWrapper = document.querySelector('.carousel-wrapper');

if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const minSwipeDistance = 20;
    const distance = touchStartX - touchEndX;

    if (distance > minSwipeDistance) {
        nextSlide();
    } else if (distance < -minSwipeDistance) {
        prevSlide();
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 768;

    if (wasMobile !== isMobile) {
        currentSlide = 0;
        updateCarousel();
    }

    fixDashboardModalTitlePosition();
});

// ==================== //
// DASHBOARD MODAL FUNCTIONALITY
// ==================== //

let currentDashboardIndex = 0;

const dashboardData = [
    {
        name: 'Student Dashboard',
        image: 'assets/images/dashboard-student.png'
    },
    {
        name: 'Parent Dashboard',
        image: 'assets/images/dashboard-parent.png'
    },
    {
        name: 'Kitchen Staff Dashboard',
        image: 'assets/images/dashboard-kitchen.png'
    },
    {
        name: 'Canteen Manager Dashboard',
        image: 'assets/images/dashboard-canteen.png'
    },
    {
        name: 'School Manager Dashboard',
        image: 'assets/images/dashboard-school.png'
    }
];

function fixDashboardModalTitlePosition() {
    const modalNameBox = document.querySelector('.dashboard-modal-name');

    if (!modalNameBox) return;

    // Keep mobile unchanged
    if (window.innerWidth < 768) {
        modalNameBox.removeAttribute('style');
        return;
    }

    // Desktop-only title fix
    modalNameBox.style.position = 'absolute';
    modalNameBox.style.top = '1rem';
    modalNameBox.style.left = '1rem';
    modalNameBox.style.background = 'rgba(0, 0, 0, 0.85)';
    modalNameBox.style.padding = '0.75rem 1.25rem';
    modalNameBox.style.borderRadius = '0.5rem';
    modalNameBox.style.zIndex = '9999';

    const modalNameText = modalNameBox.querySelector('p');
    if (modalNameText) {
        modalNameText.style.color = '#FACC15';
        modalNameText.style.fontWeight = '700';
        modalNameText.style.fontSize = '1.125rem';
        modalNameText.style.lineHeight = '1.2';
        modalNameText.style.margin = '0';
        modalNameText.style.whiteSpace = 'nowrap';
    }
}

function openDashboardModal(index) {
    currentDashboardIndex = index;

    const modal = document.getElementById('dashboardModal');
    const modalImage = document.getElementById('dashboardModalImage');
    const modalName = document.getElementById('dashboardModalName');
    const modalCounter = document.getElementById('dashboardModalCounter');
    const prevBtn = document.getElementById('dashboardModalPrev');
    const nextBtn = document.getElementById('dashboardModalNext');

    if (!modal || !modalImage || !modalName || !modalCounter || !prevBtn || !nextBtn) return;

    // Set image and name
    modalImage.src = dashboardData[index].image;
    modalImage.alt = dashboardData[index].name;
    modalName.textContent = dashboardData[index].name;
    modalCounter.textContent = `${index + 1} / ${dashboardData.length}`;

    // Desktop-only alignment fix for the dashboard title
    fixDashboardModalTitlePosition();

    // Show/hide navigation buttons
    if (index === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (index === dashboardData.length - 1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }

    // Show modal
    modal.classList.add('show');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        refreshIcons();
        fixDashboardModalTitlePosition();
    }, 50);
}

function closeDashboardModal() {
    const modal = document.getElementById('dashboardModal');
    if (!modal) return;

    modal.classList.remove('show');

    // Restore body scroll
    document.body.style.overflow = '';
}

function navigateDashboard(direction) {
    const newIndex = currentDashboardIndex + direction;

    if (newIndex >= 0 && newIndex < dashboardData.length) {
        openDashboardModal(newIndex);
    }
}

// ==================== //
// MODAL FUNCTIONALITY
// ==================== //

let formData = {};
let savedScrollPosition = 0;

function openModal() {
    const modal = document.getElementById('demoModal');
    const form = document.getElementById('demoForm');
    const confirmDialog = document.getElementById('confirmDialog');
    const successMessage = document.getElementById('successMessage');

    if (!modal || !form || !confirmDialog || !successMessage) return;

    // Save scroll position and prevent body scroll
    savedScrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.style.width = '100%';
    document.body.classList.add('modal-open');

    // Reset modal state
    form.style.display = 'flex';
    confirmDialog.style.display = 'none';
    successMessage.style.display = 'none';
    form.reset();

    modal.classList.add('show');

    setTimeout(() => {
        refreshIcons();
    }, 50);
}

function closeModal() {
    const modal = document.getElementById('demoModal');
    if (!modal) return;

    modal.classList.remove('show');

    // Restore scroll position and allow body scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.classList.remove('modal-open');
    window.scrollTo(0, savedScrollPosition);
}

// Handle form submission with Web3Forms
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
let pendingFormData = null;

const demoForm = document.getElementById('demoForm');

if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Store a clean copy of the form data before showing the confirmation dialog
        formData = {
            firstName: document.getElementById('firstName')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            message: document.getElementById('message')?.value || ''
        };

        pendingFormData = new FormData(demoForm);
        pendingFormData.set('subject', 'New Demo Request - The Digital Canteen');
        pendingFormData.set('source', 'The Digital Canteen Landing Page');

        const form = document.getElementById('demoForm');
        const confirmDialog = document.getElementById('confirmDialog');

        if (form && confirmDialog) {
            form.style.display = 'none';
            confirmDialog.style.display = 'block';
        }

        setTimeout(() => {
            refreshIcons();
        }, 50);
    });
}

async function confirmSubmit() {
    const confirmDialog = document.getElementById('confirmDialog');
    const successMessage = document.getElementById('successMessage');
    const confirmButton = document.querySelector('.btn-confirm');
    const cancelButton = document.querySelector('.btn-cancel-confirm');

    if (!pendingFormData) {
        alert('Please fill the form again and submit.');
        cancelSubmit();
        return;
    }

    if (confirmButton) {
        confirmButton.disabled = true;
        confirmButton.textContent = 'Sending...';
    }

    if (cancelButton) {
        cancelButton.disabled = true;
    }

    try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            body: pendingFormData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Web3Forms submission failed');
        }

        if (confirmDialog) confirmDialog.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';

        if (demoForm) demoForm.reset();
        pendingFormData = null;

        setTimeout(() => {
            refreshIcons();
        }, 50);

        setTimeout(() => {
            closeModal();
        }, 2500);
    } catch (error) {
        alert('There was an issue sending your request. Please try again.');

        if (confirmDialog) confirmDialog.style.display = 'none';
        if (demoForm) demoForm.style.display = 'flex';
    } finally {
        if (confirmButton) {
            confirmButton.disabled = false;
            confirmButton.textContent = 'Yes, Submit';
        }

        if (cancelButton) {
            cancelButton.disabled = false;
        }
    }
}

function cancelSubmit() {
    const confirmDialog = document.getElementById('confirmDialog');
    const demoForm = document.getElementById('demoForm');

    pendingFormData = null;

    if (confirmDialog) confirmDialog.style.display = 'none';
    if (demoForm) demoForm.style.display = 'flex';

    setTimeout(() => {
        refreshIcons();
    }, 50);
}

// ==================== //
// SMOOTH SCROLL
// ==================== //

function smoothScroll(event, targetId) {
    event.preventDefault();

    const target = document.getElementById(targetId);

    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== //
// INITIALIZE ON PAGE LOAD
// ==================== //

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    refreshIcons();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const demoModal = document.getElementById('demoModal');

    if (demoModal && e.target === demoModal) {
        closeModal();
    }
});

// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const demoModal = document.getElementById('demoModal');

        if (demoModal && demoModal.classList.contains('show')) {
            closeModal();
        }

        const dashboardModal = document.getElementById('dashboardModal');

        if (dashboardModal && dashboardModal.classList.contains('show')) {
            closeDashboardModal();
        }
    }

    const dashboardModal = document.getElementById('dashboardModal');

    if (dashboardModal && dashboardModal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            navigateDashboard(-1);
        } else if (e.key === 'ArrowRight') {
            navigateDashboard(1);
        }
    }
});