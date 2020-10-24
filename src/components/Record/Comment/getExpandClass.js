import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	expandMoreIcon: {
		position: 'absolute',
		transform: 'translate(-9px, 10px)',
		right: '50%',
		left: '50%',
		width: 18,
		opacity: 0.5,
		transition: 'all 0.2s ease-in-out',
	},
	expandMoreIconHide: {
		opacity: 0,
		transform: 'translate(-9px, 20px)',
	},
}));

const getExpandClass = (collapsed) => {
	const classes = useStyles();

	const { expandMoreIcon, expandMoreIconHide } = classes;

	if (collapsed === true) {
		return expandMoreIcon;
	} else if (collapsed === false) {
		return `${expandMoreIcon} ${expandMoreIconHide}`;
	}
};

export default getExpandClass;
