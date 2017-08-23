import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Box, Img, Text} from '../components'

class LanguageCard extends Component {
  render() {
    const {name, src, levels} = this.props
    return (
      <Box width="200px" margin="0 0 40px 0">
        <Text fontsize="2rem">{name}</Text>
        <Img src={src} width="120px" height="100px" />
        <Text fontsize="1rem">levels: {levels}</Text>
      </Box>
    )
  }
}

export default LanguageCard
