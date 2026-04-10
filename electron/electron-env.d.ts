/// <reference types="vite-plugin-electron/electron-env" />

import { Tokens } from "./types";

declare namespace NodeJS {
    interface ProcessEnv {
        /**
         * The built directory structure
         *
         * ```tree
         * ├─┬─┬ dist
         * │ │ └── index.html
         * │ │
         * │ ├─┬ dist-electron
         * │ │ ├── main.js
         * │ │ └── preload.js
         * │
         * ```
         */
        APP_ROOT: string;
        /** /dist/ or /public/ */
        VITE_PUBLIC: string;
    }
}

// Used in Renderer process, expose in `preload.ts`
declare global {
    interface Window {
        ipcRenderer: import("electron").IpcRenderer;
        api: {
            minimize: () => void;
            maximize: () => void;
            close: () => void;
            send: (...args: any[]) => void;
            on: (...args: any[]) => void;
            off: (...args: any[]) => void;
            invoke: (...args: any[]) => Promise<any>;
        };
        authApi: {
            getYoutubeToken: (key: string) => Promise<Tokens>;
            exchangeGoogleCode: (code: string) => Promise<any>;
            saveYoutubeToken: (
                key: string,
                tokens: Tokens | null,
            ) => Promise<void>;

            getTikTokAuthUrl: () => Promise<string>;
            exchangeTikTokCode: (code: string) => Promise<any>;
            saveTikTokToken: (
                key: string,
                tokens: Tokens | null,
            ) => Promise<void>;
            openTikTokAuthWindow: (url: string) => Promise<void>;
            onTikTokCode: (callback: (code: string) => void) => void;
        };
    }
}

export {};
