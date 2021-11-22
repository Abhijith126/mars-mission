/* eslint-disable react-hooks/exhaustive-deps */
import { Formik, Form, Field, FieldArray } from 'formik';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { defaultMembers, initialValues, validationSchema } from './validations';
import {
  createNewMission,
  getMissionById,
  updateMissionById,
} from '../../store/actions/missionActions';
import { RootState } from '../../store';
import {
  Engineer,
  Jobs,
  MemberType,
  NewMission,
  Passenger,
  Pilot,
} from '../../constants';
import { Member, MissionData } from '../../store/types';
import Input from '../Form/Input';
import Select from '../Form/Select';
import { setAlert } from '../../store/actions/alertActions';
import { useNavigate } from 'react-router-dom';
import Button from '../Form/Button';
import IconButton from '../Form/IconButton';
import { t } from '../../util';

const Mission: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mission = useSelector((state: RootState) => state.mission.data);
  const params = useParams();
  const missionId: string = params.missionId || NewMission;
  const isEdit = missionId !== NewMission;

  useEffect(() => {
    isEdit && dispatch(getMissionById(missionId));
  }, [missionId]);

  const addMember = (props: any) => {
    const { values, setValues } = props;
    const members: Member[] = values?.members || [];
    const pilots = getPilots(members);
    const engineers = getEngineers(members);
    if (pilots.length < 1) members?.push(defaultMembers.pilot);
    else if (engineers.length < 1) members?.push(defaultMembers.engineer);
    else members?.push(defaultMembers.passenger);
    return setValues({ ...values, members });
  };

  const deleteMember = (index: number, props: any) => {
    const { values, setValues } = props;
    const members: Member[] = values?.members || [];
    members.splice(index, 1);
    setValues({ ...values, members });
  };

  const getPilots = (members: Member[]) =>
    members.filter((e: Member) => e.type === Pilot.value);
  const getEngineers = (members: Member[]) =>
    members.filter((e: Member) => e.type === Engineer.value);

  const validateDetails = (mission: MissionData) => {
    const members = mission.members;
    const pilots = getPilots(members);

    if (members.length <= 0) {
      dispatch(setAlert('Please add atleast 1 member'));
      return false;
    }
    if (pilots.length !== 1) {
      dispatch(setAlert('A mission must/can have only 1 pilot'));
      return false;
    }
    if (pilots.filter((e: any) => e.experience < 10).length < 0) {
      dispatch(setAlert('A pilot should have minimum 10 years of experience'));
      return false;
    }
    return true;
  };

  const cleanUpData = (mission: MissionData) => {
    const members = mission.members.map((member: Member) => {
      switch (member.type) {
        case Pilot.value:
          delete member.job;
          delete member.wealth;
          delete member.age;
          return member;
        case Passenger.value:
          delete member.job;
          delete member.experience;
          return member;
        case Engineer.value:
          delete member.wealth;
          delete member.age;
          return member;
        default:
          return member;
      }
    });
    return { ...mission, members };
  };

  const onSubmit = (values: any) => {
    const valid = validateDetails(values);

    if (valid) {
      const cleanData = cleanUpData(values);
      if (isEdit) {
        dispatch(updateMissionById(missionId, cleanData));
        navigate('/mission');
      } else {
        dispatch(createNewMission(cleanData));
        navigate('/mission');
      }
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
        <Form>
          <h4 className="Mission_Title">
            {isEdit
              ? t('missions.form.titles.edit')
              : t('missions.form.titles.new')}
          </h4>
          <div className="Mission_FirstRow">
            <Field
              name="name"
              as={Input}
              value={props?.values?.name}
              label={t('missions.form.labels.name')}
              placeholder={t('missions.form.placeholders.name')}
              required
            />
            <Field
              name="destination"
              as={Input}
              value={props?.values?.destination}
              label={t('missions.form.labels.destination')}
              placeholder={t('missions.form.placeholders.destination')}
              required
            />
            <Field
              name="departure"
              as={Input}
              value={props?.values?.departure}
              type="date"
              label={t('missions.form.labels.departure')}
              placeholder={t('missions.form.placeholders.departure')}
              required
            />
          </div>
          <div className="Mission_Members--card">
            <p className="Mission_Title">{t('missions.members')}</p>
            <FieldArray
              name="members"
              render={() => (
                <div>
                  {props?.values.members?.map(
                    (member: Member, index: number) => (
                      <div key={index} className="Mission_Members">
                        <Field
                          name={`members.${index}.type`}
                          as={Select}
                          label={t('missions.form.labels.type')}
                          value={member.type}
                          options={MemberType}
                          required
                        />
                        {(member.type === Pilot.value ||
                          member.type === Engineer.value) && (
                          <Field
                            name={`members.${index}.experience`}
                            as={Input}
                            type="number"
                            label={t('missions.form.labels.exp')}
                            placeholder={t('missions.form.placeholders.exp')}
                            value={member.experience}
                            required
                          />
                        )}
                        {member.type === Engineer.value && (
                          <Field
                            name={`members.${index}.job`}
                            as={Select}
                            label={t('missions.form.labels.job')}
                            value={member.job}
                            options={Jobs}
                            required
                          />
                        )}
                        {member.type === Passenger.value && (
                          <>
                            <Field
                              name={`members.${index}.age`}
                              as={Input}
                              value={member.age}
                              type="number"
                              placeholder={t('missions.form.placeholders.age')}
                              label={t('missions.form.labels.age')}
                              required
                            />
                            <Field
                              name={`members.${index}.wealth`}
                              as={Input}
                              value={member.wealth}
                              placeholder={t(
                                'missions.form.placeholders.wealth',
                              )}
                              label={t('missions.form.labels.wealth')}
                            />
                          </>
                        )}
                        <IconButton
                          type="button"
                          icon="delete"
                          onClick={() => deleteMember(index, props)}
                          appearance="danger"
                        />
                      </div>
                    ),
                  )}
                </div>
              )}
            />
            <Button
              name={t('missions.buttons.newMember')}
              type="button"
              onClick={() => addMember(props)}
              icon="add"
            />
          </div>
          <div className="Mission_Actions">
            <Button
              name={t('missions.buttons.cancel')}
              type="button"
              redirect="/mission/"
              icon="back"
              appearance="danger"
            />
            <Button
              name={
                isEdit ? t('missions.buttons.edit') : t('missions.buttons.new')
              }
              type="submit"
              appearance="primary"
              icon="add"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Mission;
