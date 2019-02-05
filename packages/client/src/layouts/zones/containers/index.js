import React, {Component} from "react"
/* import {Link} from "react-router-dom" */
/* import Select from "react-select" */
import {Helmet} from "react-helmet"
import {cloneDeep} from "lodash"

import {connect} from "react-redux"
import update from "immutability-helper"

import schema from "../../../core/schema"

import socketio from "../../../services/socketio"
import {loadData} from "../../../api/actions.js"

import {Container} from "../../../components"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
import "../../styles.css"
/* import ZonesGrid from "./zones-grid.js" */

import classNames from "classnames"
/* import Avatar from "@material-ui/core/Avatar" */
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
/* import Divider from "@material-ui/core/Divider" */
import Grid from "@material-ui/core/Grid"
/* import Paper from "@material-ui/core/Paper" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
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
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
})

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

/* const options = [ */
/*   {key: "name", text: "Name", value: "name"}, */
/*   {key: "reference", text: "Reference", value: "reference"}, */
/*   {key: "owner", text: "Host", value: "owner"} */
/* ] */

const initialZonesState = {
  search: "",
  owner: "",
  socket: null,
  zoneInput: "",
  zoneName: "",
  selectionBox: "title",
  zoneRef: "",
  teachingLang: "",
  usingLang: "",
  items: "",
  next: "",
  resetCursor: ""
}

class Zones extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialZonesState)
  }

  componentDidMount() {
    const newState = update(this.state, {
      socket: {$set: socketio()}
    })

    this.setState(newState)
  }

  onEnterZone = (zoneName, onEnterSuccess) => {
    return this.state.socket.join(zoneName, (err, chatHistory) => {
      if (err) return console.error(err)
      return onEnterSuccess(chatHistory)
    })
  }

  handleGameChange = usingLang => {
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

  handleZoneFilterChg = (e, data) => {
    const newState = update(this.state, {
      selectionBox: {$set: data.value}
    })
    this.setState(newState)
  }

  handleInputChg = (e, data) => {
    e.preventDefault()
    const newState = update(this.state, {
      zoneInput: {$set: data.value}
    })

    this.setState(newState)
  }

  handleSubmit = () => {
    // change state props based on selectionBox
    const {zoneInput, selectionBox} = this.state
    switch (selectionBox) {
      case "name": {
        // set zoneName
        const newName = update(this.state, {
          owner: {
            $set: ""
          },
          zoneName: {
            $set: zoneInput
          },
          zoneRef: {
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
        // set zoneRef
        const newRef = update(this.state, {
          owner: {
            $set: ""
          },
          zoneName: {
            $set: ""
          },
          zoneRef: {
            $set: zoneInput
          },
          next: {
            $set: ""
          }
        })

        this.setState(newRef)

        break
      }

      case "owner": {
        // set owner
        const newOwner = update(this.state, {
          owner: {
            $set: zoneInput
          },
          zoneName: {
            $set: ""
          },
          zoneRef: {
            $set: ""
          },
          next: {
            $set: ""
          }
        })

        this.setState(newOwner)

        break
      }
      default:
        break
    }
  }

  render() {
    const {classes} = this.props
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

    return (
      <React.Fragment>
        <Container>
          <Grid>
            <Helmet>
              <meta charset="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <meta
                name="description"
                content="Find a zone and start uttering!"
              />
              <meta name="owner" content="Isaac Pak" />
              <title>Utterzone | Zones</title>
              <link rel="canonical" href="https://utter.zone/zones" />
            </Helmet>

            <main>
              {/* Hero unit */}
              <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom>
                    Album layout
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    paragraph>
                    Something short and leading about the collection below—its
                    contents, the creator, etc. Make it short and sweet, but not
                    too short so folks don&apos;t simply skip over it entirely.
                  </Typography>
                  <div className={classes.heroButtons}>
                    <Grid container spacing={16} justify="center">
                      <Grid item>
                        <Button variant="contained" color="primary">
                          Main call to action
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="outlined" color="primary">
                          Secondary action
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
              <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}
                <Grid container spacing={40}>
                  {cards.map(card => (
                    <Grid item key={card} sm={6} md={4} lg={3}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Heading
                          </Typography>
                          <Typography>
                            This is a media card. You can use this section to
                            describe the content.
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            View
                          </Button>
                          <Button size="small" color="primary">
                            Edit
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </main>
            {/* 
							<Grid>
			
                <Grid >
                  <Spacer margin="50px 0 0 0" />
										<div>
                    <Header as="h2">I speak:</Header>
                    <Select
                      name="form-field-name"
                      value={this.state.usingLang}
                      onChange={this.handleSpeakingChange}
                      options={[
                        {value: "english", label: "English"},
                        {value: "spanish", label: "Spanish"},
                        {value: "french", label: "French"}
                      ]}
                    />
                    <Header as="h2">I want to learn:</Header>
                    <Select
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
										</div>
                </Grid>
                <Grid>
                  <Spacer margin="50px 0 0 0" />
                  <div align="center">
                    <Header as="h2">Choose an App:</Header>
                    <Select
                      name="form-field-name"
                      value={this.state.usingLang}
                      onChange={this.handleGameChange}
                      options={[
                        {value: "chat", label: "General Chat"},
                        {value: "recall", label: "Total Recall"}
                      ]}
                    />
                    <Header as="h2">Pick your Level:</Header>
                    <Select
                      name="form-field-name"
                      value={this.state.teachingLang}
                      onChange={this.handleTeachingChange}
                      options={[
                        {value: "1", label: "1"},
                        {value: "2", label: "2"},
                        {value: "3", label: "3"},
                        {value: "4", label: "4"}
                      ]}
                    />
                    <div style={{margin: "40px 0 0 0"}}>
                      <Link to="/zones/create">Host a Zone</Link>
                    </div>
                  </div>
                </Grid>
			 <Grid>
              <Grid >
                <div textAlign="center">
                  <Header as="h1">Enter A Zone or Host Your Own</Header>
                </div>
              </Grid>
              <Grid>
                <div align="center">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={this.handleInputChg}
                    action>
                    <SemSelect
                      onChange={this.handleZoneFilterChg}
                      options={options}
                      defaultValue="name"
                    />
                    <Button onClick={this.handleSubmit}>Search</Button>
                  </input>
                </div>
              </Grid>
              <ZonesGrid />
                <Zones
                onEnterZone={zone =>
                  this.onEnterZone(zone, zoneHistory =>
                    props.history.push({
                      pathname: zone,
                      state: {zoneHistory}
                    })
                  )
                }
                zoneName={this.state.zoneName}
                owner={this.state.owner}
                zoneRef={this.state.zoneRef}
                usingLang={this.state.usingLang}
                teachingLang={this.state.teachingLang}
                {...this.props}
              />  */}
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {Zone} = session
  const zoneObj = Zone.all().toRefArray()
  const zone = zoneObj[0]

  return {
    zone
  }
}

/* const mapDispatchToProps = dispatch => { */
/*   return { */
/*     loadData: payload => dispatch(loadData(payload)) */
/*   } */
/* } */

export default connect(
  mapStateToProps,
  {loadData}
)(withStyles(styles)(Zones))
