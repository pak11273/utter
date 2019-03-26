import React, {PureComponent} from "react"
import {withRouter} from "react-router-dom"
/* import Waypoint from "react-waypoint" */

import classNames from "classnames"
import cloneDeep from "lodash/cloneDeep"
/* import isEmpty from "lodash/isEmpty" */
import update from "immutability-helper"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CircularProgress from "@material-ui/core/CircularProgress"
import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import PersonIcon from "@material-ui/icons/Person"
import Typography from "@material-ui/core/Typography"

import {compose, Query, withApollo} from "react-apollo"
import {session} from "brownies"
import gql from "graphql-tag"

import {subsToSize} from "../../../utils/helpers.js"

const GET_COURSES = gql`
  query getCourses(
    $cursor: String
    $title: String!
    $owner: String!
    $resource: String
    $searchInput: String
    $selectionBox: String
    $usingLang: String!
    $teachingLang: String!
  ) {
    getCourses(
      input: {
        cursor: $cursor
        title: $title
        owner: $owner
        resource: $resource
        searchInput: $searchInput
        selectionBox: $selectionBox
        usingLang: $usingLang
        teachingLang: $teachingLang
      }
    ) {
      courses {
        _id
        courseImage
        courseMode
        title
        courseDescription
        levels {
          _id
          level
          title
        }
        usingLang
        subscribers
        teachingLang
        owner {
          username
          subscriptions {
            _id
          }
        }
      }
      cursor
    }
  }
`

const drawerWidth = 240

const styles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  card: {
    minHeight: "240px",
    display: "flex",
    flexDirection: "column"
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    "&:hover": {
      cursor: "pointer"
    }
  },
  cardContent: {
    flexGrow: 1
  },
  cardTitle: {
    height: "40px",
    lineHeight: "1em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word"
  },
  cardUsername: {
    whiteSpace: "nowrap",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1240 + theme.spacing.unit * 3 * 2)]: {
      width: 1240,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  root: {
    display: "flex"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  searchField: {
    marginTop: "7px"
  }
})

const initialState = {
  courseInput: "",
  title: "",
  resource: [],
  items: "",
  labelWidth: 0,
  mobileOpen: false,
  next: "",
  owner: "",
  resetCursor: "",
  searchInput: "",
  selectionBox: "title",
  teachingLang: "",
  usingLang: ""
}

class CoursesGrid extends PureComponent {
  state = cloneDeep(initialState)

  componentDidMount = async () => {}

  componentWillReceiveProps(prevProps) {
    if (prevProps.searchInput) {
      const newState = update(this.state, {
        usingLang: {$set: prevProps.searchInput.teachingLang},
        teachingLang: {$set: prevProps.searchInput.teachingLang}
      })
      this.setState(newState)
    } else {
      const newState = update(this.state, {
        cursor: {$set: ""}
      })
      this.setState(newState)
    }
  }

  handleImageClick = card => () => {
    session.course = card
    this.props.history.push({
      pathname: "/course/course-introduction",
      state: {courseId: card.id}
    })
  }

