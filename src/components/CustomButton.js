import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: amber[500],
		},
	},
});

const CustomButton = (props) => {
	return (
		<ThemeProvider theme={theme}>
			<Button
				type={props.type}
				variant="contained"
				color="primary"
				className={props.className}
				onClick={props.onClick}
				disabled={props.disabled}
			>
				{props.children}
			</Button>
		</ThemeProvider>
	);
};

// CustomButton.propTypes = {
// 	className: PropTypes.string,
// 	children: PropTypes.array,
// 	onClick: PropTypes.func,
// 	disabled: PropTypes.bool,
// 	type: PropTypes.string,
// };

export default CustomButton;
