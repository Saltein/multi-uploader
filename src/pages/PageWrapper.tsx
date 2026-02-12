import styled from "styled-components";
import { Subtitle } from "../shared/ui/titles/Subtitle/Subtitle";

interface PageWrapperProps {
    children: React.ReactNode;
    direction?: "column" | "row";
    gap?: string;
    subtitle?: string;
}

interface WrapperProps {
    $direction?: string;
    $gap?: string;
}

export const PageWrapper = ({
    children,
    direction = "column",
    gap,
    subtitle,
}: PageWrapperProps) => {
    return (
        <>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            <Wrapper $direction={direction} $gap={gap}>
                {children}
            </Wrapper>
        </>
    );
};

// Styled Components ----------------------------------------------------------

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    flex-direction: ${({ $direction }) => $direction};
    gap: ${({ theme, $gap }) => ($gap ? $gap : theme.spacing.lg)};
    padding: ${({ theme }) =>
        `${theme.spacing.md} ${theme.spacing.md} 0 ${theme.spacing.md}`};
    width: 100%;
    height: 100%;
    /* background: #f003; */
`;
