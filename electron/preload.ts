import { ipcRenderer, contextBridge } from "electron";
import { Tokens } from "./types";

// Экспонируем API для Renderer-процесса
// Доступно через window.api
contextBridge.exposeInMainWorld("api", {
    // Минимизировать окно
    minimize: () => ipcRenderer.send("window-minimize"),

    // Развернуть / свернуть окно
    maximize: () => ipcRenderer.send("window-maximize"),

    // Закрыть окно
    close: () => ipcRenderer.send("window-close"),

    // Можно добавить дополнительные методы
    // send, on, off, invoke если нужно общение с main
    send: (...args: Parameters<typeof ipcRenderer.send>) =>
        ipcRenderer.send(...args),

    on: (...args: Parameters<typeof ipcRenderer.on>) => ipcRenderer.on(...args),

    off: (...args: Parameters<typeof ipcRenderer.off>) =>
        ipcRenderer.off(...args),

    invoke: (...args: Parameters<typeof ipcRenderer.invoke>) =>
        ipcRenderer.invoke(...args),
});

contextBridge.exposeInMainWorld("authApi", {
    saveYoutubeToken: (key: string, tokens: Tokens | null) =>
        ipcRenderer.invoke("save-youtube-token", { key, tokens }),
    getYoutubeToken: (key: string) =>
        ipcRenderer.invoke("get-youtube-token", key),
    exchangeGoogleCode: (code: string) =>
        ipcRenderer.invoke("google:exchange-code", code),

    saveTikTokToken: (key: string, tokens: Tokens | null) =>
        ipcRenderer.invoke("save-tiktok-token", { key, tokens }),
    getTikTokAuthUrl: () => ipcRenderer.invoke("tiktok:get-auth-url"),
    exchangeTikTokCode: (code: string) =>
        ipcRenderer.invoke("tiktok:exchange-code", code),
    openTikTokAuthWindow: (url: string) =>
        ipcRenderer.invoke("tiktok:oauth-window", url),
    onTikTokCode: (callback: (code: string) => void) => {
        ipcRenderer.on("tiktok:auth-code", (_, code) => callback(code));
    },
});
