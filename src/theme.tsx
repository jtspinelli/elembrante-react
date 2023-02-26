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

	interface BreakpointOverrides {
		xs: true;
		ssm: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
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
	},
	breakpoints: {
		values: {
			xs: 0,
			ssm: 450,
			sm: 650,
			md: 900,
			lg: 1200,
			xl: 1536
		}
	}
});


export default theme;
