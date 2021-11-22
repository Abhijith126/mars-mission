import { API } from '../constants';
import { MissionData } from '../util/types';

const headers = new Headers({ 'content-type': 'application/json' });

const fetchAllMissions = async () => {
  return await fetch(`${API}/missions`);
};

const fetchMission = async (missionId: string) => {
  return await fetch(`${API}/missions/${missionId}`);
};

const updateMission = async (missionId: string, mission: MissionData) => {
  return await fetch(`${API}/missions/${missionId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(mission),
  });
};

const createMission = async (mission: MissionData) => {
  return await fetch(`${API}/missions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(mission),
  });
};

const deleteMission = async (missionId: string) => {
  return await fetch(`${API}/missions/${missionId}`, { method: 'DELETE' });
};

export {
  fetchAllMissions,
  fetchMission,
  updateMission,
  deleteMission,
  createMission,
};
