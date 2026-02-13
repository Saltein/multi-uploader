import { PageWrapper } from "../PageWrapper";
import { Player } from "../../widgets";
import { SectionWrapper } from "../../widgets/SectionWrapper";
import { ChoiceInput, TextInput } from "../../shared";
import { setDescription, setTitle } from "../../processes/upload/model/slice";
import styled from "styled-components";
import { PostButton } from "../../processes/upload/ui/PostButton/PostButton";

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
                    <ChoiceInput
                        title="Доступ"
                        values={["Открытый", "По ссылке", "Закрытый"]}
                    />
                    <ChoiceInput title="Разрешить комментарии" />
                </SectionWrapper>
                <SectionWrapper>
                    <_Horizontal>
                        <TextInput placeholder="Запланировать публикацию" />
                        <PostButton />
                    </_Horizontal>
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

const _Horizontal = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
`;
