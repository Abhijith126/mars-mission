import { MissionsState, MissionsAction, GET_ALL_MISSION } from '../../util/types';

const initialState: MissionsState = {
  data: null,
  loading: false,
  error: '',
};

const missionsReducer = (
  state = initialState,
  action: MissionsAction,
): MissionsState => {
  switch (action.type) {
    case GET_ALL_MISSION:
      return {
        data: action.payload,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};
export default missionsReducer;
