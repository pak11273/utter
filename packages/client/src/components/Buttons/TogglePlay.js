// ref: http://nael.io/2017-03-11-building-a-react-audio-player/

import React from "react"
import IconButton from "@material-ui/core/IconButton"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled"

export default class Player extends React.Component {
  state = {
    play: false
  }

  /* componentWillReceiveProps() { */
  /*   this.setState({play: true}) */
  /* } */

  play = () => {
    if (this.state.play) {
      this.setState({
        play: false
      })
      this.audio.pause()
    } else {
      this.setState({
        play: true
      })
      this.audio.play()
    }
  }

  render() {
    const playButton = !this.state.play ? (
      <PlayCircleFilledIcon />
    ) : (
      <PauseCircleFilledIcon />
    )

    return (
      <div onClick={this.play}>
        <audio
          src={this.props.src}
          ref={audio => {
            this.audio = audio
          }}>
          <track kind="captions" />
        </audio>
        <IconButton status="danger">{playButton}</IconButton>
      </div>
    )
  }
}
