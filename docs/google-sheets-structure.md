# Struttura Google Sheets - GalleriaDB

Questo documento descrive la struttura completa del database Google Sheets per l'applicazione Art Gallery Manager.

## File Principale: "GalleriaDB"

Il file contiene **8 fogli di lavoro** (sheets), ciascuno rappresenta una tabella del database.

---

## 📊 Foglio 1: Opere

Catalogo completo delle opere d'arte gestite.

### Colonne:

| Colonna | Tipo | Descrizione | Esempio |
|---------|------|-------------|---------|
| A - ID | Numero | Identificativo univoco (auto-incrementale) | 1 |
| B - Artista | Testo | Nome dell'artista | Giovanni Bianchi |
| C - Titolo | Testo | Titolo dell'opera | Tramonto sul Mare |
| D - Anno | Numero | Anno di realizzazione | 2023 |
| E - Tecnica | Testo | Tecnica utilizzata | Olio su tela |
| F - Dimensioni | Testo | Dimensioni (formato libero) | 80x100 cm |
| G - Prezzo Acquisto | Numero | Prezzo di acquisto (€) | 5000 |
| H - Prezzo Vendita | Numero | Prezzo di vendita proposto (€) | 8000 |
| I - Commissione % | Numero | Percentuale commissione | 15 |
| J - Disponibilità | Testo | Disponibile / Venduta / Riservata | Disponibile |
| K - Foto URL | URL | Link alla foto dell'opera | https://... |
| L - Note | Testo | Note aggiuntive | Certificato autenticità presente |
| M - Data Inserimento | Data | Data inserimento nel catalogo | 15/01/2026 |

### Formula Suggerita:
- Colonna N - **Commissione €**: `=H2*I2/100` (calcolo automatico commissione in euro)

---

## 👨‍🎨 Foglio 2: Artisti

Anagrafica artisti.

### Colonne:

| Colonna | Tipo | Descrizione | Esempio |
|---------|------|-------------|---------|
| A - ID | Numero | Identificativo univoco | 1 |
| B - Nome | Testo | Nome artista | Giovanni |
| C - Cognome | Testo | Cognome artista | Bianchi |
| D - Nome Arte | Testo | Nome d'arte (se diverso) | G. Bianchi |
| E - Bio | Testo | Biografia breve | Artista contemporaneo... |
| F - Email | Email | Email contatto | giovanni@example.com |
| G - Telefono | Testo | Numero telefono | +39 123 456 7890 |
| H - Commissione Default % | Numero | % commissione standard | 15 |
| I - Note | Testo | Note | Preferisce pagamenti mensili |
| J - Data Inizio Collaborazione | Data | Prima collaborazione | 01/03/2023 |

---

## 👥 Foglio 3: Clienti

CRM - Anagrafica clienti (collezionisti, gallerie, musei).

### Colonne:

| Colonna | Tipo | Descrizione | Esempio |
|---------|------|-------------|---------|
| A - ID | Numero | Identificativo univoco | 1 |
| B - Nome/Azienda | Testo | Nome cliente o azienda | Galleria Moderna |
| C - Tipo | Testo | Collezionista / Galleria / Museo / Altro | Galleria |
| D - Referente | Testo | Nome referente (per aziende) | Marco Rossi |
| E - Email | Email | Email | info@galleriamoderna.it |
| F - Telefono | Testo | Telefono | +39 02 1234567 |
| G - Indirizzo | Testo | Indirizzo completo | Via Roma 10, Milano |
| H - P.IVA | Testo | Partita IVA (se applicabile) | IT12345678901 |
| I - Note | Testo | Note e preferenze | Interessato ad arte contemporanea |
| J - Data Primo Contatto | Data | Prima interazione | 10/01/2025 |
| K - Tag | Testo | Tag per categorizzazione | VIP, Arte Moderna |

---

## 💰 Foglio 4: Vendite

Registro vendite e trattative.

### Colonne:

