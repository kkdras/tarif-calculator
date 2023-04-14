import React, { createContext, useReducer } from 'react';

export const initialState = {
	phone: null as number | null,
	minutes: 0,
	sms: 0,
	internet: 0,
	operator: null as string | null,
	router: {
		rent: true,
		redeem: false
	},
	social: {
		facebook: false,
		vk: true,
		classmates: false,
		instagram: true,
		tikTok: false
	}
};

export type StateType = typeof initialState;

export interface IStore {
	state: StateType;
	dispatch: React.Dispatch<IAction>;
}

export const StoreContext = createContext<IStore | null>(null);

interface IAction {
	type: ActionType;
	data: Partial<StateType>;
}

const enum ActionType {
	updateState
}

const reducer = (state: StateType, action: IAction) => {
	const type = action.type;

	if (type === ActionType.updateState) {
		return {
			...state,
			...action.data
		};
	}

	return state;
};

type PropsType = {
	children: JSX.Element
}

export const StoreProvider = ({ children }: PropsType) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};
