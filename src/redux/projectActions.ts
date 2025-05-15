import axios from 'axios';
import { setProjectColumnNames, setProjectItems } from './projectSlice';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const fetchProjectColumnNames = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/projects/db`);
    const columnNames = response.data.map((col: { column_name: string }) => col.column_name);
    dispatch(setProjectColumnNames(columnNames));
  } catch (error) {
    console.error('Error fetching project column names:', error);
  }
};

export const fetchProjects = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/projects`);
    dispatch(setProjectItems(response.data));
  } catch (error) {
    console.error('Error fetching project data:', error);
  }
};

export const addProjects = (projects: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/projects`, projects);
    dispatch(fetchProjects());
  } catch (error) {
    console.error('Error adding project:', error);
  }
};
