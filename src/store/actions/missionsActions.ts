import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { fetchAllMissions } from '../../services/mission';
import { MissionsAction, MissionError, GET_ALL_MISSION, SET_ERROR, MissionData } from '../../util/types';

export const getAllMissions = (): ThunkAction<void, RootState, null, MissionsAction> => {
  return async (dispatch) => {
    try {
      const res = await fetchAllMissions();

      if (!res.ok) {
        const resData: MissionError = await res.json();
        throw new Error(resData.message);
      }

      const resData: MissionData[] = await res.json();
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
