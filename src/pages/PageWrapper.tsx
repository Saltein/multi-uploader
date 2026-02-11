import styled from "styled-components";

interface PageWrapperProps {
    children: React.ReactNode;
    direction?: "column" | "row";
}

interface WrapperProps {
    $direction?: string;
}

export const PageWrapper = ({
    children,
    direction = "column",
}: PageWrapperProps) => {
    return <Wrapper $direction={direction}>{children}</Wrapper>;
};

// Styled Components ----------------------------------------------------------

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    flex-direction: ${({ $direction }) => $direction};
    gap: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) =>
        `${theme.spacing.md} ${theme.spacing.md} 0 ${theme.spacing.md}`};
    width: 100%;
    height: 100%;
    /* background: #f003; */
`;
