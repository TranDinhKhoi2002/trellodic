import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { CssVarsThemeOptions } from '@mui/material/styles';
import { useTheme } from '@mui/styles';

export type CustomThemeOptions = CssVarsThemeOptions & {
  customProps: {
    appBarHeight: string;
    boardBarHeight: string;
    boardContentHeight: string;
    columnHeaderHeight: string;
    columnFooterHeight: string;
  };
  colors: { [key: string]: string };
};

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

const theme = extendTheme({
  colorSchemes: {
    //* NOTE: custom light and dark theme
    dark: {
      palette: {
        mode: 'dark',
        text: {
          primary: '#b6c2cf',
          secondary: '#b6c2cf',
        },
      },
    },
    light: {
      palette: {
        mode: 'light',
        text: {
          primary: '#172b4d',
          secondary: '#172b4d',
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#db3131',
          '&$error': {
            color: '#db3131',
          },
        },
      },
    },
  },
  customProps: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: '50px',
    columnFooterHeight: '56px',
  },
  colors: {
    bgDark: '#24272b',
    bgBlueDark: '#1565c0',
    bgBlueLight: '#1976d2',
    bgCardDark: '#282e33',
    workspaceAvatar: 'linear-gradient(to right bottom, #9f8fef, #579dff)',
    textInLightMode: 'white',
    textInDarkMode: '#b6c2cf',
  },
} as CustomThemeOptions);

export const useCustomTheme = () => {
  return useTheme<CustomThemeOptions>();
};

export default theme;
