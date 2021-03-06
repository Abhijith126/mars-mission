import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { fetchMission, updateMission, deleteMission, createMission, fetchAllMissions } from '../../services/mission';
import {
  MissionAction,
  MissionData,
  MissionError,
  GET_MISSION,
  SET_LOADING,
  SET_ALERT,
  SET_MISSION,
  DELETE_MISSION,
  UPDATE_MISSION,
  ADD_MISSION,
  GET_ALL_MISSION,
} from '../../util/types';

export const getAllMissions = (): ThunkAction<void, RootState, null, MissionAction> => {
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
        type: SET_ALERT,
        payload: err.message,
      });
    }
  };
};

export const getMissionById = (missionId: string): ThunkAction<void, RootState, null, MissionAction> => {
  return async (dispatch) => {
    try {
      const res = await fetchMission(missionId);

      if (!res.ok) {
        const resData: MissionError = await res.json();
        throw new Error(resData.message);
      }

      const resData: MissionData = await res.json();
      dispatch({
        type: GET_MISSION,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ALERT,
        payload: err.message,
      });
    }
  };
};

export const updateMissionById = (missionId: string, mission: MissionData): ThunkAction<void, RootState, null, MissionAction> => {
  return async (dispatch) => {
    try {
      const res = await updateMission(missionId, mission);

      if (!res.ok) {
        const resData: MissionError = await res.json();
        throw new Error(resData.message);
      }

      const resData: MissionData = await res.json();
      dispatch({
        type: UPDATE_MISSION,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ALERT,
        payload: err.message,
      });
    }
  };
};

export const createNewMission = (mission: MissionData): ThunkAction<void, RootState, null, MissionAction> => {
  return async (dispatch) => {
    try {
      const res = await createMission(mission);

      if (!res.ok) {
        const resData: MissionError = await res.json();
        throw new Error(resData.message);
      }

      const resData: MissionData = await res.json();
      dispatch({
        type: ADD_MISSION,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ALERT,
        payload: err.message,
      });
    }
  };
};

export const deleteMissionById = (missionId: string): ThunkAction<void, RootState, null, MissionAction> => {
  return async (dispatch) => {
    try {
      const res = await deleteMission(missionId);

      if (!res.ok) {
        const resData: MissionError = await res.json();
        throw new Error(resData.message);
      }

      const resData: MissionData = await res.json();
      dispatch({
        type: DELETE_MISSION,
        payload: resData,
      });
    } catch (err: any) {
      dispatch({
        type: SET_ALERT,
        payload: err.message,
      });
    }
  };
};

export const setMissionData = (missionData: MissionData): ThunkAction<void, RootState, null, MissionAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_MISSION,
      payload: missionData,
    });
  };
};

export const setLoading = (): MissionAction => {
  return {
    type: SET_LOADING,
  };
};
