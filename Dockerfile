FROM nodered/node-red:latest
COPY flow_VIP_v41_FIXED.json /data/flows.json
COPY settings.js /data/settings.js
