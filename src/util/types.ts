export const GET_MISSION = 'GET_MISSION';
export const SET_MISSION = 'SET_MISSION';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_ALERT = 'SET_ALERT';
export const UPDATE_MISSION = 'UPDATE_MISSION';
export const DELETE_MISSION = 'DELETE_MISSION';
export const GET_ALL_MISSION = 'GET_ALL_MISSION';
export const ADD_MISSION = 'ADD_MISSION';

export interface Member {
  type: string;
  experience?: number;
  age?: number;
  job?: string;
  wealth?: string;
}

export interface MissionData {
  id?: string;
  name: string;
  members: Member[];
  destination: string;
  departure: string;
}

export type MissionsData = MissionData[];

export interface MissionState {
  data: MissionData | null;
  loading: boolean;
  error: string;
}

export interface MissionsState {
  data: MissionsData | null;
  loading: boolean;
  error: string;
}

interface GetMissionAction {
  type: typeof GET_MISSION;
  payload: MissionData;
}

interface GetMissionsAction {
  type: typeof GET_ALL_MISSION;
  payload: MissionsData;
}

interface UpdateMissionAction {
  type: typeof UPDATE_MISSION;
  payload: MissionData;
}

interface AddMissionAction {
  type: typeof ADD_MISSION;
}

interface DeleteMissionAction {
  type: typeof DELETE_MISSION;
}

interface SetMissionAction {
  type: typeof SET_MISSION;
  payload: MissionData;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type MissionAction =
  | AddMissionAction
  | GetMissionAction
  | UpdateMissionAction
  | DeleteMissionAction
  | SetMissionAction
  | SetLoadingAction
  | SetErrorAction;

export type MissionsAction =
  | GetMissionsAction
  | SetLoadingAction
  | SetErrorAction;

export interface AlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

export interface AlertState {
  message: string;
}

export interface MissionError {
  cod: string;
  message: string;
}

export interface MissionFormValueTypes {
  name: string;
  members: Member[];
  destination: string;
  departure: string;
}
