export type Platform = "YouTube" | "TikTok" | "Instagram" | "VK Clips";

// Тип для одного аккаунта
export interface Account {
    id: string;
    platform: Platform;
    username: string;
    link: string;
    connected: boolean; // подключён или нет
    // Опционально — сохраненные токены для аккаунта
    tokens?: {
        refresh_token: string;
        access_token: string;
        issued_at: number;
        expires_in: number;
    } | null;
}
