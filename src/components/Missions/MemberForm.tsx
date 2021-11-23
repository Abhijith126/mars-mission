import { ChangeEvent } from 'react';
import { Field, FieldArray, FormikProps } from 'formik';
import { AllMemberTypes, Engineer, FilteredMemberTypes, Jobs, Passenger, Pilot } from '../../util/constants';
import { t } from '../../util';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Select from '../Form/Select';
import { Member, MissionFormValueTypes } from '../../util/types';
import { defaultMembers, getPassengers } from './helpers';
import './styles.scss';

interface MemberFormProps {
  formProps: FormikProps<MissionFormValueTypes>;
}

const MemberForm = (props: MemberFormProps) => {
  const { values, setFieldValue, setValues } = props.formProps;
  const { members } = values;

  const handleMemberChange = (index: number, currentMemberType: string) => {
    let updatedMembers = members;
    updatedMembers[index] = defaultMembers[currentMemberType.toLowerCase()];
    setFieldValue('members', updatedMembers);
  };

  const addMember = () => {
    members?.push(defaultMembers.passenger);
    return setValues({ ...values, members });
  };

  const deleteMember = (index: number) => {
    members.splice(index, 1);
    setValues({ ...values, members });
  };

  const renderDeleteAction = (currentMemberType: string) => {
    if (currentMemberType === Passenger.value && getPassengers(members).length === 1) {
      return false;
    }
    if (currentMemberType === Pilot.value) {
      return false;
    }
    return true;
  };

  return (
    <div className="MissionsForm_Members">
      <h4>{t('missions.members')}</h4>
      <br />
      <FieldArray
        name="members"
        render={() => (
          <>
            {members.map((member: Member, index: number) => (
              <div key={index} className="MissionsForm_Members__Item" data-test-id={`membersForm-row-${index}`}>
                <Field
                  name={`members.${index}.type`}
                  as={Select}
                  label={t('missions.form.labels.type')}
                  value={member.type}
                  disabled={member.type === Pilot.value}
                  options={member.type === Pilot.value ? AllMemberTypes : FilteredMemberTypes}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleMemberChange(index, e.target.value)}
                  required
                  data-test-id="membersForm-type"
                />
                {(member.type === Pilot.value || member.type === Engineer.value) && (
                  <Field
                    name={`members.${index}.experience`}
                    as={Input}
                    type="number"
                    label={t('missions.form.labels.exp')}
                    placeholder={t('missions.form.placeholders.exp')}
                    value={member.experience}
                    required
                    data-test-id="membersForm-experience"
                  />
                )}
                {member.type === Engineer.value && (
                  <Field data-test-id="membersForm-job" name={`members.${index}.job`} as={Select} label={t('missions.form.labels.job')} value={member.job} options={Jobs} required />
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
                      data-test-id="membersForm-age"
                    />
                    <Field
                      name={`members.${index}.wealth`}
                      as={Input}
                      value={member.wealth}
                      placeholder={t('missions.form.placeholders.wealth')}
                      label={t('missions.form.labels.wealth')}
                      data-test-id="membersForm-wealth"
                    />
                  </>
                )}
                {renderDeleteAction(member.type) && <Button data-test-id="membersForm-remove" className="MissionsForm_Members__Item-Delete" type="button" icon="delete" onClick={() => deleteMember(index)} appearance="danger" />}
              </div>
            ))}
          </>
        )}
      />
      <Button data-test-id="membersForm-add" name={t('missions.buttons.newMember')} type="button" onClick={() => addMember()} appearance="primary"/>
    </div>
  );
};

export default MemberForm;
