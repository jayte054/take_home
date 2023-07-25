import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/authContext';

import { TakeHome } from './pages/takehome';
import { AuthPage } from './pages/authpage';
import { DataPage } from './pages/datapage';
import { AdminPage } from './pages/adminPage';
import { AdminSignin } from './pages/adminSinginPage';

function App() {
  return (
  <React.Fragment>
      <Router>
        <Routes>
          <Route path = "/landing" element= {<TakeHome />} />
        <Route path = "/auth" element = {<AuthPage />} />
        {/* <Route element = {} /> */}
        <Route path = "/datapage" element = {<DataPage />} />
        <Route path = "/adminpage" element = {<AdminPage />} />
        <Route path = "/adminsignin" element = {<AdminSignin />} />
        </Routes>
      </Router>
    </React.Fragment>
   
  );
}

export default App;
