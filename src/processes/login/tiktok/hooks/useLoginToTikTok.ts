import { useDispatch } from "react-redux";
import { updateAccount } from "../../../../entities/account/model/slice";
import { useEffect } from "react";

let isHandled = false;

export const useLoginToTikTok = () => {
    const dispatch = useDispatch();

    function onFailure() {
        dispatch(
            updateAccount({
                id: "2",
                platform: "TikTok",
                username: "",
                link: "",
                connected: false,
                tokens: null,
            }),
        );
    }

    async function tiktokLogin() {
        try {
            const url = await window.authApi.getTikTokAuthUrl();
            await window.authApi.openTikTokAuthWindow(url);
        } catch (err) {
            console.error(err);
            onFailure();
        }
    }

    async function handleCallback(code: string) {
        if (isHandled) return;
        isHandled = true;

        console.log("handleCallback", code);

        try {
            const tokens = await window.authApi.exchangeTikTokCode(code);

            let username = "TikTok User";
            let link = "";

            try {
                const res = await fetch(
                    "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url",
                    {
                        headers: {
                            Authorization: `Bearer ${tokens.access_token}`,
                        },
                    },
                );

                if (res.ok) {
                    const json = await res.json();
                    console.log("TikTok user info:", json);

                    username = json.data?.user?.display_name || username;

                    const openId = json.data?.user?.open_id;

                    if (openId) {
                        link = `https://www.tiktok.com/@${openId}`;
                    }

                    await window.authApi.saveTikTokToken("tiktok-tokens", {
                        ...tokens,
                        username,
                        link,
                    });
                }
            } catch (apiErr) {
                console.warn(
                    "Не удалось получить данные пользователя TikTok",
                    apiErr,
                );
            }

            dispatch(
                updateAccount({
                    id: "2",
                    platform: "TikTok",
                    username,
                    link,
                    connected: true,
                    tokens: {
                        ...tokens,
                        username,
                        link,
                    },
                }),
            );
        } catch (err) {
            console.error(err);
            onFailure();
        }
    }

    useEffect(() => {
        console.log("useEffect useLoginToTikTok");
        const unsubscribe = window.authApi.onTikTokCode((code) => {
            console.log("CODE FROM IPC:", code);
            handleCallback(code);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    async function tiktokLogout() {
        try {
            if (
                window.authApi &&
                typeof window.authApi.saveTikTokToken === "function"
            ) {
                await window.authApi.saveTikTokToken("tiktok-tokens", null);
            }
        } catch (err) {
            console.warn("Failed to clear TikTok tokens", err);
        }

        dispatch(
            updateAccount({
                id: "2",
                platform: "TikTok",
                username: "",
                link: "",
                connected: false,
                tokens: null,
            }),
        );
    }

    return { tiktokLogin, handleCallback, tiktokLogout };
};
