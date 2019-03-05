import React, {PureComponent} from "react"
import Select from "react-select"

import TextField from "@material-ui/core/TextField"

import isEmpty from "lodash/isEmpty"

export const FormikInput = ({
  field, // { name, value, onChange, onBlur }
  form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <TextField
      fullWidth
      {...field}
      {...props}
      margin="normal"
      variant="outlined"
      error={!isEmpty(errors[field.name])}
    />
    {errors[field.name] &&
      touched[field.name] && (
        <div style={{color: "#f44336"}}>{errors[field.name]}</div>
      )}
  </div>
)

export const FormikTextArea = ({
  field, // { name, value, onChange, onBlur }
  form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <TextField
      id="outlined-multiline-static"
      required
      multiline
      rows="8"
      fullWidth
      margin="normal"
      variant="outlined"
      {...field}
      {...props}
      error={!isEmpty(errors[field.name])}
      label={field.name}
    />
    {errors[field.name] &&
      touched[field.name] && (
        <div style={{color: "#f44336"}}>{errors[field.name]}</div>
      )}
  </div>
)

export class FormikSelect extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.form.setFieldValue(this.props.field.name, newValue)
  }

  render() {
    const {field, options} = this.props
    console.log("prosp: ", this.props)
    return (
      <Select
        id="select"
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
    )
  }
}
