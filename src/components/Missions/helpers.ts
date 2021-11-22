import moment from 'moment';
import { Engineer, Navigation, Passenger, Pilot } from '../../constants';
import { t } from '../../util';
import { Member } from '../../util/types';

export const getPilots = (members: Member[]) => members.filter((e: Member) => e.type === Pilot.value);
export const getEngineers = (members: Member[]) => members.filter((e: Member) => e.type === Engineer.value);
export const getPassengers = (members: Member[]) => members.filter((e: Member) => e.type === Passenger.value);
export const getAssignedJobs = (members: Member[]) => getEngineers(members).map((engineer: Member) => engineer.job);

export const defaultMembers: { [key: string]: any } = {
  passenger: {
    type: Passenger.value,
    age: 0,
    wealth: '',
  },
  pilot: { type: Pilot.value, experience: 0 },
  engineer: {
    type: Engineer.value,
    experience: 0,
    job: Navigation.value,
  },
};

export const initialValues = {
  name: '',
  members: [defaultMembers.pilot, defaultMembers.passenger, defaultMembers.engineer],
  destination: '',
  departure: moment(new Date()).format('YYYY-MM-DD'),
};

export const daysDiff = (date: string) => moment(new Date(date)).diff(new Date(), 'days');
export const monthDiff = (date: string) => moment(new Date(date)).diff(new Date(), 'months');

export const getDepartureDays = (date: string) => {
  const daysDif = daysDiff(date);
  const monthsDiff = monthDiff(date);

  return daysDif > 0
    ? monthsDiff > 3
      ? ` in ${monthsDiff} ${t('missions.table.text.months')}`
      : ` in ${daysDif} ${t('missions.table.text.days')}`
    : t('missions.table.text.departed');
};
