/* eslint react/no-did-update-set-state: 0 */
import React, {Component} from "react"
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

import ZonesGrid from "./zones-grid.js"
import update from "immutability-helper"
import {Spacer} from "../../../components"
import cloneDeep from "lodash/cloneDeep"
import {groupedOptions} from "../../../data/language-data.js"

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

const initialState = {
  courseLevel: "",
  resources: "",
  items: "",
  labelWidth: 0,
  mobileOpen: false,
  next: "",
  owner: "",
  resetCursor: "",
  search: "",
  selectionBox: "title",
  teachingLang: "",
  user: "jim",
  usingLang: "",
  zoneInput: "",
  zoneName: "",
  zones: null
}

class ZonesContainer extends Component {
  state = cloneDeep(initialState)

  componentDidMount() {
    // TODO when we put zones to redis then redo this
    /* this.getZones() */
  }

  onEnterZone = card => () => {
    history.push({
      pathname: `/zone/${card.id}`,
      state: {zoneId: card.id}
    })
  }

  /* getZones = () => { */
  /*   this.state.client.getZones((err, zones) => { */
  /*     this.setState({zones}) */
  /*   }) */
  /* } */

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
      zoneInput: {$set: data.value}
    })

    this.setState(newState)
  }

  handleSubmit = e => {
    e.preventDefault()
    // change state props based on selectionBox
    const {zoneInput, selectionBox} = this.state
    switch (selectionBox) {
      case "title": {
        // set zoneName
        const newName = update(this.state, {
          owner: {
            $set: ""
          },
          zoneName: {
            $set: zoneInput
          },
          resources: {
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
        // set resources
        const newRef = update(this.state, {
          owner: {
            $set: ""
          },
          zoneName: {
            $set: ""
          },
          resources: {
            $set: zoneInput
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
            $set: zoneInput
          },
          zoneName: {
            $set: ""
          },
          resources: {
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

  handleSearch = e => {
    this.setState({
      search: e.target.value
    })
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

  handleAppChange = app => {
    if (app === null) {
      const newState = update(this.state, {
        app: {$set: ""}
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        app: {$set: app.value}
      })
      this.setState(newState)
    }
  }

  handleLevelChange = courseLevel => {
    if (courseLevel === null) {
      const newState = update(this.state, {
        courseLevel: {$set: ""}
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        courseLevel: {$set: courseLevel.value}
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

  refreshPage = () => {
    this.forceUpdate()
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
          <div align="center">
            <Typography variant="h6" align="center" gutterBottom>
              I speak:
            </Typography>
            <ReactSelect
              className={classes.select}
              name="form-field-name"
              value={this.state.usingLang}
              onChange={this.handleSpeakingChange}
              options={groupedOptions}
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
              options={groupedOptions}
            />
            <Spacer margin="40px 0 0 0" />
            <Typography variant="h6" align="center" gutterBottom>
              Choose An App
            </Typography>
            <ReactSelect
              className={classes.select}
              name="form-field-name"
              value={this.state.app}
              onChange={this.handleAppChange}
              options={[
                {value: "chat", label: "General Chat"},
                {value: "recall", label: "Total Recall"}
              ]}
            />
            <Spacer margin="40px 0 0 0" />
            <Typography variant="h6" align="center" gutterBottom>
              Course Level:
            </Typography>
            <ReactSelect
              className={classes.select}
              name="form-field-name"
              value={this.state.courseLevel}
              onChange={this.handleLevelChange}
              options={[
                {value: "1", label: "1"},
                {value: "2", label: "2"},
                {value: "3", label: "3"}
              ]}
            />
            <Spacer margin="40px 0 0 0" />
            <Divider />
            <Spacer margin="40px 0 0 0" />
            <Link
              component={RouterLink}
              onClick={this.refreshPage}
              to="/zones/create">
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
                    id="outlined-search"
                    label="Search"
                    onChange={this.handleChg("zoneInput")}
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
                          labelWidth={0}
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
              <ZonesGrid
                zoneName={this.state.zoneName}
                resources={this.state.resources}
                owner={this.state.owner}
                teachingLang={this.state.teachingLang}
                usingLang={this.state.usingLang}
                onEnterZone={this.onEnterZone}
              />
            }
          </Grid>
        </main>
      </form>
    )
  }
}

export default withStyles(styles)(ZonesContainer)
