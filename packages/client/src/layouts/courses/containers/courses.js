/* eslint react/no-did-update-set-state: 0 */
import React from "react"
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
import {groupedOptions} from "../../../data/language-data.js"

import {compose} from "react-apollo"
import {styles} from "../styles.js"

const CoursesContainer = props => {
  delete session.course

  /* const getSubscribedCourses = () => { */
  /*   setSelectionBox("utterzone") */
  /* } */

  const {classes, handleSubmit, handleChange, values} = props
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
        <Field name="usingLang" component={using} options={groupedOptions} />
        <Spacer margin="40px 0 0 0" />
        <Typography variant="h6" align="center" gutterBottom>
          I want to learn:
        </Typography>
        <Field
          name="teachingLang"
          component={teaching}
          options={groupedOptions}
        />
        <Spacer margin="40px 0 0 0" />
        <Divider />
        <Spacer margin="40px 0 0 0" />
        {/* <Link component={RouterLink} to="#" onClick={getSubscribedCourses}>
          <Typography align="center" gutterBottom>
            My Subscriptions
          </Typography>
        </Link>
				*/}
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
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    value={values.selectionBox}
                    name="selectionBox"
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        labelWidth={0}
                        id="outlined-filter-simple"
                      />
                    }>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="resource">Resource</MenuItem>
                    <MenuItem value="owner">Author</MenuItem>
                  </Select>
                </FormControl>
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  loading={props.status && props.status.loading}
                  disabled={props.status && props.status.loading}>
                  Search
                </LoadingButton>
              </Grid>
            </Grid>
          </div>
        </div>
        {/* End hero unit */}
        <Grid>
          {<CoursesGrid search={props.status && props.status.search} />}
        </Grid>
      </main>
    </form>
  )
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
      selectionBox: "",
      teachingLang: "",
      usingLang: ""
    }),

    handleSubmit: async (values, {setStatus}) => {
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
