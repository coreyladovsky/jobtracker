import React from 'react';
import { Route } from 'react-router-dom'
import Home from './Home';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/signup">
          <SignUp />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
    </div>
  );
}

export default App;
