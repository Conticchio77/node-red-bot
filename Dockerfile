FROM nodered/node-red:latest

# Flow aggiornato
COPY flow_VIP_v41_FIXED.json /data/flows.json

# Settings con persistenza
COPY settings.js /data/settings.js
