import styled from "styled-components";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return <Wrapper>{children}</Wrapper>;
};

// Styled Components ----------------------------------------------------------

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.md};
    width: 100%;
    height: 100%;
    background: transparent;
`;
