// Configuration File - Art Gallery Manager
// IMPORTANTE: Copia questo file in 'config.js' e personalizza con i tuoi dati

const CONFIG = {
    // URL dell'istanza n8n (webhook base URL)
    // Esempio: 'https://tua-istanza.n8n.cloud' oppure 'http://localhost:5678'
    N8N_BASE_URL: 'http://localhost:5678',

    // Webhook paths (configurati in n8n)
    API_ENDPOINTS: {
        // Opere
        opere: {
            list: '/webhook/opere',
            get: '/webhook/opere/:id',
            create: '/webhook/opere',
            update: '/webhook/opere/:id',
            delete: '/webhook/opere/:id',
            disponibili: '/webhook/opere/disponibili'
        },

        // Artisti
        artisti: {
            list: '/webhook/artisti',
            create: '/webhook/artisti',
            update: '/webhook/artisti/:id'
        },

        // Clienti
        clienti: {
            list: '/webhook/clienti',
            get: '/webhook/clienti/:id',
            create: '/webhook/clienti',
            update: '/webhook/clienti/:id',
            storico: '/webhook/clienti/:id/storico'
        },

        // Vendite
        vendite: {
            list: '/webhook/vendite',
            create: '/webhook/vendite',
            update: '/webhook/vendite/:id'
        },

        // Spese
        spese: {
            list: '/webhook/spese',
            create: '/webhook/spese'
        },

        // Ricavi
        ricavi: {
            list: '/webhook/ricavi',
            create: '/webhook/ricavi'
        },

        // Fatture
        fatture: {
            list: '/webhook/fatture',
            create: '/webhook/fatture',
            update: '/webhook/fatture/:id'
        },

        // Appuntamenti
        appuntamenti: {
            list: '/webhook/appuntamenti',
            create: '/webhook/appuntamenti',
            update: '/webhook/appuntamenti/:id'
        },

        // Dashboard & Report
        dashboard: {
            stats: '/webhook/dashboard/stats',
            charts: '/webhook/dashboard/charts'
        },

        report: {
            fiscale: '/webhook/report/fiscale'
        }
    },

    // Google Sheets ID (trovalo nell'URL del foglio)
    // https://docs.google.com/spreadsheets/d/[QUESTO_ID]/edit
    GOOGLE_SHEET_ID: 'TUO_GOOGLE_SHEET_ID',

    // Configurazioni app
    APP: {
        name: 'Art Gallery Manager',
        version: '1.0.0',
        locale: 'it-IT',
        currency: 'EUR',
        dateFormat: 'DD/MM/YYYY'
    },

    // Limiti e paginazione
    PAGINATION: {
        defaultLimit: 50,
        maxLimit: 200
    },

    // Upload configurazione (se usi Google Drive)
    UPLOAD: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    }
};

// Export per uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
