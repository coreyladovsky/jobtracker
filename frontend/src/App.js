import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignUp from "./features/auth/SignUp";
import ForgotPassword from "./features/auth/ForgotPassword";
import { ProtectedRoute, AuthRoute } from "./util/authRoutes";
import Login from "./features/auth/Login";
import ErrorBoundaries from "./features/ErrorBoundaries/ErrorBoundaries";

function App() {
  return (
    <div className="App">
      <ErrorBoundaries>
        <Switch>
          <ProtectedRoute path="/">
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
        </Switch>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
