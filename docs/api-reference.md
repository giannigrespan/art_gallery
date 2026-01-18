# API Reference - Art Gallery Manager

Documentazione completa degli endpoint API esposti da n8n.

## Base URL

```
https://[tua-istanza].n8n.cloud
```

oppure

```
http://localhost:5678
```

---

## 🎨 Opere d'Arte

### GET /webhook/opere

Lista tutte le opere nel catalogo.

**Request:**
```http
GET /webhook/opere
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "artista": "Giovanni Bianchi",
      "titolo": "Tramonto sul Mare",
      "anno": 2023,
      "tecnica": "Olio su tela",
      "dimensioni": "80x100 cm",
      "prezzoAcquisto": 5000,
      "prezzoVendita": 8000,
      "commissione": 15,
      "disponibile": true,
      "fotoUrl": "https://...",
      "note": "Certificato presente",
      "dataInserimento": "15/01/2026"
    }
  ]
}
```

### POST /webhook/opere

Crea una nuova opera.

**Request:**
```http
POST /webhook/opere
Content-Type: application/json

{
  "artista": "Maria Rossi",
  "titolo": "Astrazione Moderna",
  "anno": 2024,
  "tecnica": "Acrilico",
  "dimensioni": "120x120 cm",
  "prezzoAcquisto": 8000,
  "prezzoVendita": 12000,
  "commissione": 20,
  "fotoUrl": "https://...",
  "note": "Opera unica"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Opera creata con successo",
  "id": 1705485670123
}
```

---

## 👥 Clienti

### GET /webhook/clienti

Lista tutti i clienti.

**Request:**
```http
GET /webhook/clienti
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Galleria Moderna",
      "tipo": "Galleria",
      "email": "info@galleriamoderna.it",
      "telefono": "+39 02 1234567",
      "piva": "IT12345678901"
    }
  ]
}
```

### POST /webhook/clienti

Crea nuovo cliente.

**Request:**
```json
{
  "nome": "Marco Rossi",
  "tipo": "Collezionista",
  "email": "marco@example.com",
  "telefono": "+39 333 1234567",
  "note": "Interessato ad arte contemporanea"
}
```

---

## 💰 Vendite

### GET /webhook/vendite

Lista vendite con filtri opzionali.

**Query Parameters:**
- `stato` (opzionale): `Trattativa`, `Conclusa`, `Pagata`
- `da` (opzionale): Data inizio (YYYY-MM-DD)
- `a` (opzionale): Data fine (YYYY-MM-DD)

**Request:**
```http
GET /webhook/vendite?stato=Conclusa&da=2026-01-01
```

### POST /webhook/vendite

Registra nuova vendita.

**Request:**
```json
{
  "operaId": 5,
  "clienteId": 3,
  "prezzoFinale": 7500,
  "stato": "Trattativa",
  "note": "Cliente molto interessato"
}
```

---

## 💼 Gestione Economica

### POST /webhook/spese

Registra spesa deducibile.

**Request:**
```json
{
  "data": "2026-01-15",
  "categoria": "Trasporto",
  "descrizione": "Treno Milano-Roma",
  "importo": 85.50,
  "iva": 18.81,
  "deducibile": "Sì",
  "fornitore": "Trenitalia"
}
```

### GET /webhook/spese

Lista spese con filtri.

**Query Parameters:**
- `categoria`: Filtra per categoria
- `da`: Data inizio
- `a`: Data fine

### POST /webhook/ricavi

Registra ricavo.

**Request:**
```json
{
  "data": "2026-01-20",
  "tipo": "Commissione",
  "clienteId": 3,
  "descrizione": "Commissione vendita opera",
  "importo": 1125,
  "iva": 247.50,
  "fatturaNumero": "F-2026-005"
}
```

---

## 📄 Fatture

### POST /webhook/fatture

Crea nuova fattura.

**Request:**
```json
{
  "numero": "F-2026-001",
  "clienteId": 3,
  "importoNetto": 1000,
  "iva": 220,
  "scadenza": "2026-01-30"
}
```

### PUT /webhook/fatture/:id

Aggiorna fattura (es. segna come pagata).

**Request:**
```json
{
  "pagata": "Sì",
  "dataPagamento": "2026-01-25"
}
```

---

## 📅 Appuntamenti

### GET /webhook/appuntamenti

Lista appuntamenti futuri.

### POST /webhook/appuntamenti

Crea appuntamento.

**Request:**
```json
{
  "data": "2026-01-18",
  "ora": "14:30",
  "clienteId": 5,
  "tipo": "Presentazione opere",
  "luogo": "Galleria Moderna, Milano",
  "note": "Portare catalogo opere moderne"
}
```

---

## 📊 Dashboard & Report

### GET /webhook/dashboard/stats

Ritorna KPI per la dashboard.

**Response:**
```json
{
  "venditeMese": { "valore": 15800, "cambio": 12.5 },
  "speseMese": { "valore": 3200, "cambio": -5.2 },
  "opereDisponibili": { "valore": 47, "cambio": 3 },
  "appuntamentiSettimana": { "valore": 8, "cambio": 2 }
}
```

### GET /webhook/dashboard/charts

Dati per i grafici dashboard.

**Response:**
```json
{
  "venditeSpeseUltimi6Mesi": {
    "labels": ["Ago", "Set", "Ott", "Nov", "Dic", "Gen"],
    "vendite": [12000, 15000, 13500, 18000, 14000, 15800],
    "spese": [3500, 2800, 4200, 3000, 3400, 3200]
  },
  "commissioniPerArtista": {
    "labels": ["Artista A", "Artista B", "Artista C"],
    "values": [4500, 3200, 2800]
  }
}
```

### GET /webhook/report/fiscale

Report fiscale annuale.

**Query Parameters:**
- `anno`: Anno fiscale (default: anno corrente)

**Response:**
```json
{
  "anno": 2026,
  "totaleRicavi": 45000,
  "totaleSpese": 18500,
  "totaleIvaRicavi": 9900,
  "totaleIvaSpese": 4070,
  "spesePerCategoria": {
    "Trasporto": 5200,
    "Vitto": 3800,
    "Alloggio": 4500,
    "Materiali": 3000,
    "Servizi": 2000
  }
}
```

---

## ❌ Error Handling

Tutti gli endpoint ritornano errori nel formato:

```json
{
  "success": false,
  "error": "Messaggio di errore descrittivo"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## 🔐 Autenticazione

(Opzionale - da configurare in n8n)

Se attivi autenticazione, aggiungi header:

```http
X-API-Key: TUO_SECRET_KEY
```

oppure Basic Auth.
