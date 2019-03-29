import React from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
import {Helmet} from "react-helmet"
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
  levels,
  LoadingButton,
  subscriptions,
  using,
  teaching
} from "../../../components"
import ZonesGrid from "./zones-grid.js"
import {groupedOptions} from "../../../data/language-data.js"

const subscribedOptions = session.user.subscriptions.map(item => {
  return {
    value: item._id,
    label: item._id
  }
})

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
    backgroundColor: "red",
    minHeight: "240px",
    maxHeight: "240px",
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

const ZonesContainer = props => {
  delete session.zone

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
          <Typography variant="h6" align="center" gutterBottom>
            Course Level:
          </Typography>
          <Field name="levels" component={levels} options={groupedOptions} />
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
        {/* Hero unit */}
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
        {/* End hero unit */}
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
