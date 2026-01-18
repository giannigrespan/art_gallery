// Simple Router - Art Gallery Manager

// Router State
const Router = {
    currentRoute: null,
    routes: {},

    // Initialize router
    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                loadPage(e.state.page);
            }
        });

        // Handle initial route
        const hash = window.location.hash.substring(1) || 'dashboard';
        this.navigate(hash, true);
    },

    // Navigate to page
    navigate(page, replaceState = false) {
        this.currentRoute = page;

        // Update URL
        if (replaceState) {
            history.replaceState({ page }, '', `#${page}`);
        } else {
            history.pushState({ page }, '', `#${page}`);
        }

        // Load page content
        loadPage(page);
    },

    // Get current route
    getCurrentRoute() {
        return this.currentRoute || 'dashboard';
    }
};

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Router.init(); // Commented out - using simple navigation for now
});

window.Router = Router;
