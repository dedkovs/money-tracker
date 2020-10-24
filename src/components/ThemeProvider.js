import React from 'react';
import { inject, observer } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
	blue,
	blueGrey,
	lightBlue,
	lightGreen,
} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// const breakpoints = ['0px', '361px', '960px', '1280px', '1920px'];
// breakpoints.xs = breakpoints[0];
// breakpoints.sm = breakpoints[1];
// breakpoints.md = breakpoints[2];
// breakpoints.lg = breakpoints[3];
// breakpoints.xl = breakpoints[4];

const ThemeProvider = ({ store, children }) => (
	<MuiThemeProvider
		theme={createMuiTheme({
			palette: {
				type: store.themeType,
				common: {
					textExpencesLight1: '#2b3f4f',
					textExpencesDark1: '#0e202e',
					backgroundExpencesLight1: blue[200],
					backgroundExpencesLight2: '#dbe9f8',
					backgroundExpencesDark1: '#14405a',
					backgroundExpencesDark2: '#627f94',

					textIncomeLight1: '#264d16',
					textIncomeDark1: '#172e0d',
					backgroundIncomeLight1: lightGreen[400],
					backgroundIncomeLight2: '#def0d5',
					backgroundIncomeDark1: lightGreen[900],
					backgroundIncomeDark2: '#6a875d',

					textBetweenLight1: blueGrey[900],
					textBetweenDark1: '#192024',
					backgroundBetweenLight1: blueGrey[200],
					backgroundBetweenLight2: '#e6ebed',
					backgroundBetweenDark1: blueGrey[700],
					backgroundBetweenDark2: '#68747a',
				},
				primary: {
					main: blue[200],
				},
				secondary: {
					main: lightBlue[800],
				},
			},
		})}
	>
		{children}
	</MuiThemeProvider>
);

export default inject('store')(observer(ThemeProvider));
