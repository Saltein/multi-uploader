import styled from "styled-components";
import MinimizeIcon from "../../../shared/assets/icons/minimize.svg?react";
import CloseIcon from "../../../shared/assets/icons/close.svg?react";
import MaximizeIcon from "../../../shared/assets/icons/maximize.svg?react";

interface TitleBarButtonProps {
    type: "minimize" | "maximize" | "close";
}

export const TitleBarButton = ({ type }: TitleBarButtonProps) => {
    const handleClick = () => {
        switch (type) {
            case "minimize":
                window.api?.minimize?.();
                break;
            case "maximize":
                window.api?.maximize?.();
                break;
            case "close":
                window.api?.close?.();
                break;
        }
    };

    return (
        <Button $type={type} onClick={handleClick}>
            {type === "minimize" ? (
                <MinimizeIcon width="16px" height="16px" />
            ) : type === "maximize" ? (
                <MaximizeIcon width="16px" height="16px" />
            ) : (
                <CloseIcon width="16px" height="16px" />
            )}
        </Button>
    );
};

interface ButtonProps {
    $type: "minimize" | "maximize" | "close";
}

const Button = styled.button<ButtonProps>`
    all: unset;

    background: transparent;
    width: 48px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.radius.sm};
    transition:
        background 0.2s,
        color 0.2s;

    -webkit-app-region: no-drag;

    &:hover {
        color: ${({ theme }) => theme.colors.textPrimaryBright};
        background: ${({ $type }) =>
            $type === "close"
                ? "rgba(232, 17, 35, 0.5)" // красный как в Windows
                : "rgba(255, 255, 255, 0.1)"};
    }

    &:active {
        background: ${({ $type }) =>
            $type === "close"
                ? "rgba(232, 17, 35, 1)" // темнее красного при нажатии
                : "rgba(255, 255, 255, 0.2)"};
    }
`;
