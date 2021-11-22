import * as Yup from 'yup';
import { Engineer, Passenger, Pilot } from '../../constants';
import { t } from '../../util';

const initialValues = {
  name: '',
  members: [],
  destination: '',
  departure: '',
};

const defaultMembers = {
  passenger: {
    type: Passenger.value,
    age: 1,
    wealth: '',
  },
  pilot: { type: Pilot.value, experience: 0 },
  engineer: {
    type: Engineer.value,
    experience: 0,
    job: '',
  },
};

const validationSchema = Yup.object({
  name: Yup.string().required(t('missions.form.validations.required.name')),
  destination: Yup.string().required(
    t('missions.form.validations.required.destination'),
  ),
  departure: Yup.date().required(
    t('missions.form.validations.required.departure'),
  ),
  members: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required(t('missions.form.validations.required.type')),
      experience: Yup.number()
        .when('type', {
          is: Pilot.value,
          then: Yup.number()
            .required(t('missions.form.validations.required.exp'))
            .min(10, t('missions.form.validations.exp10')),
          otherwise: Yup.number().min(0),
        })
        .when('type', {
          is: Engineer.value,
          then: Yup.number()
            .required(t('missions.form.validations.required.exp'))
            .min(1, t('missions.form.validations.exp1'))
            .max(60, t('missions.form.validations.exp60')),
          otherwise: Yup.number(),
        }),
      job: Yup.string().when('type', {
        is: Engineer.value,
        then: Yup.string().required(
          t('missions.form.validations.required.job'),
        ),
        otherwise: Yup.string(),
      }),
      age: Yup.number().when('type', {
        is: Passenger.value,
        then: Yup.number()
          .min(1, t('missions.form.validations.age1'))
          .max(100, t('missions.form.validations.age100')),
        otherwise: Yup.number(),
      }),
      wealth: Yup.string().when('type', {
        is: Passenger.value,
        then: Yup.string(),
        otherwise: Yup.string(),
      }),
    }),
  ),
});

export { initialValues, validationSchema, defaultMembers };
