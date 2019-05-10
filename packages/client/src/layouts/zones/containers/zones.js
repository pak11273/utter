/* import React, {useEffect} from "react" */
import React from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
import {Helmet} from "react-helmet-async"
import {Field, withFormik} from "formik"
import {session} from "brownies"

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
  /* subscriptions, */
  Teaching,
  Using
} from "../../../components"
import {styles} from "../styles.js"
import ZonesGrid from "./zones-grid.js"
import {groupedOptions} from "../../../data/language-data.js"
import appData from "../../../data/appData.js"

const ZonesContainer = props => {
  /* useEffect(() => { */
  /*   const keys = Object.keys(session) */
  /*   console.log("keys: ", keys) */
  /*   const arr = ["layoutError", "level", "levels", "levelsIdsArr", "vocabulary"] */
  /*   console.log("arr: ", arr) */
  /*   for (var i = 0; i < keys.length; i += 1) { */
  /*     if (arr.includes(keys[i])) { */
  /*       console.log("key: ", keys[i]) */
  /*       console.log("arr: ", `${arr[i]}`) */
  /*       console.log("Deleting key", session[keys[i]]) */
  /*       delete session[keys[i]] */
  /*     } */
  /*   } */
  /* }, []) */

  /* const [courseOption, setCourseOption] = useState(session.user.subscription) */
  delete session.zone

  /* subscribe(session, "user", value => { */
  /*   setCourseOption(value.subscriptions) */
  /*   console.log("courseOption: ", courseOption) */
  /* }) */

  /* const subscribedOptions =
    session.user && session.user.subscriptions
      ? session.user.subscriptions.map(item => {
          return {
            value: item.title,
            label: item.title
          }
        })
      : [{}]
*/
  const {classes, handleChange, handleSubmit, setFieldValue, values} = props
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
          <Field
            name="usingLang"
            onChange={setFieldValue}
            component={Using}
            options={groupedOptions}
          />
          <Typography variant="h6" align="center" gutterBottom>
            I want to learn:
          </Typography>
          <Field
            name="teachingLang"
            onChange={setFieldValue}
            component={Teaching}
            options={groupedOptions}
          />
          <Typography variant="h6" align="center" gutterBottom>
            Choose An App
          </Typography>
          <Field name="app" component={app} options={appData} />
          <Spacer margin="40px 0 0 0" />
          {/* <Typography variant="h6" align="center" gutterBottom>
            Subscribed Courses:
          </Typography>
          <Field
            name="subscriptions"
            component={subscriptions}
            options={subscribedOptions}
          /> */}
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
          <Spacer margin="40px 0 0 0" />
          <Link component={RouterLink} to="/zones/rezone">
            <Typography align="center" gutterBottom>
              Rezone
            </Typography>
          </Link>
          <Spacer margin="40px 0 0 0" />
          {/* TODO private zone feature
          <Link component={RouterLink} to="/zones/private">
            <Typography align="center" gutterBottom>
              Enter A Private Zone
            </Typography>
          </Link>
					*/}
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
                    <MenuItem value="zoneName">Zone Name</MenuItem>
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
      app: "",
      subscriptions: "",
      searchInput: "",
      selectionBox: "",
      teachingLang: "",
      usingLang: "",
      zoneName: "zoneName"
    }),
    handleSubmit: async (values, {setStatus}) => {
      setStatus({loading: true})
      const search = {
        app: values.app,
        subscriptions: values.subscriptions,
        searchInput: values.searchInput,
        selectionBox: values.selectionBox,
        teachingLang: values.teachingLang,
        usingLang: values.usingLang,
        zoneName: values.zonename
      }
      setStatus({search})
    }
  })(withStyles(styles)(ZonesContainer))
)
