import styled from "styled-components";

interface ConnectionButtonProps {
    onClick: () => void;
    title: string;
}

export const ConnectionButton = ({ onClick, title }: ConnectionButtonProps) => {
    return (
        <_Button onClick={() => onClick()}>
            <_Title className="title">{title}</_Title>
        </_Button>
    );
};

const _Button = styled.button`
    all: unset;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 100%;

    transition: 0.2s;

    &:hover {
        height: 56px;

        .title {
            color: ${({ theme }) => theme.colors.textPrimaryBright};
        }
    }
`;

const _Title = styled.span`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textMuted};
    transition: 0.2s;
`;
