import React, {useState} from "react"
import {withRouter} from "react-router-dom"

import classNames from "classnames"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import PersonIcon from "@material-ui/icons/Person"
import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import {useQuery} from "react-apollo-hooks"
import {session} from "brownies"
import {LoadingButton} from "../../../components"
import {GET_ZONES} from "../zone-queries.js"

const drawerWidth = 240

const styles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  card: {
    height: "340px",
    /* maxWidth: "300px", */
    display: "flex",
    flexDirection: "column"
  },
  cardDescription: {
    height: "80px",
    lineHeight: "1em",
    overflow: "auto",
    wordBreak: "break-all"
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
    /* flexGrow: 1 */
  },
  cardTitle: {
    height: "52px",
    lineHeight: "1.2em",
    overflow: "hidden",
    wordBreak: "break-all",
    whiteSpace: "nowrap"
  },
  cardUsername: {
    whiteSpace: "nowrap",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
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
  showMore: {
    position: "absolute",
    bottom: -50,
    left: "50%",
    webkitTransform: "translateX(-50%)",
    transform: "translateX(-50%)"
  }
})

const ZonesGrid = props => {
  console.log("props: ", props)
  const [showMoreBtn, setShowMoreBtn] = useState(true)
  const {data, error, loading, fetchMore} = useQuery(GET_ZONES, {
    variables: {
      cursor: "",
      searchInput:
        props.search && props.search.searchInput
          ? props.search.searchInput
          : "",
      selectionBox:
        props.search && props.search.selectionBox
          ? props.search.selectionBox
          : "",
      usingLang:
        props.searchInput && props.searchInput.usingLang
          ? props.searchInput.usingLang
          : "",
      teachingLang:
        props.searchInput && props.searchInput.teachingLang
          ? props.searchInput.teachingLang
          : ""
    }
  })

  if (loading)
    return (
      <Grid
        container
        alignContent="center"
        justify="center"
        style={{height: "300px"}}>
        <CircularProgress style={{color: "grey"}} />
      </Grid>
    )
  if (error) {
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

  const {classes} = props

  const ageRestrictionNotice = () => {
    alert(
      "AGE GROUPS: \nAny age \nages 0-2 \nages 3+ \nages 7+ \nages 12+ \nages 16+ \nages 18+ \nages 30+ \nages 40+ \nages 50+ \nages 60+"
    )
  }

  const onEnterZone = card => () => {
    session.zone = card
    props.history.push({
      pathname: `/zone/${card._id}`,
      state: {zoneeId: card.id}
    })
  }

  return (
    <div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={8} style={{position: "relative"}}>
          {data.getZones &&
            data.getZones.zones.map((card, i) => (
              <Grid item key={card._id} xs={12} sm={12} md={3} lg={2}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className={classes.cardTitle}
                      gutterBottom
                      variant="h6"
                      component="h6">
                      {card.zoneName}
                    </Typography>
                    <Typography
                      className={classes.cardDescription}
                      gutterBottom
                      component="p">
                      {card.zoneDescription}
                    </Typography>
                    <Typography
                      className={classes.cardUsername}
                      gutterBottom
                      variant="caption">
                      by: {card.owner.username}
                    </Typography>
                  </CardContent>
                  <div style={{padding: "0 0 0 20px"}}>App: {card.app}</div>
                  <div style={{padding: "0 0 0 20px"}}>
                    Course: {card.zoneRef}
                  </div>
                  <div style={{padding: "0 0 0 20px"}}>
                    Using: {card.usingLang}
                  </div>
                  <div style={{padding: "0 0 0 20px"}}>
                    Teaching: {card.teachingLang}
                  </div>
                  <div style={{display: "flex", padding: "10px 0 0 20px"}}>
                    <PersonIcon />
                    <span>14</span>
                  </div>
                  <CardActions className={classes.actions}>
                    <Button
                      color="secondary"
                      size="small"
                      onClick={ageRestrictionNotice}
                      style={{margin: "10px 0"}}>
                      {card.ageGroup}
                    </Button>
                    <Button
                      onClick={onEnterZone(card)}
                      size="large"
                      className={classes.editButton}>
                      ENTER
                    </Button>
                  </CardActions>
                </Card>
                {i === data.getZones.zones.length - 1 &&
                  showMoreBtn && (
                    <LoadingButton
                      className={props.classes.showMore}
                      color="secondary"
                      variant="contained"
                      onClick={() =>
                        fetchMore({
                          variables: {
                            cursor:
                              data.getZones.zones[
                                data.getZones.zones.length - 1
                              ]._id
                          },
                          updateQuery: (prev, {fetchMoreResult}) => {
                            // length needs to be 1 less than the limit
                            if (fetchMoreResult.getZones.zones.length <= 7) {
                              setShowMoreBtn(false)
                            }
                            if (!fetchMoreResult) return prev
                            return {
                              getZones: {
                                ...fetchMoreResult.getZones,
                                zones: [
                                  ...prev.getZones.zones,
                                  ...fetchMoreResult.getZones.zones
                                ]
                              }
                            }
                          }
                        })
                      }>
                      Show More
                    </LoadingButton>
                  )}
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  )
}

/*

	*/

export default withRouter(withStyles(styles)(ZonesGrid))
