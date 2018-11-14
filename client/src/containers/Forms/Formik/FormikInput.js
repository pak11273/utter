import React, {PureComponent} from "react"
import {Form} from "semantic-ui-react"

export default class FormikInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  handleChange = e => {
    this.setState({value: e.target.value})
  }

  render() {
    /* const {onChange} = this.props */
    const {value} = this.state
    console.log("props: ", this.props)
    return (
      <Form.Input
        {...this.props}
        value={value}
        // onChange={this.handleChange}
        // onBlur={onChange} // only change on blur
      />
    )
  }
}
