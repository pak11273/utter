import React from "react"
import {Helmet} from "react-helmet"
/* import classNames from "classnames" */
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Grid from "@material-ui/core/Grid"
import StarIcon from "@material-ui/icons/StarBorder"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: "100px",
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  heroContent: {
    maxWidth: 900,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2
    }
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
  }
})

const tiers = [
  {
    title: "Standard",
    price: "12.95",
    description: [
      "12.95/mo.",
      "$12.95 charged every month.",
      "2 GB of storage",
      "Help center access",
      "Email support"
    ],
    buttonText: "Get started",
    buttonVariant: "outlined"
  },
  {
    title: "3 Months",
    subheader: "Most popular",
    price: "8.95",
    description: [
      "8.95/mo.",
      "$8.95 charged every 3 months.",
      "10 GB of storage",
      "Help center access",
      "Priority email support"
    ],
    buttonText: "Get started",
    buttonVariant: "contained"
  },
  {
    title: "6 Months",
    price: "7.45",
    description: [
      "7.45/mo.",
      "$7.45 charged every 6 months.",
      "30 GB of storage",
      "Help center access",
      "Phone & email support"
    ],
    buttonText: "Get started",
    buttonVariant: "outlined"
  },
  {
    title: "Annually",
    price: "6.95",
    description: [
      "6.95/mo.",
      "$6.95 charged every 12 months.",
      "30 GB of storage",
      "Help center access",
      "Phone & email support"
    ],
    buttonText: "Get started",
    buttonVariant: "outlined"
  }
]

function Pricing(props) {
  const {classes} = props

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
            Your payments are processed over the highest security connections.
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
                    <Typography component="h2" variant="h3" color="textPrimary">
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
                    color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </React.Fragment>
  )
}

export default withStyles(styles)(Pricing)
