import React, {Component} from "react"
import {connect} from "react-redux"
import {Link as RouterLink} from "react-router-dom"
import ReactSelect from "react-select"
import {Helmet} from "react-helmet"
import Waypoint from "react-waypoint"
import classNames from "classnames"

import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import MenuItem from "@material-ui/core/MenuItem"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Select from "@material-ui/core/Select"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

import {history} from "@utterzone/connector"
import {store} from "../../../store.js"
import update from "immutability-helper"
import {Spacer} from "../../../components"
import isEmpty from "lodash/isEmpty"
import cloneDeep from "lodash/cloneDeep"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader

// actions
import {loadData} from "../../../api/actions.js"
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

import {Query} from "react-apollo"
import gql from "graphql-tag"

const getCourses = gql`
  query getCourses(
    $cursor: String
    $title: String!
    $ref: String!
    $author: String!
    $usingLang: String!
    $teachingLang: String!
  ) {
    getCourses(
      cursor: $cursor
      title: $title
      ref: $ref
      author: $author
      usingLang: $usingLang
      teachingLang: $teachingLang
    ) {
      cursor
      courses {
        id
        courseImage
        courseName
        courseDescription
        owner {
          username
        }
      }
    }
  }
`

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
    height: "54px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  cardUsername: {
    whiteSpace: "nowrap",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
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
  courseName: "",
  courseRef: "",
  items: "",
  labelWidth: 0,
  mobileOpen: false,
  next: "",
  owner: "",
  resetCursor: "",
  search: "",
  selectionBox: "title",
  teachingLang: "",
  usingLang: ""
}

class CoursesContainer extends Component {
  state = cloneDeep(initialState)

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  /* componentWillReceiveProps() { */
  /*   const newState = update(this.state, { */
  /*     cursor: {$set: ""} */
  /*   }) */
  /*   this.setState(newState) */
  /* } */

  handleSpeakingChange = usingLang => {
    if (usingLang === null) {
      const newState = update(this.state, {
        usingLang: {$set: ""}
      })

      this.setState(newState)
    } else {
      console.log("using: ", usingLang.value)
      const newState = update(this.state, {
        usingLang: {$set: usingLang.value}
      })

      this.setState(newState, console.log("new state: ", this.state))
    }
    this.handleSubmit()
  }

  handleTeachingChange = teachingLang => {
    if (teachingLang === null) {
      const newState = update(this.state, {
        teachingLang: {$set: ""}
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        teachingLang: {$set: teachingLang.value}
      })
      this.setState(newState)
    }
  }

