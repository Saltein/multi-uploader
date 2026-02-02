import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, setCurrentPage } from "../../../app/model/slice";
import { useEffect, useRef, useState } from "react";
import { APP_PAGES } from "../../../app/pages";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
    $current?: boolean;
    $isOpen?: boolean;
}

export const NavPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentPage = useSelector(selectCurrentPage);
    const [isListOpen, setIsListOpen] = useState(false);

    const navRef = useRef<HTMLDivElement>(null);

    const toggleList = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsListOpen((prev) => !prev);
    };

    const closeList = () => {
        setIsListOpen(false);
    };

    const selectPage = (page: string) => {
        dispatch(setCurrentPage(page as (typeof APP_PAGES)[keyof typeof APP_PAGES]));
        navigate(APP_PAGES[page as keyof typeof APP_PAGES]);
        closeList();
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                closeList();
            }
        };

        if (isListOpen) {
            window.addEventListener("click", handleClickOutside);
        }
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isListOpen]);

    return (
        <NavPanelWrapper>
            <NavDropDown ref={navRef} onClick={toggleList}>
                {!isListOpen && <NavItem>{currentPage}</NavItem>}

                {isListOpen &&
                    Object.keys(APP_PAGES).map((page) => (
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

// Styled Components ----------------------------------------------------------

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

    backdrop-filter: blur(8px);

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

    text-shadow: ${({ $current }) =>
        $current ? "0 0 8px #fff8" : "none"};

    color: ${({ $current, theme }) =>
        $current
            ? theme.colors.textPrimaryBright
            : theme.colors.textPrimaryNormal};

    &:hover {
        background: ${({ theme }) => theme.colors.items};
        color: ${({ theme }) => theme.colors.textPrimaryBright};
    }
`;
