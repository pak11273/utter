import React, {Component} from "react"
/* import Select from "react-select" */
import Creatable from "react-select/lib/Creatable"
import {Box} from "../../../components"

const customStyles = {
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

class CourseResources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      multi: true,
      options: [],
      value: undefined
    }
  }

  clearValue = () => {
    this.select.setInputValue("")
  }

  updateValue = newValue => {
    this.setState({newValue})
    this.props.addResources(newValue)
  }

  render() {
    const {options, value} = this.state
    return (
      <Box width="250px">
        <Creatable
          styles={customStyles}
          value={value}
          options={options}
          onChange={this.updateValue}
        />
        <div className="hint">{this.props.hint}</div>
      </Box>
    )
  }
}

export default CourseResources
