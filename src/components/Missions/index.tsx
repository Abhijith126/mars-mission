/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import MissionTable from './table';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMissions } from '../../store/actions/missionsActions';
import './style.scss';
import { setMissionData } from '../../store/actions/missionActions';
import { initialValues } from './validations';
import Button from '../Form/Button';
import { t } from '../../util';

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
        <h3>{t('missions.title')}</h3>
        <Button
          name={t('missions.buttons.new')}
          onClick={clearMission}
          redirect="/mission/new"
          appearance="primary"
          icon="add"
        />
      </div>
      {missions && <MissionTable missions={missions} />}
    </div>
  );
};

export default MissionList;
