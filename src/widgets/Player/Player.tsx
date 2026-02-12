import styled from "styled-components";
import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setVideoFile } from "../../entities/video/model/slice";
import { Label } from "./Label/Label";

export const Player = () => {
    const [url, setUrl] = useState<string>("");
    const [isHovered, setIsHovered] = useState(false);
    const [volume, setVolume] = useState(0.2);

    const playerRef = useRef(null);

    const dispatch = useDispatch();

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            dispatch(setVideoFile(file));

            const objectUrl = URL.createObjectURL(file);
            setUrl(objectUrl);
            console.log(file);

            // Не забудьте освободить память позже
            return () => URL.revokeObjectURL(objectUrl);
        }
    }

    return (
        <_Wrapper
            $url={url}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <_Input
                id="video-input"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
            />
            {url ? (
                <>
                    <ReactPlayer
                        ref={playerRef}
                        src={url}
                        style={{
                            height: "100%",
                            width: "fit-content",
                            maxWidth: "280px",
                            border: "2px solid #ffffff16",
                            borderRadius: "8px",
                            boxShadow: "inset 0 0 96px #ffffff16",
                        }}
                        controls={isHovered}
                        volume={volume}
                        onVolumeChange={(e) =>
                            setVolume(
                                (e.currentTarget as HTMLVideoElement).volume,
                            )
                        }
                    />
                    <_Controls>
                        <_ClearBtn
                            className="clearBtn"
                            onClick={() => setUrl("")}
                        >
                            Отменить
                        </_ClearBtn>
                    </_Controls>
                </>
            ) : (
                <Label />
            )}
        </_Wrapper>
    );
};

interface WrapperProps {
    $url: string;
}

const _Wrapper = styled.div<WrapperProps>`
    position: relative;
    display: flex;
    height: 100%;
    max-height: 486px;

    .clearBtn {
        display: none;
    }

    &:hover {
        .clearBtn {
            display: ${({ $url }) => ($url ? "block" : "none")};
        }
    }
`;

const _Input = styled.input`
    display: none;
`;

const _Controls = styled.div`
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
`;

const _ClearBtn = styled.button`
    all: unset;
    padding: ${({ theme }) => theme.spacing.sm};
    border: 2px solid ${({ theme }) => theme.colors.items};
    border-radius: ${({ theme }) => theme.radius.sm};
    transition: 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.red};
        color: ${({ theme }) => theme.colors.textPrimaryBright};
    }
`;
