import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const CssBaseline = createGlobalStyle(
    {},
    reset,
    `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap')`,
    `@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap')`,
    ({ theme }) => ({
        'html, body': {
            fontFamily: theme.typefaces.body,
            color: theme.colors.text.body,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            background: '#FFF',
        },
        '*': {
            boxSizing: 'border-box',
            fontFamily: theme.typefaces.body,
        },
        'h1, h2, h3, h4, h5, h6': {
            fontFamily: theme.typefaces.heading,
        },
        'a:focus': {
            outline: `${theme.colors.primary} auto 5px`,
        },
    }),
);

export default CssBaseline;
