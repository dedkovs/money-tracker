import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	iconDarkMode: {
		position: 'relative',
		opacity: 0.5,
		top: 3,
		width: 22,
	},
}));

const DrawerSwitchTheme = inject('store')(
	observer(({ store }) => {
		const [dark, setDark] = React.useState(
			store.themeType === 'light' ? false : true
		);

		const classes = useStyles();

		const switchDark = () => {
			if (store.themeType === 'dark' && dark === true) {
				store.setThemeType('light');
				setDark(false);
			} else {
				store.setThemeType('dark');
				setDark(true);
			}
		};

		return (
			<ListItem divider button onClick={switchDark}>
				<FormControlLabel
					control={<Switch checked={dark} name="dark" color={'primary'} />}
					label={
						<Brightness4Icon
							color={'primary'}
							className={classes.iconDarkMode}
							onClick={(e) => {
								e.preventDefault();
							}}
						/>
					}
				/>
			</ListItem>
		);
	})
);

export default DrawerSwitchTheme;
