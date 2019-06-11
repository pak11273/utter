import React, {Component} from "react"
import Select from "react-select"
import Box from "../Boxes"
import {customStyles} from "./styles.js"

class Using extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: "UsingField",
      disabled: false,
      searchable: true,
      selectValue: "",
      clearable: true,
      rtl: false
    }
  }

  clearValue = () => {
    this.select.setInputValue("")
  }

  updateValue = newValue => {
    this.setState({
      selectValue: newValue
    })

    this.props.onChange("usingLang", newValue.value)
  }

  render() {
    const {options} = this.props
    return (
      <Box width="250px">
        <Select
          styles={customStyles}
          id="using-select"
          ref={ref => {
            this.select = ref
          }}
          name={this.props.name}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          simpleValue
          clearable={this.state.clearable}
          options={options}
          disabled={this.state.disabled}
          value={this.state.selectValue}
          onChange={this.updateValue}
          rtl={this.state.rtl}
          searchable={this.state.searchable}
          placeholder={this.props.placeholder}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{color: "red", marginTop: ".5rem"}}>
              {this.props.error}
            </div>
          )}
      </Box>
    )
  }
}

export default Using
