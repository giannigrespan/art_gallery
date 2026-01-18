// Calendario Component - Placeholder

async function renderCalendario() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="card">
            <div class="card-header">Calendario Appuntamenti - In sviluppo</div>
            <p>Questa sezione permetterà di gestire gli appuntamenti.</p>
            <p class="mt-4 text-gray-600">Funzionalità previste:</p>
            <ul class="list-disc ml-6 mt-2 text-gray-600">
                <li>Vista calendario mensile</li>
                <li>Agg aggiungi appuntamenti (visite, mostre, presentazioni)</li>
                <li>Promemoria e notifiche</li>
                <li>Integrazione Google Calendar (opzionale)</li>
            </ul>
        </div>
    `;
}

window.renderCalendario = renderCalendario;
