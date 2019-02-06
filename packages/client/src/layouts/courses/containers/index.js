import React, {Component} from "react"
/* import {connect} from "react-redux" */
import {Link} from "react-router-dom"
import ReactSelect from "react-select"
import {cloneDeep} from "lodash"
import {Helmet} from "react-helmet"
import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Select from "@material-ui/core/Select"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import update from "immutability-helper"
import Courses from "../components/courses-grid.js"
import {Spacer} from "../../../components"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
import "../../styles.css"

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  searchField: {
    marginTop: "7px"
  }
})

const initialState = {
  search: "",
  owner: "",
  courseInput: "",
  courseName: "",
  selectionBox: "title",
  courseRef: "",
  labelWidth: 0,
  teachingLang: "",
  usingLang: "",
  items: "",
  next: "",
  resetCursor: ""
}

class CoursesContainer extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialState)
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

  handleImageClick = e => {
    e.preventDefault()
    // TODO
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
    this.setState(newState, console.log("new: ", this.state))
  }

  handleInputChg = (e, data) => {
    e.preventDefault()
    const newState = update(this.state, {
      courseInput: {$set: data.value}
    })

    this.setState(newState, console.log("old: ", this.state))
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
    /* if (this.props.next !== "done") { */
    /*   var scrollMsg = ( */
    /*     <Grid centered style={{margin: "0 0 40px 0"}}> */
    /*       <Segment compact loading={this.props.loading}> */
    /*         Scroll down for more */
    /*       </Segment> */
    /*     </Grid> */
    /*   ) */
    /* } else { */
    /*   scrollMsg = <div /> */
    /* } */
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
              <Typography
                variant="h6"
                align="center"
                className={classes.text}
                gutterBottom>
                I speak:
              </Typography>
              <ReactSelect
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
              <Link onClick={this.refreshPage} to="/courses/created">
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
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref
                    }}
                    htmlFor="outlined-filter-simple">
                    Filter
                  </InputLabel>
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
            <Courses
              title={this.state.courseName}
              author={this.state.owner}
              courseRef={this.state.courseRef}
              usingLang={this.state.usingLang}
              teachingLang={this.state.teachingLang}
            />
          </main>
        </form>
      </React.Fragment>
    )
  }
}

/* const mapDispatchToProps = dispatch => { */
/*   return { */
/*     loadData: payload => dispatch(loadData(payload)) */
/*   } */
/* } */

/* export default connect( */
/*   null, */
/*   mapDispatchToProps */
/* )(CoursesContainer) */

export default withStyles(styles)(CoursesContainer)
