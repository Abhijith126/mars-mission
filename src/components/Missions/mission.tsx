/* eslint-disable react-hooks/exhaustive-deps */
import {
  AddIcon,
  Button,
  IconButton,
  majorScale,
  TrashIcon,
  UndoIcon,
} from 'evergreen-ui';
import { Formik, Form, Field, FieldArray } from 'formik';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { defaultMember, initialValues, validationSchema } from './validations';
import {
  createNewMission,
  getMissionById,
  updateMissionById,
} from '../../store/actions/missionActions';
import { RootState } from '../../store';
import { Jobs, MemberType } from '../../constants';
import { Member, MissionData } from '../../store/types';
import Input from '../Form/Input';
import Select from '../Form/Select';
import { Link } from 'react-router-dom';
import { setAlert } from '../../store/actions/alertActions';
import { useNavigate } from 'react-router-dom';

const Mission: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mission = useSelector((state: RootState) => state.mission.data);
  const params = useParams();
  const missionId: string = params.missionId || 'new';
  const isEdit = missionId !== 'new';

  useEffect(() => {
    isEdit && dispatch(getMissionById(missionId));
  }, [missionId]);

  const addMember = (props: any) => {
    const { values, setValues } = props;
    const members: Member[] = values?.members || [];
    members?.push(defaultMember);
    return setValues({ ...values, members });
  };

  const deleteMember = (index: number, props: any) => {
    const { values, setValues } = props;
    const members: Member[] = values?.members || [];
    members.splice(index, 1);
    setValues({ ...values, members });
  };

  const validateDetails = (mission: MissionData) => {
    const members = mission.members;
    const pilots = members.filter((e: Member) => e.type === 'Pilot');

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
        case 'Pilot':
          delete member.job;
          delete member.wealth;
          delete member.age;
          return member;
        case 'Passenger':
          delete member.job;
          delete member.experience;
          return member;
        case 'Engineer':
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
            {isEdit ? 'Edit' : 'Configure a new'} mission
          </h4>
          <div className="Mission_FirstRow">
            <Field
              name="name"
              as={Input}
              value={props?.values?.name}
              label="Name"
              required
              placeholder="Enter Name"
            />
            <Field
              name="destination"
              as={Input}
              value={props?.values?.destination}
              label="Destination"
              placeholder="Enter Destination"
              required
            />
            <Field
              name="departure"
              as={Input}
              value={props?.values?.departure}
              type="date"
              label="Departure"
              placeholder="Enter Departure"
              required
            />
          </div>
          <div className="Mission_Members--card">
            <p className="Mission_Title">Members</p>
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
                          label="Type"
                          value={member.type}
                          options={MemberType}
                          required
                        />
                        {(member.type === 'Pilot' ||
                          member.type === 'Engineer') && (
                          <Field
                            name={`members.${index}.experience`}
                            as={Input}
                            type="number"
                            label="Experience"
                            placeholder="Enter Experience"
                            value={member.experience}
                            required
                          />
                        )}
                        {member.type === 'Engineer' && (
                          <Field
                            name={`members.${index}.job`}
                            as={Select}
                            label="Job"
                            value={member.job}
                            options={Jobs}
                            required
                          />
                        )}
                        {member.type === 'Passenger' && (
                          <>
                            <Field
                              name={`members.${index}.age`}
                              as={Input}
                              value={member.age}
                              type="number"
                              label="Age"
                              required
                            />
                            <Field
                              name={`members.${index}.wealth`}
                              as={Input}
                              value={member.wealth}
                              label="Wealth"
                            />
                          </>
                        )}
                        <IconButton
                          type="button"
                          icon={TrashIcon}
                          onClick={() => deleteMember(index, props)}
                          intent="danger"
                          marginRight={majorScale(2)}
                          marginTop={majorScale(2)}
                        />
                      </div>
                    ),
                  )}
                </div>
              )}
            />
            <Button
              type="button"
              onClick={() => addMember(props)}
              marginY={8}
              marginRight={12}
              iconAfter={AddIcon}
            >
              New Member
            </Button>
          </div>
          <div className="Mission_Actions">
            <Button
              type="button"
              appearance="default"
              marginY={8}
              marginRight={12}
              iconAfter={UndoIcon}
              is={Link}
              to="/mission"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              appearance="primary"
              marginY={8}
              marginRight={12}
              iconAfter={AddIcon}
            >
              {isEdit ? 'Edit' : 'Create'} Mission
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Mission;
