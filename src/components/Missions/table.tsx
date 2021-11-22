import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMissionById, setMissionData } from '../../store/actions/missionActions';
import { getAllMissions } from '../../store/actions/missionsActions';
import { MissionData } from '../../util/types';
import { t } from '../../util';
import IconButton from '../Form/IconButton';
import './style.scss';
import { RootState } from '../../store';

const MissionTable: FC = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state: RootState) => state.missions.data);
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

  const deleteMissionDetails = (missionId: string) => {
    dispatch(deleteMissionById(missionId));
    dispatch(getAllMissions());
  };

  const filterMissions = (missionName: string) => {
    const tempMissions = missions?.filter((m: MissionData) => m.name.toLowerCase().includes(missionName.toLowerCase())) || [];
    setFilteredMissions(tempMissions);
  };

  const daysDiff = (departureDate: string) => moment(new Date(departureDate)).diff(new Date(), 'days');
  const monthDiff = (departureDate: string) => moment(new Date(departureDate)).diff(new Date(), 'months');

  const getDepartureDays = (departureDate: string) => {
    const daysDif = daysDiff(departureDate);
    const monthsDiff = monthDiff(departureDate);

    return daysDif > 0
      ? monthsDiff > 3
        ? ` in ${monthsDiff} ${t('missions.table.text.months')}`
        : ` in ${daysDif} ${t('missions.table.text.days')}`
      : t('missions.table.text.departed');
  };

  const getDepartedClass = (departureDate: string) => {
    const diff = daysDiff(departureDate);
    return diff > 0 ? 'Missions--departure' : 'Missions--departure_departed';
  };

  return (
    <table className="MissionList">
      <thead>
        <tr>
          <th>
            <input name="search" onChange={(e) => filterMissions(e.target.value)} placeholder={t('missions.table.text.search')} />
          </th>
          <th>{t('missions.table.members')}</th>
          <th>{t('missions.table.destination')}</th>
          <th>{t('missions.table.departure')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredMissions?.length ? (
          filteredMissions.map((mission: any) => (
            <tr key={mission.id}>
              <td width="20%">{mission.name}</td>
              <td width="20%">{mission.members.length}</td>
              <td width="20%">{mission.destination}</td>
              <td>
                <div>
                  <p>{moment(mission.departure).format('DD/MM/YYYY')}</p>
                  <p className={getDepartedClass(mission.departure)}>{getDepartureDays(mission.departure)}</p>
                </div>
              </td>
              <td>
                <div className="Missions_Actions">
                  <IconButton
                    type="button"
                    icon="edit"
                    redirect={`/mission/${mission.id}`}
                    onClick={() => {
                      editMissionDetails(mission);
                    }}
                    appearance="default"
                  />
                  <IconButton
                    type="button"
                    icon="delete"
                    onClick={() => {
                      deleteMissionDetails(mission.id);
                    }}
                    appearance="danger"
                  />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="MissionList--no-records">
              No records to display
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MissionTable;
