import React from "react"
import LoaderCircle from "./loader-circle.js"

const LayoutLoader = props => {
  if (props.pastDelay) {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          justifyContent: "center"
        }}>
        <LoaderCircle />
      </div>
    )
  }
  return null
}

export default LayoutLoader
