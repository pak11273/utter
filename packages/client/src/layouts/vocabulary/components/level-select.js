import React, {useState} from "react"
import {session} from "brownies"
import {Flex} from "../../../components"

import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import Typography from "@material-ui/core/Typography"

export const LevelSelect = () => {
  const [state, changeState] = useState({level: ""})
  const {levels} = session
  const options = levels.map(item => item.level)
  console.log("options: ", options)
  const handleChange = e => {
    changeState({
      ...state,
      [e.target.name]: e.target.value
    })

    session.level = +e.target.value
    console.log("session: ", session.level)
  }

  return (
    <Flex flexdirection="row">
      <Typography style={{paddingRight: "10px"}} variant="h6" align="center">
        Choose a Level:
      </Typography>
      <Select
        value={state.level}
        onChange={handleChange}
        inputProps={{
          id: "level",
          name: "level"
        }}>
        {options.map(level => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </Select>
    </Flex>
  )
}
