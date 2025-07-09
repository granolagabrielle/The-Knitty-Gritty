import axios from 'axios';
import { AppDispatch } from './store';
import { setYarnItems, setYarnColumnNames } from './yarnSlice';
import { Yarn } from './types';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const fetchYarn = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/yarn`);
    dispatch(setYarnItems(response.data));
  } catch (error) {
    console.error('Error fetching yarn data:', error);
  }
};

export const fetchYarnColumnNames = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<{ column_name: string }[]>(`${BACKEND_URL}/api/yarn/db`);
    const columnNames = response.data.map((col: { column_name: string }) => col.column_name);
    dispatch(setYarnColumnNames(columnNames));
  } catch (error) {
    console.error('Error fetching yarn data:', error);
  }
};

export const addYarn = (yarn: Yarn) => async (dispatch: AppDispatch) => {
  try {
    console.log('Adding yarn:', yarn);
    const response = await axios.post(`${BACKEND_URL}/api/yarn`, yarn);
    console.log('API response:', response.data);
    dispatch(fetchYarn());
  } catch (error) {
    console.error('Error adding yarn:', error);
  }
};
