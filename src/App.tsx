import styled from "styled-components";
import { TitleBar } from "./widgets";

function App() {
    return (
        <Wrapper>
            <TitleBar />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.background.main};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

export default App;
