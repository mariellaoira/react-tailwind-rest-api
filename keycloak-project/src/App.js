import React from 'react';
import './App.css';
import ProtectedComponent from './ProtectedComponent';
import keycloak from './keycloak';
import('preline');

const App = () => {
  if (keycloak.authenticated) {
    return <ProtectedComponent keycloak={keycloak} />;
  } else {
    return <div>Authenticating...</div>;
  }
};

export default App;
