import React, {PureComponent} from "react"
import {Route, NavLink} from "react-router-dom"
import {session} from "brownies"

import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
/* import ListItemText from "@material-ui/core/ListItemText" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {styles} from "../styles.js"

class CourseUpdate extends Component {
  constructor() {
    super()
    this.state = {dataProvider: null}
  }

  componentDidMount() {
    buildGraphQLProvider({
      clientOptions: {
        uri:
          process.env.NODE_ENV === "production" ||
          process.env.NODE_ENV === "prod"
            ? /* ? process.env.REACT_APP_SERVER_URL */
              "https://api.utterzone.com/graphql"
            : "http://192.168.68.8:3010/graphql"
      }
    }).then(dataProvider => this.setState({dataProvider}))
  }

  render() {
    const {dataProvider} = this.state

    if (!dataProvider) {
      return <div>Loading</div>
    }

    return (
      <Admin dataProvider={dataProvider}>
        <Resource name="Post" list={ListGuesser} />
      </Admin>
    )
  }
}

export default withStyles(styles)(CourseUpdate)
