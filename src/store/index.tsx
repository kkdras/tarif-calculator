import React, { createContext, useReducer } from 'react';

export interface IMinutesOption {
	value: number;
	label: string;
	minutesValue: number;
}

export interface IOperatorOption {
	name: string;
	id: number;
	price: number;
}

export const initialState = {
	phone: '' as string | null,
	minutesMarks: [] as unknown as IMinutesOption[],
	sms: 0,
	internet: 0,
	operators: [{ name: 'Список операторов пуст', id: 0 }] as IOperatorOption[],
	social: {
		facebook: false,
		vk: true,
		classmates: false,
		instagram: true,
		tikTok: false
	},
	DTO: {
		operator: 0,
		minutes: 1,
		router: {
			rent: true,
			buy: false
		}
	}
};

export type StateType = typeof initialState;

export interface IStore {
	state: StateType;
	dispatch: React.Dispatch<IAction>;
}

export const StoreContext = createContext<IStore | null>(null);

export interface IAction {
	type: ActionType;
	data: Partial<StateType>;
}

export const enum ActionType {
	updateState,
	updateDTO
}

const reducer = (state: StateType, action: IAction) => {
	const type = action.type;

	if (type === ActionType.updateState) {
		return {
			...state,
			...action.data
		};
	}

	if (type === ActionType.updateDTO) {
		return {
			...state,
			DTO: {
				...state.DTO,
				...action.data.DTO
			}
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
