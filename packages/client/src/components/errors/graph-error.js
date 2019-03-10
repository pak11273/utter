import React, {PureComponent} from "react"

export default class GraphError extends PureComponent {
  render() {
    return (
      <div
        style={{
          fontSize: "1.3em",
          color: "red",
          margin: "30px",
          padding: "30px",
          textAlign: "center"
        }}
        key={this.props.mappedKey}>
        {this.props.children}
      </div>
    )
  }
}
