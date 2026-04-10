import { app, BrowserWindow, safeStorage } from "electron";
// import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { shell, ipcMain } from "electron";
import Store from "electron-store";
import axios from "axios";
import crypto from "crypto";

// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, "public")
    : RENDERER_DIST;

let win: BrowserWindow | null;

// Create the main application window -------------------------------------------
function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 590,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.mjs"),
            contextIsolation: true, // ОБЯЗАТЕЛЬНО
            nodeIntegration: false, // ОБЯЗАТЕЛЬНО
        },
        // autoHideMenuBar: true, // 👈 скрывает меню, Alt покажет его на Windows/Linux
        frame: false, // 👈 если хочешь полностью убрать заголовок и кнопки
    });

    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send(
            "main-process-message",
            new Date().toLocaleString(),
        );
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, "index.html"));
    }
}

// IPC handlers for renderer-process --------------------------------------------
ipcMain.handle("tiktok:oauth-window", async (event, url: string) => {
    const parentWindow = BrowserWindow.getAllWindows()[0];

    win = new BrowserWindow({
        width: 500,
        height: 650,
        parent: parentWindow,
        modal: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.loadURL(url);

    // 🔥 ловим редирект
    win.webContents.on("will-navigate", (event, url) => {
        if (url.startsWith(REDIRECT_URI)) {
            const parsedUrl = new URL(url);
            const code = parsedUrl.searchParams.get("code");

            console.log("code will-navigate", code);

            if (code) {
                event.preventDefault();

                const parentWindow = BrowserWindow.getAllWindows()[0];

                parentWindow.webContents.send("tiktok:auth-code", code);

                setTimeout(() => {
                    win?.close();
                    win = null;
                }, 1000);
            }
        }
    });

    return true;
});
ipcMain.handle("open-external", async (_, url: string) => {
    await shell.openExternal(url);
});

// IPC handlers for window controls ---------------------------------------------
ipcMain.on("window-minimize", () => {
    win?.minimize();
});

ipcMain.on("window-maximize", () => {
    if (!win) return;
    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
});

ipcMain.on("window-close", () => {
    win?.close();
});

// Обмен кода на токены Google ---------------------------------------------------------
async function exchangeCodeForTokensGoogle(code: string) {
    const data = {
        code,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:5173",
        grant_type: "authorization_code",
    };

    try {
        const response = await axios.post(
            "https://oauth2.googleapis.com/token",
            data,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        return response.data;
    } catch (error) {
        // Обработка ошибок
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data;
            console.error("OAuth error:", errorData);
        }
        throw error;
    }
}

ipcMain.handle("google:exchange-code", async (_, code: string) => {
    try {
        const tokens = await exchangeCodeForTokensGoogle(code);
        return tokens;
    } catch (err) {
        console.error(err);
        throw err;
    }
});

// TikTok ------------------------------------------------------------------------
function generateCodeVerifier() {
    return crypto.randomBytes(64).toString("hex");
}

function generateCodeChallenge(verifier: string) {
    return crypto
        .createHash("sha256")
        .update(verifier)
        .digest("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

const TIKTOK_CLIENT_KEY = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
const TIKTOK_CLIENT_SECRET = import.meta.env.VITE_TIKTOK_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5173/tiktok/callback";

let codeVerifierStore: string | null = null;

ipcMain.handle("tiktok:get-auth-url", async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    codeVerifierStore = codeVerifier;

    const state = Math.random().toString(36).substring(2);

    const url =
        "https://www.tiktok.com/v2/auth/authorize/?" +
        `client_key=${TIKTOK_CLIENT_KEY}` +
        `&response_type=code` +
        `&scope=user.info.basic,video.publish,video.upload` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&state=${state}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256`;

    return url;
});

ipcMain.handle("tiktok:exchange-code", async (_, code: string) => {
    console.warn("exchange-code", code);

    const params = new URLSearchParams();

    params.append("client_key", TIKTOK_CLIENT_KEY);
    params.append("client_secret", TIKTOK_CLIENT_SECRET);
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", REDIRECT_URI);
    params.append("code_verifier", codeVerifierStore!);

    const response = await axios.post(
        "https://open.tiktokapis.com/v2/oauth/token/",
        params,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        },
    );

    console.log("tiktok:exchange-code end", response.data);

    return response.data;
});

// Simple token storage with encryption -----------------------------------------   //TODO рефакторинг, чтобы не повторялось
const store = new Store();
ipcMain.handle("save-youtube-token", async (_, { key, tokens }) => {
    if (!safeStorage.isEncryptionAvailable()) {
        console.warn(
            "Шифрование недоступно, сохраняем как есть (небезопасно!)",
        );
        store.set(key, tokens);
        return;
    }

    // safeStorage.encryptString expects a string; stringify tokens first
    const stringified = JSON.stringify(tokens);
    const encrypted = safeStorage.encryptString(stringified);
    store.set(key, encrypted.toString("base64")); // или сохраняем Buffer
});

ipcMain.handle("get-youtube-token", async (_, key) => {
    const data = store.get(key);
    if (!data) return null;

    if (typeof data === "string") {
        // If encryption is available, we stored base64 encrypted string
        if (safeStorage.isEncryptionAvailable()) {
            try {
                const buffer = Buffer.from(data, "base64");
                const decrypted = safeStorage.decryptString(buffer);
                try {
                    return JSON.parse(decrypted);
                } catch {
                    return decrypted;
                }
            } catch (err) {
                console.error("Не удалось расшифровать токен", err);
                return null;
            }
        }

        // Fallback: stored a plain string (previous behaviour)
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }

    return data; // fallback на старые нешифрованные данные
});

ipcMain.handle("save-tiktok-token", async (_, { key, tokens }) => {
    if (!safeStorage.isEncryptionAvailable()) {
        console.warn(
            "Шифрование недоступно, сохраняем как есть (небезопасно!)",
        );
        store.set(key, tokens);
        return;
    }

    // safeStorage.encryptString expects a string; stringify tokens first
    const stringified = JSON.stringify(tokens);
    const encrypted = safeStorage.encryptString(stringified);
    store.set(key, encrypted.toString("base64")); // или сохраняем Buffer
});

ipcMain.handle("get-tiktok-token", async (_, key) => {
    const data = store.get(key);
    if (!data) return null;

    if (typeof data === "string") {
        // If encryption is available, we stored base64 encrypted string
        if (safeStorage.isEncryptionAvailable()) {
            try {
                const buffer = Buffer.from(data, "base64");
                const decrypted = safeStorage.decryptString(buffer);
                try {
                    return JSON.parse(decrypted);
                } catch {
                    return decrypted;
                }
            } catch (err) {
                console.error("Не удалось расшифровать токен", err);
                return null;
            }
        }

        // Fallback: stored a plain string (previous behaviour)
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }

    return data; // fallback на старые нешифрованные данные
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(createWindow);
