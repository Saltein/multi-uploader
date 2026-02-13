import { PageWrapper } from "../PageWrapper";
import { Player } from "../../widgets";
import { SectionWrapper } from "../../widgets/SectionWrapper";
import { TextInput } from "../../shared";
import { setDescription, setTitle } from "../../processes/upload/model/slice";
import styled from "styled-components";

export const UploadPage = () => {
    return (
        <PageWrapper
            direction="row"
            gap="12px"
            subtitle="Загрузите видео для публикации на ваших платформах"
        >
            <Player />
            <_Vertical>
                <SectionWrapper>
                    <TextInput placeholder="Название" reducer={setTitle} />
                    <TextInput
                        placeholder="Описание"
                        type="area"
                        reducer={setDescription}
                    />
                    <TextInput placeholder="Хештеги" />
                    <TextInput placeholder="Приватность" />
                    <TextInput placeholder="Разрешить комментарии" />
                </SectionWrapper>
                <SectionWrapper>
                    <TextInput placeholder="Запланировать публикацию" />
                </SectionWrapper>
            </_Vertical>
        </PageWrapper>
    );
};

const _Vertical = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${({ theme }) => theme.spacing.md};
`;
