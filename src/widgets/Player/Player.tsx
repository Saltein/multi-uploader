import styled from "styled-components";
import ReactPlayer from "react-player";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setVideoFile } from "../../entities/video/model/slice";

export const Player = () => {
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState<string>("");

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

    function togglePlaying() {
        setPlaying((prev) => !prev);
    }

    return (
        <_Wrapper>
            <_Input
                id="video-input"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
            />
            {url ? (
                <ReactPlayer
                    src={url}
                    playing={playing}
                    height={"100%"}
                    width={"fit-content"}
                />
            ) : (
                <_Label htmlFor="video-input" />
            )}
            <_Controls>
                <button onClick={togglePlaying}>{playing ? "⏸️" : "▶️"}</button>
                <button onClick={() => setUrl("")}>❌</button>
            </_Controls>
        </_Wrapper>
    );
};

const _Wrapper = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    max-height: 518px;
`;

const _Input = styled.input`
    display: none;
`;

const _Label = styled.label`
    width: 292px;
`;

const _Controls = styled.div`
    position: absolute;
    bottom: 0px;
`;
