import React from "react"

import TextField from "@material-ui/core/TextField"

import {Form, Message, TextArea} from "semantic-ui-react"

import {isEmpty} from "lodash"

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
        <Message className="error-msg" error content={errors[field.name]} />
      )}
  </div>
)

export const FormikTextArea = ({
  field, // { name, value, onChange, onBlur }
  form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <Form.Field>
    <TextArea
      {...field}
      {...props}
      error={!isEmpty(errors[field.name]) ? "false" : "true"}
      label={field.name}
    />
    {errors[field.name] &&
      touched[field.name] && (
        <Message className="error-msg" error content={errors[field.name]} />
      )}
  </Form.Field>
)
