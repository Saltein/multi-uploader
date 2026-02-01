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
        <Button onClick={handleClick}>
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

const Button = styled.button`
    all: unset;

    background: transparent;
    width: 48px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    -webkit-app-region: no-drag;
`;
