import styled from "styled-components";
import UploadIcon from "../../../shared/assets/icons/upload.svg?react";

export const Label = () => {
    return (
        <_Label htmlFor="video-input">
            <_IconTitle className="icon_title">
                <UploadIcon className="icon" />
                <_Title>Выбрать файл</_Title>
            </_IconTitle>
        </_Label>
    );
};

const _Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 273px;
    border: 4px dashed ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radius.sm};
    box-shadow: none;
    transition: 0.2s;

    .icon {
        height: 64px;
        width: 64px;
        margin: 8px;
        color: ${({ theme }) => theme.colors.items};
        transition: 0.2s;
        flex-shrink: 0;
    }

    &:hover {
        box-shadow: inset 0 0 96px ${({ theme }) => theme.colors.items};
        border: 4px solid ${({ theme }) => theme.colors.items};

        .icon {
            color: ${({ theme }) => theme.colors.textPrimaryNormal};
            filter: drop-shadow(0 0 6px #fff8);
            transform: scale(1.1);
            margin-bottom: 0;
        }

        .icon_title {
            height: 112px;
            color: ${({ theme }) => theme.colors.textPrimaryNormal};
            text-shadow: 0 0 4px #fff8;
        }
    }
`;

const _IconTitle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 0.2s;
    color: transparent;

    height: 80px;
    padding: 0 8px;
    overflow: hidden;
`;

const _Title = styled.span``;
