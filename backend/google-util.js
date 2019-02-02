const {google} = require('googleapis');
const secret = require('./serverConstants');

const googleConfig = {
  clientID: secret.clientID,
  clientSecret: secret.clientSecret,
  redirect: secret.clientCallback,
};

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientID,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile'
]

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}

function urlGoogle() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}

function getGoogleAccountFromCode(code) {
  const auth = createConnection();
  const data = auth.getToken(code);
  const tokens = data.tokens;
  auth.setCredentials(tokens);
  const id = data.id;
  console.log(data);
  console.log(data.id);

  return {
    id: '',
    name: 'temp',
  }
}
    
module.exports = {
   googleUrl: urlGoogle,
   dataCollection: getGoogleAccountFromCode
}
