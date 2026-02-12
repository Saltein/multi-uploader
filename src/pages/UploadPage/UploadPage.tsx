import { PageWrapper } from "../PageWrapper";
import { Player } from "../../widgets";
import { SectionWrapper } from "../../widgets/SectionWrapper";

export const UploadPage = () => {
    return (
        <PageWrapper direction="row" gap="12px" subtitle="Загрузите видео для публикации на ваших платформах">
            <Player />
            <SectionWrapper>
                <input type="text" placeholder="Название" />
                <textarea placeholder="Описание" />
            </SectionWrapper>
        </PageWrapper>
    );
};
