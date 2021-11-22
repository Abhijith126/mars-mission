import { useField } from 'formik';
import './styles.scss';

interface Option {
  key: string;
  value: string;
}

interface SelectProps {
  name: string;
  label: string;
  options: Option[];
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
    <div className="Input">
      <label className="Input_Label" htmlFor={name}>
        {label} {required ? ' *' : ''}
      </label>
      <select
        {...props}
        className={`${className || ''} Input_Field Input_Select ${error ? ' Input_Field__Error' : ''} `}
        value={field.value || ''}
        disabled={disabled}
      >
        {options.map((option: Option, i: number) => (
          <option key={i} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <span className="Input_Error">{error}</span>
    </div>
  );
};

export default Select;