| Colonna | Tipo | Descrizione | Esempio |
|---------|------|-------------|---------|
| A - ID | Numero | Identificativo univoco | 1 |
| B - Data | Data | Data vendita/trattativa | 15/01/2026 |
| C - Opera ID | Numero | Riferimento a Foglio Opere | 5 |
| D - Cliente ID | Numero | Riferimento a Foglio Clienti | 3 |
| E - Prezzo Finale | Numero | Prezzo concordato (€) | 7500 |
| F - Commissione € | Numero | Commissione guadagnata (€) | 1125 |
| G - Stato | Testo | Trattativa / Conclusa / Annullata / Pagata | Conclusa |
| H - Data Pagamento | Data | Data effettivo pagamento | 20/01/2026 |
| I - Metodo Pagamento | Testo | Bonifico / Contanti / Altro | Bonifico |
| J - Note | Testo | Note sulla vendita | Cliente molto soddisfatto |

### Formule Suggerite:
- Colonna F può essere calcolata automaticamente dall'opera selezionata

---

## 💼 Foglio 5: Spese

Registro spese deducibili per P.IVA.

### Colonne:

| Colonna | Tipo | Descrizione | Esempio |
|---------|------|-------------|---------|
| A - ID | Numero | Identificativo univoco | 1 |
| B - Data | Data | Data spesa | 12/01/2026 |
| C - Categoria | Testo | Trasporto / Vitto / Alloggio / Materiali / Servizi / Altro | Trasporto |
| D - Descrizione | Testo | Descrizione spesa | Treno Milano-Roma per visita cliente |
| E - Importo | Numero | Importo lordo (€) | 85.50 |
| F - IVA € | Numero | IVA (€) | 18.81 |
| G - Deducibile | Testo | Sì / No / Parziale | Sì |
| H - Documento URL | URL | Link al documento (Drive) | https://drive.google.com/... |
| I - Fornitore | Testo | Nome fornitore | Trenitalia |
| J - Note | Testo | Note | Biglietto business class |

### Formula Suggerita:
- Colonna K - **Importo Netto**: `=E2-F2`

---

## 💵 Foglio 6: Ricavi

Registro ricavi e provvigioni.

### Colonne:

| Colonna | Tipo | Descrizione | Esempio |
|---------|------|-------------|---------|
| A - ID | Numero | Identificativo univoco | 1 |
| B - Data | Data | Data ricavo | 20/01/2026 |
| C - Tipo | Testo | Commissione / Consulenza / Altro | Commissione |
| D - Cliente ID | Numero | Riferimento a Foglio Clienti | 3 |
| E - Descrizione | Testo | Descrizione | Commissione vendita opera "Tramonto sul Mare" |
| F - Importo | Numero | Importo lordo (€) | 1125 |
| G - IVA € | Numero | IVA (€) | 247.50 |
| H - Fattura N° | Testo | Numero fattura | F-2026-005 |
| I - Vendita ID | Numero | Riferimento a Foglio Vendite (opzionale) | 1 |
| J - Note | Testo | Note | Pagamento ricevuto in tempo |

---

## 📄 Foglio 7: Fatture

Gestione fatture emesse.

### Colonne:

| Colonna | Tipo | Descrizione | Esempio |
|---------|------|-------------|---------|
| A - ID | Numero | Identificativo univoco | 1 |
| B - Numero Fattura | Testo | Numero progressivo fattura | F-2026-001 |
| C - Data Emissione | Data | Data emissione | 15/01/2026 |
| D - Cliente ID | Numero | Riferimento a Foglio Clienti | 3 |
| E - Importo Netto | Numero | Imponibile (€) | 1000 |
| F - IVA € | Numero | IVA (€) | 220 |
| G - Totale | Numero | Totale fattura (€) | 1220 |
| H - Scadenza | Data | Data scadenza pagamento | 30/01/2026 |
| I - Pagata | Testo | Sì / No | No |
| J - Data Pagamento | Data | Data effettivo pagamento | - |
| K - Note | Testo | Note | Ritenuta d'acconto 20% applicata |

### Formule Suggerite:
- Colonna G - **Totale**: `=E2+F2`

