import React, {PureComponent} from "react"

export default class Cant extends PureComponent {
  render() {
    const result = this.props.msg ? (
      <h1>{this.props.msg}</h1>
    ) : (
      <h1>You don&apos;t have permission to view this resource.</h1>
    )
    return (
      <div message={this.props.msg}>
        <div
          style={{margin: "0 auto", textAlign: "center", paddingTop: "60px"}}>
          {result}
        </div>
      </div>
    )
  }
}
