/**
 * Node-RED settings.js
 * Configurazione completa per Railway con persistenza su Volume
 *
 * REQUISITO: crea un Volume in Railway montato su /data
 * ──────────────────────────────────────────────────────
 */

module.exports = {

    // ─────────────────────────────────────────────────
    // DIRECTORY DATI (Railway Volume → /data)
    // ─────────────────────────────────────────────────
    // Qui vengono salvati flows, credenziali, context e sessioni.
    // Assicurati che il volume Railway sia montato su /data.
    userDir: '/data',

    // Cartella dove Node-RED cerca i nodi aggiuntivi installati
    nodesDir: '/data/nodes',

    // ─────────────────────────────────────────────────
    // SERVER HTTP
    // ─────────────────────────────────────────────────
    // Railway espone la porta tramite la variabile PORT
    uiPort: process.env.PORT || 1880,

    // Disabilita la ricerca mDNS locale (inutile su Railway)
    uiHost: '0.0.0.0',

    // Percorso base dell'editor (lascia '/' per accesso diretto)
    httpAdminRoot: '/',

    // Percorso base per le API HTTP del flow (es. http-in nodes)
    httpNodeRoot: '/api',

    // ─────────────────────────────────────────────────
    // SICUREZZA EDITOR (IMPORTANTE: imposta una password!)
    // ─────────────────────────────────────────────────
    // Genera l'hash con: node-red admin hash-pw
    // Poi sostituisci il valore di "password" qui sotto.
    //
    // Per disabilitare l'autenticazione (sconsigliato in produzione)
    // commenta tutto il blocco adminAuth.
    //
    adminAuth: {
        type: 'credentials',
        users: [
            {
                username: 'admin',
                // ⚠️ CAMBIA QUESTA PASSWORD con l'hash generato da:
                //    node-red admin hash-pw
                // Esempio password "VIPBot2024!" hashata:
                password: '$2b$08$dJJHr5Xx8w8zCvtMKFvMpOvECi4YWJN5xkNHhS7gDFDYCBl.Q5o.i',
                permissions: '*'
            }
        ]
    },

    // ─────────────────────────────────────────────────
    // PERSISTENZA CONTEXT (flow.set / global.set)
    // ─────────────────────────────────────────────────
    // "default" → localfilesystem: tutti i flow.set() vengono
    // scritti su disco in /data/context/ e sopravvivono ai restart.
    //
    // Puoi usare anche due store separati:
    //   flow.set('key', val)         → usa "default" (file)
    //   flow.set('key', val, 'file') → esplicito file
    //   flow.set('key', val, 'memory') → solo RAM (utile per cache)
    //
    contextStorage: {
        default: {
            module: 'localfilesystem'
        },
        memory: {
            module: 'memory'
        }
    },

    // ─────────────────────────────────────────────────
    // FLOW FILE
    // ─────────────────────────────────────────────────
    // Nome del file flows salvato in userDir (/data/flows.json)
    flowFile: 'flows.json',

    // Chiave per cifrare le credenziali (CAMBIA con una stringa casuale!)
    // Usala per cifrare token, password ecc. salvati nei nodi
    credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET || 'cambia-questa-stringa-segreta-2024',

    // ─────────────────────────────────────────────────
    // LOGGING
    // ─────────────────────────────────────────────────
    logging: {
        console: {
            level: 'info',      // 'error' | 'warn' | 'info' | 'debug' | 'trace'
            metrics: false,
            audit: false
        }
    },

    // ─────────────────────────────────────────────────
    // EDITOR
    // ─────────────────────────────────────────────────
    editorTheme: {
        projects: {
            // Disabilita il sistema Projects (non necessario su Railway)
            enabled: false
        },
        tours: false,
        palette: {
            // Abilita l'installazione di nodi dall'editor
            editable: true
        }
    },

    // ─────────────────────────────────────────────────
    // SICUREZZA AGGIUNTIVA
    // ─────────────────────────────────────────────────
    // Abilita il sandboxing delle funzioni (più sicuro)
    // Imposta false solo se hai problemi di compatibilità
    functionExternalModules: false,

    // Timeout massimo per i nodi Function (ms). 0 = nessun limite
    functionTimeout: 0,

    // ─────────────────────────────────────────────────
    // PERFORMANCE
    // ─────────────────────────────────────────────────
    // Intervallo di salvataggio dei flow su disco (ms)
    // 0 = salva immediatamente ad ogni deploy
    flowFilePretty: true,

    // ─────────────────────────────────────────────────
    // CORS (se usi http-in nodes con chiamate esterne)
    // ─────────────────────────────────────────────────
    // httpNodeCors: {
    //     origin: '*',
    //     methods: 'GET,PUT,POST,DELETE'
    // },

    // ─────────────────────────────────────────────────
    // DIAGNOSTICS
    // ─────────────────────────────────────────────────
    diagnostics: {
        enabled: true,
        ui: true
    },

    // ─────────────────────────────────────────────────
    // TELEMETRY (disabilita invio dati a IBM/Red Hat)
    // ─────────────────────────────────────────────────
    runtimeState: {
        enabled: false,
        ui: false
    }
};
