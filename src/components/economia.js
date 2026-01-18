// Economia Component - Placeholder

async function renderEconomia() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="card">
            <div class="card-header">Gestione Economica P.IVA - In sviluppo</div>
            <p>Questa sezione permetterà di gestire tutte le entrate e uscite della tua attività.</p>
            <p class="mt-4 text-gray-600">Funzionalità previste:</p>
            <ul class="list-disc ml-6 mt-2 text-gray-600">
                <li>Registrazione spese deducibili (trasporti, vitto, alloggio, materiali)</li>
                <li>Gestione ricavi e commissioni</li>
                <li>Upload documenti (scontrini, ricevute)</li>
                <li>Calcolo IVA e ritenute</li>
                <li>Report per commercialista</li>
            </ul>
        </div>
    `;
}

window.renderEconomia = renderEconomia;
