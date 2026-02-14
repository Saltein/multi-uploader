import styled from "styled-components";
import { TitleBarButton } from "./TitleBarButton/TitleBarButton";
import { NavPanel } from "./NavPanel/NavPanel";

export const TitleBar = () => {
    return (
        <_TitleBarWrapper>
            <_LogoAndTitle>
                {/* добавить логотип */}
                <_Title>Multi Uploader</_Title>
            </_LogoAndTitle>
            <NavPanel />
            <_ButtonContainer>
                <TitleBarButton type="minimize" />
                <TitleBarButton type="maximize" />
                <TitleBarButton type="close" />
            </_ButtonContainer>
        </_TitleBarWrapper>
    );
};

const _TitleBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    flex-shrink: 0;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    background: transparent;
    -webkit-app-region: drag;
    gap: ${({ theme }) => theme.spacing.md};
`;

const _LogoAndTitle = styled.div`
    display: flex;
    align-items: center;
    min-width: 120px;
    margin-left: ${({ theme }) => theme.spacing.sm};
`;

const _ButtonContainer = styled.div`
    display: flex;
    margin-left: ${({ theme }) => theme.spacing.sm};
`;

const _Title = styled.span`
    font-size: 16px;
    font-weight: 200;
`;
