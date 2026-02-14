import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import ClearIcon from "../../../assets/icons/close.svg?react";
import { useDispatch } from "react-redux";
import { setScheduledAt } from "../../../../processes/upload/model/slice";

interface DateTimeInputProps {
    title: string;
}

export const DateTimeInput = ({ title }: DateTimeInputProps) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const dateRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    function concatDateTime(date: string, time: string) {
        return `${date} ${time}`;
    }

    useEffect(() => {
        const dateTime = concatDateTime(date, time);
        dispatch(setScheduledAt(dateTime));
    }, [date, time]);

    const formattedDate = date
        ? new Date(date).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "Выбрать дату";

    const formattedTime = time || "Время";

    const openDatePicker = () => dateRef.current?.showPicker();
    const openTimePicker = () => timeRef.current?.showPicker();

    return (
        <_Wrapper>
            {title}

            <_InputContainer $dateTime={date || time}>
                {/* Дата */}
                <_FakeDateInput onClick={openDatePicker}>
                    <_Formatted>{formattedDate}</_Formatted>

                    <_HiddenDateInput
                        ref={dateRef}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </_FakeDateInput>

                {/* Время */}
                <_FakeTimeInput onClick={openTimePicker}>
                    <_Formatted>{formattedTime}</_Formatted>

                    <_HiddenTimeInput
                        ref={timeRef}
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </_FakeTimeInput>
            </_InputContainer>
            {(date || time) && (
                <_ClearButton
                    className="clearButton"
                    onClick={() => {
                        setDate("");
                        setTime("");
                    }}
                >
                    <ClearIcon className="clearIcon" />
                </_ClearButton>
            )}
        </_Wrapper>
    );
};

const _Wrapper = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.textPrimaryNormal};
    border: 1px solid ${({ theme }) => theme.colors.items};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border-radius: ${({ theme }) => theme.radius.md};
    width: 100%;
    height: 36px;
`;

interface InputContainerProps {
    $dateTime: string;
}

const _InputContainer = styled.div<InputContainerProps>`
    display: flex;
    gap: 8px;
    padding-right: ${({ $dateTime }) => ($dateTime ? "20px" : 0)};
`;

const _FakeInput = styled.div`
    position: relative;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    transition: 0.2s;

    &:hover {
        color: ${({ theme }) => theme.colors.textPrimaryBright};
    }
`;

const _FakeDateInput = styled(_FakeInput)`
    width: 112px;
    justify-content: end;
`;

const _FakeTimeInput = styled(_FakeInput)`
    width: 44px;
    justify-content: center;
`;

const _Formatted = styled.span`
    pointer-events: none;
`;

const _ClearButton = styled.div`
    width: 28px;
    height: 26px;
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 1;
    transition: 0.2s;
    cursor: pointer;

    .clearIcon {
        width: 16px;
        height: 16px;
    }
`;

// ─── Дата ────────────────────────────────────────
const _HiddenDateInput = styled.input.attrs({ type: "date" })`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 200%;
    opacity: 0;
    cursor: pointer;
    top: -50%;

    &::-webkit-calendar-picker-indicator {
        /* Растягиваем область клика по всей ширине и высоте */
        position: absolute;
        inset: 0;
        width: auto;
        height: auto;
        background: transparent;
        color: transparent;
        cursor: pointer;
    }
`;

// ─── Время ────────────────────────────────────────
const _HiddenTimeInput = styled.input.attrs({ type: "time" })`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 200%;
    opacity: 0;
    cursor: pointer;
    top: -50%;

    &::-webkit-calendar-picker-indicator,
    &::-webkit-inner-spin-button,
    &::-webkit-clear-button {
        position: absolute;
        inset: 0;
        width: auto;
        height: auto;
        background: transparent;
        color: transparent;
        cursor: pointer;
    }
`;
