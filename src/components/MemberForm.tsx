import { FC, ChangeEvent } from 'react';
import { Field, FieldArray, FormikProps } from 'formik';
import { AllMemberTypes, Engineer, FilteredMemberTypes, Jobs, Passenger, Pilot } from '../constants';
import { t } from '../util';
import Button from './Form/Button';
import IconButton from './Form/IconButton';
import Input from './Form/Input';
import Select from './Form/Select';
import { defaultMembers } from './Missions/validations';
import { Member, MissionFormValueTypes } from '../util/types';

interface MemberFormProps {
  formProps: FormikProps<MissionFormValueTypes>;
}

const MemberForm: FC<MemberFormProps> = (props: MemberFormProps) => {
  const { values, setFieldValue, setValues } = props.formProps;
  const { members } = values;

  const handleMemberChange = (index: number, currentMemberType: string) => {
    let updatedMembers = members;
    updatedMembers[index] = defaultMembers[currentMemberType.toLowerCase()];
    setFieldValue('members', updatedMembers);
  };

  const getPassengers = (members: Member[]) => members.filter((e: Member) => e.type === Passenger.value);

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
    <div className="Mission_Members--card">
      <p className="Mission_Title">{t('missions.members')}</p>
      <FieldArray
        name="members"
        render={() => (
          <>
            {members.map((member: Member, index: number) => (
              <div key={index} className="Mission_Members">
                <Field
                  name={`members.${index}.type`}
                  as={Select}
                  label={t('missions.form.labels.type')}
                  value={member.type}
                  disabled={member.type === Pilot.value}
                  options={member.type === Pilot.value ? AllMemberTypes : FilteredMemberTypes}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleMemberChange(index, e.target.value)}
                  required
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
                  />
                )}
                {member.type === Engineer.value && (
                  <Field name={`members.${index}.job`} as={Select} label={t('missions.form.labels.job')} value={member.job} options={Jobs} required />
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
                      placeholder={t('missions.form.placeholders.wealth')}
                      label={t('missions.form.labels.wealth')}
                    />
                  </>
                )}
                {renderDeleteAction(member.type) && <IconButton type="button" icon="delete" onClick={() => deleteMember(index)} appearance="danger" />}
              </div>
            ))}
          </>
        )}
      />
      <Button name={t('missions.buttons.newMember')} type="button" onClick={() => addMember()} icon="add" />
    </div>
  );
};

export default MemberForm;
