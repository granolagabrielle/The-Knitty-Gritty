import axios from 'axios';
import { setProjectColumnNames, setProjectItems } from './projectSlice';
import { AppDispatch } from './store';
import { Project } from './types';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export const fetchProjects = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/projects`);
    dispatch(setProjectItems(response.data));
  } catch (error) {
    console.error('Error fetching project data:', error);
  }
};

export const fetchProjectColumnNames = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<{ column_name: string }[]>(`${BACKEND_URL}/api/projects/db`);
    const columnNames = response.data.map((col: { column_name: string }) => col.column_name);
    dispatch(setProjectColumnNames(columnNames));
  } catch (error) {
    console.error('Error fetching project column names:', error);
  }
};

export const addProjects = (projects: Project) => async (dispatch: AppDispatch) => {
  try {
    console.log('Adding project:', projects);
    const response = await axios.post(`${BACKEND_URL}/api/projects`, projects);
    console.log('API response:', response.data);
    dispatch(fetchProjects());
  } catch (error) {
    console.error('Error adding project:', error);
  }
};
