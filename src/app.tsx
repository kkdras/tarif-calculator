import React, { useContext } from 'react';
import { IStore, StoreContext } from './store';

export const App = () => {
	const { dispatch, state } = useContext(StoreContext) as IStore;

	console.log(dispatch, state);
	return (
		<div>
			app
		</div>
	);
};
