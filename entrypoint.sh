#!/bin/sh
set -e

DATA_DIR="/app/data"
CRED_FILE="$DATA_DIR/flows_cred.json"
FLOW_SRC="/app/flow_VIP.json"
FLOW_DST="$DATA_DIR/flows.json"

echo "🚀 Avvio VIP Bot..."

# Crea directory dati se non esiste
mkdir -p "$DATA_DIR"

# Verifica che BOT_TOKEN sia impostato
if [ -z "$BOT_TOKEN" ]; then
    echo "❌ ERRORE: variabile BOT_TOKEN non impostata su Railway!"
    echo "   Vai su Railway → il tuo servizio → Variables → aggiungi BOT_TOKEN"
    exit 1
fi

# Verifica che il file flow esista
if [ ! -f "$FLOW_SRC" ]; then
    echo "❌ ERRORE: file flow non trovato: $FLOW_SRC"
    exit 1
fi

# ✅ Pulizia configurazione Projects dal volume (evita la modal "flow file not found")
echo "🧹 Pulizia configurazione Projects..."
rm -rf "$DATA_DIR/projects"
rm -f "$DATA_DIR/.config.projects.json"
rm -f "$DATA_DIR/.config.nodes.json"
rm -f "$DATA_DIR/.config.runtime.json"
echo "✅ Pulizia completata"

# Copia il flow nella directory dati (sovrascrive sempre con la versione da GitHub)
cp "$FLOW_SRC" "$FLOW_DST"
echo "✅ Flow copiato in $FLOW_DST"

# Genera il file delle credenziali con il token dall'env
# L'ID del nodo telegram bot è: tg_bot_cfg
cat > "$CRED_FILE" << CREDENTIALS
{
  "tg_bot_cfg": {
    "token": "${BOT_TOKEN}"
  }
}
CREDENTIALS

echo "✅ Credenziali Telegram iniettate"
echo "🟢 Avvio Node-RED..."

# Avvia Node-RED
exec node-red --settings /app/settings.js --userDir "$DATA_DIR"
