const commentRevealOrHide = (store, wrapperRef, setCollapsed) => {
	if (store.collapsedComments === true) {
		setCollapsed(true);
		if (
			wrapperRef.current.nextSibling &&
			wrapperRef.current.nextSibling.style.maxHeight
		) {
			wrapperRef.current.nextSibling.style.maxHeight = null;
		}
	}

	if (store.collapsedComments === false) {
		setCollapsed(false);
		if (wrapperRef.current.nextSibling) {
			wrapperRef.current.nextSibling.style.maxHeight =
				wrapperRef.current.nextSibling.scrollHeight + 20 + 'px';
		}
	}
};

export default commentRevealOrHide;
