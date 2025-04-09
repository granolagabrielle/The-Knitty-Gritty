import axios from 'axios';
import { setPatternItems } from './patternSlice';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const fetchPatterns = () => async (dispatch: any) => {
  try {
    console.log('Fetching pattern data...');
    const response = await axios.get(`${BACKEND_URL}/api/patterns`);

    console.log('API response:', response.data); // Log the response
    dispatch(setPatternItems(response.data)); // Dispatch the data to Redux
  } catch (error) {
    console.error('Error fetching pattern data:', error);
  }
};
