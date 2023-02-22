import { createTheme } from '@mui/material';

const elembranteOriginalGreen = '#4ab354';
const muiBlue = '#1976d2';
const using = '#ca792e';

declare module '@mui/material/styles' {
	interface Theme {
	  appIcon: {
		default: string;
	  };
	}

	interface ThemeOptions {
	  appIcon?: {
		default?: string;
	  };
	}
  }

const theme = createTheme({
	palette: {
		primary: {
			main: using,
		},
		error: {
			main: '#f44336',
		},
		secondary: {
			main: muiBlue
		}
	},
	appIcon: {
		default: using
	}
});


export default theme;
