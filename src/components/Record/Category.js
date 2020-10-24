import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	categoryContainer: {
		position: 'absolute',
		top: 25,
		left: 40,
	},
	categoryText: {
		fontFamily: 'Ubuntu, Roboto, sans-serif',
	},
}));

const Category = ({ expences, income }) => {
	const classes = useStyles();

	return (
		<>
			{expences && (
				<div className={classes.categoryContainer}>
					<Typography className={classes.categoryText} variant={'body2'}>
						{expences}
					</Typography>
				</div>
			)}

			{income && (
				<div className={classes.categoryContainer}>
					<Typography className={classes.categoryText} variant={'body2'}>
						{income}
					</Typography>
				</div>
			)}
		</>
	);
};

export default Category;
