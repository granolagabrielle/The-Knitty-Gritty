import axios from 'axios';
import { setYarnItems } from './yarnSlice';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const fetchYarn = () => async (dispatch: any) => {
  try {
    console.log('Fetching yarn data...');
    const response = await axios.get(`${BACKEND_URL}/api/yarn`);

    console.log('API response:', response.data); // Log the response
    dispatch(setYarnItems(response.data)); // Dispatch the data to Redux
  } catch (error) {
    console.error('Error fetching yarn data:', error);
  }
};
