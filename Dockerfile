# ── Base image ufficiale Node-RED ────────────────────────────────────────────────
# Immagine ufficiale: stabile, aggiornata, permessi già configurati correttamente
FROM nodered/node-red:latest

# ── Metadati ─────────────────────────────────────────────────────────────────────
LABEL maintainer="Conticchio77"
LABEL description="Node-RED VIP Telegram Bot"

# ── Installa SOLO il plugin Telegram (unico necessario) ──────────────────────────
RUN npm install --prefix /usr/src/node-red \
    node-red-contrib-telegrambot@latest \
    && npm cache clean --force

# ── Copia i file dell'applicazione ───────────────────────────────────────────────
COPY --chown=node-red:node-red flow_VIP.json /app/flow_VIP.json
COPY --chown=node-red:node-red entrypoint.sh /entrypoint.sh

# ── Permessi entrypoint ──────────────────────────────────────────────────────────
USER root
RUN chmod +x /entrypoint.sh
USER node-red

# ── Porta (Railway imposta PORT automaticamente) ─────────────────────────────────
EXPOSE 1880

# ── Healthcheck ──────────────────────────────────────────────────────────────────
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget -qO- http://localhost:${PORT:-1880}/ 2>/dev/null | grep -qi "node-red\|html" || exit 1

# ── Avvio ─────────────────────────────────────────────────────────────────────────
ENTRYPOINT ["/entrypoint.sh"]
