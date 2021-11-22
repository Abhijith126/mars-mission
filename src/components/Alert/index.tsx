import './styles.scss';
interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div className="Alert">
      <div className="alert">
        <span className="closebtn" onClick={onClose}>
          &times;
        </span>
        <strong>
          <i className="fa fa-warn"></i>
        </strong>
        {message}
      </div>
    </div>
  );
};

export default Alert;
