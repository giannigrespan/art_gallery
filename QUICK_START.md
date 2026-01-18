# Quick Start Guide - Art Gallery Manager

Guida rapida per iniziare subito con l'applicazione.

## ⚡ Setup in 5 Minuti

### 1. Setup Google Sheets (2 min)

1. Vai su [Google Sheets](https://sheets.google.com)
2. Crea un nuovo foglio "GalleriaDB"
3. Crea 8 fogli: `Opere`, `Artisti`, `Clienti`, `Vendite`, `Spese`, `Ricavi`, `Fatture`, `Appuntamenti`
4. Copia le intestazioni da `docs/google-sheets-structure.md` (riga 1 di ogni foglio)
5. Aggiungi qualche dato di test
6. Copia l'ID del foglio dall'URL

**Dettagli completi:** `docs/google-sheets-structure.md`

---

### 2. Setup n8n (2 min)

**Opzione A - Cloud (Più veloce):**
1. Vai su [n8n.cloud](https://n8n.cloud)
2. Registrati (piano gratuito disponibile)
3. Crea un workspace

**Opzione B - Locale:**
```bash
npm install -g n8n
n8n start
```

**Configura credenziali Google Sheets:**
1. Segui `docs/n8n-setup.md` sezione "Configurazione Google Sheets"
2. Crea service account Google
3. Condividi il foglio con il service account
4. Aggiungi credenziali in n8n

---

### 3. Crea Primo Workflow (1 min)

Crea workflow "GET Opere" in n8n:

**Nodes:**
1. **Webhook** → GET `/webhook/opere`
2. **Google Sheets** → Read foglio "Opere" range A2:M
3. **Respond to Webhook** → Return data

**Test:** Copia URL webhook e aprilo nel browser

**Dettagli completi:** `docs/n8n-setup.md` sezione "Esempi Workflow"

---

### 4. Configura Frontend (30 sec)

1. Copia `src/js/config.example.js` in `src/js/config.js`
2. Modifica `N8N_BASE_URL` con il tuo URL n8n
3. Modifica `GOOGLE_SHEET_ID` con il tuo Sheet ID

```javascript
N8N_BASE_URL: 'https://tua-istanza.n8n.cloud',
GOOGLE_SHEET_ID: 'TUO_GOOGLE_SHEET_ID'
```

---

### 5. Lancia l'App! (10 sec)

**Metodo 1 - Browser (più veloce):**
Apri `index.html` direttamente nel browser

**Metodo 2 - Server locale:**
```bash
npm run dev
# Apri http://localhost:8080
```

---

## ✅ Verifica Installazione

1. **Dashboard si carica?** ✓
2. **Vedi i KPI (anche se mock)?** ✓
3. **Navigazione funziona?** ✓
4. **Console browser senza errori critici?** ✓

Se tutto OK: **Sei pronto! 🎉**

---

## 📝 Prossimi Passi

### Fase 1: Dati Reali (30 min)

1. Popola Google Sheets con dati reali:
   - 5-10 opere
   - 3-5 clienti
   - 2-3 vendite
   - Qualche spesa

2. Crea workflow base in n8n:
   - `GET /webhook/opere`
   - `GET /webhook/clienti`
   - `GET /webhook/dashboard/stats`

3. Testa dal frontend che i dati si caricano

### Fase 2: CRUD Completo (1-2 ore)

Crea workflow per tutte le operazioni CRUD:
- POST opere (aggiungi opera)
- PUT opere (modifica)
- DELETE opere
- Stessa cosa per clienti, vendite, etc.

**Segui:** `docs/n8n-setup.md` per esempi

### Fase 3: Funzionalità Avanzate

- Gestione spese con upload documenti
- Fatturazione completa
- Report fiscali
- Automazioni (reminder, backup)

---

## 🆘 Problemi Comuni

### "Cannot read property of undefined"
→ Verifica che `config.js` esista (non `config.example.js`)

### "CORS Error"
→ Aggiungi headers CORS in n8n "Respond to Webhook"

### "Google Sheets API Error"
→ Verifica che service account abbia accesso al foglio

### Dati non si caricano
→ Apri Console browser (F12) e controlla errori
→ Verifica URL webhook in `config.js`

---

## 📚 Documentazione Completa

- **README.md** - Overview progetto
- **docs/google-sheets-structure.md** - Struttura database dettagliata
- **docs/n8n-setup.md** - Setup n8n e workflow completi
- **docs/api-reference.md** - API endpoints reference

---

## 💡 Consigli

1. **Inizia con dati di test** - Non importare subito tutto
2. **Testa un workflow alla volta** - Più facile debuggare
3. **Usa console browser** - F12 per vedere errori
4. **Exporta workflow n8n** - Backup regolare
5. **Backup Google Sheets** - File → Make a copy

---

## 🎯 Obiettivi Milestone

- [ ] **Milestone 1:** App funziona, vedo dashboard
- [ ] **Milestone 2:** Carico dati reali da Google Sheets
- [ ] **Milestone 3:** CRUD opere funziona
- [ ] **Milestone 4:** Tutte le sezioni base funzionanti
- [ ] **Milestone 5:** Gestione economica completa
- [ ] **Milestone 6:** Report e analytics

---

## 🚀 Enjoy!

Hai creato un sistema professionale per gestire la tua attività di agente d'arte con:
- Database gratuito (Google Sheets)
- Backend flessibile (n8n)
- Frontend professionale
- Gestione economica P.IVA integrata

**Buon lavoro!** 🎨
