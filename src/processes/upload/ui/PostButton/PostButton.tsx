import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUploadData } from "../../model/slice";
import { uploadToYouTube } from "../../api/youtube";
import { selectAccounts } from "../../../../entities/account/model/slice";
import { UploadData } from "../../api/types";
import { selectVideo } from "../../../../entities/video/model/slice";

export const PostButton = () => {
    const postData = useSelector(selectUploadData);
    const youtubeAccount = useSelector(selectAccounts)[0];
    const accessToken = youtubeAccount.tokens?.access_token;
    const file = useSelector(selectVideo);

    const uploadData = {
        ...postData,
        accessToken: accessToken,
        videoFile: file,
    } as UploadData;

    function post() {
        console.log("post", uploadData);
        uploadToYouTube(uploadData);
    }
    return <_Button onClick={post}>Опубликовать</_Button>;
};

const _Button = styled.button`
    all: unset;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.colors.postButton};
    border-radius: ${({ theme }) => theme.radius.md};
    height: 36px;
    color: ${({ theme }) => theme.colors.postButton};
    box-shadow:
        0 0 4px ${({ theme }) => theme.colors.postButtonGlow},
        inset 0 0 4px ${({ theme }) => theme.colors.postButtonGlow};
    text-shadow: 0 0 4px ${({ theme }) => theme.colors.postButtonGlow};
    padding: 0 ${({ theme }) => theme.spacing.md};
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        transition: 0.1s;
        background-color: ${({ theme }) => theme.colors.postButton};
        color: ${({ theme }) => theme.colors.postButtonTextHover};
    }
`;
