import styled from "styled-components";
import { TitleBar } from "./widgets";
import { Route, Routes } from "react-router-dom";
import {
    AccountsPage,
    AnalyticsPage,
    DashboardPage,
    PostsPage,
    SettingsPage,
    UploadPage,
} from "./pages";

function App() {
    return (
        <Wrapper>
            <TitleBar />

            <PageSpace>
                <Routes>
                    <Route path="*" element={<div>Page Not Found</div>} />
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/accounts" element={<AccountsPage />} />
                    <Route path="/uploads" element={<UploadPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/posts" element={<PostsPage />} />
                </Routes>
            </PageSpace>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.background.main};
    color: ${({ theme }) => theme.colors.textPrimaryNormal};
    overflow: hidden;
`;

const PageSpace = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    
    /* сам скроллбар */
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    /* дорожка */
    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 8px;
    }

    /* ползунок */
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.surface};
        border-radius: 8px;
    }

    /* hover по ползунку */
    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.items};
    }
`;

export default App;
