import React, {Component} from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import {Box} from "../../../components"

class Using extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: "UsingField",
      disabled: false,
      searchable: props.searchable,
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
    this.props.addUsingLang(newValue)
    this.props.form.setFieldValue(this.props.field.name, newValue)
  }

  render() {
    const {field, options} = this.props
    return (
      <Box width="250px">
        <Select
          id="using-select"
          ref={ref => {
            this.select = ref
          }}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          required
          simpleValue
          clearable={this.state.clearable}
          wrapperStyle={{
            margin: "20px 0 0 0",
            width: "100%"
          }}
          style={{
            width: "100%"
          }}
          menuContainerStyle={{
            width: "100%"
          }}
          menuStyle={{
            width: "100%"
          }}
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

Using.propTypes = {
  searchable: PropTypes.bool
}

Using.defaultProps = {
  searchable: true
}

export default Using
