import MissionTable from '../components/Missions/Table';
import Button from '../components/Form/Button';
import { t } from '../util';

const MissionsPage = () => {
  return (
    <div className="Missions">
      <div className="Missions_Header" data-test-id="missions-header">
        <h3>{t('missions.title')}</h3>
        <Button data-test-id="missions-new" name={t('missions.buttons.new')} redirect="/mission" appearance="primary" />
      </div>
      <MissionTable />
    </div>
  );
};

export default MissionsPage;
