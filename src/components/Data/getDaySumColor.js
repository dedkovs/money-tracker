const getDaySumColor = (themeType, sum) => {
	if (themeType === 'light') {
		if (sum > 0) {
			return 'positiveColorLight';
		}
		if (sum < 0) {
			return 'negativeColorLight';
		}
		if (sum === 0) {
			return 'zeroColorLight';
		}
	}

	if (themeType === 'dark') {
		if (sum > 0) {
			return 'positiveColorDark';
		}
		if (sum < 0) {
			return 'negativeColorDark';
		}
		if (sum === 0) {
			return 'zeroColorDark';
		}
	}
};

export default getDaySumColor;
