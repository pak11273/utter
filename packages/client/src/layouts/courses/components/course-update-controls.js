import React from "react"
import {Button, Segment} from "semantic-ui-react"

export default ({editClick}) => (
  <Segment textAlign="right" attached>
    <Button onClick={editClick} color="red">
      Edit
    </Button>
    <Button color="orange">Cancel</Button>
    <Button color="yellow">Save</Button>
  </Segment>
)
