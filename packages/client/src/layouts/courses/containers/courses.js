/* eslint react/no-did-update-set-state: 0 */
import React from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
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
import {Spacer, LoadingButton, Using, Teaching} from "../../../components"
import {groupedOptions} from "../../../data/language-data.js"

import {compose} from "react-apollo"
import {styles} from "../styles.js"

const CoursesContainer = props => {
  delete session.course

  const {classes, handleSubmit, handleChange, setFieldValue, values} = props
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
          onChange={setFieldValue}
          component={Using}
          options={groupedOptions}
        />
        <Spacer margin="40px 0 0 0" />
        <Typography variant="h6" align="center" gutterBottom>
          I want to learn:
        </Typography>
        <Field
          name="teachingLang"
          onChange={setFieldValue}
          component={Teaching}
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
                    <MenuItem value="title">Title or Resource</MenuItem>
                    {/*  <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="resource">Resource</MenuItem> */}
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
          <CoursesGrid search={props.status && props.status.search} />
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
      resetCursor: "",
      search: "",
      selectionBox: "title",
      teachingLang: "",
      usingLang: ""
    }),

    handleSubmit: async (values, {props, setStatus}) => {
      console.log("props: ", props)
      // pass this object to grid
      const search = {
        title: values.title,
        resource: values.resource,
        info: values.info,
        searchInput: values.searchInput,
        selectionBox: values.selectionBox,
        teachingLang: values.teachingLang,
        usingLang: values.usingLang
      }
      setStatus({search})
    }
  })(withStyles(styles)(CoursesContainer))
)
