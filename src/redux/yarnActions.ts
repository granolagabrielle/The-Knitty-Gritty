import axios from 'axios';
import { AppDispatch } from './store';
import { setYarnItems, setYarnColumnNames } from './yarnSlice';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const fetchYarnColumnNames = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/yarn/db`);
    const columnNames = response.data.map((col: { column_name: string }) => col.column_name);
    dispatch(setYarnColumnNames(columnNames));
  } catch (error) {
    console.error('Error fetching yarn data:', error);
  }
};

export const fetchYarn = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/yarn`);
    dispatch(setYarnItems(response.data));
  } catch (error) {
    console.error('Error fetching yarn data:', error);
  }
};

export const addYarn = (yarn: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/yarn`, yarn);
    dispatch(fetchYarn());
  } catch (error) {
    console.error('Error adding yarn:', error);
  }
};
