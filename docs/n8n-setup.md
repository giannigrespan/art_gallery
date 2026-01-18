# Setup n8n - Art Gallery Manager

Guida completa per configurare n8n come backend dell'applicazione Art Gallery Manager.

## 📋 Indice

1. [Installazione n8n](#installazione-n8n)
2. [Configurazione Google Sheets](#configurazione-google-sheets)
3. [Creazione Workflow](#creazione-workflow)
4. [Esempi Workflow](#esempi-workflow)
5. [Testing](#testing)
6. [Deployment](#deployment)

---

## 🚀 Installazione n8n

### Opzione 1: n8n Cloud (Consigliato per iniziare)

1. Vai su [n8n.cloud](https://n8n.cloud)
2. Registrati per un account gratuito
3. Crea un nuovo workspace
4. URL della tua istanza: `https://[tuo-workspace].app.n8n.cloud`

**Vantaggi:**
- Setup immediato
- HTTPS già configurato
- Backup automatici
- Piano gratuito disponibile

### Opzione 2: Self-Hosted (NPM)

```bash
# Installa n8n globalmente
npm install -g n8n

# Avvia n8n
n8n start

# n8n sarà disponibile su http://localhost:5678
```

### Opzione 3: Docker

```bash
# Avvia n8n con Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Accedi su http://localhost:5678
```

---

## 🔑 Configurazione Google Sheets

### 1. Crea Credenziali Google

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto "Art Gallery Manager"
3. Abilita l'API **Google Sheets API**
4. Abilita l'API **Google Drive API** (per upload foto/documenti)

### 2. Crea Service Account

1. In Google Cloud Console → IAM & Admin → Service Accounts
2. Create Service Account
3. Nome: `n8n-art-gallery`
4. Crea e scarica la chiave JSON
5. **Salva il file JSON in modo sicuro**

### 3. Condividi Google Sheet con Service Account

1. Apri il file "GalleriaDB" in Google Sheets
2. Click su "Share"
3. Incolla l'email del service account (formato: `name@project.iam.gserviceaccount.com`)
4. Imposta permessi: **Editor**
5. Click "Send"

### 4. Configura Credenziali in n8n

1. In n8n, vai su **Settings → Credentials**
2. Click **Add Credential**
3. Seleziona **Google Sheets API**
4. Scegli metodo: **Service Account**
5. Incolla il contenuto del file JSON
6. Salva con nome: `Google Sheets - GalleriaDB`

---

## 🔧 Creazione Workflow

I workflow n8n funzionano come **API endpoints** che il frontend chiamerà.

### Struttura Base Workflow

Ogni workflow segue questo pattern:

```
Webhook Trigger → Process Data → Google Sheets Node → Response
```

### Webhook Configuration

Per ogni endpoint:

1. **Webhook Node** (trigger)
   - **Method**: GET, POST, PUT, DELETE
   - **Path**: `/webhook/[nome-endpoint]`
   - **Response Mode**: Using 'Respond to Webhook' Node

2. **Processing Nodes** (opzionale)
   - Validazione dati
   - Trasformazione
   - Calcoli

3. **Google Sheets Node**
   - **Credential**: Seleziona "Google Sheets - GalleriaDB"
   - **Operation**: Append, Update, Lookup, Delete
   - **Sheet**: Seleziona il foglio corretto

4. **Respond to Webhook**
   - **Response Code**: 200, 201, 404, etc.
   - **Response Body**: JSON con risultato

---

## 📝 Esempi Workflow

### 1. GET /api/opere - Lista Opere

**Workflow Name:** `GET Opere`

#### Nodes:

**1. Webhook**
- Method: `GET`
- Path: `/webhook/opere`

**2. Google Sheets - Read**
- Credential: `Google Sheets - GalleriaDB`
- Resource: `Sheet`
- Operation: `Read`
- Document ID: `[TUO_GOOGLE_SHEET_ID]`
- Sheet Name: `Opere`
- Range: `A2:M` (tutte le righe tranne header)

**3. Function - Transform Data**
```javascript
// Trasforma array in oggetti JSON
const items = $input.all();
const opere = items.map(item => ({
  id: item.json[0],
  artista: item.json[1],
  titolo: item.json[2],
  anno: item.json[3],
  tecnica: item.json[4],
  dimensioni: item.json[5],
  prezzoAcquisto: parseFloat(item.json[6]),
  prezzoVendita: parseFloat(item.json[7]),
  commissione: parseFloat(item.json[8]),
  disponibile: item.json[9] === 'Disponibile',
  fotoUrl: item.json[10],
  note: item.json[11],
  dataInserimento: item.json[12]
}));

return opere.map(opera => ({ json: opera }));
```

**4. Respond to Webhook**
- Response Code: `200`
- Body:
```json
{
  "success": true,
  "data": {{ $json }}
}
```

---

### 2. POST /api/opere - Crea Opera

**Workflow Name:** `POST Opera`

#### Nodes:

**1. Webhook**
- Method: `POST`
- Path: `/webhook/opere`

**2. Function - Prepare Data**
```javascript
// Prendi dati dal body della richiesta
const body = $input.item.json.body;

// Genera nuovo ID (puoi usare timestamp o query max ID)
const newId = Date.now();

// Prepara riga per Google Sheets
return [{
  json: {
    values: [[
      newId,
      body.artista,
      body.titolo,
      body.anno,
      body.tecnica,
      body.dimensioni,
      body.prezzoAcquisto,
      body.prezzoVendita,
      body.commissione || 15,
      'Disponibile',
      body.fotoUrl || '',
      body.note || '',
      new Date().toLocaleDateString('it-IT')
    ]]
  }
}];
```

**3. Google Sheets - Append**
- Operation: `Append`
- Document ID: `[TUO_GOOGLE_SHEET_ID]`
- Sheet Name: `Opere`
- Range: `A:M`
- Value Input Mode: `RAW`
- Data: `={{ $json.values }}`

**4. Respond to Webhook**
- Response Code: `201`
- Body:
```json
{
  "success": true,
  "message": "Opera creata con successo",
  "id": {{ $node["Function"].json.values[0][0] }}
}
```

---

### 3. GET /api/dashboard/stats - Dashboard KPI

**Workflow Name:** `GET Dashboard Stats`

#### Nodes:

**1. Webhook**
- Method: `GET`
- Path: `/webhook/dashboard/stats`

**2. Google Sheets - Read Vendite**
- Sheet: `Vendite`
- Range: `A2:J`

**3. Google Sheets - Read Spese**
- Sheet: `Spese`
- Range: `A2:J`

**4. Google Sheets - Read Opere**
- Sheet: `Opere`
- Range: `A2:J`

**5. Google Sheets - Read Appuntamenti**
- Sheet: `Appuntamenti`
- Range: `A2:I`

**6. Function - Calculate Stats**
```javascript
// Recupera dati da tutti i nodi precedenti
const vendite = $('Google Sheets - Read Vendite').all();
const spese = $('Google Sheets - Read Spese').all();
const opere = $('Google Sheets - Read Opere').all();
const appuntamenti = $('Google Sheets - Read Appuntamenti').all();

// Data mese corrente
const now = new Date();
const primoGiornoMese = new Date(now.getFullYear(), now.getMonth(), 1);

// Calcola vendite mese
const venditeMese = vendite
  .filter(v => new Date(v.json[1]) >= primoGiornoMese)
  .reduce((sum, v) => sum + parseFloat(v.json[4] || 0), 0);

// Calcola spese mese
const speseMese = spese
  .filter(s => new Date(s.json[1]) >= primoGiornoMese)
  .reduce((sum, s) => sum + parseFloat(s.json[4] || 0), 0);

// Conta opere disponibili
const opereDisponibili = opere
  .filter(o => o.json[9] === 'Disponibile')
  .length;

// Conta appuntamenti settimana prossima
const inizioSettimana = new Date();
const fineSettimana = new Date(inizioSettimana);
fineSettimana.setDate(fineSettimana.getDate() + 7);

const appuntamentiSettimana = appuntamenti
  .filter(a => {
    const dataApp = new Date(a.json[1]);
    return dataApp >= inizioSettimana && dataApp <= fineSettimana;
  })
  .length;

return [{
  json: {
    venditeMese: { valore: venditeMese, cambio: 12.5 },
    speseMese: { valore: speseMese, cambio: -5.2 },
    opereDisponibili: { valore: opereDisponibili, cambio: 3 },
    appuntamentiSettimana: { valore: appuntamentiSettimana, cambio: 2 }
  }
}];
```

**7. Respond to Webhook**
- Response Code: `200`
- Body: `{{ $json }}`

---

### 4. POST /api/spese - Registra Spesa

**Workflow Name:** `POST Spesa`

Simile a POST Opera, ma per il foglio Spese.

```javascript
// Function - Prepare Data
const body = $input.item.json.body;
const newId = Date.now();

return [{
  json: {
    values: [[
      newId,
      body.data,
      body.categoria,
      body.descrizione,
      body.importo,
      body.iva || 0,
      body.deducibile || 'Sì',
      body.documentoUrl || '',
      body.fornitore || '',
      body.note || ''
    ]]
  }
}];
```

---

## 🧪 Testing

### Test con Postman/Insomnia

1. Attiva il workflow in n8n
2. Copia il webhook URL (es. `https://tua-istanza.n8n.cloud/webhook/opere`)
3. Usa Postman per testare:

**GET Request:**
```
GET https://tua-istanza.n8n.cloud/webhook/opere
```

**POST Request:**
```
POST https://tua-istanza.n8n.cloud/webhook/opere
Content-Type: application/json

{
  "artista": "Test Artista",
  "titolo": "Opera di Test",
  "anno": 2026,
  "tecnica": "Olio su tela",
  "dimensioni": "50x70",
  "prezzoAcquisto": 1000,
  "prezzoVendita": 1500,
  "commissione": 15
}
```

### Test dal Frontend

1. Copia il webhook URL
2. Aggiorna `src/js/config.js`:
   ```javascript
   N8N_BASE_URL: 'https://tua-istanza.n8n.cloud'
   ```
3. Apri `index.html` in un browser
4. Verifica che la Dashboard carichi i dati

---

## 🔒 Sicurezza

### Autenticazione Webhook (Opzionale)

Per proteggere gli endpoint:

**1. Basic Auth:**
- In Webhook Node → Settings → Authentication: `Basic Auth`
- Username e Password

**2. Header Authentication:**
```javascript
// In Function node all'inizio del workflow
const headers = $input.item.json.headers;
const apiKey = headers['x-api-key'];

if (apiKey !== 'TUO_SECRET_KEY') {
  return [{
    json: {
      error: 'Unauthorized'
    }
  }];
}
```

### CORS (se necessario)

Aggiungi headers CORS in "Respond to Webhook":

```json
{
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type"
  }
}
```

---

## 📦 Export/Import Workflow

### Export Workflow

1. Apri workflow in n8n
2. Menu → Download
3. Salva file JSON in `n8n-workflows/[nome-workflow].json`

### Import Workflow

1. In n8n, click **+**
2. Menu → Import from File
3. Seleziona il file JSON
4. Configura le credenziali

---

## 🌐 Deployment Produzione

### n8n Cloud

Già in produzione! Usa l'URL fornito.

### Self-Hosted con HTTPS

```bash
# Con nginx reverse proxy
# Configura SSL con Let's Encrypt
# Proxy pass a localhost:5678
```

---

## 📊 Workflow da Creare

Ecco l'elenco completo dei workflow necessari:

### Core CRUD

- [ ] `GET /webhook/opere` - Lista opere
- [ ] `POST /webhook/opere` - Crea opera
- [ ] `PUT /webhook/opere/:id` - Aggiorna opera
- [ ] `DELETE /webhook/opere/:id` - Elimina opera
- [ ] `GET /webhook/clienti` - Lista clienti
- [ ] `POST /webhook/clienti` - Crea cliente
- [ ] `GET /webhook/vendite` - Lista vendite
- [ ] `POST /webhook/vendite` - Registra vendita
- [ ] `POST /webhook/spese` - Registra spesa
- [ ] `GET /webhook/spese` - Lista spese
- [ ] `POST /webhook/ricavi` - Registra ricavo
- [ ] `GET /webhook/fatture` - Lista fatture
- [ ] `POST /webhook/fatture` - Crea fattura
- [ ] `GET /webhook/appuntamenti` - Lista appuntamenti
- [ ] `POST /webhook/appuntamenti` - Crea appuntamento

### Dashboard & Analytics

- [ ] `GET /webhook/dashboard/stats` - KPI dashboard
- [ ] `GET /webhook/dashboard/charts` - Dati per grafici
- [ ] `GET /webhook/report/fiscale` - Report fiscale annuale

### Automazioni (Opzionale)

- [ ] **Calcolo automatico commissioni** - Trigger su nuova vendita
- [ ] **Reminder appuntamenti** - Cron job giornaliero
- [ ] **Backup settimanale** - Export dati ogni domenica
- [ ] **Alert fatture in scadenza** - Notifica 5 giorni prima

---

## 💡 Consigli

1. **Inizia semplice**: Crea prima i workflow GET per testare la connessione
2. **Testa sempre**: Usa il "Execute Workflow" button in n8n
3. **Gestisci errori**: Aggiungi nodi "Error Trigger" per logging
4. **Versiona i workflow**: Exporta regolarmente i JSON
5. **Monitora le chiamate**: n8n mostra statistiche di esecuzione

---

## 🆘 Troubleshooting

### Errore: "Credentials not found"

- Verifica di aver configurato le credenziali Google Sheets
- Controlla che il service account abbia accesso al foglio

### Errore: "Sheet not found"

- Verifica il nome esatto del foglio (case-sensitive)
- Controlla che il Sheet ID sia corretto

### CORS Error dal frontend

- Aggiungi headers CORS in "Respond to Webhook"
- Usa `Access-Control-Allow-Origin: *` per testing

### Dati non si aggiornano

- Controlla il formato dei dati in input
- Verifica la range specificata in Google Sheets node
- Usa "Execute Node" in n8n per debuggare

---

**Prossimi passi:** Inizia creando il workflow `GET /webhook/opere` per testare la connessione!