---

## 📅 Foglio 8: Appuntamenti

Calendario attività e appuntamenti.

### Colonne:

| Colonna | Tipo | Descrizione | Esempio |
|---------|------|-------------|---------|
| A - ID | Numero | Identificativo univoco | 1 |
| B - Data | Data | Data appuntamento | 18/01/2026 |
| C - Ora | Ora | Ora appuntamento | 14:30 |
| D - Cliente ID | Numero | Riferimento a Foglio Clienti | 5 |
| E - Tipo | Testo | Visita / Mostra / Telefonata / Altro | Presentazione opere |
| F - Luogo | Testo | Luogo incontro | Galleria Moderna, Milano |
| G - Note | Testo | Note appuntamento | Portare catalogo opere moderne |
| H - Completato | Testo | Sì / No | No |
| I - Esito | Testo | Esito (dopo completamento) | Interessato a 3 opere |

---

## 🔧 Setup Iniziale

### 1. Crea il file Google Sheets

1. Vai su [Google Sheets](https://sheets.google.com)
2. Crea un nuovo foglio di lavoro
3. Rinominalo "GalleriaDB"

### 2. Crea i fogli (sheets)

Crea 8 fogli con questi nomi esatti:
- `Opere`
- `Artisti`
- `Clienti`
- `Vendite`
- `Spese`
- `Ricavi`
- `Fatture`
- `Appuntamenti`

### 3. Aggiungi le intestazioni

Per ogni foglio, copia le intestazioni dalla tabella sopra nella **riga 1**.

**Suggerimento:** Formatta la riga 1 con:
- Sfondo scuro (#2C3E50)
- Testo bianco
- Grassetto
- Testo centrato

### 4. Formattazione Suggerita

- **Colonne Data**: Formato data `gg/mm/aaaa`
- **Colonne Importo/Prezzo**: Formato valuta `€ #.##0,00`
- **Colonne Percentuale**: Formato percentuale `0,00%`
- **Blocca riga 1**: View → Freeze → 1 row

### 5. Validazione Dati (Opzionale)

Aggiungi validazione per alcune colonne:

**Opere - Colonna J (Disponibilità):**
- Data validation → List from a range → `Disponibile, Venduta, Riservata`

**Clienti - Colonna C (Tipo):**
- Data validation → List → `Collezionista, Galleria, Museo, Altro`

**Spese - Colonna C (Categoria):**
- Data validation → List → `Trasporto, Vitto, Alloggio, Materiali, Servizi, Altro`

### 6. Condividi con n8n

1. Click su "Share" in alto a destra
2. Cambia permessi: "Anyone with the link" → "Editor"
3. Copia l'ID del foglio dall'URL
4. L'ID è la stringa tra `/d/` e `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/[QUESTO_E_IL_TUO_ID]/edit
   ```

---

## 📊 Dashboard e Grafici (Opzionale)

Puoi creare un foglio aggiuntivo "Dashboard" con:

- **Totale vendite mese corrente**: `=SUMIF(Vendite!B:B, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1), Vendite!E:E)`
- **Totale spese mese corrente**: `=SUMIF(Spese!B:B, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1), Spese!E:E)`
- **Opere disponibili**: `=COUNTIF(Opere!J:J, "Disponibile")`
- Grafici automatici per visualizzare trend

---

## 🔐 Sicurezza

- **NON condividere pubblicamente** il foglio
- Usa permessi "Editor" solo per account fidati
- Considera l'uso di un account Google dedicato per l'attività
- Fai backup regolari (File → Make a copy)

---

## 📝 Note

- Gli ID devono essere **univoci** e **sequenziali**
- Le date devono seguire il formato italiano `gg/mm/aaaa`
- Gli importi sono sempre in **Euro (€)**
- I riferimenti tra fogli (es. Opera ID, Cliente ID) devono corrispondere agli ID effettivi

---

**Prossimi passi:** Configura i workflow n8n per interagire con questo Google Sheet (vedi `n8n-setup.md`)
