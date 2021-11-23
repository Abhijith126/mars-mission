import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setAlert } from './store/actions/alertActions';
import Header from './components/Header';
import MissionFormPage from './pages/MissionFormPage';
import MissionsPage from './pages/MissionsPage';
import Alert from './components/Alert';
import { t } from './util';

const App = () => {
  const dispatch = useDispatch();
  const alertMsg = useSelector((state: RootState) => state.alert.message);

  return (
    <Router>
      <div className="App">
        <Header title={t('title')} />
        <div>
          <Routes>            
            <Route path="/" element={<MissionsPage />} />
              <Route path="mission" element={<MissionFormPage />} />
              <Route path="mission/:missionId" element={<MissionFormPage />} />
          </Routes>
        </div>
        {alertMsg && (
          <Alert message={alertMsg} onClose={() => dispatch(setAlert(''))} />
        )}
      </div>
    </Router>
  );
};

export default App;
