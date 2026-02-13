import styled from "styled-components";

export const PostButton = () => {
    return <_Button>Опубликовать</_Button>;
};

const _Button = styled.button`
    all: unset;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.colors.postButton};
    border-radius: ${({ theme }) => theme.radius.md};
    height: 36px;
    color: ${({ theme }) => theme.colors.postButton};
    box-shadow:
        0 0 4px ${({ theme }) => theme.colors.postButtonGlow},
        inset 0 0 4px ${({ theme }) => theme.colors.postButtonGlow};
    text-shadow: 0 0 4px ${({ theme }) => theme.colors.postButtonGlow};
    padding: 0 ${({ theme }) => theme.spacing.md};
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        transition: 0.1s;
        background-color: ${({ theme }) => theme.colors.postButton};
        color: ${({ theme }) => theme.colors.postButtonTextHover};
    }
`;
