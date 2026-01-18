// Fatture Component - Placeholder

async function renderFatture() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="card">
            <div class="card-header">Gestione Fatture - In sviluppo</div>
            <p>Questa sezione permetterà di gestire la fatturazione.</p>
            <p class="mt-4 text-gray-600">Funzionalità previste:</p>
            <ul class="list-disc ml-6 mt-2 text-gray-600">
                <li>Emissione fatture</li>
                <li>Tracking pagamenti</li>
                <li>Alert scadenze</li>
                <li>Storico fatturazione</li>
            </ul>
        </div>
    `;
}

window.renderFatture = renderFatture;
