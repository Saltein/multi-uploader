import { useDispatch } from "react-redux";
import { updateAccount } from "../../../../entities/account/model/slice";
import { useEffect } from "react";

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
        try {
            const tokens = await window.authApi.exchangeTikTokCode(code);

            dispatch(
                updateAccount({
                    id: "2",
                    platform: "TikTok",
                    username: "TikTok User",
                    link: "",
                    connected: true,
                    tokens,
                }),
            );
        } catch (err) {
            console.error(err);
            onFailure();
        }
    }

    useEffect(() => {
        window.authApi.onTikTokCode((code) => {
            handleCallback(code);
        });
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
