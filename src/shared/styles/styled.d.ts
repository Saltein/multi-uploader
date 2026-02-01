import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        background: {
            main: string;
        };
        colors: {
            background: string;
            surface: string;
            items: string;
            textPrimary: string;
            textMuted: string;
        };
        spacing: {
            xxs: string;
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
        };
        radius: {
            xxs: string;
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
        };
        shadow: {
            sm: string;
            md: string;
            lg: string;
        };
    }
}
