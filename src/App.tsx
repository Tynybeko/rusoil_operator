import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import PrivateLayout from './layouts/PrivateLayout';
import History from './pages/History';
import WorkProcess from './pages/WorkProcess';
import WorkersLayout from './pages/WorkerksLayout';
import Operator from './pages/Operator';
import OperatorLayout from './layouts/OperatorLayout';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <Routes >
      <Route path='/auth' element={<Auth />} />
      <Route path='/' element={<PrivateLayout />}>
        <Route index element={<WorkersLayout />} />
        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<WorkProcess />} />
          <Route path='history' element={<History />} />
        </Route>
        <Route path='operator' element={<OperatorLayout />}>
          <Route index element={<Operator />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
