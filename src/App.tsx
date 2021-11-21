import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setAlert } from './store/actions/alertActions';
import { setError } from './store/actions/missionActions';

import Header from './components/Header';
import Footer from './components/Footer';
import MissionList from './components/Missions/index';
import Mission from './components/Missions/mission';
import Alert from './components/Alert';
import './App.scss';

const App: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.mission.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);

  return (
    <Router>
      <div className="App">
        <Header title="Journey to Mars" />
        <div className="App__Body">
          <Routes>
            <Route path="mission" element={<MissionList />} />
            <Route path="mission/new" element={<Mission />} />
            <Route path="mission/:missionId" element={<Mission />} />
            <Route path="/" element={<MissionList />} />
          </Routes>
        </div>
        <Footer />

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
