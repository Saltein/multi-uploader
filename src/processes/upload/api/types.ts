export interface UploadData {
    videoFile: File | null;
    title: string;
    description: string;
    hashtags: string;
    privacy: "private" | "public" | "unlisted";
    allowComments: boolean;
    scheduledAt: string | null;
    accessToken: string; // ← должен быть свежий токен
}
