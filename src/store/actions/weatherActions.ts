import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {
	SET_LOADING,
	SET_ERROR,
	GET_WEATHER,
	WeatherData,
	WeatherError,
	WeatherAction,
} from '../types';

export const getWeather = (
	city: string
): ThunkAction<void, RootState, null, WeatherAction> => {
	return async (dispatch) => {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
			);
			if (!res.ok) {
				const resData: WeatherError = await res.json();
				throw new Error(resData.message);
			}
			const resData: WeatherData = await res.json();
			console.log(resData);
			dispatch({
				type: GET_WEATHER,
				payload: resData,
			});
		} catch (error) {
			dispatch({
				type: SET_ERROR,
				payload: error.message,
			});
		}
	};
};

export const setLoading = (): WeatherAction => {
	return {
		type: SET_LOADING,
	};
};

export const setError = (): WeatherAction => {
	return {
		type: SET_ERROR,
		payload: '',
	};
};
