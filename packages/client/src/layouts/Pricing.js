import React, {PureComponent} from "react"
import {NavLink} from "react-router-dom"
import {Helmet} from "react-helmet"
/* import classNames from "classnames" */
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import Slide from "@material-ui/core/Slide"
import StarIcon from "@material-ui/icons/StarBorder"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {Footer} from "../containers"

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const BetaModal = () => {
  return (
    <Dialog open TransitionComponent={Transition}>
      <DialogContent>
        <DialogTitle
          disableTypography
          style={{fontSize: 30, justifyContent: "center", display: "flex"}}>
          Closed Beta
        </DialogTitle>
        <DialogContentText>
          No fees during beta. Limited to the first 1000 registrations.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{display: "flex", margin: "40px", justifyContent: "center"}}>
        <Button color="secondary" variant="contained">
          <NavLink style={{color: "white"}} to="/signup">
            Register
          </NavLink>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const styles = () => ({
  center: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    fontSize: "3em"
  }
})

const tiers = [
  {
    title: "Standard",
    price: "12.95",
    description: ["$12.95 charged every month."],
    buttonText: "FREE TRIAL",
    buttonVariant: "outlined"
  },
  {
    title: "3 Months",
    subheader: "Most popular",
    price: "8.95",
    description: ["$26.85 charged every 3 months."],
    buttonText: "FREE TRIAL",
    buttonVariant: "contained"
  },
  {
    title: "6 Months",
    price: "7.45",
    description: ["$44.70 charged every 6 months."],
    buttonText: "FREE TRIAL",
    buttonVariant: "outlined"
  },
  {
    title: "Annually",
    price: "6.95",
    description: ["$83.40 charged every 12 months."],
    buttonText: "FREE TRIAL",
    buttonVariant: "outlined"
  }
]

class Pricing extends PureComponent {
  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="Affordable language learning" />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Pricing</title>
          <link rel="canonical" href="https://utter.zone/courses" />
        </Helmet>
        <main className={classes.layout}>
          {/* Hero unit */}
          <BetaModal />
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom>
              Pricing
            </Typography>
            <Typography
              variant="h4"
              align="center"
              color="textSecondary"
              component="p">
              Obtain a priceless skill for the price of a Starbucks coffee.
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              component="p">
              Try it out for a week.
            </Typography>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40} alignItems="flex-end">
            {tiers.map(tier => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Standard" ? 12 : 6}
                md={3}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{align: "center"}}
                    subheaderTypographyProps={{align: "center"}}
                    action={tier.title === "3 Months" ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    {tier.description.map(line => (
                      <Typography variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      color="primary"
                      size="large">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Grid item style={{width: "100%"}}>
              <Footer />
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Pricing)
