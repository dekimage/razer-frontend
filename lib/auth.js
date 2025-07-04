import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Strapi from "strapi-sdk-javascript/build/main";

import Router from "next/router";

const apiUrl =
  process.env.API_URL ||
  "https://titan-backend-3-5-0.herokuapp.com" ||
  "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export const strapiRegister = (username, email, password) => {
  if (!process.browser) {
    return undefined;
  }
  strapi.register(username, email, password).then((res) => {
    setToken(res);
  });
  return Promise.resolve();
};
//use strapi to get a JWT and token object, save
//to approriate cookei for future requests
export const strapiLogin = (email, password) => {
  //typeof window === 'undefined'   => is same as !process.browser but safer
  if (!process.browser) {
    return;
  }
  // Get a token
  strapi.login(email, password).then((res) => {
    setToken(res);
  });
  return Promise.resolve();
};

export const setToken = (token) => {
  if (!process.browser) {
    return;
  }
  // console.log(token.user);
  Cookies.set("username", token.user.username);
  Cookies.set("jwt", token.jwt);
  Cookies.set("userid", token.user.id);
  Cookies.set("userxp", token.user.xp);

  if (Cookies.get("username")) {
    Router.push("/");
  }
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  Cookies.remove("jwt");
  Cookies.remove("username");
  Cookies.remove("cart");
  Cookies.remove("userid");
  Cookies.remove("userxp");

  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};

export const getUserFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }

  let username = req.headers.cookie
    .split(";")
    .find((user) => user.trim().startsWith("username="));
  if (username) {
    username = username.split("=")[1];
  }

  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];

  return jwtDecode(jwt), username;
};

export const getUserIdFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }

  let userid = req.headers.cookie
    .split(";")
    .find((user) => user.trim().startsWith("userid="));
  if (userid) {
    userid = userid.split("=")[1];
  }

  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];

  return jwtDecode(jwt), userid;
};

export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};

export const getUseridFromLocalCookie = () => {
  return Cookies.get("userid");
};

//these will be used if you expand to a provider such as Auth0
const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3;
    }
  );
  return params;
};
export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const { id_token, state } = getQueryParams();
  return { token: id_token, secret: state };
};
