import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './index';

function AppRouter() {

  return (
    <Routes>
        {publicRoutes.map((el) => (
          <Route key={el.path} path={el.path} element={el.element} />
        ))}
    </Routes>
  );
}

export default AppRouter;