import React, {Component} from 'react'

class LanguageDetails extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
        <pre><code>{JSON.stringify(this.props, null, 4)}</code></pre>
      </div>
    )
  }
}

export default LanguageDetails
