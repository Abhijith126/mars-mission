const title = 'Journey to Mars';

const missions = {
  title: 'Missions',
  members: 'Members',
  table: {
    members: 'Members',
    destination: 'Destination',
    departure: 'Departure',
    text: {
      departed: 'Departed',
      days: 'days',
      months: 'months',
      search: 'Search by name...',
    },
  },
  form: {
    titles: { new: 'Configure a new mission', edit: 'Edit mission' },
    labels: {
      name: 'Name',
      destination: 'Destination',
      departure: 'Departure',
      type: 'Type',
      exp: 'Experience',
      job: 'Job',
      age: 'Age',
      wealth: 'Wealth',
    },
    placeholders: {
      exp: 'Enter experience',
      age: 'Enter age',
      wealth: 'Enter wealth',
      destination: 'Enter destination',
      departure: 'Enter departure',
      name: 'Enter name',
    },
    validations: {
      required: {
        name: 'Mission name is required',
        destination: 'Mission destination is required',
        departure: 'Mission departure is required',
        type: 'Member type required',
        exp: 'Experience is required',
        job: 'Job is required',
      },
      name: 'Name',
      destination: 'Destination',
      departure: 'Departure',
      type: 'Type',
      exp10: 'Min 10 years of experience',
      exp1: 'Min 1 years of experience',
      exp60: 'Max experience is 60',
      age1: 'Age cant be less an year',
      age100: 'Max age is 100',
    },
  },
  buttons: {
    cancel: 'Cancel',
    new: 'New Mission',
    edit: 'Edit Mission',
    newMember: 'New Member',
    create: 'Create',
  },
};

const enUs = { title, missions };

export default enUs;
