import React, {PureComponent} from "react"
import {Helmet} from "react-helmet"

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
      <div>
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
          <title>Utterzone | Announcement</title>
          <link rel="canonical" href="https://utterzone.com/a" />
        </Helmet>
        <Grid centered style={{height: "600px", padding: "100px"}}>
          <Typography variant="h6" color="inherit" gutterBottom noWrap>
            {announcement}
          </Typography>
        </Grid>
      </div>
    )
  }
}

export default Announcement
