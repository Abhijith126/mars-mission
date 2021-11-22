import PropTypes from 'prop-types';
import { useField } from 'formik';
import './styles.scss';

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
  const { name, label, options, disabled, required, className } = props;
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? meta.error : null;
  return (
    <div className="Mission--fields">
      <label className="Input--label" htmlFor={name}>
        {label} {required ? ' *' : ''}
      </label>
      <select
        {...props}
        className={`${className || ''} Input Input_Select ${
          error ? ' Input--error-field' : ''
        } `}
        name={name}
        value={field.value || ''}
        disabled={disabled}
      >
        {options.map((option: any, i: number) => (
          <option key={i} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <br />
      <span className="Input--error">{error}</span>
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
