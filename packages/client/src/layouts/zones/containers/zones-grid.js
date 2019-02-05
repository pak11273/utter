import {isEmpty, cloneDeep} from "lodash"
import Waypoint from "react-waypoint"
import {history} from "@utterzone/connector"
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
import {Query} from "react-apollo"
import gql from "graphql-tag"

const initialZonesState = {
  cursor: "initial",
  socket: socketio()
}

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
