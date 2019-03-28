import React, {useState} from "react"
import {withRouter} from "react-router-dom"

import classNames from "classnames"

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

import {LoadingButton} from "../../../components"
import {compose} from "react-apollo"
import {session} from "brownies"
import {GET_COURSES} from "../course-queries.js"
import {useQuery} from "react-apollo-hooks"

import {subsToSize} from "../../../utils/helpers.js"

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
  },
  showMore: {
    position: "absolute",
    bottom: -50,
    left: "50%",
    webkitTransform: "translateX(-50%)",
    transform: "translateX(-50%)"
  }
})

const CoursesGrid = props => {
  const [showMoreBtn, setShowMoreBtn] = useState(true)

  const handleImageClick = card => () => {
    session.course = card
    props.history.push({
      pathname: "/course/course-introduction",
      state: {courseId: card.id}
    })
  }

  const {data, error, loading, fetchMore} = useQuery(GET_COURSES, {
    variables: {
      cursor: "",
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
  return (
    <div>
      <div className={classNames(props.classes.layout, props.classes.cardGrid)}>
        {/* End hero unit */}
        <Grid container spacing={8} style={{position: "relative"}}>
          {data.getCourses.courses.map((card, i) => (
            <Grid item key={card._id} xs={12} sm={6} md={3} lg={3}>
              <Card className={props.classes.card}>
                <CardMedia
                  onClick={handleImageClick(card)}
                  className={props.classes.cardMedia}
                  image={`${card.courseImage}`}
                  title={`${card.title}`}
                />
                <CardContent className={props.classes.cardContent}>
                  <Typography
                    className={props.classes.cardTitle}
                    gutterBottom
                    variant="h6"
                    component="h6">
                    {card.title}
                  </Typography>
                  <Typography
                    className={props.classes.cardUsername}
                    gutterBottom
                    variant="caption">
                    by: {card.owner.username}
                  </Typography>
                  <Typography
                    className={props.classes.cardUsername}
                    gutterBottom
                    variant="caption">
                    resource: {card.resource}
                  </Typography>
                </CardContent>
                <CardActions className={props.classes.actions}>
                  <PersonIcon />
                  <Typography
                    className={props.classes.cardUsername}
                    gutterBottom>
                    {subsToSize(card.subscribers)}
                  </Typography>
                  <Button
                    onClick={handleImageClick(card)}
                    size="large"
                    className={props.classes.editButton}>
                    {" "}
                    VIEW
                  </Button>
                </CardActions>
              </Card>
              {i === data.getCourses.courses.length - 1 &&
                showMoreBtn && (
                  <LoadingButton
                    className={props.classes.showMore}
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      fetchMore({
                        variables: {
                          cursor:
                            data.getCourses.courses[
                              data.getCourses.courses.length - 1
                            ]._id
                        },
                        updateQuery: (prev, {fetchMoreResult}) => {
                          // length needs to be 1 less than the limit
                          if (fetchMoreResult.getCourses.courses.length <= 7) {
                            setShowMoreBtn(false)
                          }
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
                    }>
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
