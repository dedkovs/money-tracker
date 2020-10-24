import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
	arrowDown: {
		position: 'absolute',
		left: 35,
		top: 20,
	},
	arrowDownColor: {
		color: blueGrey[900],
	},
	arrowDownColorDark: {
		color: 'white',
	},
}));

const ArrowBetweenWallets = inject('store')(
	observer(({ store, wallet_from }) => {
		const classes = useStyles();

		const getArrowDownColor = () => {
			if (store.themeType === 'light') return classes.arrowDownColor;
			return classes.arrowDownColorDark;
		};

		return (
			<>
				{wallet_from && (
					<ArrowDropDownIcon
						className={`${classes.arrowDown} ${getArrowDownColor()}`}
					/>
				)}
			</>
		);
	})
);

export default ArrowBetweenWallets;
