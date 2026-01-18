// Report Component - Placeholder

async function renderReport() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="card">
            <div class="card-header">Report Fiscali - In sviluppo</div>
            <p>Questa sezione permetterà di generare report per il commercialista.</p>
            <p class="mt-4 text-gray-600">Funzionalità previste:</p>
            <ul class="list-disc ml-6 mt-2 text-gray-600">
                <li>Report annuale spese/ricavi</li>
                <li>Breakdown per categoria</li>
                <li>Calcolo IVA totale</li>
                <li>Export CSV/Excel per commercialista</li>
                <li>Grafici e analytics</li>
            </ul>
        </div>
    `;
}

window.renderReport = renderReport;
