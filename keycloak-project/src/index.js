import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import keycloak from './keycloak';
import './index.css';

keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
  if (authenticated) {
    console.log(keycloak);
    const root = document.getElementById('root');
    const rootElement = (
      <React.StrictMode>
        <App keycloak={keycloak} />
      </React.StrictMode>
    );
    const rootInstance = ReactDOM.createRoot(root);
    rootInstance.render(rootElement);
  }

  keycloak.loadUserProfile().then((userProfile) => {
    console.log('User Profile:', userProfile);
    // Update your component state with the user profile data
  });
});