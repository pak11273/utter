import React, {Component} from "react"
/* import {Admin, Resource, ListGuesser} from "react-admin" */
import {Admin, Resource} from "react-admin"
import buildGraphQLProvider from "ra-data-graphql-simple"
/* import {PostCreate, PostEdit, PostList} from "./posts" */
import {PostsList} from "../components/posts"
/* import {Admin, Resource} from "react-admin" */
/* import {session} from "brownies" */
/* import {UserList} from "../components/users" */
/* import Dashboard from "./course-dashboard.js" */
/* import {ApolloInstance} from "../../../apollo.js" */
/* import {LevelsList, LevelsEdit, LevelsCreate} from "../components/levels" */
/* import {PostsList} from "../components/posts.js" */
/* import Grid from "@material-ui/core/Grid" */
/* import Typography from "@material-ui/core/Typography" */
/* import PostIcon from "@material-ui/icons/Book" */
/* import UserIcon from "@material-ui/icons/Group" */
import {withStyles} from "@material-ui/core/styles"
import {styles} from "../styles.js"

/* import jsonServerProvider from "ra-data-json-server" */

/* const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com") */
/* import authProvider from "../components/authProvider" */

/* buildGraphQLProvider({ */
/* 	client: ApolloInstance */
/* }); */

class CourseUpdate extends Component {
  constructor() {
    super()
    this.state = {dataProvider: null}
  }

  componentDidMount() {
    buildGraphQLProvider({
      clientOptions: {uri: "http://192.168.68.8:3010/graphql"}
    }).then(dataProvider => this.setState({dataProvider}))
  }

  render() {
    const {dataProvider} = this.state

    if (!dataProvider) {
      return <div>Loading</div>
    }

    return (
      <Admin dataProvider={dataProvider}>
        <Resource name="Post" list={PostsList} />
      </Admin>
    )
  }
}

export default withStyles(styles)(CourseUpdate)
