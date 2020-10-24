import React from 'react';

const getSubcategories = (store) => {
	if (
		store.editRecordFormType === 'expences' &&
		store.editRecordCategory === ''
	)
		return [''];
	if (
		store.editRecordFormType === 'expences' &&
		store.editRecordCategory !== ''
	)
		return store.user.expences_categories[store.editRecordCategory].map(
			(item) => (
				<option key={item} value={item}>
					{item}
				</option>
			)
		);
	if (store.editRecordFormType === 'income' && store.editRecordCategory === '')
		return [''];
	if (store.editRecordFormType === 'income' && store.editRecordCategory !== '')
		return store.user.income_categories[store.editRecordCategory].map(
			(item) => (
				<option key={item} value={item}>
					{item}
				</option>
			)
		);
};

export default getSubcategories;
