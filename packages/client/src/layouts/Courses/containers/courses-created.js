import React, {PureComponent} from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
import {Helmet} from "react-helmet"
import {session} from "brownies"

import classNames from "classnames"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CircularProgress from "@material-ui/core/CircularProgress"
import Drawer from "@material-ui/core/Drawer"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import {GraphError, Spacer} from "../../../components"
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import cloneDeep from "lodash/cloneDeep"
/* import update from "immutability-helper" */

import {Query} from "react-apollo"
import gql from "graphql-tag"

/* import isEmpty from "lodash/isEmpty" */

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
    display: "flex",
    flexGrow: 1,
    width: "100%"
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
        _id
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
  resources: [],
  teachingLang: "",
  usingLang: "",
  items: "",
  next: "",
  resetCursor: ""
}

class CoursesCreatedContainer extends PureComponent {
  state = cloneDeep(initialState)

  handleImageClick = card => {
    session.course = card

    this.props.history.push({
      pathname: "/course/course-settings",
      state: {courseId: card._id}
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
                <Typography align="center" gutterBottom>
                  Create a Course
                </Typography>
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
                    Edit one of your courses
                  </Typography>
                </div>
              </div>
              {/* End hero unit */}
              {/* TODO: remove network only by writing new courses to the cache */}
              <Query
                query={getCreatedCourses}
                fetchPolicy="network-only"
                errorPolicy="all"
                variables={{
                  cursor: ""
                }}>
                {({loading, data, error}) => {
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
                    return (
                      <Grid>
                        {error.graphQLErrors.map(({message}, i) => (
                          <GraphError key={i} mappedKey={i}>
                            {message}
                          </GraphError>
                        ))}
                      </Grid>
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
                        <Grid container spacing={8}>
                          {data.getCreatedCourses.courses.map(card => (
                            <Grid
                              item
                              key={card._id}
                              xs={12}
                              sm={12}
                              md={4}
                              lg={3}>
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
                      {/*
                      {data.getCreatedCourses &&
                        data.getCreatedCourses.cursor !== "done" && (
                          <Button
                            style={{display: "flex", margin: "0 auto"}}
                            onClick={() =>
                              fetchMore({
                                variables: {
                                  cursor: data.getCreatedCourses.cursor
                                },
                                updateQuery: (
                                  previousResult,
                                  {fetchMoreResult}
                                ) => {
                                  const newCourses =
                                    fetchMoreResult.getCreatedCourses.courses
                                  const {
                                    cursor
                                  } = fetchMoreResult.getCreatedCourses

                                  return newCourses.length
                                    ? {
                                        // Put the new getCreatedCourses at the end of the list and update `cursor`
                                        // so we have the new `endCursor` and `hasNextPage` values
                                        getCreatedCourses: {
                                          __typename:
                                            previousResult.getCreatedCourses
                                              .__typename,
                                          courses: [
                                            ...previousResult.getCreatedCourses
                                              .courses,
                                            ...newCourses
                                          ],
                                          cursor
                                        }
                                      }
                                    : previousResult
                                }
                              })
                            }>
                            Load More
                          </Button>
                        )} */}
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

export default withRouter(withStyles(styles)(CoursesCreatedContainer))
