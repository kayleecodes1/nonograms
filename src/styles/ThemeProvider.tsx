import React from 'react';
import { DefaultTheme, ThemeProvider as BaseThemeProvider } from 'styled-components';

declare module 'styled-components' {
    interface DefaultTheme {
        colors: {
            primary: string;
            text: {
                body: string;
                heading: string;
            };
        };
        typefaces: {
            body: string;
            heading: string;
            label: string;
        };
    }
}

const defaultTheme: DefaultTheme = {
    colors: {
        primary: '#2E85EC',
        text: {
            body: '#6E7176',
            heading: '#0F1925',
        },
    },
    typefaces: {
        heading: '"Open Sans", sans-serif',
        body: '"Open Sans", sans-serif',
        label: '"Roboto Mono", monospace',
    },
};

interface ThemeProviderProps {
    children?: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
    <BaseThemeProvider theme={defaultTheme}>{children}</BaseThemeProvider>
);

export default ThemeProvider;
