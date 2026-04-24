// Node-RED Settings — ottimizzato per Railway
module.exports = {
    // Porta da env (Railway la imposta automaticamente)
    uiPort: process.env.PORT || 1880,

    // Nessun binding fisso: Railway usa il suo proxy
    uiHost: "0.0.0.0",

    // Directory dati runtime (volume persistente su Railway o /app/data)
    userDir: "/app/data",

    // File del flow da caricare all'avvio
    flowFile: "flows.json",

    // Credenziali NON cifrate → le inietta entrypoint.sh da env var
    credentialSecret: false,

    // Admin UI abilitata per accedere all'editor
    httpAdminRoot: "/",

    // Editor visuale abilitato
    disableEditor: false,

    // Projects disabilitati → modalità classica (import manuale JSON)
    editorTheme: {
        tours: false,
        projects: {
            enabled: false
        }
    },

    // Log
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },

    // Contesto: salva su file così sopravvive ai restart
    contextStorage: {
        default: {
            module: "localfilesystem"
        }
    },

    // Sicurezza: limita dimensione payload HTTP
    apiMaxLength: "5mb",

    // Timeout HTTP request nodes (ms)
    httpRequestTimeout: 30000,

    // Ottimizzazione per container
    functionExternalModules: false
};
