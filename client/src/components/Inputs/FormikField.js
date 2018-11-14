import React from "react"
import {Form, Message} from "semantic-ui-react"
import isEmpty from "lodash/isEmpty"

export const FormikField = ({
  field, // { name, value, onChange, onBlur }
  form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <Form.Field>
    <Form.Input
      {...field}
      {...props}
      error={!isEmpty(errors[field.name])}
      fluid
      label={field.name}
    />
    {errors[field.name] &&
      touched[field.name] && (
        <Message className="error-msg" error content={errors[field.name]} />
      )}
  </Form.Field>
)
