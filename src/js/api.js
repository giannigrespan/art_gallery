// API Client - Communicates with n8n workflows

// API Base URL (from config)
const API_BASE = CONFIG.N8N_BASE_URL;

// Generic API Request Handler
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const config = { ...defaultOptions, ...options };

    try {
        console.log(`API Request: ${config.method} ${url}`);

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };

    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: error.message };
    }
}

// ============ OPERE API ============

const OpereAPI = {
    // Get all opere
    async getAll() {
        return await apiRequest(CONFIG.API_ENDPOINTS.opere.list);
    },

    // Get single opera by ID
    async getById(id) {
        const endpoint = CONFIG.API_ENDPOINTS.opere.get.replace(':id', id);
        return await apiRequest(endpoint);
    },

    // Create new opera
    async create(operaData) {
        return await apiRequest(CONFIG.API_ENDPOINTS.opere.create, {
            method: 'POST',
            body: JSON.stringify(operaData)
        });
    },

    // Update opera
    async update(id, operaData) {
        const endpoint = CONFIG.API_ENDPOINTS.opere.update.replace(':id', id);
        return await apiRequest(endpoint, {
            method: 'PUT',
            body: JSON.stringify(operaData)
        });
    },

    // Delete opera
    async delete(id) {
        const endpoint = CONFIG.API_ENDPOINTS.opere.delete.replace(':id', id);
        return await apiRequest(endpoint, {
            method: 'DELETE'
        });
    },

    // Get available opere
    async getDisponibili() {
        return await apiRequest(CONFIG.API_ENDPOINTS.opere.disponibili);
    }
};

// ============ CLIENTI API ============

const ClientiAPI = {
    async getAll() {
        return await apiRequest(CONFIG.API_ENDPOINTS.clienti.list);
    },

    async getById(id) {
        const endpoint = CONFIG.API_ENDPOINTS.clienti.get.replace(':id', id);
        return await apiRequest(endpoint);
    },

    async create(clienteData) {
        return await apiRequest(CONFIG.API_ENDPOINTS.clienti.create, {
            method: 'POST',
            body: JSON.stringify(clienteData)
        });
    },

    async update(id, clienteData) {
        const endpoint = CONFIG.API_ENDPOINTS.clienti.update.replace(':id', id);
        return await apiRequest(endpoint, {
            method: 'PUT',
            body: JSON.stringify(clienteData)
        });
    },

    async getStorico(id) {
        const endpoint = CONFIG.API_ENDPOINTS.clienti.storico.replace(':id', id);
        return await apiRequest(endpoint);
    }
};

// ============ VENDITE API ============

const VenditeAPI = {
    async getAll(filters = {}) {
        let endpoint = CONFIG.API_ENDPOINTS.vendite.list;

        // Add query params if filters provided
        const params = new URLSearchParams(filters);
        if (params.toString()) {
            endpoint += `?${params.toString()}`;
        }

        return await apiRequest(endpoint);
    },

    async create(venditaData) {
        return await apiRequest(CONFIG.API_ENDPOINTS.vendite.create, {
            method: 'POST',
            body: JSON.stringify(venditaData)
        });
    },

    async updateStato(id, stato) {
        const endpoint = CONFIG.API_ENDPOINTS.vendite.update.replace(':id', id);
        return await apiRequest(endpoint, {
            method: 'PUT',
            body: JSON.stringify({ stato })
        });
    }
};

// ============ SPESE API ============

const SpeseAPI = {
    async getAll(filters = {}) {
        let endpoint = CONFIG.API_ENDPOINTS.spese.list;
        const params = new URLSearchParams(filters);
        if (params.toString()) {
            endpoint += `?${params.toString()}`;
        }
        return await apiRequest(endpoint);
    },

    async create(spesaData) {
        return await apiRequest(CONFIG.API_ENDPOINTS.spese.create, {
            method: 'POST',
            body: JSON.stringify(spesaData)
        });
    }
};

// ============ RICAVI API ============

const RicaviAPI = {
    async getAll(filters = {}) {
        let endpoint = CONFIG.API_ENDPOINTS.ricavi.list;
        const params = new URLSearchParams(filters);
        if (params.toString()) {
            endpoint += `?${params.toString()}`;
        }
        return await apiRequest(endpoint);
    },

    async create(ricavoData) {
        return await apiRequest(CONFIG.API_ENDPOINTS.ricavi.create, {
            method: 'POST',
            body: JSON.stringify(ricavoData)
        });
    }
};

// ============ FATTURE API ============

const FattureAPI = {
    async getAll() {
        return await apiRequest(CONFIG.API_ENDPOINTS.fatture.list);
    },

    async create(fatturaData) {
        return await apiRequest(CONFIG.API_ENDPOINTS.fatture.create, {
            method: 'POST',
            body: JSON.stringify(fatturaData)
        });
    },

    async update(id, fatturaData) {
        const endpoint = CONFIG.API_ENDPOINTS.fatture.update.replace(':id', id);
        return await apiRequest(endpoint, {
            method: 'PUT',
            body: JSON.stringify(fatturaData)
        });
    }
};

// ============ APPUNTAMENTI API ============

const AppuntamentiAPI = {
    async getAll() {
        return await apiRequest(CONFIG.API_ENDPOINTS.appuntamenti.list);
    },

    async create(appuntamentoData) {
        return await apiRequest(CONFIG.API_ENDPOINTS.appuntamenti.create, {
            method: 'POST',
            body: JSON.stringify(appuntamentoData)
        });
    },

    async update(id, appuntamentoData) {
        const endpoint = CONFIG.API_ENDPOINTS.appuntamenti.update.replace(':id', id);
        return await apiRequest(endpoint, {
            method: 'PUT',
            body: JSON.stringify(appuntamentoData)
        });
    }
};

// ============ DASHBOARD & REPORT API ============

const DashboardAPI = {
    async getStats() {
        return await apiRequest(CONFIG.API_ENDPOINTS.dashboard.stats);
    },

    async getCharts() {
        return await apiRequest(CONFIG.API_ENDPOINTS.dashboard.charts);
    }
};

const ReportAPI = {
    async getFiscale(anno = new Date().getFullYear()) {
        return await apiRequest(`${CONFIG.API_ENDPOINTS.report.fiscale}?anno=${anno}`);
    }
};

// Export APIs
window.OpereAPI = OpereAPI;
window.ClientiAPI = ClientiAPI;
window.VenditeAPI = VenditeAPI;
window.SpeseAPI = SpeseAPI;
window.RicaviAPI = RicaviAPI;
window.FattureAPI = FattureAPI;
window.AppuntamentiAPI = AppuntamentiAPI;
window.DashboardAPI = DashboardAPI;
window.ReportAPI = ReportAPI;
