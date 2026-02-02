export type Platform = "YouTube" | "TikTok" | "Instagram" | "VK Clips";

// Тип для одного аккаунта
export interface Account {
    id: string;
    platform: Platform;
    username: string;
    connected: boolean; // подключён или нет
}
