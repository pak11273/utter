import React, {PureComponent} from "react"
import Waypoint from "react-waypoint"

import classNames from "classnames"
import cloneDeep from "lodash/cloneDeep"
/* import {history} from "@utterzone/connector" */
import isEmpty from "lodash/isEmpty"
import update from "immutability-helper"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

/* import styled from "styled-components" */
import {Query} from "react-apollo"
import gql from "graphql-tag"

/* import {store} from "../../../store.js" */

// actions
/* import {loadData} from "../../../api/actions.js" */

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
    minHeight: "240px",
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
    [theme.breakpoints.up(1240 + theme.spacing.unit * 3 * 2)]: {
      width: 1240,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  root: {
    display: "flex"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  searchField: {
    marginTop: "7px"
  }
})

const initialState = {
  courseInput: "",
  zoneName: "",
  courseRef: "",
  items: "",
  labelWidth: 0,
  mobileOpen: false,
  next: "",
  owner: "",
  resetCursor: "",
  search: "",
  selectionBox: "title",
  teachingLang: "",
  usingLang: ""
}

/* const Wrapper = styled.div` */
/*   cursor: pointer; */
/* ` */

class CoursesGrid extends PureComponent {
  state = cloneDeep(initialState)

  componentWillReceiveProps() {
    const newState = update(this.state, {
      cursor: {$set: ""}
    })
    this.setState(newState)
  }

