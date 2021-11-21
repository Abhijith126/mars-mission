import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteMissionById,
  setMissionData,
} from '../../store/actions/missionActions';
import { getAllMissions } from '../../store/actions/missionsActions';
import { MissionData, MissionsData } from '../../store/types';
import IconButton from '../Form/IconButton';
import './style.scss';

interface Props {
  missions: MissionsData;
}

const MissionTable: FC<Props> = ({ missions }) => {
  const [initialMissions, setInitialMissions] = useState<MissionsData>([]);
  const [missionsState, setMissions] = useState<MissionsData>([]);

  useEffect(() => {
    setInitialMissions(missions);
    setMissions(missions);
  }, [missions]);

  const dispatch = useDispatch();

  const editMissionDetails = (mission: MissionData) => {
    dispatch(setMissionData(mission));
  };

  const deleteMissionDetails = (missionId: string) => {
    dispatch(deleteMissionById(missionId));
    dispatch(getAllMissions());
  };

  const filterMissions = (missionName: string) => {
    const filteredMissions = initialMissions.filter((mission) =>
      mission.name.includes(missionName),
    );
    setMissions(filteredMissions);
  };

  const daysDiff = (departureDate: string) =>
    moment(new Date(departureDate)).diff(new Date(), 'days');

  const monthDiff = (departureDate: string) =>
    moment(new Date(departureDate)).diff(new Date(), 'months');

  const getDepartureDays = (departureDate: string) => {
    const daysDif = daysDiff(departureDate);
    const monthsDiff = monthDiff(departureDate);

    return daysDif > 0
      ? monthsDiff > 3
        ? ` in ${monthsDiff} months`
        : ` in ${daysDif} days`
      : 'Departed';
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
            <input
              name="search"
              onChange={(e) => filterMissions(e.target.value)}
              placeholder="Search by name..."
            />
          </th>
          <th>Members</th>
          <th>Destination</th>
          <th>Departure</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {missionsState &&
          missionsState?.map((mission: any) => (
            <tr key={mission.id}>
              <td width="20%">{mission.name}</td>
              <td width="20%">{mission.members.length}</td>
              <td width="20%">{mission.destination}</td>
              <td>
                <div>
                  <p>{moment(mission.departure).format('DD/MM/YYYY')}</p>
                  <p className={getDepartedClass(mission.departure)}>
                    {getDepartureDays(mission.departure)}
                  </p>
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
          ))}
      </tbody>
    </table>
  );
};

export default MissionTable;
