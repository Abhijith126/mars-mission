/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'evergreen-ui';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MissionTable from './table';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMissions } from '../../store/actions/missionsActions';
import './style.scss';
import { setMissionData } from '../../store/actions/missionActions';
import { initialValues } from './validations';

const MissionList = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state: RootState) => state.missions.data);

  useEffect(() => {
    dispatch(getAllMissions());
  }, []);

  const clearMission = () => dispatch(setMissionData(initialValues));

  return (
    <div>
      <div className="Missions_Header">
        <p>Missions</p>
        <Button
          marginRight={16}
          onClick={clearMission}
          is={Link}
          to="/mission/new"
          intent="primary"
        >
          New Mission
        </Button>
      </div>
      {missions && <MissionTable missions={missions} />}
    </div>
  );
};

export default MissionList;
