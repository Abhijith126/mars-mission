import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { fetchAllMissions } from '../../services/mission';
import {
  MissionsAction,
  MissionsData,
  MissionError,
  GET_ALL_MISSION,
  SET_ERROR,
} from '../types';

export const getAllMissions = (): ThunkAction<
  void,
  RootState,
  null,
  MissionsAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetchAllMissions();

      if (!res.ok) {
        const resData: MissionError = await res.json();
        throw new Error(resData.message);
      }

      const resData: MissionsData = await res.json();
      dispatch({
        type: GET_ALL_MISSION,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};
