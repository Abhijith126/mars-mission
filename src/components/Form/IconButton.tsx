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
  icon?: string;
  redirect?: string;
  style?: any;
}

const IconButton = (props: InputProps) => {
  const { icon, type, className, appearance, onClick, redirect } = props;

  const prepareClassName = () => {
    let classname = (className || '') + ' Button';
    switch (appearance) {
      case 'primary':
        return classname + ' Button_Primary Button_Icon';
      case 'danger':
        return classname + ' Button_Danger Button_Icon';
      case 'success':
        return classname + ' Button_Success Button_Icon';
      default:
        return classname + ' Button_Icon';
    }
  };

  const getIconName = () => {
    switch (icon) {
      case 'add':
        return 'fa fa-plus';
      case 'delete':
        return 'fa fa-trash';
      case 'edit':
        return 'fa fa-pen';
    }
  };

  return (
    <div className="Mission--fields">
      {redirect ? (
        <Link
          {...props}
          to={redirect}
          onClick={onClick}
          className={prepareClassName() + ' Button_Link'}
        >
          <i className={getIconName()}></i>
        </Link>
      ) : (
        <button
          {...props}
          onClick={onClick}
          type={type}
          className={prepareClassName()}
        >
          <i className={getIconName()}></i>
        </button>
      )}
    </div>
  );
};

IconButton.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};

IconButton.defaultProps = {
  name: 'text',
  type: 'button',
};

export default IconButton;
