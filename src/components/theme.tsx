export interface FontConfiguration {
    fontSize: number;
    fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold';
    fontFamily: string;
}

export interface FontConfigurations {
    pageTitle: FontConfiguration;
    primary: FontConfiguration;
    default: FontConfiguration;
    listItem: FontConfiguration;
    listItemAdditionalData: FontConfiguration;
    filter: FontConfiguration;
    action: FontConfiguration;
}

export interface ColorConfigurations {
    background: string;
    white: string;
    secondary: string;
    primary: string;
    error: string;
};

export interface BorderRadiusConfigurations {
    s: number;
    m: number;
    l: number;
    xl: number;
}

export interface SpacingConfigurations extends BorderRadiusConfigurations { }

export type ThemeConfiguration = {
    colors: ColorConfigurations,
    fonts: FontConfigurations,
    borderRadius: BorderRadiusConfigurations,
    spacing: SpacingConfigurations
};

export const theme: ThemeConfiguration = {
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