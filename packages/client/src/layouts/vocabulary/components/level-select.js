/* eslint no-plusplus: 0 */
import React, {PureComponent} from "react"
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
  /* option: (provided, state) => ({ */
  /*   ...provided, */
  /*   borderBottom: "1px dotted black", */
  /*   color: state.isSelected ? "red" : "#2979FF", */
  /*   padding: 20, */
  /*   textAlign: "left" */
  /* }), */
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

class LevelSelect extends PureComponent {
  state = {
    level: "",
    levels: "",
    clearable: true,
    values: "",
    rtl: "",
    selectedValue: null
  }

  componentDidMount = () => {
    window.app.reformedLevels = session.levels.map((item, i) => {
      return {value: item.title, label: `${++i}. ${item.title}`}
    })
    this.setState({
      level: session.level,
      levels: window.app.reformedLevels
    })
  }

  handleChange = e => {
    console.log("e: ", e)
    const index = session.levels.findIndex(item => item.title === e.value)
    session.level = index + 1
    this.setState(
      {
        selectedValue: e
      },
      console.log("selected: ", this.state.selectedValue)
    )
    this.props.causeRender(session.levelsIdsArr[index])
  }

  render() {
    return (
      <React.Fragment>
        <Flex flexdirection="row">
          <Typography
            style={{paddingRight: "10px"}}
            variant="h6"
            align="center">
            Choose a Level:
          </Typography>
          <Select
            styles={customStyles}
            id="app-select"
            simpleValue
            clearable={this.state.clearable}
            name="level"
            options={window.app.reformedLevels}
            onChange={this.handleChange}
            value={this.state.selectedValue}
            searchable={true}
          />
        </Flex>
      </React.Fragment>
    )
  }
}

export default LevelSelect
