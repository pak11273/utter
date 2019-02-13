import React from "react"
// TODO: change to material ui loader
import {Dimmer, Loader, Segment} from "semantic-ui-react"

const LoaderExampleText = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader inverted />
    </Dimmer>
  </Segment>
)

export default LoaderExampleText
