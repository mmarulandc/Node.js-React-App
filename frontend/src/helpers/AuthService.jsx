import decode from "jwt-decode";
export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => {
      this.setToken(res.token); // Setting the token in sessionStorage
      return Promise.resolve(res);
    });
  }

  signup(username, password) {
    return this.fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from sessionStorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to sessionStorage
    sessionStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from sessionStorage
    return sessionStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from sessionStorage
    sessionStorage.removeItem("id_token");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  async _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      let getErrorMessage = (response) => response
        .json()
        .then((data) => ({data}))
        let errorMessage = await getErrorMessage(response);
        console.log(errorMessage);
      var error = new Error(errorMessage.data.info.message);
      error.response = errorMessage.data.info.message;
      throw error;
    }
  }
}
