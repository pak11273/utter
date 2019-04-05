/* eslint react-hooks/exhaustive-deps: 0 */
import React, {useState, useEffect} from "react"
/* import {Admin, Resource, ListGuesser} from "react-admin" */
import {session} from "brownies"
import buildGraphQLProvider from "ra-data-graphql-simple"
/* import {UserList} from "../components/users" */
import Dashboard from "./course-dashboard.js"
import {Admin} from "react-admin"
/* import {Resource} from "react-admin" */
/* import {ApolloInstance} from "../../../apollo.js" */
/* import {LevelsList, LevelsEdit, LevelsCreate} from "../components/levels" */
/* import {PostsList} from "../components/posts.js" */
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
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

const CourseUpdate = ({classes}) => {
  const [state, changeState] = useState({
    dataProvider: null
  })

  useEffect(() => {
    buildGraphQLProvider({clientOptions: {uri: "/graphql"}}).then(result => {
      changeState({
        ...state,
        dataProvider: result
      })
    })
  }, [])

  const {course} = session

  if (!state.dataProvider) {
    return <div>Loading</div>
  }

  return (
    <React.Fragment>
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Grid container justify="center" direction="column">
            <Typography variant="h4" align="center" gutterBottom>
              {course.title}
            </Typography>
          </Grid>
        </div>
      </div>
      <Admin
        dashboard={Dashboard}
        /* authProvider={authProvider} */
        dataProvider={state.dataProvider}>
        {/* <Resource name="Post" list={PostsList} />
         <Resource
          name="levels"
          list={LevelsList}
          edit={LevelsEdit}
          create={LevelsCreate}
          icon={PostIcon}
        />
        <Resource name="users" list={UserList} icon={UserIcon} /> */}
      </Admin>
    </React.Fragment>
  )
}

export default withStyles(styles)(CourseUpdate)
