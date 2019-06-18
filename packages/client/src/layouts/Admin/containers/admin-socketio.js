import React, {PureComponent} from "react"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import classNames from "classnames"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* import {session} from "brownies" */
import {withApollo} from "react-apollo"
/* import {  LoadingButton} from "../../../components" */
import socketio from "../../../services/socketio/socketio-mgr.js"
import {styles} from "../styles.js"

class getAdminSocketio extends PureComponent {
  state = {
    connected_clients: 0,
    opened_zones: 0,
    users_online: 0
  }

  getSocketioConnections = () => {
    socketio.getSocketioConnections(data => {
      this.setState({
        connected_clients: data
      })
    })
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Grid container spacing={24} direction="column">
          <Grid
            className={classes.hero}
            container
            justify="center"
            direction="column">
            <Paper className={classes.header} elevation={1}>
              <Typography
                className={classes.headerBody}
                variant="h4"
                align="center"
                gutterBottom>
                Admin Carousel
              </Typography>
            </Paper>
          </Grid>
          <main className={classes.content}>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              <Grid container spacing={40}>
                <Grid item sm={12} md={6} lg={6}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Socketio
                      </Typography>
                      <Typography gutterBottom component="p">
                        Maximum number of allowable sockets per node
                      </Typography>
                      <Typography variant="h5" component="h2">
                        connected clients: {this.state.connected_clients}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        opened zones: {this.state.opened_zones}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        users online: {this.state.users_online}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={this.getSocketioConnections}>
                        Refresh
                      </Button>
                      <Link
                        rel="noopener nofollow noreferrer"
                        target="_blank"
                        href="https://pixabay.com/api/docs/#api_rate_limit">
                        <Button size="small" color="primary">
                          docs
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </main>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withApollo(getAdminSocketio))
