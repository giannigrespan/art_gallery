# Art Gallery Manager

Sistema di gestione per agenti di commercio nel settore delle gallerie d'arte.

## 🎨 Caratteristiche

- **Gestione Catalogo Opere d'Arte** - Artisti, opere, prezzi, disponibilità
- **CRM Clienti** - Collezionisti, gallerie, storico acquisti
- **Tracking Vendite** - Gestione trattative, commissioni, contratti
- **Gestione Economica P.IVA** - Spese deducibili, ricavi, fatturazione
- **Calendario Appuntamenti** - Visite, mostre, eventi
- **Reportistica Fiscale** - Analytics, export per commercialista

## 🛠️ Stack Tecnologico

**Frontend:**
- HTML5, CSS3, JavaScript (Vanilla)
- Tailwind CSS per UI
- Chart.js per grafici

**Backend:**
- Google Sheets (database)
- Google Drive API (upload documenti)
- n8n (workflow automation & API)

## 📁 Struttura Progetto

```
art-gallery-manager/
├── src/
│   ├── js/           # JavaScript modules
│   ├── css/          # Stili personalizzati
│   └── components/   # Componenti UI riutilizzabili
├── public/           # Assets statici (immagini, font)
├── docs/             # Documentazione tecnica
├── n8n-workflows/    # Export workflow n8n (JSON)
└── index.html        # Entry point applicazione
```

## 🚀 Setup

### 1. Google Sheets Setup

1. Crea un nuovo Google Spreadsheet chiamato "GalleriaDB"
2. Segui la struttura in `docs/google-sheets-structure.md`
3. Attiva Google Sheets API e crea credenziali
4. Salva le credenziali in modo sicuro

### 2. n8n Setup

1. Installa n8n: `npm install -g n8n` (o usa n8n.cloud)
2. Avvia n8n: `n8n start`
3. Importa i workflow da `n8n-workflows/`
4. Configura le credenziali Google Sheets
5. Attiva i workflow necessari

Guida dettagliata: `docs/n8n-setup.md`

### 3. Frontend Setup

1. Clona il repository
2. Apri `index.html` in un browser moderno
3. Oppure usa un server locale:
   ```bash
   npx http-server
   ```
4. Configura l'URL dell'istanza n8n in `src/js/config.js`

## 📊 Struttura Database (Google Sheets)

Il file "GalleriaDB" contiene 8 fogli:

1. **Opere** - Catalogo opere d'arte
2. **Artisti** - Anagrafica artisti
3. **Clienti** - CRM clienti
4. **Vendite** - Registro vendite e commissioni
5. **Spese** - Spese deducibili P.IVA
6. **Ricavi** - Ricavi e fatturazione
7. **Appuntamenti** - Calendario attività
8. **Fatture** - Gestione fatture emesse

Vedi struttura completa in `docs/google-sheets-structure.md`

## 🔌 API Endpoints (n8n)

Tutti gli endpoint sono esposti tramite webhook n8n:

- `GET /api/opere` - Lista opere
- `POST /api/opere` - Crea opera
- `GET /api/clienti` - Lista clienti
- `POST /api/vendite` - Registra vendita
- `POST /api/spese` - Registra spesa
- `GET /api/dashboard/stats` - KPI dashboard

Documentazione completa API: `docs/api-reference.md`

## 📱 Pagine Applicazione

1. **Dashboard** - Overview KPI e grafici
2. **Opere** - Gestione catalogo
3. **Clienti** - CRM
4. **Vendite** - Tracking vendite
5. **Economia** - Gestione spese/ricavi
6. **Fatture** - Fatturazione
7. **Calendario** - Appuntamenti
8. **Report** - Reportistica fiscale

## 🎨 Design

Stile **professionale e semplice**:
- Palette: blu scuro (#2C3E50), grigio elegante
- Typography: Inter/Roboto
- UI pulita con cards e tabelle chiare
- Responsive design

## 📝 Licenza

MIT License - Uso personale e commerciale

## 👤 Autore

Gianni Gresplan - Agente di commercio settore arte

## 🤝 Contributi

Questo è un progetto personale. Per suggerimenti: apri una issue.

---

**Versione:** 1.0.0
**Ultima modifica:** 2026-01-17
