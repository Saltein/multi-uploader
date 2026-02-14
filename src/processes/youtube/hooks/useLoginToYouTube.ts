import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { updateAccount } from "../../../entities/account/model/slice";

export const useLoginToYouTube = () => {
    const dispatch = useDispatch();

    const REQUIRED_SCOPES = [
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube.readonly",
    ] as const;

    function onFailure() {
        dispatch(
            updateAccount({
                id: "1",
                platform: "YouTube",
                username: "",
                link: "",
                connected: false,
                tokens: null,
            }),
        );
    }

    async function onLoginSuccess(codeResponse: CodeResponse) {
        console.log("Google login successful");

        if (
            !window ||
            !window.authApi ||
            typeof window.authApi.exchangeGoogleCode !== "function"
        ) {
            console.error(
                "authApi.exchangeGoogleCode is not available. Are you running in the browser (not Electron preload)?",
            );
            onFailure();
            return;
        }

        try {
            const tokens = await window.authApi.exchangeGoogleCode(
                codeResponse.code,
            );
            console.log("Tokens received");

            // ← Новый блок: получаем название канала
            let channelName = "YouTube Channel";
            let channelLink = "";
            try {
                const res = await fetch(
                    "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
                    {
                        headers: {
                            Authorization: `Bearer ${tokens.access_token}`,
                        },
                    },
                );

                if (res.ok) {
                    const json = await res.json();
                    if (json.items?.length > 0) {
                        console.log("json", json);
                        channelName =
                            json.items[0].snippet.title || channelName;
                        channelLink =
                            json.items[0].snippet.customUrl || channelLink;

                        window.authApi.saveYoutubeToken("youtube-tokens", {
                            refresh_token: tokens.refresh_token,
                            access_token: tokens.access_token,
                            issued_at: Date.now(),
                            expires_in: tokens.expires_in,
                            channel_name: channelName,
                            channel_link: channelLink,
                        });
                    }
                }
            } catch (apiErr) {
                console.warn("Не удалось получить название канала", apiErr);
                channelName = "Ошибка";
            }

            dispatch(
                updateAccount({
                    id: "1",
                    platform: "YouTube",
                    username: channelName,
                    link: channelLink,
                    connected: true,
                    tokens: {
                        refresh_token: tokens.refresh_token,
                        access_token: tokens.access_token,
                        issued_at: Date.now(),
                        expires_in: tokens.expires_in,
                        channel_name: channelName,
                        channel_link: channelLink,
                    },
                }),
            );
        } catch (err) {
            console.error("Failed to exchange code:", err);
            onFailure();
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            const grantedScopes = new Set(codeResponse.scope?.split(" ") || []);
            const requiredSet = new Set(REQUIRED_SCOPES);
            const allGranted = [...requiredSet].every((scope) =>
                grantedScopes.has(scope),
            );

            if (!allGranted) {
                onFailure();
                console.warn("!allGranted");
                return;
            }

            onLoginSuccess(codeResponse);
        },
        onError: () => {
            onFailure();
            console.warn("onError");
        },
        scope: REQUIRED_SCOPES.join(" "),
        flow: "auth-code",
    });

    async function googleLogout() {
        // Очистить сохранённые токены в main-процессе (через preload)
        if (
            typeof window === "undefined" ||
            !window.authApi ||
            typeof (window.authApi as any).saveYoutubeToken !== "function"
        ) {
            console.warn(
                "authApi.saveYoutubeToken is not available. Are you running in the browser (not Electron preload)?",
            );
            // Обновим состояние локально
            dispatch(
                updateAccount({
                    id: "1",
                    platform: "YouTube",
                    username: "",
                    link: "",
                    connected: false,
                    tokens: null,
                }),
            );
            return;
        }

        try {
            // Используем any, т.к. preload типизирован на Tokens, а мы хотим удалить
            await (window.authApi as any).saveYoutubeToken(
                "youtube-tokens",
                null,
            );
        } catch (err) {
            console.warn("Failed to clear youtube tokens:", err);
        }

        dispatch(
            updateAccount({
                id: "1",
                platform: "YouTube",
                username: "",
                link: "",
                connected: false,
                tokens: null,
            }),
        );
        console.log("Отключен");
    }

    return { googleLogin, googleLogout };
};
