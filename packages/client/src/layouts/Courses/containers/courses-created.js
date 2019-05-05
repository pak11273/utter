import React, {PureComponent} from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
import {Helmet} from "react-helmet-async"
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
/* import update from "immutability-helper" */

import {Query} from "react-apollo"

/* import isEmpty from "lodash/isEmpty" */
import {styles} from "../styles.js"
import {GET_CREATED_COURSES} from "../../../graphql/queries/course-queries.js"

const convertObjIdsToArr = arr => {
  return arr.map(item => {
    return item._id
  })
}

class CoursesCreatedContainer extends PureComponent {
  state = {
    search: "",
    owner: "",
    courseInput: "",
    title: "",
    selectionBox: "title",
    resources: [],
    teachingLang: "",
    usingLang: "",
    items: "",
    next: "",
    resetCursor: ""
  }

  handleImageClick = card => () => {
    session.level = ""
    session.course = card
    session.levels = card.levels
    session.levelsIdsArr = convertObjIdsToArr(card.levels)
    this.props.history.push({
      pathname: "/course/course-introduction",
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
                query={GET_CREATED_COURSES}
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
                        <Grid container spacing={40}>
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
                                  onClick={this.handleImageClick(card)}
                                  className={classes.cardMedia}
                                  image={`${card.courseImage}`}
                                  title={`${card.title}`}
                                />
                                <CardContent className={classes.cardContent}>
                                  <Typography
                                    className={classes.gridTitle}
                                    gutterBottom
                                    variant="h6"
                                    component="h6">
                                    {card.title}
                                  </Typography>
                                </CardContent>
                                <CardActions className={classes.actions}>
                                  <Button
                                    onClick={this.handleImageClick(card)}
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
