/* eslint react/no-did-update-set-state: 0 */
import React, {PureComponent} from "react"
import {connect} from "react-redux"
import {Link as RouterLink} from "react-router-dom"
import ReactSelect from "react-select"
import {Helmet} from "react-helmet"

import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
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

import CoursesGrid from "./courses-grid.js"
import update from "immutability-helper"
import {Spacer} from "../../../components"
import cloneDeep from "lodash/cloneDeep"
import languageData from "../../../data/languageData.js"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader

// actions
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

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
    padding: theme.spacing.unit * 3,
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
    display: "flex",
    flexGrow: 1,
    width: "100%"
  },
  select: {
    width: "80% !important",
    margin: "10px auto !important"
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
  resources: [],
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

class CoursesContainer extends PureComponent {
  state = cloneDeep(initialState)

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  handleSpeakingChange = usingLang => {
    if (usingLang === null) {
      const newState = update(this.state, {
        usingLang: {$set: ""}
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        usingLang: {$set: usingLang.value}
      })

      this.setState(newState)
    }
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
    const newState = update(this.state, {
      courseInput: {$set: data.value}
    })

    this.setState(newState)
  }

  handleSubmit = e => {
    e.preventDefault()
    // change state props based on selectionBox
    const {courseInput, selectionBox} = this.state
    console.log("course input: ", courseInput)
    console.log("selection box", selectionBox)
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
          resources: {
            $set: []
          },
          next: {
            $set: ""
          }
        })

        this.setState(newName)

        break
      }

      case "resources": {
        // set resources
        const newResource = update(this.state, {
          owner: {
            $set: ""
          },
          courseName: {
            $set: ""
          },
          resources: {
            $set: [courseInput]
          },
          next: {
            $set: ""
          }
        })

        this.setState(newResource)

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
          resources: {
            $set: []
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
          <Typography variant="h6" align="center" gutterBottom>
            I speak:
          </Typography>
          <ReactSelect
            className={classes.select}
            name="form-field-name"
            value={this.state.usingLang}
            onChange={this.handleSpeakingChange}
            options={languageData}
          />
          <Spacer margin="40px 0 0 0" />
          <Typography variant="h6" align="center" gutterBottom>
            I want to learn:
          </Typography>
          <ReactSelect
            className={classes.select}
            name="form-field-name"
            value={this.state.teachingLang}
            onChange={this.handleTeachingChange}
            options={languageData}
          />
          <Spacer margin="40px 0 0 0" />
          <Divider />
          <Spacer margin="40px 0 0 0" />
          <Link component={RouterLink} to="/courses/created">
            <Typography align="center" gutterBottom>
              My Created Courses
            </Typography>
          </Link>
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
              content="Find a course.  Then find a zone.  Then start uttering!"
            />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Courses</title>
            <link rel="canonical" href="https://utterzone/courses" />
          </Helmet>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Grid container justify="center" direction="column">
                <Typography variant="h4" align="center" gutterBottom>
                  Find a Course
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
                      <MenuItem value="resources">Resource</MenuItem>
                      <MenuItem value="author">Author</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    component="button"
                    type="submit"
                    onClick={this.handleSubmit}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          {/* End hero unit */}
          <Grid>
            {
              <CoursesGrid
                courseName={this.state.courseName}
                resources={this.state.resources}
                owner={this.state.owner}
                teachingLang={this.state.teachingLang}
                usingLang={this.state.usingLang}
              />
            }
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
