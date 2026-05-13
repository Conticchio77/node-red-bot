// Node-RED Settings — ottimizzato per Railway
module.exports = {
    // Porta da env (Railway la imposta automaticamente)
    uiPort: process.env.PORT || 1880,

    // Binding su tutte le interfacce: necessario per Railway
    uiHost: "0.0.0.0",

    // Directory dati runtime (volume persistente su Railway)
    userDir: "/app/data",

    // File del flow da caricare all'avvio
    flowFile: "flows.json",

    // Credenziali NON cifrate → le inietta entrypoint.sh da env var
    credentialSecret: false,

    // Admin UI abilitata per accedere all'editor
    httpAdminRoot: "/",

    // Editor visuale abilitato
    disableEditor: false,

    // ✅ Projects DISABILITATI
    projects: {
        enabled: false
    },

    // Autenticazione editor (usa le variabili Railway)
    adminAuth: process.env.NODE_RED_USERNAME ? {
        type: "credentials",
        users: [{
            username: process.env.NODE_RED_USERNAME,
            password: process.env.NODE_RED_PASSWORD,
            permissions: "*"
        }]
    } : undefined,

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

    // Moduli esterni nei function node (disabilitato per sicurezza)
    functionExternalModules: false,

    // Tema editor
    editorTheme: {
        tours: false
    }
};
