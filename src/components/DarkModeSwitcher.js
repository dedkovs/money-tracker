import React from 'react';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import { amber } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
	'@keyframes animation1': {
		from: { opacity: 0 },
		to: { opacity: 1 },
	},
	iconDarkMode: {
		position: 'relative',
		opacity: 0.5,
		top: 3,
		width: 22,
	},
	switchPosition1: {
		position: 'absolute',
		right: 0,
		top: 4,
		opacity: 0,
		animationName: '$animation1',
		animationDuration: '2s',
		animationDelay: '0.3s',
		animationIterationCount: 1,
		animationFillMode: 'forwards',
	},
	switchPosition2: {
		position: 'absolute',
		right: 0,
		top: 4,
		opacity: 1,
	},
	button: {
		minHeight: 56,
		'@media (min-width:0px) and (orientation: landscape)': {
			minHeight: 48,
		},
		'@media (min-width:600px)': { minHeight: 64 },
	},
}));

const DarkModeSwitcher = inject('store')(
	observer(({ store }) => {
		const [dark, setDark] = React.useState(
			store.themeType === 'light' ? false : true
		);

		const switchDark = () => {
			if (store.themeType === 'dark' && dark === true) {
				store.setThemeType('light');
				setDark(false);
			} else {
				store.setThemeType('dark');
				setDark(true);
			}
		};

		const switchColor = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: amber[500],
				},
			},
		});

		const classes = useStyles();

		return (
			<ThemeProvider theme={switchColor}>
				<Tooltip
					title={`${
						store.themeType === 'light'
							? 'Перейти на тёмную тему'
							: 'Перейти на светлую тему'
					}`}
					placement={'bottom'}
				>
					<FormControlLabel
						control={
							<Switch
								checked={dark}
								onChange={switchDark}
								name="dark"
								color={'primary'}
							/>
						}
						label={
							<Brightness4Icon
								color={'primary'}
								className={classes.iconDarkMode}
							/>
						}
						className={
							store.animated === true
								? classes.switchPosition1
								: classes.switchPosition2
						}
					/>
				</Tooltip>
			</ThemeProvider>
		);
	})
);

export default DarkModeSwitcher;
