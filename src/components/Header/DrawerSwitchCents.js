import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	showComments: {
		marginLeft: 0,
	},
}));

const DrawerSwitchComments = inject('store')(
	observer(({ store }) => {
		const { showCents, setShowCents } = store;

		const switchCents = () => {
			setShowCents(!showCents);
		};

		const classes = useStyles();

		return (
			<ListItem divider button onClick={switchCents}>
				<FormControlLabel
					value="show comments"
					control={<Switch color="primary" checked={showCents} />}
					label={`${showCents ? 'Скрыть копейки' : 'Показывать копейки'}`}
					labelPlacement="start"
					className={classes.showComments}
					onClick={(e) => {
						e.preventDefault();
					}}
				/>
			</ListItem>
		);
	})
);

export default DrawerSwitchComments;
