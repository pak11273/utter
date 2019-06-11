import React, {Component} from "react"
import Select from "react-select"
import Box from "../Boxes"
import {customStyles} from "./styles.js"

class Teaching extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: "TeachingField",
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

    this.props.onChange("teachingLang", newValue.value)
  }

  render() {
    const {field, options} = this.props
    return (
      <Box width="250px">
        <Select
          styles={customStyles}
          id="teaching-select"
          ref={ref => {
            this.select = ref
          }}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          required
          simpleValue
          clearable={this.state.clearable}
          name={field.name}
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

export default Teaching