  render() {
    const {classes} = this.props
    return (
      <Query
        query={GET_COURSES}
        variables={{
          cursor: "",
          title: "",
          resource: "",
          owner: "",
          searchInput:
            this.props.search && this.props.search.searchInput
              ? this.props.search.searchInput
              : "",
          selectionBox:
            this.props.search && this.props.search.selectionBox
              ? this.props.search.selectionBox
              : "",
          usingLang:
            this.props.search && this.props.search.usingLang
              ? this.props.search.usingLang
              : "",
          teachingLang:
            this.props.search && this.props.search.teachingLang
              ? this.props.search.teachingLang
              : ""
        }}>
        {({loading, error, data}) => {
          if (loading)
            return (
              <Grid
                container
                alignContent="center"
                justify="center"
                style={{height: "300px"}}>
                <CircularProgress style={{color: "grey"}} />
              </Grid>
            )
          if (error) {
            console.log("err: ", error)
            return (
              <Grid>
                <p>
                  {error.graphQLErrors.map(({message}, i) => (
                    <p
                      style={{
                        fontSize: "1.3em",
                        color: "red",
                        margin: "30px",
                        padding: "30px",
                        textAlign: "center"
                      }}
                      key={i}>
                      {message}
                    </p>
                  ))}
                </p>
              </Grid>
            )
          }
          if (this.state.cursor !== "done") {
            /* var waypoint = ( */
            /*   <Waypoint */
            /*     key={data.getCourses.cursor} */
            /*     onEnter={() => { */
            /*       // set cursor state to first response */
            /*       const newState = update(this.state, { */
            /*         cursor: {$set: data.getCourses.cursor} */
            /*       }) */
            /*       this.setState(newState) */
            /*       fetchMore({ */
            /*         // note this is a different query than the one used in the */
            /*         variables: { */
            /*           cursor: this.state.cursor */
            /*         }, */
            /*         updateQuery: (previousResult, {fetchMoreResult}) => { */
            /*           if (!fetchMoreResult) { */
            /*             // do something here */
            /*             console.log("prev: ", previousResult) */
            /*             console.log("fetch: ", fetchMoreResult) */
            /*           } */
            /*           const previousEntry = previousResult.getCourses.courses */
            /*           const newCourses = fetchMoreResult.getCourses.courses */
            /*           // display waypoint if a cursor exists */
            /*           const newState = update(this.state, { */
            /*             cursor: { */
            /*               $set: fetchMoreResult.getCourses.cursor */
            /*             } */
            /*           }) */
            /*           this.setState(newState) */
            /*           if (isEmpty(newCourses)) { */
            /*             // hide waypoint */
            /*             const newState = update(this.state, { */
            /*               cursor: { */
            /*                 $set: fetchMoreResult.getCourses.cursor */
            /*               } */
            /*             }) */
            /*             this.setState(newState) */
            /*             return previousResult */
            /*           } */
            /*           var newCursor = newCourses[newCourses.length - 1].id */
            /*           if (!fetchMoreResult) return previousEntry */
            /*           return { */
            /*             // By returning `cursor` here, we update the `fetchMore` function */
            /*             // to the new cursor. */
            /*             getCourses: { */
            /*               cursor: newCursor, */
            /*               courses: [...previousEntry, ...newCourses], */
            /*               __typename: "PaginatedCourses" */
            /*             } */
            /*           } */
            /*         } */
            /*       }) */
            /*     }}> */
            /*     {/1* <div> */
            /*       <Button>Scroll down for more</Button> */
            /*     </div> *1/} */
            /*   </Waypoint> */
            /* ) */
          }
          return (
            <div>
              <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}
                <Grid container spacing={8}>
                  {data.getCourses.courses.map(card => (
                    <Grid item key={card._id} xs={12} sm={6} md={3} lg={3}>
                      <Card className={classes.card}>
                        <CardMedia
                          onClick={this.handleImageClick(card)}
                          className={classes.cardMedia}
                          image={`${card.courseImage}`}
                          title={`${card.title}`}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography
                            className={classes.cardTitle}
                            gutterBottom
                            variant="h6"
                            component="h6">
                            {card.title}
                          </Typography>
                          <Typography
                            className={classes.cardUsername}
                            gutterBottom
                            variant="caption">
                            {card.owner.username}
                          </Typography>
                        </CardContent>
                        <CardActions className={classes.actions}>
                          <PersonIcon />
                          <Typography
                            className={classes.cardUsername}
                            gutterBottom>
                            {subsToSize(card.subscribers)}
                          </Typography>
                          <Button
                            onClick={this.handleImageClick(card)}
                            size="large"
                            className={classes.editButton}>
                            {" "}
                            VIEW
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
              {/* {waypoint} */}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  withStyles(styles)
)(CoursesGrid)
