import Keycloak from 'keycloak-js';

const keycloakConfig = {
    realm: 'master',
    clientId: 'projects',
    url: 'http://137.116.144.44:8080/'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;

