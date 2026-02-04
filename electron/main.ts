import { app, BrowserWindow, safeStorage } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ipcMain } from "electron";
import Store from "electron-store";
import axios from "axios";

const require = createRequire(import.meta.url);
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

        minWidth: 600,
        minHeight: 400,

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

// Обмен кода на токены ---------------------------------------------------------
async function exchangeCodeForTokens(code: string) {
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
        const tokens = await exchangeCodeForTokens(code);
        return tokens;
    } catch (err) {
        console.error(err);
        throw err;
    }
});

// Simple token storage with encryption -----------------------------------------
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
