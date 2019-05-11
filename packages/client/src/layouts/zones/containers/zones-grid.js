import React from "react"
import {withRouter} from "react-router-dom"

import classNames from "classnames"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import PersonIcon from "@material-ui/icons/Person"
import {withStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import {useQuery} from "react-apollo-hooks"
import {session} from "brownies"
import {LoadingButton} from "../../../components"
import {GET_ZONES} from "../../../graphql/queries/zone-queries.js"
import {styles} from "../styles.js"

const ZonesGrid = props => {
  const onEnterZone = card => () => {
    console.log("cars; ", card)
    console.log("owner; ", card.owner._id)
    console.log("user; ", session.user._id)

    if (card.owner._id === session.user._id) {
      props.history.push("/zones/rezone")
      return
    }
    session.zone = card
    props.history.push({
      pathname: `/zone/${card._id}`,
      state: {zoneId: card._id}
    })
  }

  const {data, error, loading, fetchMore} = useQuery(GET_ZONES, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      searchInput:
        props.search && props.search.searchInput
          ? props.search.searchInput
          : "",
      selectionBox:
        props.search && props.search.selectionBox
          ? props.search.selectionBox
          : "",
      app: props.search && props.search.app ? props.search.app : "",
      subscriptions:
        props.search && props.search.subscriptions
          ? props.search.subscriptions
          : "",
      usingLang:
        props.search && props.search.usingLang ? props.search.usingLang : "",
      teachingLang:
        props.search && props.search.teachingLang
          ? props.search.teachingLang
          : ""
    }
  })

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
      "ALL public zones irregardless of age requirements are to uphold the following zone rules: \nNo discrimination \nNo sexual harrassment \nNo sexual innuendos of any kind \nNo Profanity \nNo Spamming Chat \n\nRule breakers are subject to suspensed or banned accounts."
    )
  }

  return (
    <div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40} style={{position: "relative"}}>
          {data.getZones &&
            data.getZones.zones.map((card, i) => (
              <Grid item key={card._id} xs={12} sm={6} md={3} lg={2}>
                <Card className={classes.card2}>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className={classes.cardTitle2}
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
                      by: {card.owner && card.owner.username}
                    </Typography>
                  </CardContent>
                  <div style={{padding: "0 0 0 20px"}}>App: {card.app}</div>
                  <div
                    style={{
                      padding: "0 0 0 20px",
                      marginRight: "20px",
                      overflow: "hidden",
                      whiteSpace: "nowrap"
                    }}>
                    Course: {(card.course && card.course.title) || ""}
                  </div>
                  <div style={{padding: "0 0 0 20px"}}>
                    Level: {(card && card.courseLevel) || ""}
                  </div>
                  <div style={{padding: "0 0 0 20px"}}>
                    Using: {(card && card.usingLang) || ""}
                  </div>
                  <div style={{padding: "0 0 0 20px"}}>
                    Teaching: {(card && card.teachingLang) || ""}
                  </div>
                  <div style={{display: "flex", padding: "10px 0 0 20px"}}>
                    <PersonIcon />
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 25px 0px 5px"
                      }}>
                      {(card.occupants && card.occupants.length) || 1}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingTop: "5px"
                      }}>
                      Max: 30
                    </span>
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
                  data.getZones.more && (
                    <LoadingButton
                      loading={loading}
                      disabled={loading}
                      className={props.classes.showMore}
                      color="secondary"
                      variant="contained"
                      onClick={() =>
                        fetchMore({
                          variables: {
                            page: data.getZones.page + 1
                          },
                          updateQuery: (prev, {fetchMoreResult}) => {
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

export default withRouter(withStyles(styles)(ZonesGrid))
