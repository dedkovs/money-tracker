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
		const { collapsedComments, setCollapsedComments } = store;

		const switchComments = () => {
			setCollapsedComments(!collapsedComments);
		};

		const classes = useStyles();

		return (
			<ListItem divider button onClick={switchComments}>
				<FormControlLabel
					value="show comments"
					control={<Switch color="primary" checked={!collapsedComments} />}
					label={`${
						collapsedComments ? 'Раскрыть комментарии' : 'Скрыть комментарии'
					}`}
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
