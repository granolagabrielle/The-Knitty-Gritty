import axios from 'axios';
import { setPatternItems, setPatternColumnNames } from './patternSlice';
import { AppDispatch } from './store';
import { Pattern } from './types';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const fetchPatterns = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/patterns`);

    dispatch(setPatternItems(response.data));
  } catch (error) {
    console.error('Error fetching pattern data:', error);
  }
};

export const fetchPatternColumnNames = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<{ column_name: string }[]>(`${BACKEND_URL}/api/patterns/db`);
    const columnNames = response.data.map((col: { column_name: string }) => col.column_name);
    dispatch(setPatternColumnNames(columnNames));
  } catch (error) {
    console.error('Error fetching pattern column names:', error);
  }
};

export const addPattern = (pattern: Pattern) => async (dispatch: AppDispatch) => {
  try {
    console.log('Adding pattern:', pattern);
    const response = await axios.post(`${BACKEND_URL}/api/patterns`, pattern);
    console.log('API response:', response.data);

    dispatch(fetchPatterns());
  } catch (error) {
    console.error('Error adding pattern:', error);
  }
};
