#!/bin/sh
set -e

# ── Percorsi ──────────────────────────────────────────────────────────────────────
# L'immagine ufficiale nodered/node-red usa /data come userDir
DATA_DIR="/data"
CRED_FILE="$DATA_DIR/flows_cred.json"
FLOW_SRC="/app/flow_VIP.json"
FLOW_DST="$DATA_DIR/flows.json"

echo "🚀 Avvio VIP Bot..."

# Crea directory dati se non esiste
mkdir -p "$DATA_DIR"

# ── Verifica variabili obbligatorie ───────────────────────────────────────────────
if [ -z "$BOT_TOKEN" ]; then
    echo "❌ ERRORE: BOT_TOKEN non impostato su Railway!"
    echo "   Railway → Variables → aggiungi BOT_TOKEN"
    exit 1
fi

# ── Verifica che il flow esista ───────────────────────────────────────────────────
if [ ! -f "$FLOW_SRC" ]; then
    echo "❌ ERRORE: flow_VIP.json non trovato in /app/"
    exit 1
fi

# ── Pulizia Projects (evita modal 'flow file not found') ─────────────────────────
echo "🧹 Pulizia configurazione Projects..."
rm -rf "$DATA_DIR/projects"
rm -f  "$DATA_DIR/.config.projects.json"
rm -f  "$DATA_DIR/.config.nodes.json"
rm -f  "$DATA_DIR/.config.runtime.json"
echo "✅ Pulizia completata"

# ── Copia flow aggiornato da GitHub → volume dati ────────────────────────────────
cp "$FLOW_SRC" "$FLOW_DST"
echo "✅ Flow copiato: $FLOW_DST"

# ── Inietta credenziali Telegram da variabile Railway ─────────────────────────────
# ID nodo bot Telegram nel flow: tg_bot_cfg
cat > "$CRED_FILE" << CREDENTIALS
{
  "tg_bot_cfg": {
    "token": "${BOT_TOKEN}"
  }
}
CREDENTIALS
echo "✅ Credenziali Telegram iniettate"

# ── Avvia Node-RED ────────────────────────────────────────────────────────────────
echo "🟢 Avvio Node-RED su porta ${PORT:-1880}..."
exec node-red \
    --userDir "$DATA_DIR" \
    --port "${PORT:-1880}" \
    -s /app/settings.js 2>&1
