// Clienti Component - Placeholder

async function renderClienti() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="card">
            <div class="card-header">Gestione Clienti - In sviluppo</div>
            <p>Questa sezione permetterà di gestire i clienti (collezionisti, gallerie, musei).</p>
            <p class="mt-4 text-gray-600">Funzionalità previste:</p>
            <ul class="list-disc ml-6 mt-2 text-gray-600">
                <li>Anagrafica clienti completa</li>
                <li>Storico acquisti e interazioni</li>
                <li>Note e preferenze</li>
                <li>Contatti e promemoria</li>
            </ul>
        </div>
    `;
}

window.renderClienti = renderClienti;
