import React from "react"
import {Dimmer, Loader, Segment} from "semantic-ui-react"

const LoaderExampleText = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader inverted />
    </Dimmer>
  </Segment>
)

export default LoaderExampleText
