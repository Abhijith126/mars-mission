import * as Yup from 'yup';

const initialValues = {
  name: '',
  members: [],
  destination: '',
  departure: '',
};

const defaultMember = {
  type: 'Passenger',
  age: 0,
  wealth: '',
  experience: 0,
  job: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Mission name is required'),
  destination: Yup.string().required('Mission destination is required'),
  departure: Yup.date().required('Mission departure is required'),
  members: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Member type required'),
      experience: Yup.number()
        .when('type', {
          is: 'Pilot',
          then: Yup.number()
            .required('Experience is required')
            .min(10, 'Min 10 years of experience'),
          otherwise: Yup.number().min(0),
        })
        .when('type', {
          is: 'Engineer',
          then: Yup.number()
            .required('Experience is required')
            .min(1, 'Min 1 years of experience')
            .max(60, 'Max experience is 60'),
          otherwise: Yup.number(),
        }),
      job: Yup.string().when('type', {
        is: 'Engineer',
        then: Yup.string().required('Job is required'),
        otherwise: Yup.string(),
      }),
      age: Yup.number().when('type', {
        is: 'Passenger',
        then: Yup.number()
          .min(1, 'Age cant be less an year')
          .max(100, 'Max age is 100'),
        otherwise: Yup.number(),
      }),
      wealth: Yup.string().when('type', {
        is: 'Passenger',
        then: Yup.string().required('Wealth is required'),
        otherwise: Yup.string(),
      }),
    }),
  ),
});

export { initialValues, validationSchema, defaultMember };
