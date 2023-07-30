import { ThemeConfiguration } from "@caparis/ui-components/src/theme";

export const caparisTheme: ThemeConfiguration = {
    colors: {
        background: '#F2F2F2',
        white: '#FFF',
        secondary: '#273139',
        primary: '#76C045',
        error: '#FF4040',
    },
    borderRadius: {
        s: 6,
        m: 8,
        l: 15,
        xl: 20,
    },
    spacing: {
        s: 8,
        sm: 12,
        m: 16,
        l: 24,
        xl: 40
    },
    fonts: {
        pageTitle: {
            fontSize: 18,
            fontFamily: 'Neuwelt-Medium',
        },
        primary: {
            fontSize: 16,
            fontFamily: 'Neuwelt-Medium',
        },
        default: {
            fontSize: 14,
            fontFamily: 'Neuwelt-Medium',
        },
        listItem: {
            fontSize: 15,
            fontFamily: 'Neuwelt-Medium',
        },
        listItemAdditionalData: {
            fontSize: 14,
            fontFamily: 'Neuwelt-Bold',
        },
        filter: {
            fontSize: 15,
            fontFamily: 'Neuwelt-Medium',
        },
        action: {
            fontSize: 12,
            fontFamily: 'Neuwelt-Medium',
        }
    }
};