  render() {
    const {
      classes,
      zoneName,
      courseRef,
      owner,
      usingLang,
      teachingLang
    } = this.props
    return (
      <Query
        query={getZones}
        variables={{
          cursor: "",
          zoneName,
          ref: courseRef,
          owner,
          usingLang,
          teachingLang
        }}>
        {({loading, error, data, fetchMore}) => {
          if (loading) return <Grid>loading...</Grid>
          if (error) {
            console.log("err: ", error)
            return (
              <Grid>
                <p>
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
                </p>
              </Grid>
            )
          }
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
                        // do something here
                        console.log("prev: ", previousResult)
                        console.log("fetch: ", fetchMoreResult)
                      }
                      const previousEntry = previousResult.getZones.courses
                      const newZones = fetchMoreResult.getZones.courses

                      // display waypoint if a cursor exists
                      const newState = update(this.state, {
                        cursor: {
                          $set: fetchMoreResult.getZones.cursor
                        }
                      })

                      this.setState(newState)

                      if (isEmpty(newZones)) {
                        // hide waypoint
                        const newState = update(this.state, {
                          cursor: {
                            $set: fetchMoreResult.getZones.cursor
                          }
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
                          courses: [...previousEntry, ...newZones],
                          __typename: "PaginatedZones"
                        }
                      }
                    }
                  })
                }}>
                <div>
                  <Button>Scroll down for more</Button>
                </div>
              </Waypoint>
            )
          }
          return (
            <div>
              <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}
                <Grid container spacing={8}>
                  {data.getZones.zones.map(card => (
                    <Grid item key={card.id} xs={12} sm={6} md={3} lg={2}>
                      <Card className={classes.card}>
                        <CardMedia
                          onClick={() => this.props.onEnterZone(card)}
                          className={classes.cardMedia}
                          image={`${card.zoneImage}`}
                          title={`${card.zoneName}`}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography
                            className={classes.cardTitle}
                            gutterBottom
                            variant="h6"
                            component="h6">
                            {card.zoneName}
                          </Typography>
                          <Typography
                            className={classes.cardUsername}
                            gutterBottom
                            variant="caption">
                            {card.owner.username}
                          </Typography>
                        </CardContent>
                        <div style={{padding: "0 0 0 20px"}}>TTMIK</div>
                        <div style={{padding: "0 0 0 20px"}}>
                          Using: English
                        </div>
                        <div style={{padding: "0 0 0 20px"}}>
                          Teaching: French
                        </div>
                        <CardActions className={classes.actions}>
                          <Button
                            onClick={() => this.props.onEnterZone(card)}
                            size="large"
                            className={classes.editButton}>
                            ENTER
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
              {waypoint}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(CoursesGrid)

/* import React, {PureComponent} from "react" */
/* import Waypoint from "react-waypoint" */

/* import {isEmpty, cloneDeep} from "lodash" */
/* import update from "immutability-helper" */
/* import {history} from "@utterzone/connector" */
/* import {Button, Card, Grid, Icon, Image, Loader} from "semantic-ui-react" */
/* import socketio from "socket.io-client" */

/* import {Query} from "react-apollo" */
/* import gql from "graphql-tag" */

/* const initialZonesState = { */
/*   cursor: "initial", */
/*   socket: socketio() */
/* } */

/* class ZonesGrid extends PureComponent { */
/*   constructor(props) { */
/*     super(props) */

/*     this.state = cloneDeep(initialZonesState) */
/*   } */

/*   componentWillReceiveProps() { */
/*     const newState = update(this.state, { */
/*       cursor: {$set: ""} */
/*     }) */
/*     this.setState(newState) */
/*   } */

/*   ageRestrictionNotice = () => { */
/*     alert( */
/*       "AGE GROUPS: \nAny age \n0-2 Babies \nAppropriate for ages rated 3+ \nAppropriate for ages rated 7+ \nAppropriate for ages rated 12+ \nAppropriate for ages rated 16+ \nAppropriate for ages rated 18+ \nKindergarten \nElementary \nMiddle School \nHigh School \nCollege \nOnly 18+ \nOnly 30+ \nOnly 40+ \nOnly 50+ \nOnly 60+" */
/*     ) */
/*   } */

/*   handleJoin = zone => { */
/*     this.props.loadData({zone}) */

/*     history.push(`/zone/${zone.id}`) */
/*   } */

/*   render() { */
/*     const {zoneName, zoneRef, owner, usingLang, teachingLang} = this.props */
/*     return ( */
/*       <Grid.Row style={{padding: "40px"}}> */
/*         <Query */
/*           query={getZones} */
/*           variables={{ */
/*             cursor: "", */
/*             zoneName, */
/*             ref: zoneRef, */
/*             owner, */
/*             usingLang, */
/*             teachingLang */
/*           }}> */
/*           {({loading, error, data, fetchMore}) => { */
/*             if (loading) { */
/*               return ( */
/*                 <Grid.Column> */
/*                   <Loader active>Loading</Loader> */
/*                 </Grid.Column> */
/*               ) */
/*             } */
/*             if (error) */
/*               return ( */
/*                 <Grid.Column> */
/*                   {error.graphQLErrors.map(({message}, i) => ( */
/*                     <p */
/*                       style={{ */
/*                         fontSize: "1.3em", */
/*                         color: "red", */
/*                         margin: "30px", */
/*                         padding: "30px", */
/*                         textAlign: "center" */
/*                       }} */
/*                       key={i}> */
/*                       {message} */
/*                     </p> */
/*                   ))} */
/*                 </Grid.Column> */
/*               ) */
/*             if (this.state.cursor !== "done") { */
/*               var waypoint = ( */
/*                 <Waypoint */
/*                   key={data.getZones.cursor} */
/*                   onEnter={() => { */
/*                     // set cursor state to first response */
/*                     const newState = update(this.state, { */
/*                       cursor: {$set: data.getZones.cursor} */
/*                     }) */

/*                     this.setState(newState) */

/*                     fetchMore({ */
/*                       // note this is a different query than the one used in the */
/*                       variables: { */
/*                         cursor: this.state.cursor */
/*                       }, */
/*                       updateQuery: (previousResult, {fetchMoreResult}) => { */
/*                         if (!fetchMoreResult) { */
/*                           // TODO: pending */
/*                         } */
/*                         const previousEntry = previousResult.getZones.zones */
/*                         const newZones = fetchMoreResult.getZones.zones */

/*                         // display waypoint if a cursor exists */
/*                         const newState = update(this.state, { */
/*                           cursor: {$set: fetchMoreResult.getZones.cursor} */
/*                         }) */

/*                         this.setState(newState) */

/*                         if (isEmpty(newZones)) { */
/*                           // hide waypoint */
/*                           const newState = update(this.state, { */
/*                             cursor: {$set: fetchMoreResult.getZones.cursor} */
/*                           }) */

/*                           this.setState(newState) */

/*                           return previousResult */
/*                         } */

/*                         var newCursor = newZones[newZones.length - 1].id */

/*                         if (!fetchMoreResult) return previousEntry */

/*                         return { */
/*                           // By returning `cursor` here, we update the `fetchMore` function */
/*                           // to the new cursor. */
/*                           getZones: { */
/*                             cursor: newCursor, */
/*                             zones: [...previousEntry, ...newZones], */
/*                             __typename: "PaginatedZones" */
/*                           } */
/*                         } */
/*                       } */
/*                     }) */
/*                   }} */
/*                 /> */
/*               ) */
/*             } */

/*                           <Icon name="user" /> */
/*                           <span style={{padding: "0 20px 0 0"}}>10</span> */
/*                           <span style={{padding: "0 20px 0 0"}}>Max: 30</span> */
/*                         </div> */
/*                         <div> */
/*                           <a style={{padding: "0 20px 0 0"}}> */
/*                             Host:{" "} */
/*                             <span style={{color: "blue"}}> */
/*                               {zone.owner.username} */
/*                             </span> */
/*                           </a> */
/*                         </div> */
/*                         <Button */
/*                           color="orange" */
/*                           size="mini" */
/*                           floated="left" */
/*                           onClick={this.ageRestrictionNotice} */
/*                           style={{margin: "20px 0 10px 0"}}> */
/*                           {zone.ageGroup} */
/*                         </Button> */
/*                         <Button */
/*                           color="teal" */
/*                           size="mini" */
/*                           floated="right" */
/*                           onClick={() => this.handleJoin(zone)} */
/*                           style={{margin: "20px 0 10px 0"}}> */
/*                           Join */
/*                         </Button> */
