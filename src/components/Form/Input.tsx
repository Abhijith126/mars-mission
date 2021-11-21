import PropTypes from 'prop-types';
import { useField } from 'formik';
import './styles.scss';

interface InputProps {
  name: string;
  label?: string;
  className?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  onChange?: any;
}

const Input = (props: InputProps) => {
  const { name, label, disabled, required, className } = props;
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;
  return (
    <div className="Mission--fields">
      <label className="Input--label" htmlFor={name}>
        {label} {required ? ' *' : ''}
      </label>
      <input
        {...props}
        className={className + ' Input Input_Text'}
        name={name}
        value={field.value || ''}
        disabled={disabled}
      />
      <p className="Input--error">{error}</p>
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
