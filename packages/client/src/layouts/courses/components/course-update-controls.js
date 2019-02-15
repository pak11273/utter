import React from "react"
import Button from "@material-ui/core/Button"

export default ({editClick}) => (
  <div>
    <Button onClick={editClick} color="inherit">
      Edit
    </Button>
    <Button color="secondary">Cancel</Button>
    <Button color="primary">Save</Button>
  </div>
)
