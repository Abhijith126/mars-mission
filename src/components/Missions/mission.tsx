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
  AllMemberTypes,
  FilteredMemberTypes,
  NewMission,
  Passenger,
  Pilot,
} from '../../constants';
import { Member, MissionData } from '../../util/types';
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
  const getPassengers = (members: Member[]) =>
    members.filter((e: Member) => e.type === Passenger.value);
  const getAssignedJobs = (members: Member[]) =>
    getEngineers(members).map((engineer: Member) => engineer.job);

  const validateDetails = (mission: MissionData) => {
    const members = mission.members;
    const pilots = getPilots(members);
    const jobs = getAssignedJobs(members);
    const uniqJobs = Array.from(new Set(jobs));
    if (pilots.length === 0) {
      dispatch(setAlert(t('missions.form.errors.min1Pilot')));
      return false;
    }
    if (getPassengers(members).length === 0) {
      dispatch(setAlert(t('missions.form.errors.min1Passenger')));
      return false;
    }
    if (jobs.length !== uniqJobs.length) {
      dispatch(setAlert(t('missions.form.errors.uniqueJobs')));
      return false;
    }
    return true;
  };

  const onSubmit = (values: any) => {
    const valid = validateDetails(values);
    if (valid) {
      if (isEdit) {
        dispatch(updateMissionById(missionId, values));
        navigate('/mission');
      } else {
        dispatch(createNewMission(values));
        navigate('/mission');
      }
    }
  };

  const renderDeleteAction = (currentMemberType: string, members: Member[]) => {
    if (
      currentMemberType === Passenger.value &&
      getPassengers(members).length === 1
    ) {
      return false;
    }
    if (currentMemberType === Pilot.value) {
      return false;
    }
    return true;
  };

  const handleMemberChange = (
    index: number,
    currentMemberType: string,
    props: any,
  ) => {
    const { values, setFieldValue } = props;
    let members = values.members;
    members[index] = defaultMembers[currentMemberType.toLowerCase()];
    setFieldValue('members', members);
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
                          disabled={member.type === Pilot.value}
                          options={
                            member.type === Pilot.value
                              ? AllMemberTypes
                              : FilteredMemberTypes
                          }
                          onChange={(e: any) =>
                            handleMemberChange(index, e.target.value, props)
                          }
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
                        {renderDeleteAction(
                          member.type,
                          props.values.members,
                        ) && (
                          <IconButton
                            type="button"
                            icon="delete"
                            onClick={() => deleteMember(index, props)}
                            appearance="danger"
                          />
                        )}
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