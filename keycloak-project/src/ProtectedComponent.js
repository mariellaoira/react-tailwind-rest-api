import React from 'react';
import Posts from './panels/GET';
import MenuNav from './panels/MENU';
import Header from './panels/HEADER';
import('preline');

const ProtectedComponent = ({ keycloak }) => {
  let kcProfile = keycloak.tokenParsed;
  console.log(kcProfile);
  const logout = () => {
    keycloak.logout();
  };

  return (
    <div>
      <div className="md:container md:mx-auto hs-dark-mode-active">
        <Header />
        <MenuNav />
        <Posts />
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProtectedComponent;
