import {
	Box,
	Container,
	TextField,
	Typography,
	Select,
	MenuItem,
	Slider,
	SelectChangeEvent,
	FormControlLabel,
	Checkbox,
	Button
} from '@mui/material';
import React, {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo
} from 'react';
import {
	ActionType,
	IAction,
	IMinutesOption,
	IOperatorOption,
	IStore,
	StateType,
	StoreContext
} from './store';

const minutesMarksDraft: IMinutesOption[] = [
	{
		value: 1,
		label: '100',
		minutesValue: 100
	},
	{
		value: 20,
		label: '200',
		minutesValue: 200
	},
	{
		value: 40,
		label: '300',
		minutesValue: 300
	},
	{
		value: 100,
		label: '600',
		minutesValue: 600
	}
];

const operatorsDraft: IOperatorOption[] = [
	{
		id: 1,
		name: 'Tele2',
		price: 100
	},
	{
		id: 2,
		name: 'Bulochka c koricey',
		price: 200
	},
	{
		id: 3,
		name: 'Morkovny pirog',
		price: 150
	}
];

const setStateData = (set: React.Dispatch<IAction>) => {
	set({
		type: ActionType.updateState,
		data: {
			minutesMarks: minutesMarksDraft,
			operators: operatorsDraft
		}
	});
};

const priceIndex = {
	oneMinute: 1,
	routerRent: 100,
	buy: 2600
};

export const App = () => {
	const { dispatch, state } = useContext(StoreContext) as IStore;

	useEffect(() => {
		setTimeout(() => {
			setStateData(dispatch);
		}, 1000);
	}, []);

	const {
		operators,
		minutesMarks,
		phone,
		DTO: { operator, minutes, router }
	} = state;

	const valueLabelFormat = useCallback(
		(value: number) => {
			const selectedItem = minutesMarks.find((mark) => mark.value === value);
			return `${selectedItem?.label} минут`;
		},
		[minutesMarks]
	);
	const handleNumberPhoneChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		dispatch({
			type: ActionType.updateState,
			data: {
				phone: e.target.value
			}
		});
	};

	const handleChangeOperator = (e: SelectChangeEvent<number>) => {
		dispatch({
			type: ActionType.updateDTO,
			data: {
				DTO: {
					operator: e.target.value as number
				} as StateType['DTO']
			}
		});
	};

	const handleChangeMinutes = (_event: Event, newValue: number | number[]) => {
		dispatch({
			type: ActionType.updateDTO,
			data: {
				DTO: {
					minutes: newValue as number
				} as StateType['DTO']
			}
		});
	};

	const totalPrice = useMemo(() => {
		let tmp = 0;

		const checkedPlan = minutesMarks.find((plan) => plan.value === minutes);

		if (checkedPlan) tmp += checkedPlan.minutesValue * priceIndex.oneMinute;

		// и в том же духе дальше
		return tmp;
	}, [state.DTO]);

	const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: ActionType.updateDTO,
			data: {
				DTO: {
					router: {
						...state.DTO.router,
						rent: event.target.checked
					}
				} as StateType['DTO']
			}
		});
	};

	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: ActionType.updateDTO,
			data: {
				DTO: {
					router: {
						...state.DTO.router,
						buy: event.target.checked
					}
				} as StateType['DTO']
			}
		});
	};

	useEffect(() => console.log(state), [state]);

	return (
		<Container>
			<form noValidate>
				<Typography sx={{ fontWeight: 700 }} variant="h4" mb={4}>
					Настройте тариф
				</Typography>

				<Box mb={3}>
					<label htmlFor={'phone'}>
						<Typography mb={1} variant="subtitle1">
							Телефон
						</Typography>
					</label>
					<TextField
						onChange={handleNumberPhoneChange}
						name="phone"
						size="small"
						sx={{ mb: 0.5, minWidth: 370 }}
						id={'phone'}
						variant="outlined"
						value={phone}
					/>
					<Typography display={'block'} variant="caption">
						Обязательное поле
					</Typography>
				</Box>

				<Box mb={3}>
					<label htmlFor={'operator'}>
						<Typography mb={1} variant="subtitle1">
							Оператор
						</Typography>
					</label>
					<Select
						onChange={handleChangeOperator}
						id={'operator'}
						name="operator"
						size="small"
						sx={{ minWidth: 370 }}
						value={operator || ''}
					>
						{operators.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
				</Box>

				<Box mb={3}>
					<label htmlFor={'minutes'}>
						<Typography mb={1} variant="subtitle1">
							Минуты
						</Typography>
					</label>
					<Box sx={{ width: '100%' }}>
						<Slider
							name="minutes"
							id="minutes"
							value={minutes}
							valueLabelFormat={valueLabelFormat}
							valueLabelDisplay="auto"
							marks={minutesMarks}
							step={null}
							onChange={handleChangeMinutes}
							color="secondary"
						/>
					</Box>
				</Box>
				<Box mb={6}>
					<label htmlFor={'router'}>
						<Typography mb={1} variant="subtitle1">
							Wi-Fi роутер
						</Typography>
					</label>
					<Box sx={{ width: '100%' }}>
						<div>
							<FormControlLabel
								control={<Checkbox checked={router.rent} onChange={handleChange1} />}
								label="Аренда 99 ₽/мес."
							/>
						</div>
						<div>
							<FormControlLabel
								control={<Checkbox checked={router.buy} onChange={handleChange2} />}
								label="Выкупить 2 600 ₽"
							/>
						</div>
					</Box>
				</Box>

				<Button color="secondary">{`${totalPrice} руб в месяц`}</Button>
			</form>
		</Container>
	);
};
