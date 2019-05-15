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

if (session.levels) {
  subscribe(session, "levels", value => {
    window.app.reformedLevels = value.map((item, i) => {
      return {value: item.title, label: `${++i}. ${item.title}`}
    })
  })
}

class LevelSelect extends PureComponent {
  state = {
    level: "",
    levels: [{}],
    clearable: true,
    values: "",
    rtl: "",
    selectedValue: null,
    selectedOption: null
  }

  componentDidMount = () => {
    if (!session.levels) {
      window.location.replace("/login")
    }

    const {levels} = session
    const reformed = levels.map((item, i) => {
      return {value: item.title, label: `${++i}. ${item.title}`}
    })
    window.app.reformedLevels = reformed
    this.setState({
      level: session.level,
      levels: window.app.reformedLevels
    })
  }

  handleChange = selectedOption => {
    this.setState({selectedOption})

    const index = session.levels.findIndex(
      item => item.title === selectedOption.value
    )
    session.level = index + 1

    this.props.causeRender(session.levelsIdsArr[index])
  }

  render() {
    const {clearable, levels} = this.state
    const {selectedOption} = this.state

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
            clearable={clearable}
            name="level"
            options={levels}
            onChange={this.handleChange}
            value={selectedOption}
            searchable={true}
          />
          <Typography style={{padding: "0 10px"}} variant="h6" align="center">
            {session.level
              ? session.level +
                ". " +
                session.levels[session.level ? session.level - 1 : 0].title
              : null}
          </Typography>
        </Flex>
      </React.Fragment>
    )
  }
}

export default LevelSelect
