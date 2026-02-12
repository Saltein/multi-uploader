import styled from "styled-components";

interface SubtitleProps {
    children: React.ReactNode;
}

export const Subtitle = ({ children }: SubtitleProps) => {
    return <_Subtitle>{children}</_Subtitle>;
};

const _Subtitle = styled.h2`
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
    padding-top: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
`;
