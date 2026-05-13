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

    // Autenticazione editor (usa le variabili Railway)
    adminAuth: process.env.NODE_RED_USERNAME ? {
        type: "credentials",
        users: [{
            username: process.env.NODE_RED_USERNAME,
            password: process.env.NODE_RED_PASSWORD,
            permissions: "*"
        }]
    } : undefined,

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
    contextStorage: {
        default: {
            module: "localfilesystem"
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
