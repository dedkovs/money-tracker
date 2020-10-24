import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	subcategoryContainer: {
		position: 'absolute',
		top: 44,
		left: 40,
	},
	subcategoryText: {
		fontFamily: 'Ubuntu, Roboto, sans-serif',
		opacity: 0.6,
	},
}));

const Subcategory = ({ expences_sub, income_sub }) => {
	const classes = useStyles();

	return (
		<>
			{expences_sub && (
				<div className={classes.subcategoryContainer}>
					<Typography className={classes.subcategoryText} variant={'body2'}>
						{expences_sub}
					</Typography>
				</div>
			)}
			{income_sub && (
				<div className={classes.subcategoryContainer}>
					<Typography className={classes.subcategoryText} variant={'body2'}>
						{income_sub}
					</Typography>
				</div>
			)}
		</>
	);
};

export default Subcategory;
