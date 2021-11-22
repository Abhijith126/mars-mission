import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setAlert } from './store/actions/alertActions';
import { setError } from './store/actions/missionActions';
import Header from './components/Header';
import MissionFormPage from './pages/MissionFormPage';
import MissionsPage from './pages/MissionsPage';
import Alert from './components/Alert';
import './App.scss';
import { t } from './util';

const App: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.mission.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);

  return (
    <Router>
      <div className="App">
        <Header title={t('title')} />
        <div className="App__Body">
          <Routes>            
            <Route path="/" element={<MissionsPage />} />
              <Route path="mission" element={<MissionFormPage />} />
              <Route path="mission/:missionId" element={<MissionFormPage />} />
          </Routes>
        </div>
        {alertMsg && (
          <Alert message={alertMsg} onClose={() => dispatch(setAlert(''))} />
        )}
        {error && (
          <Alert message={error} onClose={() => dispatch(setError())} />
        )}
      </div>
    </Router>
  );
};

export default App;
