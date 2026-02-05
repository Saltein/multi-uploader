import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAccount } from "../entities/account/model/slice";

export const useInitApp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadYoutubeTokens() {
            if (
                typeof window === "undefined" ||
                !window.authApi ||
                typeof window.authApi.getYoutubeToken !== "function"
            ) {
                return;
            }

            try {
                const tokens =
                    await window.authApi.getYoutubeToken("youtube-tokens");
                if (tokens) {
                    dispatch(
                        updateAccount({
                            id: "1",
                            platform: "YouTube",
                            username: "",
                            connected: true,
                            tokens,
                        }),
                    );
                }
            } catch (err) {
                console.warn("Failed to load youtube tokens:", err);
            }
        }

        loadYoutubeTokens();
    }, [dispatch]);
};
