import styled from "styled-components";

interface ChoiceInputProps {
    title: string;
    values?: string[];
}

export const ChoiceInput = ({
    title,
    values = ["Да", "Нет"],
}: ChoiceInputProps) => {
    return (
        <_Wrapper>
            <span>{title}</span>
            <_ChoiceContainer>
                {values.map((value) => {
                    return <_Value>{value}</_Value>;
                })}
            </_ChoiceContainer>
        </_Wrapper>
    );
};

const _Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: ${({ theme }) => theme.colors.textPrimaryNormal};
    border: 1px solid ${({ theme }) => theme.colors.items};
    padding: ${({ theme }) => `0 4px 0 ${theme.spacing.md}`};
    border-radius: ${({ theme }) => theme.radius.md};
    width: 100%;
    height: 36px;
`;

const _ChoiceContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.sm};
    overflow: hidden;
    cursor: pointer;
`;

const _Value = styled.span`
    height: 24px;
    padding: 0 12px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 14px;
    background-color: ${({ theme }) => theme.colors.surface};

    display: flex;
    align-items: center;
    justify-content: center;

    white-space: nowrap;

    transition: 0.2s;

    &:last-child {
        border-right: none;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.items};
        color: ${({ theme }) => theme.colors.textPrimaryBright};
    }
`;
