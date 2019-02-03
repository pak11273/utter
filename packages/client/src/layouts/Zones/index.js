import React, {Component} from "react"
import {connect} from "react-redux"
import schema from "../../app/schema"
import {Link} from "react-router-dom"
import Select from "react-select"
import {isEmpty, cloneDeep} from "lodash"
import Waypoint from "react-waypoint"
import {Helmet} from "react-helmet"
import update from "immutability-helper"
import {history} from "@utterzone/connector"
import {loadData} from "../../api/actions.js"
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Item,
  Loader,
  Select as SemSelect
} from "semantic-ui-react"
import {Spacer} from "../../components"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
import "../styles.css"

import {Query} from "react-apollo"
import gql from "graphql-tag"
/* import socketio from "socket.io-client" */

/* // socketio connection */
/* if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod") { */
/*   console.log("server soket url: ", process.env.SOCKETIO_SERVER_URL) */
/*   var socket = socketio.connect(process.env.SOCKETIO_SERVER_URL) */
/* } else { */
/*   socket = socketio.connect("http://192.168.68.8:3010") */
/* } */

/* socket.on("connect", () => console.log("we connected")) */

const getZones = gql`
  query getZones(
    $cursor: String
    $zoneName: String!
    $ref: String!
    $owner: String!
    $usingLang: String!
    $teachingLang: String!
  ) {
    getZones(
      cursor: $cursor
      zoneName: $zoneName
      ref: $ref
      owner: $owner
      usingLang: $usingLang
      teachingLang: $teachingLang
    ) {
      cursor
      zones {
        id
        ageGroup
        teachingLang
        usingLang
        zoneDescription
        zoneImage
        zoneName
        owner {
          username
        }
      }
    }
  }
`
const initialZonesState = {
  cursor: "initial"
}

