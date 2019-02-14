import React, {PureComponent} from "react"
import {connect} from "react-redux"
import {Link as RouterLink} from "react-router-dom"
import {Helmet} from "react-helmet"
import Waypoint from "react-waypoint"

import classNames from "classnames"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Drawer from "@material-ui/core/Drawer"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import {Spacer} from "../../../components"
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import cloneDeep from "lodash/cloneDeep"
import update from "immutability-helper"

import {Query} from "react-apollo"
import gql from "graphql-tag"

import {store} from "../../../store.js"
import {history} from "@utterzone/connector"
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"
import isEmpty from "lodash/isEmpty"
import "react-select/dist/react-select.css"

// actions
import {loadData} from "../../../api/actions.js"

const drawerWidth = 240
const styles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  card: {
    minHeight: "300px",
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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  editButton: {
    color: "white",
    backgroundColor: "#ff7f7e",
    "&:hover": {
      backgroundColor: "#c56564"
    }
  },
  root: {
    display: "flex"
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
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  searchField: {
    marginTop: "7px"
  },

  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
})

const getCreatedCourses = gql`
  query getCreatedCourses($cursor: String) {
    getCreatedCourses(cursor: $cursor) {
      courses {
        id
        courseImage
        courseDescription
        courseName
        courseMode
        owner {
          username
        }
      }
      cursor
    }
  }
`

const initialState = {
  search: "",
  owner: "",
  courseInput: "",
  courseName: "",
  selectionBox: "title",
  courseRef: "",
  teachingLang: "",
  usingLang: "",
  items: "",
  next: "",
  resetCursor: ""
}

class CoursesCreatedContainer extends PureComponent {
  state = cloneDeep(initialState)

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  handleImageClick = data => {
    const payload = {}
    payload.course = data
    store.dispatch(loadData(payload))

    history.push({
      pathname: "/course/course-introduction",
      state: {courseId: data.id}
    })
  }

  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <form className={classes.root} autoComplete="off">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}>
            <Spacer margin="100px 0 0 0" />
            <div align="center">
              <Spacer margin="40px 0 0 0" />
              <Link component={RouterLink} to="/courses/create">
                Create a Course
              </Link>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Grid>
              <Helmet>
                <meta charset="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta
                  name="description"
                  content="Make direct contact with our team throught our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
                />
                <meta name="author" content="Isaac Pak" />
                <title>Utterzone | Courses</title>
                <link rel="canonical" href="https://utter.zone/courses" />
              </Helmet>

              {/* Hero unit */}
              <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                  <Typography
                    variant="h4"
                    align="center"
                    color="textPrimary"
                    gutterBottom>
                    Edit one of your Courses
                  </Typography>
                </div>
              </div>
              {/* End hero unit */}
              <Query
                query={getCreatedCourses}
                fetchPolicy="network-only"
                variables={{
                  cursor: ""
                }}>
                {({loading, error, data, fetchMore}) => {
                  if (loading) return <Grid>loading...</Grid>
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
                    var waypoint = (
                      <Waypoint
                        key={data.getCreatedCourses.cursor}
                        onEnter={() => {
                          // set cursor state to first response
                          const newState = update(this.state, {
                            cursor: {$set: data.getCreatedCourses.cursor}
                          })

                          this.setState(newState)

                          fetchMore({
                            // note this is a different query than the one used in the
                            variables: {
                              cursor: this.state.cursor
                            },
                            updateQuery: (
                              previousResult,
                              {fetchMoreResult}
                            ) => {
                              if (!fetchMoreResult) {
                                // do something here
                              }
                              const previousEntry =
                                previousResult.getCreatedCourses.courses
                              const newCourses =
                                fetchMoreResult.getCreatedCourses.courses

                              // display waypoint if a cursor exists
                              const newState = update(this.state, {
                                cursor: {
                                  $set: fetchMoreResult.getCreatedCourses.cursor
                                }
                              })

                              this.setState(newState)

                              if (isEmpty(newCourses)) {
                                // hide waypoint
                                const newState = update(this.state, {
                                  cursor: {
                                    $set:
                                      fetchMoreResult.getCreatedCourses.cursor
                                  }
                                })

                                this.setState(newState)

                                return previousResult
                              }
                              var newCursor =
                                newCourses[newCourses.length - 1].id

                              if (!fetchMoreResult) return previousEntry

                              return {
                                // By returning `cursor` here, we update the `fetchMore` function
                                // to the new cursor.
                                getCreatedCourses: {
                                  cursor: newCursor,
                                  courses: [...previousEntry, ...newCourses],
                                  __typename: "PaginatedCourses"
                                }
                              }
                            }
                          })
                        }}>
                        <div>
                          <Button>Scroll down for more</Button>
                        </div>
                      </Waypoint>
                    )
                  }
                  return (
                    <div>
                      <div
                        className={classNames(
                          classes.layout,
                          classes.cardGrid
                        )}>
                        {/* End hero unit */}
                        <Grid container spacing={40}>
                          {data.getCreatedCourses.courses.map(card => (
                            <Grid item key={card.id} sm={6} md={4} lg={3}>
                              <Card className={classes.card}>
                                <CardMedia
                                  onClick={() => this.handleImageClick(card)}
                                  className={classes.cardMedia}
                                  image={`${card.courseImage}`}
                                  title={`${card.courseName}`}
                                />
                                <CardContent className={classes.cardContent}>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h6">
                                    {card.courseName}
                                  </Typography>
                                </CardContent>
                                <CardActions className={classes.actions}>
                                  <Button
                                    onClick={() => this.handleImageClick(card)}
                                    size="large"
                                    className={classes.editButton}>
                                    Edit
                                  </Button>
                                </CardActions>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                      {waypoint}
                    </div>
                  )
                }}
              </Query>
            </Grid>
          </main>
        </form>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: payload => dispatch(loadData(payload)),
    toggleFooter
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CoursesCreatedContainer))
