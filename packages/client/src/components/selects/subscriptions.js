import React, {Component} from "react"
import Select from "react-select"
import Box from "../Boxes"

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

class Subscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: "AppField",
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
    this.props.form.setFieldValue(this.props.field.name, newValue.value)
  }

  render() {
    const {field, options} = this.props
    return (
      <Box width="250px">
        <Select
          styles={customStyles}
          id="app-select"
          ref={ref => {
            this.select = ref
          }}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          simpleValue
          clearable={this.state.clearable}
          name={field.name}
          options={options}
          disabled={this.state.disabled}
          value={this.state.selectValue}
          onChange={this.updateValue}
          rtl={this.state.rtl}
          searchable={this.state.searchable}
        />
      </Box>
    )
  }
}

export default Subscriptions
