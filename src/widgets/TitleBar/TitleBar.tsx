import styled from "styled-components";
import { TitleBarButton } from "./TitleBarButton/TitleBarButton";
import { NavPanel } from "./NavPanel/NavPanel";

export const TitleBar = () => {
    return (
        <TitleBarWrapper>
            <LogoAndTitle>
                {/* добавить логотип */}
                <Title>Multi Uploader</Title>
            </LogoAndTitle>
            <NavPanel />
            <ButtonContainer>
                <TitleBarButton type="minimize" />
                <TitleBarButton type="maximize" />
                <TitleBarButton type="close" />
            </ButtonContainer>
        </TitleBarWrapper>
    );
};

const TitleBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    background: transparent;
    -webkit-app-region: drag;
    gap: ${({ theme }) => theme.spacing.md};
`;

const LogoAndTitle = styled.div`
    display: flex;
    align-items: center;
    min-width: 120px;
    margin-left: ${({ theme }) => theme.spacing.md};
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-left: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.span`
    font-size: 16px;
    font-weight: 200;
`;
