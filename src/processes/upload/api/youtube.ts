import { UploadData } from "./types";

export const uploadToYouTube = async (postData: UploadData) => {
    if (!postData.videoFile) {
        alert("Нет видео для загрузки");
        return;
    }
    if (!postData.accessToken) {
        alert("Нет access token");
        return;
    }

    try {
        // Подготовка статуса
        const status: any = {
            privacyStatus: postData.privacy,
            madeForKids: false, // можно вынести в форму позже
        };

        // Разрешение комментариев (API использует commentable, но по умолчанию true)
        if (!postData.allowComments) {
            status.commentable = false; // или moderation = "heldForReview" / "likelySpam" — но simplest вариант
        }

        // Планирование публикации
        if (postData.scheduledAt) {
            // Простая проверка — дата в будущем?
            const scheduledDate = new Date(postData.scheduledAt);
            if (isNaN(scheduledDate.getTime())) {
                throw new Error(
                    "Неверный формат scheduledAt (должен быть ISO 8601)",
                );
            }
            if (scheduledDate <= new Date()) {
                console.warn(
                    "scheduledAt в прошлом → видео опубликуется сразу",
                );
            } else {
                // YouTube требует private/unlisted для scheduling
                if (postData.privacy === "public") {
                    console.warn(
                        "Для планирования публикации privacy должен быть private или unlisted → меняем на private",
                    );
                    status.privacyStatus = "private";
                }
                status.publishAt = postData.scheduledAt; // ожидается UTC с Z
            }
        }

        // Шаг 1 — инициируем resumable upload
        const initResponse = await fetch(
            "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${postData.accessToken}`,
                    "Content-Type": "application/json; charset=UTF-8",
                    "X-Upload-Content-Length":
                        postData.videoFile.size.toString(),
                    "X-Upload-Content-Type":
                        postData.videoFile.type || "video/mp4",
                },
                body: JSON.stringify({
                    snippet: {
                        title: postData.title.trim(),
                        description: `${postData.description.trim()} #shorts ${postData.hashtags}`,
                        // tags: [], // если добавите поле tags в UploadData — раскомментируйте
                        categoryId: "22", // People & Blogs — можно сделать настраиваемым
                    },
                    status,
                }),
            },
        );

        if (!initResponse.ok) {
            const err = await initResponse.json().catch(() => ({}));
            throw new Error(
                `Ошибка инициализации: ${err.error?.message || initResponse.statusText} (${initResponse.status})`,
            );
        }

        const uploadUrl = initResponse.headers.get("Location");
        if (!uploadUrl) {
            throw new Error("Сервер не вернул URL для загрузки");
        }

        console.log("Начинаем загрузку видео...", postData.videoFile.name);

        // Шаг 2 — загружаем файл целиком
        const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": postData.videoFile.type || "video/mp4",
                "Content-Length": postData.videoFile.size.toString(),
            },
            body: postData.videoFile,
        });

        if (!uploadResponse.ok) {
            const errText = await uploadResponse.text();
            throw new Error(
                `Ошибка загрузки: ${uploadResponse.status} — ${errText}`,
            );
        }

        const result = await uploadResponse.json();
        console.log("Видео успешно загружено!", result);

        const videoUrl = `https://youtu.be/${result.id}`;
        alert(
            `Готово! Видео загружено.\nID: ${result.id}\nСсылка: ${videoUrl}`,
        );

        // Если запланировано — можно показать сообщение
        if (postData.scheduledAt) {
            alert(`Видео запланировано на ${postData.scheduledAt}`);
        }
    } catch (err: any) {
        console.error("Ошибка загрузки на YouTube:", err);
        alert(
            `Не удалось загрузить видео:\n${err.message || "Неизвестная ошибка"}`,
        );
    }
};
