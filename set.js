const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0ZXcG5pbHF3WnpYYnVDK1JQR2RKNUFibGZMMFRFVTdSR2hhUWtlYmpGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRjhHZytNYWxsQVJOZDdzaWhITHArQnhOSzZLc0Y2Tzg0bUFLQ1lET1hUQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLUEcySUpocjNsVHRLRC9hWGs3ZmYzUU05TDNtUUluWC9mQXRNUTRjQVY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJdEgydlU4d0wxYTlMTENmallZSDYzQnpNMmRybExRYXIwZS9QVTlFaVNBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNGNEU4bWhRMFdsOUFLRWhUczQrYmxnU2E5bHlMVzZtVlRGbm00ZGxUM2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlzSWVZSTBsRDNLVEhTY3ZaTUtrTnI4anIxQlptRW5qSUhNN0s2TGZ1a1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0RYQ09xTm5GcHJVcGdVbDk1S25hcUFCWXBSWm4ySW9oam9ZSGsrdXUzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFhBOU5tZkEvY2dGRHdDMHhIWmg1YUZPNmxCMDc5bk93b2tDQW12bjBuUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkwweHlxWXkwK0VKQWdYVnU0U2hxY0JQNEE2WERBZi8xYTIyMHhZYjE2Y2M0ekVxZEJqQW9jUEt4ZzRtdktHdTVtSVhtemJpTWY3dk11TVJlTUZrdmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQsImFkdlNlY3JldEtleSI6InoxQnd5S3UrM1RPSkhteXJGWEsvN1J0Uks0eGR1SXVUamhyRWdZbmY4ZFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImFpTzBwSlo0Uk15MzY0a3lTX3h2cXciLCJwaG9uZUlkIjoiMTllOWFhM2UtMTAzYS00NDM0LTgyMDMtY2U1YTkxMWIyOTJhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJINWprUTZucHRjZGlHZlE3ZVRuQ0t5aUJ5QT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwL2oyRER1ZUk4OWU4dVFNc2ljUy9ESmFoSHc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTUdOQThSVFgiLCJtZSI6eyJpZCI6IjUwOTQ3NDM0MDk5OjUzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuWNg+S6l+GthCBbIE3kuYjjg6Eg4oCifOKAoiBNSUtFWSBd4oKp4oKx8JKGnCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTERScTlzQ0VNS2NvN0FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMGs4ODNxTnNDeXlmY0UvdGs4N0kyRGRtaTEySXNuenM2VnhGZEJ2ck9Cdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNHFKVm1TVzF6MFpGYnNSOFpMS0EvUWc1WU1ZblQzWktqaTlkNk5Fekp0YkJjRGdaSmcvaHlmcWVKV3hYTVJLWS9YRzBLNThLZW5reEQyZzZXalZpQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IjczTHFoOC9Ia200dGJNektkUk1ITUhwQmUzSURZVlFDTTM5bU5OV1lxcXRkY1B1TUFXbkN3YTBOeFFlUExrbElLQURvKzV1WXBYVmF3czJLdkRHNmpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5NDc0MzQwOTk6NTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZEpQUE42amJBc3NuM0JQN1pQT3lOZzNab3RkaUxKODdPbGNSWFFiNnpnYyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxMTg1MzEzNSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKL0gifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "千亗᭄ [ M么メ  MIKEY ]₩₱𒆜",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "50947434099",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '千亗᭄ [ M么メ  MIKEY ]₩₱𒆜',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
