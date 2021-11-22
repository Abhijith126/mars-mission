import MissionTable from '../components/Missions/Table';
import Button from '../components/Form/Button';
import { t } from '../util';

const MissionList = () => {
  return (
    <div>
      <div className="Missions_Header">
        <h3>{t('missions.title')}</h3>
        <Button name={t('missions.buttons.new')} redirect="/mission" appearance="primary" />
      </div>
      <MissionTable />
    </div>
  );
};

export default MissionList;
