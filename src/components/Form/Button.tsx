import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

interface InputProps {
  name: string;
  appearance?: 'default' | 'primary' | 'danger' | 'success';
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  onClick?: any;
  redirect?: string;
  icon?: string;
}

const Button = (props: InputProps) => {
  const { name, type, className, appearance, onClick, redirect, icon } = props;

  const prepareClassName = () => {
    let classname = (className || '') + ' Button';
    switch (appearance) {
      case 'primary':
        return classname + ' Button_Primary';
      case 'danger':
        return classname + ' Button_Danger';
      case 'success':
        return classname + ' Button_Success';
      default:
        return classname;
    }
  };
  const getIconName = () => {
    switch (icon) {
      case 'add':
        return 'fa fa-plus-circle';
      case 'delete':
        return 'fa fa-trash';
      case 'edit':
        return 'fa fa-pen';
      case 'back':
        return 'fa fa-undo';
    }
  };
  return (
    <div className="Mission--fields">
      {redirect ? (
        <Link
          to={redirect}
          {...props}
          onClick={onClick}
          className={prepareClassName() + ' Button_Link'}
        >
          {name} &nbsp; {icon && <i className={getIconName()}></i>}
        </Link>
      ) : (
        <button
          {...props}
          onClick={onClick}
          type={type}
          className={prepareClassName()}
        >
          {name} &nbsp; {icon && <i className={getIconName()}></i>}
        </button>
      )}
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  name: 'text',
  type: 'button',
};

export default Button;
