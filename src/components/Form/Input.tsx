import { TextInputField } from 'evergreen-ui';
import PropTypes from 'prop-types';
import { useField } from 'formik';

interface InputProps {
  name: string;
  label: string;
  className?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

const Input = (props: InputProps) => {
  const { name, label, disabled } = props;
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;
  return (
    <div className="Mission--fields">
      <TextInputField
        {...props}
        isInvalid={!!error}
        marginBottom={8}
        label={label}
        name={name}
        value={field.value || ''}
        validationMessage={error}
        disabled={disabled}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
};

Input.defaultProps = {
  name: 'text',
};

export default Input;
