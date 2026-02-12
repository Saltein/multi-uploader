import { ChangeEvent, useState } from "react";
import styled from "styled-components";

interface TextInputProps {
    placeholder?: string;
    type?: "input" | "area";
}

export const TextInput = ({ placeholder, type = "input" }: TextInputProps) => {
    const [focus, setFocus] = useState(false);
    const [textValue, setTextValue] = useState("");

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
                ></_TextInput>
            </_Wrapper>
        );
    } else {
        return <_TextArea placeholder={placeholder}></_TextArea>;
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
    top: ${({ $focus }) => ($focus ? "-5px" : "10px")};
    left: 12px;
    color: ${({ theme, $focus }) =>
        $focus ? theme.colors.textPrimaryNormal : theme.colors.textMuted};

    font-size: ${({ $focus }) => ($focus ? "12px" : "16px")};
`;

const _TextInput = styled.input`
    all: unset;
    color: ${({ theme }) => theme.colors.textPrimaryNormal};
    &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.colors.textMuted};
    }
    border: 1px solid ${({ theme }) => theme.colors.items};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border-radius: ${({ theme }) => theme.radius.sm};
    width: 100%;
`;

const _TextArea = styled.textarea``;