  handleSearch = e => {
    this.setState({
      search: e.target.value
    })
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

  handleFilterChg = (e, data) => {
    const newState = update(this.state, {
      selectionBox: {$set: data.value}
    })
    this.setState(newState)
  }

  handleChg = name => e => {
    const newState = update(this.state, {
      [name]: {$set: e.target.value}
    })
    this.setState(newState)
  }

  handleInputChg = (e, data) => {
    e.preventDefault()
    const newState = update(this.state, {
      courseInput: {$set: data.value}
    })

    this.setState(newState)
  }

  handleSubmit = () => {
    // change state props based on selectionBox
    const {courseInput, selectionBox} = this.state
    switch (selectionBox) {
      case "title": {
        // set courseName
        const newName = update(this.state, {
          owner: {
            $set: ""
          },
          courseName: {
            $set: courseInput
          },
          courseRef: {
            $set: ""
          },
          next: {
            $set: ""
          }
        })

        this.setState(newName)

        break
      }

      case "reference": {
        // set courseRef
        const newRef = update(this.state, {
          owner: {
            $set: ""
          },
          courseName: {
            $set: ""
          },
          courseRef: {
            $set: courseInput
          },
          next: {
            $set: ""
          }
        })

        this.setState(newRef)

        break
      }

      case "author": {
        // set owner
        const newAuthor = update(this.state, {
          owner: {
            $set: courseInput
          },
          courseName: {
            $set: ""
          },
          courseRef: {
            $set: ""
          },
          next: {
            $set: ""
          }
        })

        this.setState(newAuthor)

        break
      }
      default:
        break
    }
  }

  refreshPage = () => {
    this.forceUpdate()
  }

  render() {
    const {classes} = this.props
    return (
      <form className={classes.root} autoComplete="off">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}>
          <Spacer margin="100px 0 0 0" />
          <div align="center">
            <Typography
              variant="h6"
              align="center"
              className={classes.text}
              gutterBottom>
              I speak:
            </Typography>
            <ReactSelect
              style={{width: "200px"}}
              name="form-field-name"
              value={this.state.usingLang}
              onChange={this.handleSpeakingChange}
              options={[
                {value: "english", label: "English"},
                {value: "spanish", label: "Spanish"},
                {value: "french", label: "French"}
              ]}
            />
            <Spacer margin="40px 0 0 0" />
            <Typography
              variant="h6"
              align="center"
              className={classes.text}
              gutterBottom>
              I want to learn:
            </Typography>
            <ReactSelect
              style={{width: "200px"}}
              name="form-field-name"
              value={this.state.teachingLang}
              onChange={this.handleTeachingChange}
              options={[
                {value: "korean", label: "Korean"},
                {value: "english", label: "English"},
                {value: "spanish", label: "Spanish"},
                {value: "french", label: "French"}
              ]}
            />
            <Spacer margin="40px 0 0 0" />
            <Divider />
            <Spacer margin="40px 0 0 0" />
            <Link
              component={RouterLink}
              onClick={this.refreshPage}
              to="/courses/created">
              My Created Courses
            </Link>
          </div>
        </Drawer>
        <main className={classes.content}>
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
              <Grid container justify="center" direction="column">
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.text}
                  gutterBottom>
                  Subscribe to a Course
                </Typography>
                <Grid container alignItems="center" justify="center">
                  <TextField
                    id="outlined-search"
                    label="Search"
                    onChange={this.handleChg("courseInput")}
                    type="search"
                    className={classes.searchField}
                    margin="normal"
                    variant="outlined"
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}>
                    <Select
                      value={this.state.selectionBox}
                      onChange={this.handleChg("selectionBox")}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="info"
                          id="outlined-filter-simple"
                        />
                      }>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="title">Title</MenuItem>
                      <MenuItem value="reference">Reference</MenuItem>
                      <MenuItem value="author">Author</MenuItem>
                    </Select>
                  </FormControl>
                  <Button onClick={this.handleSubmit}>Search</Button>
                </Grid>
              </Grid>
            </div>
          </div>
          {/* End hero unit */}
          <Grid>
            <Query
              query={getCourses}
              variables={{
                cursor: "",
                title: "",
                ref: "",
                author: "",
                usingLang: "",
                teachingLang: ""
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
                      key={data.getCourses.cursor}
                      onEnter={() => {
                        // set cursor state to first response
                        const newState = update(this.state, {
                          cursor: {$set: data.getCourses.cursor}
                        })

                        this.setState(newState)

                        fetchMore({
                          // note this is a different query than the one used in the
                          variables: {
                            cursor: this.state.cursor
                          },
                          updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) {
                              // do something here
                            }
                            const previousEntry =
                              previousResult.getCourses.courses
                            const newCourses =
                              fetchMoreResult.getCourses.courses

                            // display waypoint if a cursor exists
                            const newState = update(this.state, {
                              cursor: {
                                $set: fetchMoreResult.getCourses.cursor
                              }
                            })

                            this.setState(newState)

                            if (isEmpty(newCourses)) {
                              // hide waypoint
                              const newState = update(this.state, {
                                cursor: {
                                  $set: fetchMoreResult.getCourses.cursor
                                }
                              })

                              this.setState(newState)

                              return previousResult
                            }
                            var newCursor = newCourses[newCourses.length - 1].id

                            if (!fetchMoreResult) return previousEntry

                            return {
                              // By returning `cursor` here, we update the `fetchMore` function
                              // to the new cursor.
                              getCourses: {
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
                      className={classNames(classes.layout, classes.cardGrid)}>
                      {/* End hero unit */}
                      <Grid container spacing={8}>
                        {data.getCourses.courses.map(card => (
                          <Grid item key={card.id} xs={12} sm={6} md={3} lg={2}>
                            <Card className={classes.card}>
                              <CardMedia
                                onClick={() => this.handleImageClick(card)}
                                className={classes.cardMedia}
                                image={`${card.courseImage}`}
                                title={`${card.courseName}`}
                              />
                              <CardContent className={classes.cardContent}>
                                <Typography
                                  className={classes.cardTitle}
                                  gutterBottom
                                  variant="h6"
                                  component="h6">
                                  {card.courseName}
                                </Typography>
                                <Typography
                                  className={classes.cardUsername}
                                  gutterBottom
                                  variant="caption">
                                  {card.owner.username}
                                </Typography>
                              </CardContent>
                              <CardActions className={classes.actions}>
                                <Button
                                  onClick={() => this.handleImageClick(card)}
                                  size="large"
                                  className={classes.editButton}>
                                  VIEW
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
    )
  }
}

const actions = {
  toggleFooter
}

export default connect(
  null,
  actions
)(withStyles(styles)(CoursesContainer))
