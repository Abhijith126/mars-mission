import Button from '../Form/Button';
import './styles.scss';
interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div className="Alert">
      <p className="Alert_Message">
      <strong>
        <i className="fa fa-exclamation"></i>
      </strong>
      {message}
      </p>
      <Button className="Alert_Action" icon="close" onClick={onClose} />
    </div>
  );
};

export default Alert;
