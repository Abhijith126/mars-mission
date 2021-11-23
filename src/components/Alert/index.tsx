import Button from '../Form/Button';
import './styles.scss';
interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div className="Alert" data-test-id="alert">
      <p className="Alert_Message">
      <strong>
        <i className="fa fa-exclamation"></i>
      </strong>
      {message}
      </p>
      <Button data-test-id="alert-action" className="Alert_Action" icon="close" onClick={onClose} />
    </div>
  );
};

export default Alert;
