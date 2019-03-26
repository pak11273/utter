/* eslint react/no-did-update-set-state: 0 */
import React, {PureComponent} from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
import {Helmet} from "react-helmet"
import {Field, withFormik} from "formik"

import {withStyles} from "@material-ui/core/styles"
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

import {session} from "brownies"
import CoursesGrid from "./courses-grid.js"
import {Spacer, LoadingButton, using, teaching} from "../../../components"
import cloneDeep from "lodash/cloneDeep"
import {groupedOptions} from "../../../data/language-data.js"

import {compose} from "react-apollo"

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
  /* select: { */
  /*   width: "80% !important", */
  /*   margin: "10px auto !important" */
  /* }, */
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  searchField: {
    marginTop: "7px"
  }
})

const initialState = {
  searchInput: "",
  title: "",
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
    delete session.course
  }

  addTeachingLang = value => {
    this.setState({
      teachingLang: value
    })
  }

  addUsingLang = value => {
    this.setState({
      usingLang: value
    })
  }

  render() {
    const {classes, handleSubmit, handleChange, values} = this.props
    return (
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
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
          <Field
            name="usingLang"
            component={using}
            addUsingLang={this.addUsingLang}
            options={groupedOptions}
          />
          <Spacer margin="40px 0 0 0" />
          <Typography variant="h6" align="center" gutterBottom>
            I want to learn:
          </Typography>
          <Field
            name="teachingLang"
            component={teaching}
            addTeachingLang={this.addTeachingLang}
            options={groupedOptions}
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
                    name="searchInput"
                    id="outlined-search"
                    label="Search"
                    onChange={handleChange}
                    type="search"
                    className={classes.searchField}
                    value={values.searchInput}
                    margin="normal"
                    variant="outlined"
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}>
                    <Select
                      value={values.selectionBox}
                      name="selectionBox"
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
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
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    loading={this.props.status && this.props.status.loading}
                    disabled={this.props.status && this.props.status.loading}>
                    Search
                  </LoadingButton>
                </Grid>
              </Grid>
            </div>
          </div>
          {/* End hero unit */}
          <Grid>
            {
              <CoursesGrid
                search={this.props.status && this.props.status.search}
              />
            }
          </Grid>
        </main>
      </form>
    )
  }
}

export default compose(withRouter)(
  withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      searchInput: "",
      title: "",
      resource: "",
      info: "",
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
    }),

    handleSubmit: async (values, {setStatus}) => {
      console.log("values: ", values)

      // pass this object to grid
      const search = {
        title: values.title,
        resource: values.resource,
        info: values.info,
        owner: values.owner,
        searchInput: values.searchInput,
        selectionBox: values.selectionBox,
        teachingLang: values.teachingLang,
        usingLang: values.usingLang
      }
      setStatus({search})
    }
  })(withStyles(styles)(CoursesContainer))
)
