import styled from "styled-components";
import { Platform } from "../model/types";
import { useLoginToYouTube } from "../../../processes/youtube/hooks/useLoginToYouTube";
import { ConnectionButton } from "../../../shared";
import YoutubeIcon from "../../../shared/assets/icons/youtube-shorts.svg?react";
import TikTokIcon from "../../../shared/assets/icons/tiktok.svg?react";
import InstagramIcon from "../../../shared/assets/icons/instagram-reels.svg?react";
import VkClipsIcon from "../../../shared/assets/icons/vk-clips.svg?react";

interface AccountCardProps {
    id: string;
    platform: Platform;
    username: string;
    link: string;
    connected?: boolean;
    tokens: {
        issued_at: number;
    };
}

export const AccountCard = ({
    platform,
    username,
    connected,
}: AccountCardProps) => {
    const { googleLogin, googleLogout } = useLoginToYouTube();

    let login = () => {};
    let logout = () => {};
    let Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    switch (platform) {
        case "YouTube":
            login = googleLogin;
            logout = googleLogout;
            Icon = YoutubeIcon;
            break;
        case "TikTok":
            Icon = TikTokIcon;
            break;
        case "Instagram":
            Icon = InstagramIcon;
            break;
        case "VK Clips":
            Icon = VkClipsIcon;
            break;
    }

    return (
        <_CardWrapper $connected={connected}>
            <_CardInfo className="card_info">
                <_PlatformContainer className="platform_container">
                    <_IconWrapper className="icon_wrapper">
                        <Icon className="platform_icon" />
                    </_IconWrapper>
                    <_PlatformName>
                        <_Platform>{platform}</_Platform>
                        {username && <_Name>{username}</_Name>}
                    </_PlatformName>
                </_PlatformContainer>
            </_CardInfo>
            {connected ? (
                <ConnectionButton title="Отключить" onClick={() => logout()} />
            ) : (
                <ConnectionButton title="Подключить" onClick={() => login()} />
            )}
        </_CardWrapper>
    );
};

// Styled Components ----------------------------------------------------------

interface CardWrapperProps {
    $connected?: boolean;
}

const _CardWrapper = styled.div<CardWrapperProps>`
    display: flex;
    flex-direction: column;
    border-radius: ${({ theme }) => theme.radius.sm};
    background-color: ${({ theme }) => theme.colors.surface};
    height: ${({ $connected }) => ($connected ? "240px" : "120px")};
    transition: 0.2s;

    &:hover:not(:has(.card_info:hover)) {
        background-color: ${({ theme, $connected }) =>
            $connected ? theme.colors.red : theme.colors.blue};

        .icon_wrapper {
            padding: 4px 8px;
            border-radius: ${({ theme }) => theme.radius.md};
        }

        .platform_container {
            height: 40px;
        }
    }
`;

const _CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.surface};
    flex: 1;
    transition: 0.2s;
    gap: ${({ theme }) => theme.spacing.md};
`;

const _PlatformContainer = styled.div`
    display: flex;
    height: 48px;
    transition: 0.2s;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const _IconWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.items};
    padding: 8px;
    border-radius: ${({ theme }) => theme.radius.lg};
    transition: 0.2s;
    .platform_icon {
        height: 32px;
        width: 32px;
    }
`;

const _PlatformName = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 56px);
`;

const _Platform = styled.h4`
    font-size: 18px;
`;

const _Name = styled.span`
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0px;
    transition: 0.1s;
    border-radius: ${({ theme }) => theme.radius.sm};

    &:hover {
        font-size: 14px;
        white-space: nowrap;
        overflow: unset;
        text-overflow: unset;
        max-width: unset;
        background-color: ${({ theme }) => theme.colors.items};
        width: fit-content;
        backdrop-filter: blur(4px);
        padding: 4px;
    }
`;
