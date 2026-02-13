import styled from "styled-components";

interface SectionWrapperProps {
    children: React.ReactNode;
    background?: boolean;
}

export const SectionWrapper = ({
    children,
    background = true,
}: SectionWrapperProps) => {
    return <Wrapper $background={background}>{children}</Wrapper>;
};

// Styled Components ----------------------------------------------------------

interface WrapperProps {
    $background?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radius.lg};
    width: 100%;
    height: fit-content;
    background: ${({ theme, $background }) =>
        $background ? theme.colors.surface : "transparent"};
    border: ${({ theme, $background }) =>
        $background ? "none" : `1px solid ${theme.colors.border}`};
`;
