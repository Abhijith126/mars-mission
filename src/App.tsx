import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setAlert } from './store/actions/alertActions';
import { setError } from './store/actions/missionActions';

import Header from './components/Header';
import Footer from './components/Footer';
import MissionList from './components/Missions/index';
import MissionFormPage from './pages/MissionFormPage';
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
            <Route path="mission" element={<MissionList />} />
            <Route path="mission/new" element={<MissionFormPage />} />
            <Route path="mission/:missionId" element={<MissionFormPage />} />
            <Route path="/" element={<MissionList />} />
          </Routes>
        </div>
        {alertMsg && (
          <Alert message={alertMsg} onClose={() => dispatch(setAlert(''))} />
        )}
        {error && (
          <Alert message={error} onClose={() => dispatch(setError())} />
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
