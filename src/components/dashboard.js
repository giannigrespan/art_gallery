// Dashboard Component - Art Gallery Manager

async function renderDashboard() {
    const pageContent = document.getElementById('page-content');

    // Mock data (da sostituire con API)
    const stats = {
        venditeMese: { valore: 15800, cambio: 12.5 },
        speseMese: { valore: 3200, cambio: -5.2 },
        opereDisponibili: { valore: 47, cambio: 3 },
        appuntamentiSettimana: { valore: 8, cambio: 2 }
    };

    const prossimiAppuntamenti = [
        { data: '2026-01-18', cliente: 'Galleria Moderna', tipo: 'Presentazione opere' },
        { data: '2026-01-20', cliente: 'Marco Rossi', tipo: 'Visita collezione' },
        { data: '2026-01-22', cliente: 'Museo Contemporaneo', tipo: 'Negoziazione' }
    ];

    const fattureScadenza = [
        { numero: 'F-2026-003', cliente: 'Galleria Arte', importo: 5400, scadenza: '2026-01-25' },
        { numero: 'F-2026-001', cliente: 'Collezionista Privato', importo: 12000, scadenza: '2026-01-30' }
    ];

    pageContent.innerHTML = `
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Vendite Mese -->
            <div class="kpi-card success">
                <div class="kpi-label">Vendite Mese</div>
                <div class="kpi-value">${formatCurrency(stats.venditeMese.valore)}</div>
                <div class="kpi-change">
                    <span class="${stats.venditeMese.cambio >= 0 ? 'text-green-200' : 'text-red-200'}">
                        ${stats.venditeMese.cambio >= 0 ? '↑' : '↓'} ${Math.abs(stats.venditeMese.cambio)}%
                    </span>
                    vs mese scorso
                </div>
            </div>

            <!-- Spese Mese -->
            <div class="kpi-card">
                <div class="kpi-label">Spese Mese</div>
                <div class="kpi-value">${formatCurrency(stats.speseMese.valore)}</div>
                <div class="kpi-change">
                    <span class="${stats.speseMese.cambio <= 0 ? 'text-green-200' : 'text-red-200'}">
                        ${stats.speseMese.cambio >= 0 ? '↑' : '↓'} ${Math.abs(stats.speseMese.cambio)}%
                    </span>
                    vs mese scorso
                </div>
            </div>

            <!-- Opere Disponibili -->
            <div class="kpi-card">
                <div class="kpi-label">Opere Disponibili</div>
                <div class="kpi-value">${stats.opereDisponibili.valore}</div>
                <div class="kpi-change">
                    <span class="text-gray-200">
                        ${stats.opereDisponibili.cambio >= 0 ? '+' : ''}${stats.opereDisponibili.cambio} opere
                    </span>
                    ultimo mese
                </div>
            </div>

            <!-- Appuntamenti Settimana -->
            <div class="kpi-card warning">
                <div class="kpi-label">Appuntamenti Settimana</div>
                <div class="kpi-value">${stats.appuntamentiSettimana.valore}</div>
                <div class="kpi-change">
                    <span class="text-gray-200">
                        ${stats.appuntamentiSettimana.cambio >= 0 ? '+' : ''}${stats.appuntamentiSettimana.cambio} appuntamenti
                    </span>
                    prossimi
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Vendite vs Spese Chart -->
            <div class="card">
                <div class="card-header">Vendite vs Spese (Ultimi 6 Mesi)</div>
                <div class="chart-container">
                    <canvas id="venditeSpeseChart"></canvas>
                </div>
            </div>

            <!-- Commissioni per Categoria Chart -->
            <div class="card">
                <div class="card-header">Commissioni per Artista</div>
                <div class="chart-container">
                    <canvas id="commissioniChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Tables Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Prossimi Appuntamenti -->
            <div class="card">
                <div class="card-header">Prossimi Appuntamenti</div>
                <div class="space-y-3">
                    ${prossimiAppuntamenti.map(app => `
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <div>
                                <div class="font-semibold text-primary">${app.cliente}</div>
                                <div class="text-sm text-gray-600">${app.tipo}</div>
                            </div>
                            <div class="text-sm font-medium text-gray-700">
                                ${formatDate(app.data)}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-4">
                    <a href="#calendario" class="text-primary hover:underline text-sm font-medium">
                        Vedi tutti gli appuntamenti →
                    </a>
                </div>
            </div>

            <!-- Fatture in Scadenza -->
            <div class="card">
                <div class="card-header">Fatture in Scadenza</div>
                <div class="space-y-3">
                    ${fattureScadenza.map(fatt => `
                        <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <div>
                                <div class="font-semibold text-primary">${fatt.numero}</div>
                                <div class="text-sm text-gray-600">${fatt.cliente}</div>
                            </div>
                            <div class="text-right">
                                <div class="font-bold text-accent">${formatCurrency(fatt.importo)}</div>
                                <div class="text-xs text-gray-600">Scadenza: ${formatDate(fatt.scadenza)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-4">
                    <a href="#fatture" class="text-primary hover:underline text-sm font-medium">
                        Vedi tutte le fatture →
                    </a>
                </div>
            </div>
        </div>
    `;

    // Initialize Charts
    initDashboardCharts();
}

function initDashboardCharts() {
    // Vendite vs Spese Chart
    const venditeSpeseCtx = document.getElementById('venditeSpeseChart');
    if (venditeSpeseCtx) {
        new Chart(venditeSpeseCtx, {
            type: 'line',
            data: {
                labels: ['Ago', 'Set', 'Ott', 'Nov', 'Dic', 'Gen'],
                datasets: [
                    {
                        label: 'Vendite',
                        data: [12000, 15000, 13500, 18000, 14000, 15800],
                        borderColor: '#27AE60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Spese',
                        data: [3500, 2800, 4200, 3000, 3400, 3200],
                        borderColor: '#E74C3C',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Commissioni per Artista Chart
    const commissioniCtx = document.getElementById('commissioniChart');
    if (commissioniCtx) {
        new Chart(commissioniCtx, {
            type: 'doughnut',
            data: {
                labels: ['Artista A', 'Artista B', 'Artista C', 'Artista D', 'Altri'],
                datasets: [{
                    data: [4500, 3200, 2800, 2100, 3200],
                    backgroundColor: [
                        '#2C3E50',
                        '#27AE60',
                        '#3498db',
                        '#f39c12',
                        '#95A5A6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }
}

window.renderDashboard = renderDashboard;
