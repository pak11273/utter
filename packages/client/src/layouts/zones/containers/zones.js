/* import React, {useState} from "react" */
import React from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
import {Helmet} from "react-helmet"
import {Field, withFormik} from "formik"
import {session} from "brownies"
/* import {session, subscribe} from "brownies" */

import Drawer from "@material-ui/core/Drawer"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Select from "@material-ui/core/Select"
import Link from "@material-ui/core/Link"
import TextField from "@material-ui/core/TextField"
import {withStyles} from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import {
  Spacer,
  app,
  /* levels, */
  LoadingButton,
  subscriptions,
  teaching,
  using
} from "../../../components"
import {styles} from "../styles.js"
import ZonesGrid from "./zones-grid.js"
import {groupedOptions} from "../../../data/language-data.js"

const ZonesContainer = props => {
  /* const [courseOption, setCourseOption] = useState(session.user.subscription) */
  delete session.zone

  /* subscribe(session, "user", value => { */
  /*   setCourseOption(value.subscriptions) */
  /*   console.log("courseOption: ", courseOption) */
  /* }) */

  const subscribedOptions =
    session.user && session.user.subscriptions
      ? session.user.subscriptions.map(item => {
          return {
            value: item._id,
            label: item.title
          }
        })
      : [{}]

  const {classes, handleChange, handleSubmit, values} = props
  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}>
        <Spacer margin="100px 0 0 0" />
        <div align="center">
          <Typography variant="h6" align="center" gutterBottom>
            I speak:
          </Typography>
          <Field name="usingLang" component={using} options={groupedOptions} />
          <Typography variant="h6" align="center" gutterBottom>
            I want to learn:
          </Typography>
          <Field
            name="teachingLang"
            component={teaching}
            options={groupedOptions}
          />
          <Typography variant="h6" align="center" gutterBottom>
            Choose An App
          </Typography>
          <Field name="app" component={app} options={groupedOptions} />
          <Spacer margin="40px 0 0 0" />
          <Typography variant="h6" align="center" gutterBottom>
            Subscribed Courses:
          </Typography>
          <Field
            name="subscriptions"
            component={subscriptions}
            options={subscribedOptions}
          />
          <Spacer margin="40px 0 0 0" />
          {/*    <Typography variant="h6" align="center" gutterBottom>
            Course Level:
          </Typography>
          <Field name="levels" component={levels} options={groupedOptions} />
					*/}
          <Spacer margin="40px 0 0 0" />
          <Divider />
          <Spacer margin="40px 0 0 0" />
          <Link component={RouterLink} to="/zones/create">
            <Typography align="center" gutterBottom>
              Host A Zone
            </Typography>
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
          <meta name="description" content="Find a zone.  Start uttering!" />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Zones</title>
          <link rel="canonical" href="https://utterzone/zones" />
        </Helmet>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Grid container justify="center" direction="column">
              <Typography variant="h4" align="center" gutterBottom>
                Enter a Zone
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
                        name="info"
                        id="outlined-filter-simple"
                      />
                    }>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="host">Host</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="app">App</MenuItem>
                    <MenuItem value="course">Course</MenuItem>
                    <MenuItem value="level">Level</MenuItem>
                    <MenuItem value="reference">Reference</MenuItem>
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
        <Grid>
          <ZonesGrid search={props.status && props.status.search} />
        </Grid>
      </main>
    </form>
  )
}

export default withRouter(
  withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      searchInput: "",
      selectionBox: "",
      teachingLang: "",
      usingLang: ""
    }),
    handleSubmit: async (values, {setStatus}) => {
      console.log("values; ", values)
      setStatus({loading: true})
      const search = {
        searchInput: values.searchInput,
        selectionBox: values.selectionBox,
        teachingLang: values.teachingLang,
        usingLang: values.usingLang
      }
      setStatus({search})
    }
  })(withStyles(styles)(ZonesContainer))
)
