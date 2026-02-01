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
    height: 32px;
    padding: 4px 8px;
    background-color: red;
    -webkit-app-region: drag;
`;

const LogoAndTitle = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 12px;
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: bold;
`;
