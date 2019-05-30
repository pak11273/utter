import React, {useEffect} from "react"
import {withRouter} from "react-router-dom"

import classNames from "classnames"
import {styles} from "../styles.js"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
/* import CircularProgress from "@material-ui/core/CircularProgress" */
import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import PersonIcon from "@material-ui/icons/Person"
import Typography from "@material-ui/core/Typography"

import {LoadingButton} from "../../../components"
import {compose} from "react-apollo"
import {session} from "brownies"
import {GET_COURSES} from "../../../graphql/queries/course-queries.js"
import {useQuery} from "react-apollo-hooks"
import {sessionDelete} from "../../../utils/session-delete.js"

import {subsToSize} from "../../../utils/helpers.js"

const CoursesGrid = props => {
  useEffect(() => {
    // reset sessions, must keep "users" & "levels"
    sessionDelete(["user", "levels"])
  }, [])

  const convertObjIdsToArr = arr => {
    return arr.map(item => {
      return item._id
    })
  }

  const handleCourseClick = card => () => {
    session.level = ""
    session.course = card
    session.levels = card.levels
    session.levelsIdsArr = convertObjIdsToArr(card.levels)
    props.history.push({
      pathname: "/course/course-introduction",
      state: {courseId: card._id}
    })
  }

  const {data, error, loading, fetchMore} = useQuery(GET_COURSES, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: {
      page: 1,
      searchInput:
        props.search && props.search.searchInput
          ? props.search.searchInput
          : "",
      selectionBox:
        props.search && props.search.selectionBox
          ? props.search.selectionBox
          : "",
      usingLang:
        props.search && props.search.usingLang ? props.search.usingLang : "",
      teachingLang:
        props.search && props.search.teachingLang
          ? props.search.teachingLang
          : ""
    }
  })

  if (error) {
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

  const {classes} = props
  return (
    <div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40} style={{position: "relative"}}>
          {data.getCourses &&
            data.getCourses.courses.map((card, i) => (
              <Grid item key={card._id} xs={12} sm={6} md={3} lg={3}>
                <Card className={classes.card}>
                  <CardMedia
                    onClick={handleCourseClick(card)}
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
                    <Typography
                      className={classes.cardUsername}
                      gutterBottom
                      variant="caption">
                      by: {card.owner && card.owner.username}
                    </Typography>
                    <Typography
                      className={classes.cardUsername}
                      gutterBottom
                      variant="caption">
                      resource: {card.resource}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.gridActions}>
                    <PersonIcon />
                    <Typography className={classes.cardUsername} gutterBottom>
                      {subsToSize(card.subscriberCount)}
                    </Typography>
                    <Button
                      onClick={handleCourseClick(card)}
                      size="large"
                      className={classes.editButton}>
                      {" "}
                      VIEW
                    </Button>
                  </CardActions>
                </Card>
                {i === data.getCourses.courses.length - 1 &&
                  data.getCourses.more && (
                    <LoadingButton
                      loading={loading}
                      disabled={loading}
                      className={classes.showMore}
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        fetchMore({
                          variables: {
                            page: data.getCourses.page + 1
                          },
                          updateQuery: (prev, {fetchMoreResult}) => {
                            if (!fetchMoreResult) return prev
                            return {
                              getCourses: {
                                ...fetchMoreResult.getCourses,
                                courses: [
                                  ...prev.getCourses.courses,
                                  ...fetchMoreResult.getCourses.courses
                                ]
                              }
                            }
                          }
                        })
                      }}>
                      Show More
                    </LoadingButton>
                  )}
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  )
}

export default compose(
  withRouter,
  withStyles(styles)
)(CoursesGrid)
