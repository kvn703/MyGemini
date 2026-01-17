import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4b90ff',
        },
        background: {
            default: '#131314',
            paper: '#1e1f20',
        },
        text: {
            primary: '#e3e3e3',
            secondary: '#a8a8a8',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3.5rem',
            fontWeight: 500,
            background: 'linear-gradient(to right, #4b90ff, #ff5546)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        body1: {
            lineHeight: 1.7,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 24,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1e1f20',
                    borderRight: 'none',
                },
            },
        },
    },
});
