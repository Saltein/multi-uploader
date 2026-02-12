import styled from "styled-components";
import { PageWrapper } from "../PageWrapper";
import { SectionWrapper } from "../../widgets/SectionWrapper";
import { AccountCard } from "../../entities/account";
import { useSelector } from "react-redux";
import {
    selectConnectedAccounts,
    selectNotConnectedAccounts,
} from "../../entities/account/model/slice";

export const AccountsPage = () => {
    const connectedAccounts = useSelector(selectConnectedAccounts);
    const notConnectedAccounts = useSelector(selectNotConnectedAccounts);

    return (
        <PageWrapper subtitle="Управляйте платформами, на которые вы публикуете видео">
            <SectionWrapper>
                <span>Подключенные</span>
                <_AccountsList>
                    {connectedAccounts.map((acc) => (
                        <AccountCard key={acc.id} {...acc} />
                    ))}
                </_AccountsList>
            </SectionWrapper>

            <SectionWrapper background={false}>
                <span>Доступные для подключения</span>
                <_AccountsList>
                    {notConnectedAccounts.map((acc) => (
                        <AccountCard key={acc.id} {...acc} />
                    ))}
                </_AccountsList>
            </SectionWrapper>
        </PageWrapper>
    );
};

// Styled Components ----------------------------------------------------------

const _AccountsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
`;
