import { useEffect, useState, ChangeEvent } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMissionById, getAllMissions, setMissionData } from '../../store/actions/missionActions';
import { MissionData } from '../../util/types';
import { t } from '../../util';
import { RootState } from '../../store';
import { daysDiff, getDepartureDays } from './helpers';
import Button from '../Form/Button';
import './style.scss';

const MissionTable = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state: RootState) => state.mission.allMissions);
  const [filteredMissions, setFilteredMissions] = useState<MissionData[]>([]);

  useEffect(() => {
    dispatch(getAllMissions());
  }, []);

  useEffect(() => {
    missions && setFilteredMissions(missions);
  }, [missions]);

  const editMissionDetails = (mission: MissionData) => {
    dispatch(setMissionData(mission));
  };

  const deleteMissionDetails = (missionId?: string) => {
    if (missionId) {
      dispatch(deleteMissionById(missionId));
      dispatch(getAllMissions());
    }
  };

  const filterMissions = (missionName: string) => {
    const tempMissions = missions?.filter((m: MissionData) => m.name.toLowerCase().includes(missionName.toLowerCase())) || [];
    setFilteredMissions(tempMissions);
  };

  const getDepartedClass = (departureDate: string) => {
    const diff = daysDiff(departureDate);
    return diff > 0 ? 'Missions_Table__depart' : 'Missions_Table__departed';
  };

  return (
    <table className="Missions_Table">
      <thead>
        <tr>
          <th>
            <input
              className="Missions_Table__Search"
              name="search"
              onChange={(e: ChangeEvent<HTMLInputElement>) => filterMissions(e.target.value)}
              placeholder={t('missions.table.text.search')}
            />
          </th>
          <th>{t('missions.table.members')}</th>
          <th>{t('missions.table.destination')}</th>
          <th>{t('missions.table.departure')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredMissions?.length ? (
          filteredMissions.map((mission: MissionData) => (
            <tr key={mission.id}>
              <td width="20%">{mission.name}</td>
              <td width="20%">{mission.members.length}</td>
              <td width="20%">{mission.destination}</td>
              <td>
                <div>
                  <span>{moment(mission.departure).format('DD/MM/YYYY')}</span>
                  <br/>
                  <small className={getDepartedClass(mission.departure)}>{getDepartureDays(mission.departure)}</small>
                </div>
              </td>
              <td>
                <div className="Missions_Table__Actions">
                  <Button type="button" icon="edit" redirect={`/mission/${mission.id}`} onClick={() => editMissionDetails(mission)} appearance="default" />
                  <Button type="button" icon="delete" onClick={() => deleteMissionDetails(mission?.id)} appearance="danger" />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="Missions_Table__Empty">
              {t('missions.table.noRecords')}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MissionTable;
