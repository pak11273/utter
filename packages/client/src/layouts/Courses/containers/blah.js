import React from "react"
import {Admin, Resource, ListGuesser} from "react-admin"
import {history} from "@utterzone/connector"
import jsonServerProvider from "ra-data-json-server"

/* import englishMessages from "ra-language-english" */

const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com")
class CourseEdit extends React.Component {
  render() {
    return (
      <Admin dataProvider={dataProvider} history={history}>
        <Resource name="users" list={ListGuesser} />
      </Admin>
    )
  }
}

export default CourseEdit
