# 🤖 VIP Signals Bot — Node-RED su Railway

Bot Telegram per segnali VIP, basato su Node-RED e deployato su Railway.

---

## 📁 Struttura del repository

```
node-red-bot/
├── Dockerfile          ← build del container
├── entrypoint.sh       ← script di avvio (inietta il token)
├── settings.js         ← configurazione Node-RED
├── package.json        ← dipendenze npm
├── flow_VIP.json       ← il flow Node-RED (aggiornare ad ogni modifica)
├── .gitignore          ← esclude segreti e file temporanei
└── README.md           ← questo file
```

---

## 🔐 Variabili d'ambiente (Railway → Variables)

| Variabile | Descrizione |
|---|---|
| `BOT_TOKEN` | Token del bot Telegram (da @BotFather) |
| `NODE_RED_USERNAME` | Username per accedere all'editor Node-RED |
| `NODE_RED_PASSWORD` | Password per l'editor Node-RED (hash bcrypt) |
| `NODE_RED_CREDENTIAL_SECRET` | Chiave per cifrare le credenziali |

> ⚠️ **Non mettere MAI questi valori nel codice o su GitHub!**

---

## 🔄 Come aggiornare il flow

1. Modifica il flow nell'editor Node-RED
2. Menu ☰ → **Export** → **All flows** → Download JSON
3. Rinomina il file scaricato in **`flow_VIP.json`**
4. Sostituisci il file nel repository
5. Fai `git add flow_VIP.json && git commit -m "Update flow" && git push`
6. Railway fa il rebuild automaticamente ✅

---

## 🚀 Deploy su Railway

Railway è collegato a questo repository GitHub e fa il build automatico ad ogni push.

Per collegarlo:
- Railway → Settings → Source → seleziona questo repository
