import styled from "styled-components";
import { TitleBarButton } from "./TitleBarButton/TitleBarButton";

export const TitleBar = () => {
    return (
        <TitleBarWrapper>
            <LogoAndTitle>
                {/* добавить логотип */}
                <Title>Multi Uploader</Title>
            </LogoAndTitle>
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
    height: ${({ theme }) => theme.spacing.xxl};
    background: transparent;
    -webkit-app-region: drag;
`;

const LogoAndTitle = styled.div`
    display: flex;
    align-items: center;
    margin-left: ${({ theme }) => theme.spacing.lg};
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const Title = styled.span`
    font-size: 16px;
    font-weight: 200;
`;
