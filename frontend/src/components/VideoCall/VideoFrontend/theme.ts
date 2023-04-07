import { createTheme } from '@mui/material';

import { adaptV4Theme } from '@mui/material/styles';

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    sidebarWidth: number;
    sidebarMobileHeight: number;
    brand: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth: number;
  }

  // allow configuration using `createMuiTheme`
  interface DeprecatedThemeOptions {
    sidebarWidth?: number;
    sidebarMobileHeight?: number;
    brand: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth?: number;
  }
}

const defaultTheme = createTheme();

export default createTheme(
  adaptV4Theme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          'html, body, #root': {
            height: '100%',
          },
        },
      },
      MuiButton: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          color: 'rgb(40, 42, 43)',
          fontSize: '0.9rem',
          transition: defaultTheme.transitions.create(
            ['background-color', 'box-shadow', 'border', 'color'],
            {
              duration: defaultTheme.transitions.duration.short,
            },
          ),
        },
        text: {
          padding: '6px 14px',
        },
        contained: {
          'boxShadow': 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlinedPrimary: {
          'border': '2px solid #027AC5',
          '&:hover': {
            border: '2px solid rgb(1, 85, 137)',
          },
        },
        startIcon: {
          marginRight: '6px',
        },
      },
      MuiTypography: {
        body1: {
          color: 'rgb(40, 42, 43)',
          fontSize: '0.9rem',
        },
      },
      MuiInputBase: {
        root: {
          fontSize: '0.9rem',
        },
      },
      MuiDialogActions: {
        root: {
          padding: '16px',
        },
      },
      MuiTextField: {
        root: {
          color: 'rgb(40, 42, 43)',
        },
      },
      MuiInputLabel: {
        root: {
          color: 'rgb(40, 42, 43)',
          fontSize: '1.1rem',
          marginBottom: '0.2em',
          fontWeight: 500,
        },
      },
      MuiOutlinedInput: {
        notchedOutline: {
          borderColor: 'rgb(136, 140, 142)',
        },
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    palette: {
      primary: {
        main: '#027AC5',
      },
    },
    // brand: '#E22525',
    // footerHeight: 72,
    // mobileFooterHeight: 56,
    // sidebarWidth: 300,
    // sidebarMobileHeight: 90,
    // sidebarMobilePadding: 8,
    // participantBorderWidth: 1,
    // mobileTopBarHeight: 52,
    // rightDrawerWidth: 320,
  }),
);
