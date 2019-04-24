/* eslint no-plusplus: 0 */
import React, {useEffect, useState} from "react"
import Select from "react-select"
import {session, subscribe} from "brownies"
import {Flex} from "../../../components"

/* import MenuItem from "@material-ui/core/MenuItem" */
/* import Select from "@material-ui/core/Select" */
import Typography from "@material-ui/core/Typography"

const customStyles = {
  container: style => ({
    ...style,
    zIndex: 11
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted black",
    color: state.isSelected ? "red" : "#2979FF",
    padding: 20,
    textAlign: "left"
  }),
  control: styles => ({
    ...styles,
    margin: "20px auto",
    padding: "3px",
    position: "relative",
    width: "200px",
    height: "50px",
    borderWidth: "1px",
    borderColor: "rgba(0, 0, 0, 0.87)",
    borderRadius: "5px"
  })
}

subscribe(session, "levels", value => {
  window.app.reformedLevels = value.map((item, i) => {
    return {value: item.title, label: `${++i}. ${item.title}`}
  })
})

export default props => {
  const [state, changeState] = useState({
    levels: "",
    clearable: "",
    disabled: "",
    values: "",
    rtl: "",
    searchable: ""
  })
  /* const {levelsIdsArr} = session */
  const handleChange = e => {
    const index = session.levelsIdsArr.findIndex(
      number => number === e.target.value
    )
    session.level = index + 1
    props.causeRender(session.levelsIdsArr[index])
  }

  useEffect(
    () => {
      window.app.reformedLevels = session.levels.map((item, i) => {
        return {value: item.title, label: `${++i}. ${item.title}`}
      })
      changeState({
        ...state,
        level: session.level
        /* levels: reformedLevels */
      })
    },
    [state]
  )

  return (
    <Flex flexdirection="row">
      <Typography style={{paddingRight: "10px"}} variant="h6" align="center">
        Choose a Level:
      </Typography>
      <Select
        styles={customStyles}
        id="app-select"
        /* ref={ref => { */
        /*   const select = ref */
        /* }} */
        onBlurResetsInput={false}
        onSelectResetsInput={false}
        simpleValue
        clearable={state.clearable}
        /* name={field.name} */
        name="level"
        options={window.app.reformedLevels}
        disabled={state.disabled}
        value={state.selectValue}
        onChange={handleChange}
        rtl={state.rtl}
        searchable={state.searchable}
      />
      {/* <Select
        renderValue={() => session.level}
        value={session.level}
        onChange={handleChange}
        inputProps={{
          id: "level",
          name: "level"
        }}>
        {levelsIdsArr &&
          levelsIdsArr.map(level => (
            <MenuItem key={level} value={level}>
              {levelsIdsArr.indexOf(level) + 1}
            </MenuItem>
          ))}
      </Select> */}
    </Flex>
  )
}
