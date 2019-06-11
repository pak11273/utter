import React, {useState} from "react"
import {Link as RouterLink, withRouter} from "react-router-dom"
import {Helmet} from "react-helmet-async"
import {Field, withFormik} from "formik"
import styled from "styled-components"
import classNames from "classnames"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Drawer from "@material-ui/core/Drawer"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
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
import InboxIcon from "@material-ui/icons/MoveToInbox"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import PeopleIcon from "@material-ui/icons/People"
import PersonIcon from "@material-ui/icons/Person"
import Typography from "@material-ui/core/Typography"
import {
  Flex,
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

const CustomBadge = styled.div`
  background-color: ${props => props.background};
  top: 10px;
  left: 25px;
  height: 13px;
  display: flex;
  padding: 0 4px;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  font-size: 0.75rem;
  min-width: 13px;
  transform: scale(1) translate(50%, -50%);
  box-sizing: border-box;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  align-content: center;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  transform-origin: 100% 0%;
`

const ZonesContainer = props => {
  const [state, changeState] = useState({
    contacts: [],
    friends: [],
    leftOpen: false,
    open: false
  })
  console.log("state: ", state)

  const handleDrawerLeftOpen = () => {
    changeState({
      ...state,
      leftOpen: true
    })
  }

  const handleDrawerLeftClose = () => {
    changeState({
      ...state,
      leftOpen: false
    })
  }

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
      {/* <Drawer
        className={classes.zonesDrawer}
        variant="permanent"
        classes={{
          paper: classes.zonesDrawerPaper
        }}>
        <Spacer margin="100px 0 0 0" />
      </Drawer> */}
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerLeOpen]: state.leftOpen,
          [classes.drawerLeftClose]: !state.leftOpen
        })}
        classes={{
          paper: classNames({
            [classes.drawerLeOpen]: state.leftOpen,
            [classes.drawerLeftClose]: !state.leftOpen
          })
        }}
        open={state.open}>
        <div>
          <Spacer margin="64px 0 0 0" />
          {!state.leftOpen ? (
            <IconButton
              className={classes.closeArrow}
              onClick={handleDrawerLeftOpen}>
              <ChevronRightIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.closeArrow}
              onClick={handleDrawerLeftClose}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </div>
        <Divider />
        <List>
          {["Contacts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <PeopleIcon /> : <InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <List>
          {state.contacts.map((text, i) => {
            if (text.username) {
              if (state.friends && state.friends.indexOf(text.username) > -1) {
                var badgeColor = "lime"
              } else {
                badgeColor = "#e3e3e3"
              }
            }
            return (
              <ListItem button key={i}>
                <CustomBadge background={badgeColor} />
                <Avatar
                  alt={`Avatar n°${0 + 1}`}
                  classes={{root: classes.avatar}}>
                  <PersonIcon />
                </Avatar>
                <ListItemText primary={text && text.username} />
              </ListItem>
            )
          })}
        </List>
        <Divider />
        {/*   <List>
            {["Host"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
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
                      loading={props.status && props.status.loading}
                      disabled={props.status && props.status.loading}>
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
