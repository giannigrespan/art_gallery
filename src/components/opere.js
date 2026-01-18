// Opere Component - Art Gallery Manager

async function renderOpere() {
    const pageContent = document.getElementById('page-content');

    // Mock data (sostituire con API)
    const opere = [
        {
            id: 1,
            titolo: 'Tramonto sul Mare',
            artista: 'Giovanni Bianchi',
            anno: 2023,
            tecnica: 'Olio su tela',
            dimensioni: '80x100 cm',
            prezzoAcquisto: 5000,
            prezzoVendita: 8000,
            commissione: 15,
            disponibile: true,
            foto: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            titolo: 'Astrazione Moderna',
            artista: 'Maria Rossi',
            anno: 2024,
            tecnica: 'Acrilico su tela',
            dimensioni: '120x120 cm',
            prezzoAcquisto: 8000,
            prezzoVendita: 12000,
            commissione: 20,
            disponibile: true,
            foto: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            titolo: 'Natura Morta',
            artista: 'Luca Verdi',
            anno: 2022,
            tecnica: 'Tempera',
            dimensioni: '50x70 cm',
            prezzoAcquisto: 3000,
            prezzoVendita: 5000,
            commissione: 15,
            disponibile: false,
            foto: 'https://via.placeholder.com/150'
        }
    ];

    pageContent.innerHTML = `
        <!-- Action Bar -->
        <div class="flex justify-between items-center mb-6">
            <div class="flex space-x-4">
                <input
                    type="text"
                    id="search-opere"
                    placeholder="Cerca opere..."
                    class="form-input w-64"
                />
                <select id="filter-disponibilita" class="form-select">
                    <option value="">Tutte le opere</option>
                    <option value="true">Solo disponibili</option>
                    <option value="false">Vendute</option>
                </select>
            </div>
            <button onclick="showAddOperaModal()" class="btn btn-success">
                + Aggiungi Opera
            </button>
        </div>

        <!-- Opere Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${opere.map(opera => renderOperaCard(opera)).join('')}
        </div>
    `;
}

function renderOperaCard(opera) {
    const commissioneEuro = (opera.prezzoVendita * opera.commissione) / 100;

    return `
        <div class="card hover:shadow-xl transition">
            <!-- Immagine -->
            <div class="mb-4">
                <img
                    src="${opera.foto}"
                    alt="${opera.titolo}"
                    class="w-full h-48 object-cover rounded-lg"
                />
            </div>

            <!-- Info Opera -->
            <div class="mb-4">
                <h3 class="text-xl font-bold text-primary mb-1">${opera.titolo}</h3>
                <p class="text-gray-600 text-sm mb-2">${opera.artista} · ${opera.anno}</p>
                <p class="text-gray-500 text-xs mb-2">${opera.tecnica} · ${opera.dimensioni}</p>

                <!-- Disponibilità -->
                <span class="badge ${opera.disponibile ? 'badge-success' : 'badge-danger'}">
                    ${opera.disponibile ? 'Disponibile' : 'Venduta'}
                </span>
            </div>

            <!-- Pricing -->
            <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600">Prezzo Vendita:</span>
                    <span class="font-bold">${formatCurrency(opera.prezzoVendita)}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Commissione (${opera.commissione}%):</span>
                    <span class="font-bold text-success">${formatCurrency(commissioneEuro)}</span>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex space-x-2">
                <button
                    onclick="viewOpera(${opera.id})"
                    class="flex-1 btn btn-outline text-sm"
                >
                    Dettagli
                </button>
                <button
                    onclick="editOpera(${opera.id})"
                    class="flex-1 btn btn-primary text-sm"
                >
                    Modifica
                </button>
            </div>
        </div>
    `;
}

function showAddOperaModal() {
    const modalContent = `
        <form id="add-opera-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">Titolo</label>
                    <input type="text" name="titolo" class="form-input" required />
                </div>
                <div class="form-group">
                    <label class="form-label">Artista</label>
                    <input type="text" name="artista" class="form-input" required />
                </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
                <div class="form-group">
                    <label class="form-label">Anno</label>
                    <input type="number" name="anno" class="form-input" required />
                </div>
                <div class="form-group">
                    <label class="form-label">Tecnica</label>
                    <input type="text" name="tecnica" class="form-input" required />
                </div>
                <div class="form-group">
                    <label class="form-label">Dimensioni</label>
                    <input type="text" name="dimensioni" class="form-input" placeholder="es. 80x100 cm" required />
                </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
                <div class="form-group">
                    <label class="form-label">Prezzo Acquisto (€)</label>
                    <input type="number" name="prezzoAcquisto" class="form-input" required />
                </div>
                <div class="form-group">
                    <label class="form-label">Prezzo Vendita (€)</label>
                    <input type="number" name="prezzoVendita" class="form-input" required />
                </div>
                <div class="form-group">
                    <label class="form-label">Commissione (%)</label>
                    <input type="number" name="commissione" class="form-input" value="15" required />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Note</label>
                <textarea name="note" class="form-textarea"></textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Foto (URL)</label>
                <input type="url" name="foto" class="form-input" placeholder="https://..." />
            </div>
        </form>
    `;

    showModal('Aggiungi Nuova Opera', modalContent, [
        {
            label: 'Salva Opera',
            type: 'success',
            onClick: 'handleSaveOpera()'
        }
    ]);
}

function handleSaveOpera() {
    const form = document.getElementById('add-opera-form');
    const formData = new FormData(form);
    const operaData = Object.fromEntries(formData);

    console.log('Saving opera:', operaData);

    // TODO: Call API
    // await OpereAPI.create(operaData);

    showToast('Opera aggiunta con successo!', 'success');
    closeModal();
    renderOpere();
}

function viewOpera(id) {
    console.log('Viewing opera:', id);
    showToast('Funzione in sviluppo', 'info');
}

function editOpera(id) {
    console.log('Editing opera:', id);
    showToast('Funzione in sviluppo', 'info');
}

window.renderOpere = renderOpere;
window.showAddOperaModal = showAddOperaModal;
window.handleSaveOpera = handleSaveOpera;
window.viewOpera = viewOpera;
window.editOpera = editOpera;
