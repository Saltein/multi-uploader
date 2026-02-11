import { PageWrapper } from "../PageWrapper";
import { Player } from "../../widgets";
import { SectionWrapper } from "../../widgets/SectionWrapper";

export const UploadPage = () => {
    return (
        <PageWrapper direction="row">
            <Player />
            <SectionWrapper>
                <input type="text" placeholder="Название" />
                <textarea placeholder="Описание" />
            </SectionWrapper>
        </PageWrapper>
    );
};
