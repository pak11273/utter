import React, {PureComponent} from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
import {Helmet} from "react-helmet-async"
import {Field, withFormik} from "formik"
import {session} from "brownies"
import ZoneLeftDrawer from "./zone-left-drawer.js"
import socketio from "../../../services/socketio/socketio-mgr.js"

import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Select from "@material-ui/core/Select"
import Link from "@material-ui/core/Link"
import TextField from "@material-ui/core/TextField"
import {withStyles} from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import {
  Flex,
  Spacer,
  app,
  LoadingButton,
  Teaching,
  Using
} from "../../../components"
import {styles} from "../styles.js"
import ZonesGrid from "./zones-grid.js"
import {groupedOptions} from "../../../data/language-data.js"
import appData from "../../../data/appData.js"

class ZonesContainer extends PureComponent {
  state = {
    contacts: [],
    friends: [],
    leftOpen: false,
    open: false
  }

  handleDrawerLeftOpen = () => {
    this.setState({
      leftOpen: true
    })
  }

  handleDrawerLeftClose = () => {
    this.setState({
      leftOpen: false
    })
  }

  componentDidMount = () => {
    // Creates a userzone and receives online stat of all contacts
    const userData = {
      username: session.user.username,
      _id: session.user._id,
      stat: "online"
    }

    socketio.userzoneConnect(userData, contacts => {
      let temp = this.state.contacts
      temp = [...temp, ...contacts]
      this.setState({
        contacts: temp,
        open: true
      })
    })

    socketio.userzoneDisconnect(userData, contacts => {
      let temp = this.state.contacts
      temp = [...temp, ...contacts]
      this.setState({
        contacts: temp,
        open: true
      })
    })
  }

  render() {
    const {
      classes,
      handleChange,
      handleSubmit,
      setFieldValue,
      values
    } = this.props
    return (
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <ZoneLeftDrawer contacts={this.state.contacts} />
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
          <Flex className={classes.heroUnit}>
            <Grid container justify="center" direction="column">
              <Typography variant="h4" align="center" gutterBottom>
                Enter a Zone
              </Typography>
              <ExpansionPanel style={{margin: "0 30px"}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>Filters</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Flex
                    align="center"
                    flexdirection="column"
                    flexdirection640="row">
                    <Field
                      name="usingLang"
                      onChange={setFieldValue}
                      component={Using}
                      options={groupedOptions}
                      placeholder="I speak"
                    />
                    <Field
                      name="teachingLang"
                      onChange={setFieldValue}
                      component={Teaching}
                      options={groupedOptions}
                      placeholder="I want to learn"
                    />
                    <Field
                      name="app"
                      component={app}
                      options={appData}
                      placeholder="Apps"
                    />
                    <Flex
                      margin="20px"
                      maxwidth="510px"
                      justifycontent="center"
                      flexdirection640="row">
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
                        loading={this.props.status && this.props.status.loading}
                        disabled={
                          this.props.status && this.props.status.loading
                        }>
                        Search
                      </LoadingButton>
                    </Flex>
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
                  </Flex>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Grid container alignItems="center" justify="center">
                <Link component={RouterLink} to="/zones/create">
                  <Button
                    variant="contained"
                    className={classes.link}
                    color="primary">
                    Host a Zone
                  </Button>
                </Link>
                <Spacer margin="40px 0 0 0" />
                <Link component={RouterLink} to="/zones/rezone">
                  <Button
                    variant="contained"
                    className={classes.link}
                    color="secondary">
                    ReZone
                  </Button>
                </Link>
                <Spacer margin="40px 0 0 0" />
              </Grid>
            </Grid>
          </Flex>
          <Grid>
            <ZonesGrid
              socketio={socketio}
              search={this.props.status && this.props.status.search}
            />
          </Grid>
        </main>
      </form>
    )
  }
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
