import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateAccount } from "../model/slice";
import { Platform } from "../model/types";

interface AccountCardProps {
    id: string;
    platform: Platform;
    username: string;
    connected?: boolean;
}

export const AccountCard = ({
    id,
    platform,
    username,
    connected = true,
}: AccountCardProps) => {
    const dispatch = useDispatch();

    const toggleConnection = () => { // назначить потом на кнопку
        // Логика подключения/отключения аккаунта
        dispatch( // временно просто переключаем состояние, потом будет реальная логика
            updateAccount({
                id,
                platform,
                username,
                connected: !connected,
            }),
        );
    };

    return (
        <_CardWrapper $connected={connected} onClick={toggleConnection}>
            <span>{platform}</span>
            <span>{connected ? "Подключен" : "Не подключен"}</span>
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
