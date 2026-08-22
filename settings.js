// Node-RED Settings — ottimizzato per Railway con immagine nodered/node-red:latest
module.exports = {

    // ── Rete ───────────────────────────────────────────────────────────────────────
    uiPort: process.env.PORT || 1880,
    uiHost: "0.0.0.0",

    // ── Directory dati (deve corrispondere al volume Railway montato su /data) ─────
    userDir: "/data",
    flowFile: "flows.json",

    // ── Credenziali ────────────────────────────────────────────────────────────────
    // false = non cifrate → gestite da entrypoint.sh tramite BOT_TOKEN
    credentialSecret: false,

    // ── Editor ────────────────────────────────────────────────────────────────────
    httpAdminRoot: "/",
    disableEditor: false,

    // Autenticazione editor DISABILITATA (accesso libero all'editor)
    // adminAuth: { ... },  ← decommentare se si vuole proteggere l'editor

    // ── Projects DISABILITATI ─────────────────────────────────────────────────────
    projects: {
        enabled: false
    },

    // ── Logging ────────────────────────────────────────────────────────────────────
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },

    // ── Context storage (sopravvive ai restart) ───────────────────────────────────
    // flushInterval abbassato da 30s (default) a 5s: riduce la finestra in cui un
    // flow.set() non ancora scritto su disco può perdersi se il container viene
    // riavviato proprio in quel momento (es. blocco anti-doppione del menu free).
    contextStorage: {
        default: {
            module: "localfilesystem",
            config: {
                flushInterval: 5
            }
        }
    },

    // ── Limiti ────────────────────────────────────────────────────────────────────
    apiMaxLength: "5mb",
    httpRequestTimeout: 30000,
    functionExternalModules: false,

    // ── Tema ──────────────────────────────────────────────────────────────────────
    editorTheme: {
        tours: false
    }
};
