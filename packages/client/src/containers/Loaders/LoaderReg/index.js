//@flow
import React, {Component} from 'react'
import LoaderRegView from './LoaderRegView'

class LoaderRegContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text || 'Loading'
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  ComponentDidMount() {
    var stopper = this.props.text + '...'
    this.interval = window.setInterval(
      function() {
        if (this.state.text === stopper) {
          this.setState(function() {
            return {
              text: this.props.text
            }
          })
        } else {
          this.setState(function(prevState) {
            return {
              text: prevState.text + '.'
            }
          })
        }
      }.bind(this),
      300
    )
  }

  render() {
    return <LoaderRegView>{this.state.text}</LoaderRegView>
  }
}

export default LoaderRegContainer
