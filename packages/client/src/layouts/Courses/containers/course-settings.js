import React from "react"
/* import {Admin, Resource, ListGuesser, AUTH_LOGIN} from "react-admin" */
import {Admin, Resource} from "react-admin"
import {history} from "@utterzone/connector"
/* import jsonServerProvider from "ra-data-json-server" */

/* import englishMessages from "ra-language-english" */

/* const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com") */

/* const authProvider = (type, params) => { */
/*   if (type === AUTH_LOGIN) { */
/*     const {username, password} = params */
/*     const request = new Request("https://mydomain.com/authenticate", { */
/*       method: "POST", */
/*       body: JSON.stringify({username, password}), */
/*       headers: new Headers({"Content-Type": "application/json"}) */
/*     }) */
/*     return fetch(request) */
/*       .then(response => { */
/*         if (response.status < 200 || response.status >= 300) { */
/*           throw new Error(response.statusText) */
/*         } */
/*         return response.json() */
/*       }) */
/*       .then(({token}) => { */
/*         localStorage.setItem("token", token) */
/*       }) */
/*   } */
/*   return Promise.resolve() */
/* } */

class CourseSettings extends React.Component {
  render() {
    return (
      <Admin history={history}>
        <Resource />
      </Admin>
    )
  }
}

export default CourseSettings
