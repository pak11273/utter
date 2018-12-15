import React from "react"
import {Admin, Resource, ListGuesser} from "react-admin"
import {history} from "@utterzone/connector"
/* import jsonServerProvider from "ra-data-json-server" */

/* import englishMessages from "ra-language-english" */

const authProvider = () => Promise.resolve(localStorage.getItem("AUTH_TOKEN"))

class CourseEdit extends React.Component {
  render() {
    return (
      <Admin authProvider={authProvider} history={history}>
        <Resource name="users" list={ListGuesser} />
      </Admin>
    )
  }
}

export default CourseEdit
