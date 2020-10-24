import { toJS } from 'mobx';

const getGroups = (store) => {
	const groupsByDay = store.user.transactions.reduce((group, record) => {
		if (!group[record.date]) {
			group[record.date] = [];
		}
		group[record.date].push(toJS(record));
		return group;
	}, {});

	const groupsByDayWithSum = Object.keys(groupsByDay)
		.sort((a, b) => new Date(b) - new Date(a))
		.map((day) => {
			return {
				day,
				records: groupsByDay[day],
				sum: groupsByDay[day].reduce((acc, current) => {
					if (!current.wallet) {
						return acc;
					} else return acc + current.sum;
				}, 0),
			};
		});

	const groupsByMonth = groupsByDayWithSum.reduce((group, record) => {
		const monthNames = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		];
		const date = new Date(record.day);
		const dateYear = date.getFullYear();
		const dateMonth = monthNames[date.getMonth()];
		if (!group[`${dateMonth} ${dateYear}`]) {
			group[`${dateMonth} ${dateYear}`] = [];
		}
		group[`${dateMonth} ${dateYear}`].push(record);
		return group;
	}, {});

	return Object.keys(groupsByMonth).map((month) => {
		return {
			month,
			records: groupsByMonth[month],
		};
	});
};

export default getGroups;
