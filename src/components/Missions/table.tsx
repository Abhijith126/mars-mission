import {
  EditIcon,
  IconButton,
  majorScale,
  Table,
  TrashIcon,
} from 'evergreen-ui';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteMissionById,
  setMissionData,
} from '../../store/actions/missionActions';
import { getAllMissions } from '../../store/actions/missionsActions';
import { MissionData, MissionsData } from '../../store/types';

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
    <Table>
      <Table.Head>
        <Table.SearchHeaderCell
          onChange={filterMissions}
          placeholder="Search by name..."
        />
        <Table.TextHeaderCell>Members</Table.TextHeaderCell>
        <Table.TextHeaderCell>Destination</Table.TextHeaderCell>
        <Table.TextHeaderCell>Departure</Table.TextHeaderCell>
        <Table.TextHeaderCell></Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {missionsState &&
          missionsState?.map((mission: any) => (
            <Table.Row key={mission.id} isSelectable>
              <Table.TextCell>{mission.name}</Table.TextCell>
              <Table.TextCell isNumber>{mission.members.length}</Table.TextCell>
              <Table.TextCell>{mission.destination}</Table.TextCell>
              <Table.TextCell>
                <div>
                  <p>{moment(mission.departure).format('DD/MM/YYYY')}</p>
                  <p className={getDepartedClass(mission.departure)}>
                    {getDepartureDays(mission.departure)}
                  </p>
                </div>
              </Table.TextCell>
              <Table.TextCell>
                <IconButton
                  type="button"
                  icon={EditIcon}
                  is={Link}
                  to={`/mission/${mission.id}`}
                  onClick={() => {
                    editMissionDetails(mission);
                  }}
                  intent="primary"
                  marginRight={majorScale(2)}
                />

                <IconButton
                  type="button"
                  icon={TrashIcon}
                  onClick={() => {
                    deleteMissionDetails(mission.id);
                  }}
                  intent="danger"
                  marginRight={majorScale(2)}
                />
              </Table.TextCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default MissionTable;
