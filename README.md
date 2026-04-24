# node-red-bot 🤖

Bot Telegram VIP segnali — Node-RED su Railway.

---

## 📁 File del progetto

| File | Descrizione |
|------|-------------|
| `Dockerfile` | Build container per Railway |
| `package.json` | Dipendenze Node-RED + plugin Telegram |
| `settings.js` | Configurazione Node-RED (porta, credenziali, log) |
| `entrypoint.sh` | Script avvio: inietta `BOT_TOKEN` nelle credenziali |
| `flow_VIP_v44_FIXED.json` | Flow Node-RED con tutte le logiche bot |

---

## 🚀 Deploy su Railway — Passo per passo

### 1. Push su GitHub

```bash
git add .
git commit -m "Update flow_VIP_v44_FIXED.json"
git push origin main
```

### 2. Crea il servizio su Railway

1. Vai su [railway.app](https://railway.app) → **New Project**
2. Seleziona **Deploy from GitHub repo**
3. Scegli il repo `node-red-bot`
4. Railway rileverà automaticamente il `Dockerfile`

### 3. Imposta le variabili d'ambiente (OBBLIGATORIO)

Vai su **railway.app → il tuo servizio → Variables** e aggiungi:

| Variabile | Valore | Obbligatorio |
|-----------|--------|-------------|
| `BOT_TOKEN` | `8632260663:AAHIi2HjAH...` | ✅ Sì |

> **⚠️ Importante:** Non mettere mai il token nel codice o nel flow JSON.  
> Railway gestisce le variabili in modo sicuro.

### 4. Deploy

Railway parte automaticamente dopo il push. Controlla i log dal pannello Railway per confermare:

```
✅ Flow copiato in /app/data/flows.json
✅ Credenziali Telegram iniettate
🟢 Avvio Node-RED...
```

---

## 🔧 Fix v44 — Notifica nuovo utente

**Problema vecchia versione:** quando un nuovo utente attivava il bot, l'admin riceveva solo l'ID.

**Fix applicato in v44:** il nodo `✅ ATTIVA` ora salva sempre nome, cognome e username in `msg._from`, e il nodo `⚙️ Processa Logica` li include nella notifica admin:

```
🔔 NUOVO UTENTE ATTIVATO!

👤 Nome: Mario Rossi
📱 Username: @mariorossi
🆔 ID: 123456789

🎁 Ha ricevuto 30 segnali VIP gratuiti.
```

---

## 📦 Aggiornare il flow

1. Esporta il flow da Node-RED come `flow_VIP_vXX_FIXED.json`
2. Rinomina/sostituisci il file nel repo
3. Aggiorna il nome in `entrypoint.sh` se cambi il filename
4. `git push` → Railway rideploya automaticamente

---

## 🛟 Troubleshooting

| Problema | Soluzione |
|----------|-----------|
| Bot non risponde | Controlla che `BOT_TOKEN` sia corretto nelle Variables |
| Credenziali non trovate | Verifica i log: `❌ ERRORE: variabile BOT_TOKEN non impostata` |
| Flow non si carica | Controlla che `flow_VIP_v44_FIXED.json` sia nel repo |
| Porta non risponde | Railway assegna la porta via `PORT` env var — già gestita |
