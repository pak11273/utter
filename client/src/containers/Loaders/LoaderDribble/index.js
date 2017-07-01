import React, {Component} from 'react'
import LoaderDribbleView from './LoaderDribbleView.js'

class LoaderDribbleContainer extends Component {
  render() {
    return (
      <LoaderDribbleView>
        <div className="container">
          <i className="layer" />
          <i className="layer" />
          <i className="layer" />
        </div>
      </LoaderDribbleView>
    )
  }
}

export default LoaderDribbleContainer
