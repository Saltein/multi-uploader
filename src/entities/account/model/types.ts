import { Tokens } from "../../../../electron/types";

export type Platform = "YouTube" | "TikTok" | "Instagram" | "VK Clips";

// Тип для одного аккаунта
export interface Account {
    id: string;
    platform: Platform;
    username: string;
    link: string;
    connected: boolean; // подключён или нет
    // Опционально — сохраненные токены для аккаунта
    tokens?: Tokens | null;
}
