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
        className={`${className || ''} Input Input_Text ${error ? ' Input--error-field' : ''} `}
        name={name}
        value={field.value || ''}
        disabled={disabled}
      />
      <br />
      <span className="Input--error">{error}</span>
    </div>
  );
};

export default Input;