class Zones extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialZonesState)
  }

  componentWillReceiveProps() {
    const newState = update(this.state, {
      cursor: {$set: ""}
    })
    this.setState(newState)
  }

  ageRestrictionNotice = () => {
    alert(
      "AGE GROUPS: \nAny age \n0-2 Babies \nAppropriate for ages rated 3+ \nAppropriate for ages rated 7+ \nAppropriate for ages rated 12+ \nAppropriate for ages rated 16+ \nAppropriate for ages rated 18+ \nKindergarten \nElementary \nMiddle School \nHigh School \nCollege \nOnly 18+ \nOnly 30+ \nOnly 40+ \nOnly 50+ \nOnly 60+"
    )
  }

  handleJoin = zone => {
    this.props.loadData({zone})

    history.push(`/zone/${zone.id}`)
  }

  render() {
    const {zoneName, zoneRef, owner, usingLang, teachingLang} = this.props
    return (
      <Grid.Row style={{padding: "40px"}}>
        <Query
          query={getZones}
          variables={{
            cursor: "",
            zoneName,
            ref: zoneRef,
            owner,
            usingLang,
            teachingLang
          }}>
          {({loading, error, data, fetchMore}) => {
            if (loading) {
              return (
                <Grid.Column>
                  <Loader active>Loading</Loader>
                </Grid.Column>
              )
            }
            if (error)
              return (
                <Grid.Column>
                  {error.graphQLErrors.map(({message}, i) => (
                    <p
                      style={{
                        fontSize: "1.3em",
                        color: "red",
                        margin: "30px",
                        padding: "30px",
                        textAlign: "center"
                      }}
                      key={i}>
                      {message}
                    </p>
                  ))}
                </Grid.Column>
              )
            if (this.state.cursor !== "done") {
              var waypoint = (
                <Waypoint
                  key={data.getZones.cursor}
                  onEnter={() => {
                    // set cursor state to first response
                    const newState = update(this.state, {
                      cursor: {$set: data.getZones.cursor}
                    })

                    this.setState(newState)

                    fetchMore({
                      // note this is a different query than the one used in the
                      variables: {
                        cursor: this.state.cursor
                      },
                      updateQuery: (previousResult, {fetchMoreResult}) => {
                        if (!fetchMoreResult) {
                          // TODO: pending
                        }
                        const previousEntry = previousResult.getZones.zones
                        const newZones = fetchMoreResult.getZones.zones

                        // display waypoint if a cursor exists
                        const newState = update(this.state, {
                          cursor: {$set: fetchMoreResult.getZones.cursor}
                        })

                        this.setState(newState)

                        if (isEmpty(newZones)) {
                          // hide waypoint
                          const newState = update(this.state, {
                            cursor: {$set: fetchMoreResult.getZones.cursor}
                          })

                          this.setState(newState)

                          return previousResult
                        }

                        var newCursor = newZones[newZones.length - 1].id

                        if (!fetchMoreResult) return previousEntry

                        return {
                          // By returning `cursor` here, we update the `fetchMore` function
                          // to the new cursor.
                          getZones: {
                            cursor: newCursor,
                            zones: [...previousEntry, ...newZones],
                            __typename: "PaginatedZones"
                          }
                        }
                      }
                    })
                  }}
                />
              )
            }
            return (
              <div>
                <Card.Group centered doubling stackable itemsPerRow={4}>
                  {data.getZones.zones.map(zone => (
                    <Card key={zone.id} style={{width: "300px"}}>
                      <Image src={`${zone.zoneImage}`} />
                      <Card.Content>
                        <Card.Header style={{wordBreak: "break-word"}}>
                          {zone.zoneName}
                        </Card.Header>
                        <div
                          className="description"
                          style={{wordBreak: "break-word"}}>
                          {zone.zoneDescription}
                        </div>
                      </Card.Content>
                      <Card.Content extra>
                        <div>
                          <Icon name="book" />
                          <span style={{padding: "0 20px 0 0"}}>
                            Course: TTMIK
                          </span>
                        </div>
                        <div>
                          <Icon name="book" />
                          <span style={{padding: "0 20px 0 0"}}>
                            Using: English
                          </span>
                        </div>
                        <div>
                          <Icon name="book" />
                          <span style={{padding: "0 20px 0 0"}}>
                            Teaching: French
                          </span>
                        </div>
                        <div>
                          <Icon name="user" />
                          <span style={{padding: "0 20px 0 0"}}>10</span>
                          <span style={{padding: "0 20px 0 0"}}>Max: 30</span>
                        </div>
                        <div>
                          <a style={{padding: "0 20px 0 0"}}>
                            Host:{" "}
                            <span style={{color: "blue"}}>
                              {zone.owner.username}
                            </span>
                          </a>
                        </div>
                        <Button
                          color="orange"
                          size="mini"
                          floated="left"
                          onClick={this.ageRestrictionNotice}
                          style={{margin: "20px 0 10px 0"}}>
                          {zone.ageGroup}
                        </Button>
                        <Button
                          color="teal"
                          size="mini"
                          floated="right"
                          onClick={() => this.handleJoin(zone)}
                          style={{margin: "20px 0 10px 0"}}>
                          Join
                        </Button>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
                {waypoint}
              </div>
            )
          }}
        </Query>
      </Grid.Row>
    )
  }
}

const options = [
  {key: "name", text: "Name", value: "name"},
  {key: "reference", text: "Reference", value: "reference"},
  {key: "owner", text: "Host", value: "owner"}
]

const initialZonesContainerState = {
  search: "",
  owner: "",
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

class ZonesContainer extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialZonesContainerState)
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
      <Grid stackable>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Make direct contact with our team throught our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
          />
          <meta name="owner" content="Isaac Pak" />
          <title>Utterzone | Zones</title>
          <link rel="canonical" href="https://utter.zone/zones" />
        </Helmet>
        <Grid.Column width={4} style={{background: "LightGray"}}>
          <Container
            textAlign="center"
            style={{padding: "20px 20px 20px 30px"}}>
            <Grid.Column textAlign="center">
              <Spacer margin="50px 0 0 0" />
              <Item align="center">
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
              </Item>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Spacer margin="50px 0 0 0" />
              <Item align="center">
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
              </Item>
            </Grid.Column>
          </Container>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid columns={1} centered padded="vertically">
            <Grid.Column textAlign="center">
              <Header as="h1">Enter A Zone or Host Your Own</Header>
            </Grid.Column>
          </Grid>
          <Grid.Column>
            <Item align="center">
              <Input
                type="text"
                placeholder="Search..."
                onChange={this.handleInputChg}
                action>
                <input />
                <SemSelect
                  onChange={this.handleZoneFilterChg}
                  options={options}
                  defaultValue="name"
                />
                <Button onClick={this.handleSubmit}>Search</Button>
              </Input>
            </Item>
          </Grid.Column>
          <Zones
            zoneName={this.state.zoneName}
            owner={this.state.owner}
            zoneRef={this.state.zoneRef}
            usingLang={this.state.usingLang}
            teachingLang={this.state.teachingLang}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
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
)(ZonesContainer)
