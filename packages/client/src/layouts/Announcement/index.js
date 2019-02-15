import React, {PureComponent} from "react"
import {Helmet} from "react-helmet"

import Grid from "@material-ui/core/Grid"

export default class Announcement extends PureComponent {
  render() {
    const {
      location: {
        state: {announcement}
      }
    } = this.props
    return (
      <Grid>
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
        <Grid.Row centered style={{background: "black", padding: "100px"}}>
          <h6>{announcement}</h6>
        </Grid.Row>
      </Grid>
    )
  }
}
