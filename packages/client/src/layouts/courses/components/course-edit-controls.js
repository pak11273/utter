import React from "react"
import {Button, Segment} from "semantic-ui-react"

export default () => (
  <Segment textAlign="right" attached>
    <Button color="red">Edit</Button>
    <Button color="orange">Cancel</Button>
    <Button color="yellow">Save</Button>
  </Segment>
)
