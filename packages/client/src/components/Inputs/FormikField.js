import React from "react"

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
