// Vendite Component - Placeholder

async function renderVendite() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="card">
            <div class="card-header">Gestione Vendite - In sviluppo</div>
            <p>Questa sezione permetterà di gestire le vendite e le commissioni.</p>
            <p class="mt-4 text-gray-600">Funzionalità previste:</p>
            <ul class="list-disc ml-6 mt-2 text-gray-600">
                <li>Tracking trattative in corso</li>
                <li>Registrazione vendite concluse</li>
                <li>Calcolo automatico commissioni</li>
                <li>Stati: Trattativa → Conclusa → Pagata</li>
            </ul>
        </div>
    `;
}

window.renderVendite = renderVendite;
