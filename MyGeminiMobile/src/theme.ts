export const theme = {
    colors: {
        background: {
            default: '#0e0e0e',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a0a0a0',
        },
        primary: {
            main: '#4dabf7',
            dark: '#2196f3',
            contrastText: '#000000',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        action: {
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
        },
        error: {
            main: '#f44336',
        }
    },
    spacing: (factor: number) => factor * 8,
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 16,
        xl: 24,
    }
};
