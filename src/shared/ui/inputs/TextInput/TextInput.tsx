import styled from "styled-components";
import { Action } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebouncedValue } from "../../../hooks";
import ClearIcon from "../../../assets/icons/close.svg?react";

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
    const [textValue, setTextValue] = useState("");

    const debouncedText = useDebouncedValue(textValue, 300);

    const dispatch = useDispatch();

    useEffect(() => {
        if (reducer) {
            // временно
            dispatch(reducer(debouncedText));
        }
    }, [debouncedText]);

    function clearText() {
        setTextValue("");
    }

    return (
        <_Wrapper>
            <_Placeholder $focus={textValue !== ""}>{placeholder}</_Placeholder>
            {type === "input" ? (
                <_TextInput
                    value={textValue}
                    onChange={(e) => {
                        setTextValue(e.target.value);
                    }}
                    maxLength={90}
                />
            ) : (
                <>
                    <_TextArea
                        value={textValue}
                        onChange={(e) => {
                            setTextValue(e.target.value);
                        }}
                        maxLength={2000}
                    />
                    <_SymbolCounter $textValue={textValue}>
                        {textValue.length} / 2000
                    </_SymbolCounter>
                </>
            )}
            <_ClearButton className="clearButton" onClick={clearText}>
                <ClearIcon className="clearIcon" />
            </_ClearButton>
        </_Wrapper>
    );
};

interface PlaceholderProps {
    $focus?: boolean;
}

const _Wrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;

    &:hover {
        .clearButton {
            opacity: 1;
        }
    }
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
    padding-right: 32px;
`;

const _TextInput = styled(b_BaseInput)`
    height: 36px;
`;

const _TextArea = styled(b_BaseInput).attrs({ as: "textarea" })`
    height: 198px;
    resize: none;
    overflow-y: auto;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-break: break-word;
    padding-bottom: 32px;

    /* сам скроллбар */
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    /* дорожка */
    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 4px;
    }

    /* ползунок */
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.surface};
        border-radius: 4px;
    }

    /* hover по ползунку */
    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.items};
    }
`;

const _ClearButton = styled.div`
    width: 28px;
    height: 28px;
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    transition: 0.2s;
    cursor: pointer;

    .clearIcon {
        width: 16px;
        height: 16px;
    }
`;

interface SymbolCounterProps {
    $textValue: string;
}

const _SymbolCounter = styled.span<SymbolCounterProps>`
    position: absolute;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    margin: ${({ theme }) => theme.spacing.xs};
    right: 0;
    bottom: 0;
    font-size: 14px;
    color: ${({ theme, $textValue }) =>
        $textValue ? theme.colors.textPrimaryNormal : theme.colors.textMuted};
    border-radius: ${({ theme }) => theme.radius.sm};
    backdrop-filter: blur(4px);
`;
