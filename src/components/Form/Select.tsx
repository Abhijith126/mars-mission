import { SelectField } from 'evergreen-ui';
import PropTypes from 'prop-types';
import { useField } from 'formik';

interface SelectProps {
  name: string;
  label: string;
  options: any[];
  className?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

const Select = (props: SelectProps) => {
  const { name, label, options, disabled } = props;
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;
  return (
    <div className="Mission--fields">
      <SelectField
        {...props}
        isInvalid={!!error}
        marginBottom={8}
        label={label}
        name={name}
        value={field.value || ''}
        validationMessage={error}
        disabled={disabled}
      >
        {options.map((option: any, i: number) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </SelectField>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
};

Select.defaultProps = {
  name: 'text',
};

export default Select;
