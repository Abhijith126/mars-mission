import {
  MissionState,
  MissionAction,
  GET_MISSION,
  UPDATE_MISSION,
  DELETE_MISSION,
  SET_LOADING,
  SET_ERROR,
  ADD_MISSION,
  GET_ALL_MISSION,
} from '../../util/types';

const initialState: MissionState = {
  mission: null,
  allMissions: [],
  loading: false,
  error: '',
};

const missionReducer = (state = initialState, action: MissionAction): MissionState => {
  switch (action.type) {
    case GET_ALL_MISSION:
      return {
        ...state,
        allMissions: action.payload,
        mission: null,
        loading: false,
        error: '',
      };
    case GET_MISSION:
      return {
        ...state,
        mission: action.payload,
        loading: false,
        error: '',
      };
    case UPDATE_MISSION:
      return {
        ...state,
        mission: action.payload,
        loading: false,
        error: '',
      };
    case DELETE_MISSION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case ADD_MISSION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default missionReducer;
