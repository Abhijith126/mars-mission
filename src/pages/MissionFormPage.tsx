import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { validateMission, validationSchema } from '../components/Missions/validations';
import { createNewMission, getMissionById, updateMissionById } from '../store/actions/missionActions';
import { RootState } from '../store';
import { MissionData } from '../util/types';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import MemberForm from '../components/Missions/MemberForm';
import { initialValues } from '../components/Missions/helpers';
import { t } from '../util';
import '../components/Missions/styles.scss';

const MissionFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const missionId = params?.missionId;
  const isEdit = !!missionId;
  const mission = useSelector((state: RootState) => state.mission.mission);

  useEffect(() => {
    isEdit && dispatch(getMissionById(missionId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, missionId]);

  const onSubmit = (values: MissionData) => {
    const valid = validateMission(values, dispatch);

    if (valid) {
      if (isEdit) {
        dispatch(updateMissionById(missionId, values));
      } else {
        dispatch(createNewMission(values));
      }
      navigate('/');
    }
  };

  const formProps = {
    initialValues: mission || initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  };

  return (
    <Formik {...formProps}>
      {(props) => (
        <Form className="MissionsForm">
          <h3 data-test-id="missionsForm-title">{isEdit ? t('missions.form.titles.edit') : t('missions.form.titles.new')}</h3>
          <div className="MissionsForm_Inputs">
            <Field
              name="name"
              as={Input}
              value={props?.values?.name}
              label={t('missions.form.labels.name')}
              placeholder={t('missions.form.placeholders.name')}
              required
              data-test-id="missionForm-name"
            />
            <Field
              name="destination"
              as={Input}
              value={props?.values?.destination}
              label={t('missions.form.labels.destination')}
              placeholder={t('missions.form.placeholders.destination')}
              required
              data-test-id="missionForm-destination"
            />
            <Field
              name="departure"
              as={Input}
              value={props?.values?.departure}
              type="date"
              label={t('missions.form.labels.departure')}
              placeholder={t('missions.form.placeholders.departure')}
              required
              data-test-id="missionForm-departure"
            />
          </div>
          <MemberForm formProps={props} />
          <div className="MissionsForm_Actions">
            <Button data-test-id="missionForm-delete" name={t('missions.buttons.cancel')} type="button" redirect="/" />
            <Button
              data-test-id="missionForm-submit"
              name={isEdit ? t('missions.buttons.edit') : t('missions.buttons.create')}
              type="submit"
              appearance="primary"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MissionFormPage;
