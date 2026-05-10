# ── Base image ─────────────────────────────────────────────────────────────────
FROM node:18-alpine

# ── Metadati ────────────────────────────────────────────────────────────────────
LABEL maintainer="Conticchio77"
LABEL description="Node-RED VIP Telegram Bot"

# ── Variabili build ─────────────────────────────────────────────────────────────
ENV NODE_ENV=production
ENV NODE_RED_VERSION=3.1.9

# ── Directory applicazione ──────────────────────────────────────────────────────
WORKDIR /app

# ── Dipendenze sistema ──────────────────────────────────────────────────────────
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# ── Installa Node-RED e plugin Telegram ─────────────────────────────────────────
COPY package.json ./
RUN npm install --omit=dev \
    && npm cache clean --force

# ── Copia files applicazione ────────────────────────────────────────────────────
COPY settings.js ./
COPY flow_VIP_v44_FIXED.json ./
COPY entrypoint.sh ./

# ── Permessi entrypoint ─────────────────────────────────────────────────────────
RUN chmod +x entrypoint.sh

# ── Crea directory dati (persiste su Railway con volume) ────────────────────────
RUN mkdir -p /app/data

# ── Porta (Railway usa la variabile PORT) ───────────────────────────────────────
EXPOSE 1880

# ── Healthcheck ─────────────────────────────────────────────────────────────────
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
    CMD wget -qO- http://localhost:${PORT:-1880}/ 2>/dev/null | grep -q "." || exit 1

# ── Avvio ────────────────────────────────────────────────────────────────────────
ENTRYPOINT ["./entrypoint.sh"]
