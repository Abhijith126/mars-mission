import { Link } from 'react-router-dom';
import './styles.scss';

export interface ButtonProps {
  name?: string;
  appearance?: 'default' | 'primary' | 'danger';
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  onClick?: any;
  redirect?: string;
  icon?: string;
}

const Button = (props: ButtonProps) => {
  const { name, type, className, appearance, onClick, redirect, icon } = props;

  const prepareClassName = () => {
    let classname = (className || '') + ' Button';
    if (icon) classname += ' Button_Icon';

    switch (appearance) {
      case 'primary':
        return classname + ' Button_Primary';
      case 'danger':
        return classname + ' Button_Danger';
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
      case 'close':
        return 'fa fa-times';
    }
  };
  return (
    <div>
      {redirect ? (
        <Link to={redirect} {...props} onClick={onClick} className={prepareClassName() + ' Button_Link'}>
          {icon ? <i className={getIconName()}></i> : name}
        </Link>
      ) : (
        <button {...props} onClick={onClick} type={type} className={prepareClassName()}>
          {icon ? <i className={getIconName()}></i> : name}
        </button>
      )}
    </div>
  );
};

export default Button;
