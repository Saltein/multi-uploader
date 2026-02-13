import styled from "styled-components";

import { Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

interface ChoiceInputProps {
    title: string;
    values?: string[];
    reducer?: (value: string) => Action;
}

export const ChoiceInput = ({
    title,
    values = ["Да", "Нет"],
    reducer,
}: ChoiceInputProps) => {
    const [selected, setSelected] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (reducer && selected) {
            dispatch(reducer(selected));
        }
    }, [selected]);

    return (
        <_Wrapper>
            <span>{title}</span>
            <_ChoiceContainer>
                {values.map((value) => (
                    <_Value
                        key={value}
                        $selected={selected === value}
                        onClick={() => setSelected(value)}
                    >
                        {value}
                    </_Value>
                ))}
            </_ChoiceContainer>
        </_Wrapper>
    );
};

const _Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: ${({ theme }) => theme.colors.textPrimaryNormal};
    border: 1px solid ${({ theme }) => theme.colors.items};
    padding: ${({ theme }) => `0 4px 0 ${theme.spacing.md}`};
    border-radius: ${({ theme }) => theme.radius.md};
    width: 100%;
    height: 36px;
`;

const _ChoiceContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.sm};
    overflow: hidden;
    cursor: pointer;
`;

interface ValueProps {
    $selected?: boolean;
}

const _Value = styled.span<ValueProps>`
    height: 24px;
    padding: 0 12px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 14px;
    background-color: ${({ theme, $selected }) =>
        $selected ? theme.colors.postButton : theme.colors.surface};
    color: ${({ theme, $selected }) =>
        $selected ? theme.colors.postButtonTextHover : "inherit"};

    display: flex;
    align-items: center;
    justify-content: center;

    white-space: nowrap;

    transition: 0.2s;

    cursor: pointer;

    &:last-child {
        border-right: none;
    }

    &:hover {
        background-color: ${({ theme, $selected }) =>
            $selected ? theme.colors.postButton : theme.colors.items};
        color: ${({ theme, $selected }) =>
            $selected
                ? theme.colors.postButtonTextHover
                : theme.colors.textPrimaryBright};
    }
`;
