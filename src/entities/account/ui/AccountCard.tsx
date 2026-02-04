import styled from "styled-components";
import { Platform } from "../model/types";
import { useLoginToYouTube } from "../../../processes/youtube/hooks/useLoginToYouTube";

interface AccountCardProps {
    id: string;
    platform: Platform;
    username: string;
    connected?: boolean;
}

export const AccountCard = ({
    platform,
    username,
    connected,
}: AccountCardProps) => {
    const { googleLogin } = useLoginToYouTube();

    let login = () => {};
    if (platform === "YouTube") {
        login = googleLogin;
    }

    return (
        <_CardWrapper $connected={connected}>
            <span>{platform}</span>
            {username && <span>{username}</span>}
            <span>{connected ? "Подключен" : "Не подключен"}</span>
            <button onClick={() => login()}>Подключить</button>
        </_CardWrapper>
    );
};

// Styled Components ----------------------------------------------------------

interface CardWrapperProps {
    $connected?: boolean;
}

const _CardWrapper = styled.div<CardWrapperProps>`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.surface};

    height: ${({ $connected }) => ($connected ? "240px" : "120px")};
`;
