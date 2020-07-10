import React from 'react';
import { Route } from 'react-router-dom'
import Home from './Home';
import SignUp from './features/auth/SignUp';
import ForgotPassword from './ForgotPassword';
import {ProtectedRoute, AuthRoute } from './util/authRoutes';
import Login from './features/auth/Login';

function App() {
  return (
    <div className="App">
      <ProtectedRoute exact path="/">
          <Home />
      </ProtectedRoute>
      <AuthRoute path="/signup">
          <SignUp />
      </AuthRoute>
      <AuthRoute path="/login">
          <Login />
      </AuthRoute>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
    </div>
  );
}

export default App;
