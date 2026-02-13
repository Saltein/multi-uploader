import { Action } from "@reduxjs/toolkit";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useDebouncedValue } from "../../../hooks";

interface TextInputProps {
    placeholder?: string;
    type?: "input" | "area";
    reducer?: (text: string) => Action; // ? - временно
}

export const TextInput = ({
    placeholder,
    type = "input",
    reducer,
}: TextInputProps) => {
    const [focus, setFocus] = useState(false);
    const [textValue, setTextValue] = useState("");

    const debouncedText = useDebouncedValue(textValue, 300);

    const dispatch = useDispatch();

    useEffect(() => {
        if (reducer) {
            // временно
            dispatch(reducer(debouncedText));
        }
    }, [debouncedText]);

    function isInputNotEmpty(e: ChangeEvent) {
        if ((e.target as HTMLInputElement).value) {
            return true;
        }
        return false;
    }

    if (type === "input") {
        return (
            <_Wrapper>
                <_Placeholder $focus={focus}>{placeholder}</_Placeholder>
                <_TextInput
                    value={textValue}
                    onChange={(e) => {
                        setFocus(isInputNotEmpty(e));
                        setTextValue(e.target.value);
                    }}
                />
            </_Wrapper>
        );
    } else {
        return (
            <_Wrapper>
                <_Placeholder $focus={focus}>{placeholder}</_Placeholder>
                <_TextArea
                    value={textValue}
                    onChange={(e) => {
                        setFocus(isInputNotEmpty(e));
                        setTextValue(e.target.value);
                    }}
                />
            </_Wrapper>
        );
    }
};

interface PlaceholderProps {
    $focus?: boolean;
}

const _Wrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
`;

const _Placeholder = styled.span<PlaceholderProps>`
    position: absolute;
    pointer-events: none;
    top: ${({ $focus }) => ($focus ? "-6px" : "10px")};
    left: 10px;
    color: ${({ theme, $focus }) =>
        $focus ? theme.colors.textPrimaryNormal : theme.colors.textMuted};

    font-size: ${({ $focus }) => ($focus ? "12px" : "16px")};
    background-color: ${({ theme, $focus }) =>
        $focus ? theme.colors.placeholder : "transparent"};
    border-radius: ${({ theme }) => theme.radius.xs};
    padding: 0 3px;
    backdrop-filter: ${({ $focus }) => ($focus ? "blur(4px)" : "none")};

    transition: 0.1s;
`;

const b_BaseInput = styled.input`
    all: unset;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.textPrimaryNormal};
    border: 1px solid ${({ theme }) => theme.colors.items};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border-radius: ${({ theme }) => theme.radius.md};
    width: 100%;
`;

const _TextInput = styled(b_BaseInput)`
    height: 36px;
`;

const _TextArea = styled(b_BaseInput).attrs({ as: "textarea" })`
    height: 198px;
    resize: none;
`;
