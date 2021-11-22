import {
  MissionState,
  MissionAction,
  GET_MISSION,
  UPDATE_MISSION,
  DELETE_MISSION,
  SET_LOADING,
  SET_ERROR,
  SET_MISSION,
  ADD_MISSION,
} from '../../util/types';

const initialState: MissionState = {
  data: null,
  loading: false,
  error: '',
};

const missionReducer = (
  state = initialState,
  action: MissionAction,
): MissionState => {
  switch (action.type) {
    case GET_MISSION:
      return {
        data: action.payload,
        loading: false,
        error: '',
      };
    case SET_MISSION:
      return {
        data: action.payload,
        loading: false,
        error: '',
      };
    case UPDATE_MISSION:
      return {
        data: action.payload,
        loading: false,
        error: '',
      };
    case DELETE_MISSION:
      return {
        data: null,
        loading: false,
        error: '',
      };
    case ADD_MISSION:
      return {
        data: null,
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
