import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { inject, observer } from 'mobx-react';
import MenuButton from './MenuButton';
import WalletContainer from './Wallet/WalletContainer';
import ArrowBetweenWallets from './ArrowBetweenWallets';
import Category from './Category';
import Subcategory from './Subcategory';
import Sum from './Sum';
import getPaperColor from './getPaperColor';
import Comment from './Comment/Comment';
import commentRevealOrHide from './Comment/commentRevealOrHide';
import revealRecordCommentFunc from './Comment/revealRecordCommentFunc';

const useStyles = makeStyles(() => ({
	paper: {
		height: 65,
		margin: '0px 0px 22px',
		overflow: 'hidden',
		position: 'relative',
		borderRadius: 10,
	},
}));

const Record = inject('store')(
	observer(({ store, record }) => {
		const { setAnchorEl, setRecordToEdit } = store;

		const {
			id,
			wallet,
			wallet_from,
			expences,
			expences_sub,
			income,
			income_sub,
			sum,
			comment,
		} = record;

		let x, y;
		const [collapsed, setCollapsed] = React.useState(store.collapsedComments);
		const wrapperRef = React.useRef(null);
		const recordMenuButtonRef = React.useRef(null);

		React.useEffect(() => {
			let f;
			if (comment.trim() !== '') {
				wrapperRef.current.addEventListener('mousedown', getMouseCoordinates);
				wrapperRef.current.addEventListener(
					'mouseup',
					(f = function () {
						revealRecordCommentFunc(
							x,
							y,
							wrapperRef,
							recordMenuButtonRef,
							collapsed,
							setCollapsed
						);
					})
				);
				return () => {
					wrapperRef.current.removeEventListener(
						'mousedown',
						getMouseCoordinates
					);
					wrapperRef.current.removeEventListener('mouseup', f);
				};
			}
		});

		React.useEffect(() => {
			commentRevealOrHide(store, wrapperRef, setCollapsed);
		}, [store.collapsedComments]);

		const getMouseCoordinates = (e) => {
			x = e.clientX;
			y = e.clientY;
		};

		const classes = useStyles();

		return (
			<>
				<Paper
					ref={wrapperRef}
					elevation={0}
					className={`${classes.paper} ${getPaperColor(store, sum, wallet)}`}
				>
					<MenuButton
						handleClick={(e) => {
							setAnchorEl(e.currentTarget);
							setRecordToEdit(record);
						}}
						ref={recordMenuButtonRef}
					/>
					<WalletContainer record={record} />
					<ArrowBetweenWallets wallet_from={wallet_from} />
					<Category expences={expences} income={income} />
					<Subcategory expences_sub={expences_sub} income_sub={income_sub} />
					<Sum sum={sum} wallet={wallet} />
				</Paper>
				<Comment
					comment={comment}
					id={id}
					sum={sum}
					wallet={wallet}
					collapsed={collapsed}
				/>
			</>
		);
	})
);

export default Record;
