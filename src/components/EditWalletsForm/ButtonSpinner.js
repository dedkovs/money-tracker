import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	spinner: {
		position: 'absolute',
		left: 0,
		right: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		top: 3,
	},
}));

const ButtonSpinner = () => {
	const classes = useStyles();

	return <CircularProgress size={30} className={classes.spinner} />;
};

export default ButtonSpinner;
