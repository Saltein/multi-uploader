import { PageWrapper } from "../PageWrapper";
import { Player } from "../../widgets";
import { SectionWrapper } from "../../widgets/SectionWrapper";
import { TextInput } from "../../shared";

export const UploadPage = () => {
    return (
        <PageWrapper
            direction="row"
            gap="12px"
            subtitle="Загрузите видео для публикации на ваших платформах"
        >
            <Player />
            <SectionWrapper>
                <TextInput placeholder="Название" />
                <TextInput placeholder="Описание" type="area" />
            </SectionWrapper>
        </PageWrapper>
    );
};
