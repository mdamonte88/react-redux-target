import fetch from 'isomorphic-fetch';
import { sessionService } from 'redux-react-session';
import humps from 'humps';

import routes from 'constants/routesPaths';

const saveSessionHeaders = (headers) => {
  if (headers.get('access-token')) {
    const sessionHeaders = {
      token: headers.get('access-token'),
      uid: headers.get('uid'),
      client: headers.get('client')
    };
    sessionService.saveSession(sessionHeaders);
  }
};

const handleErrors = (response, requestMethod) =>
  new Promise((resolve, reject) => {
    const { status, ok, headers, statusText } = response;
    if (!response) {
      reject(new Error({ message: 'No response returned from fetch' }));
      return;
    }

    saveSessionHeaders(headers);
    if (ok && (status === 200 || status === 204)) {
      if (requestMethod === 'delete') {
        resolve();
        return;
      }

      resolve(response.json());
      return;
    }

    sessionService.loadSession()
      .then(() => {
        if (status === 401) {
          sessionService.deleteSession();
          window.location = routes.login;
        }
      }).catch(() => {});

    response.json()
      .then((json) => {
        const error = json || { message: statusText };
        reject(error);
      }).catch(() => reject(new Error({ message: 'Response not JSON' })));
  });

class Api {
  performRequest(uri, apiUrl, requestData = {}) {
    const url = `${apiUrl}${uri}`;

    return new Promise((resolve, reject) => {
      fetch(url, requestData)
        .then(response => handleErrors(response, requestData.method))
        .then(response => resolve(humps.camelizeKeys(response)))
        .catch(error => reject(humps.camelizeKeys(error)));
    });
  }

  addTokenHeader(requestData) {
    return sessionService.loadSession()
      .then((session) => {
        const { token, client, uid } = session;
        requestData.headers['access-token'] = token;
        requestData.headers.client = client;
        requestData.headers.uid = uid;
        return requestData;
      }).catch(() => requestData);
  }

  /* ******************
      REST METHODS
  ******************* */

  /*
    REST
    HTTP Verb: GET
    CRUD: Read
  */

  get(uri, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    return this.addTokenHeader(requestData)
      .then(data => this.performRequest(uri, apiUrl, data));
  }

  /*
    REST
    HTTP Verb: POST
    CRUD: Create
  */
  post(uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return this.addTokenHeader(requestData)
      .then(data => this.performRequest(uri, apiUrl, data));
  }

  /*
    REST
    HTTP Verb: DELETE
    CRUD: Delete
  */
  delete(uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return this.addTokenHeader(requestData)
      .then(data => this.performRequest(uri, apiUrl, data));
  }

  /*
    REST
    HTTP Verb: PUT
    CRUD: Update/Replace
  */
  put(uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return this.addTokenHeader(requestData)
      .then(data => this.performRequest(uri, apiUrl, data));
  }

  /*
    REST
    HTTP Verb: PATCH
    CRUD: Update/Modify
  */
  patch(uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'patch',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return this.addTokenHeader(requestData)
      .then(data => this.performRequest(uri, apiUrl, data));
  }
}

export default new Api();
