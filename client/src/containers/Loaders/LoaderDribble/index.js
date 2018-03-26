import React, {Component} from 'react'
import LoaderDribbleView from './LoaderDribbleView.js'

function LoaderDribbleContainer(props) {
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

export default LoaderDribbleContainer
