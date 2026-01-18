// Main Application Logic - Art Gallery Manager

// App State
const AppState = {
    currentPage: 'dashboard',
    user: {
        name: 'Gianni Gresplan',
        role: 'Agente d\'Arte'
    },
    data: {
        opere: [],
        clienti: [],
        vendite: [],
        spese: [],
        ricavi: [],
        fatture: [],
        appuntamenti: []
    },
    cache: {},
    loading: false
};

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎨 Art Gallery Manager - Initializing...');

    // Setup event listeners
    setupNavigation();

    // Load initial page (Dashboard)
    await loadPage('dashboard');

    console.log('✅ App initialized successfully');
});

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();

            // Get page from href (remove #)
            const page = link.getAttribute('href').substring(1);

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Load page
            await loadPage(page);
        });
    });
}

// Load Page Content
async function loadPage(pageName) {
    console.log(`Loading page: ${pageName}`);

    AppState.currentPage = pageName;

    // Update page title
    const titles = {
        'dashboard': { title: 'Dashboard', subtitle: 'Panoramica generale' },
        'opere': { title: 'Opere d\'Arte', subtitle: 'Gestione catalogo' },
        'clienti': { title: 'Clienti', subtitle: 'Gestione clienti' },
        'vendite': { title: 'Vendite', subtitle: 'Tracking vendite e commissioni' },
        'economia': { title: 'Gestione Economica', subtitle: 'Spese e ricavi' },
        'fatture': { title: 'Fatture', subtitle: 'Gestione fatturazione' },
        'calendario': { title: 'Calendario', subtitle: 'Appuntamenti e attività' },
        'report': { title: 'Report', subtitle: 'Reportistica fiscale' }
    };

    const pageInfo = titles[pageName] || { title: pageName, subtitle: '' };
    document.getElementById('page-title').textContent = pageInfo.title;
    document.getElementById('page-subtitle').textContent = pageInfo.subtitle;

    // Load page component
    const pageContent = document.getElementById('page-content');

    try {
        showLoading(true);

        // Call component render function
        switch(pageName) {
            case 'dashboard':
                await renderDashboard();
                break;
            case 'opere':
                await renderOpere();
                break;
            case 'clienti':
                await renderClienti();
                break;
            case 'vendite':
                await renderVendite();
                break;
            case 'economia':
                await renderEconomia();
                break;
            case 'fatture':
                await renderFatture();
                break;
            case 'calendario':
                await renderCalendario();
                break;
            case 'report':
                await renderReport();
                break;
            default:
                pageContent.innerHTML = `
                    <div class="card">
                        <h3>Pagina in costruzione</h3>
                        <p>La pagina "${pageName}" è in fase di sviluppo.</p>
                    </div>
                `;
        }

        showLoading(false);

    } catch (error) {
        console.error('Error loading page:', error);
        showToast('Errore nel caricamento della pagina', 'error');
        showLoading(false);
    }
}

// Show/Hide Loading Overlay
function showLoading(show = true) {
    AppState.loading = show;
    const overlay = document.getElementById('loading-overlay');
    if (show) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

// Toast Notification
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="flex items-center space-x-3">
            <span class="text-lg">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span>${message}</span>
        </div>
    `;

    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Utility: Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Utility: Format Date
function formatDate(dateString, format = 'short') {
    const date = new Date(dateString);

    if (format === 'short') {
        return date.toLocaleDateString('it-IT');
    } else if (format === 'long') {
        return date.toLocaleDateString('it-IT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return date.toISOString();
}

// Utility: Calculate Percentage Change
function calculatePercentageChange(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
}

// Modal Helper
function showModal(title, content, buttons = []) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'active-modal';

    const buttonsHTML = buttons.map(btn =>
        `<button class="btn btn-${btn.type || 'primary'}" onclick="${btn.onClick}">${btn.label}</button>`
    ).join('');

    overlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">${title}</div>
            <div class="modal-body">${content}</div>
            <div class="modal-footer">
                ${buttonsHTML}
                <button class="btn btn-outline" onclick="closeModal()">Chiudi</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

function closeModal() {
    const modal = document.getElementById('active-modal');
    if (modal) modal.remove();
}

// Export state for components
window.AppState = AppState;
window.showLoading = showLoading;
window.showToast = showToast;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.calculatePercentageChange = calculatePercentageChange;
window.showModal = showModal;
window.closeModal = closeModal;
