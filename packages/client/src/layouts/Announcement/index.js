import React, {PureComponent} from "react"
import {Helmet} from "react-helmet-async"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

class Announcement extends PureComponent {
  render() {
    const {
      location: {
        state: {announcement}
      }
    } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Please follow the announcement on this page."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Announcements</title>
          <link rel="canonical" href="https://utterzone.com/a" />
        </Helmet>
        <Grid
          alignItems="center"
          container
          justify="center"
          style={{
            background: "black",
            color: "white",
            display: "flex",
            height: "100vh",
            width: "100%"
          }}>
          <Typography variant="h6" color="inherit" gutterBottom noWrap>
            {announcement}
          </Typography>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Announcement
