import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, setCurrentPage } from "../../../app/model/slice";
import { useState } from "react";
import { APP_PAGES } from "../../../app/pages";

interface NavItemProps {
    $current?: boolean;
    $isOpen?: boolean;
}

export const NavPanel = () => {
    const dispatch = useDispatch();

    const currentPage = useSelector(selectCurrentPage);
    const [isListOpen, setIsListOpen] = useState(false);

    const toggleList = () => {
        setIsListOpen((prev) => !prev);
    };

    const closeList = () => {
        setIsListOpen(false);
    };

    const selectPage = (page: string) => {
        dispatch(setCurrentPage(page as (typeof APP_PAGES)[number]));
        closeList();
    };

    return (
        <NavPanelWrapper>
            <NavDropDown onClick={toggleList}>
                {!isListOpen && <NavItem>{currentPage}</NavItem>}

                {isListOpen &&
                    APP_PAGES.map((page) => (
                        <NavItem
                            $isOpen={isListOpen}
                            $current={page === currentPage}
                            key={page}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectPage(page);
                            }}
                        >
                            <span>{page}</span>
                        </NavItem>
                    ))}
            </NavDropDown>
        </NavPanelWrapper>
    );
};

const NavPanelWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    height: 32px;
    width: 520px;
    min-width: 120px;
    flex-shrink: 1;

    -webkit-app-region: no-drag;
`;

const NavDropDown = styled.div`
    position: absolute;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    min-height: 32px;
    height: fit-content;
    width: 100%;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.surface};
    transition: border 0.2s;

    overflow: hidden;

    &:hover {
        cursor: pointer;
        border: 1px solid ${({ theme }) => theme.colors.border};
    }
`;

const NavItem = styled.div<NavItemProps>`
    display: flex;
    align-items: center;
    justify-content: ${({ $isOpen }) => ($isOpen ? "space-between" : "center")};
    padding: 0 ${({ theme }) => theme.spacing.xxl};
    height: 32px;
    width: 100%;
    transition: 0.2s;
    color: ${({ $current, theme }) =>
        $current
            ? theme.colors.textPrimaryBright
            : theme.colors.textPrimaryNormal};

    &:hover {
        background: ${({ theme }) => theme.colors.items};
        color: ${({ theme }) => theme.colors.textPrimaryBright};
    }
`;
