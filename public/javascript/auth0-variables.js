
const AUTH0_CLIENT_ID = 'zalZ1MTxYGmq72QYJ3fhsMl13Z5xfZga';
const AUTH0_DOMAIN = 'demonstration.auth0.com';
const AUDIENCE = 'organise';
const SCOPE = 'openid profile email offline_access read:contacts read:calendar';
const AUTH0_CALLBACK_URL = 'http://app1.com:3000';
const AUTH0_CONNECTION = 'Username-Password-Authentication';
const CONTACTS_API_PORT = '3001';
const CALENDAR_API_PORT = '3002';

const auth0WebAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: AUTH0_CALLBACK_URL,
  responseType: 'id_token token',
  audience: AUDIENCE,
  scope: SCOPE
});

const auth0Authentication = new auth0.Authentication(auth0WebAuth, {
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID
});

const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN,
  {
    autoclose: true,
    closable: false,
    auth: {
      redirect: true,
      redirectUrl: AUTH0_CALLBACK_URL,
      responseType: 'token',
      sso: true,
      params: {
        scope: SCOPE,
        audience: AUDIENCE
      }
    }
  });

lock.on('authenticated', function (authResult) {
  lock.getUserInfo(authResult.accessToken, function (error, profile) {
    if (error) {
      // handle error...
      console.log('Error getting user profile', error);
      return;
    }
    console.log(profile);
    saveAuthResult(authResult);
  });
});

lock.on('authorization_error', function (error) {
  // handle error..
  console.log('authorization_error', error);
});
