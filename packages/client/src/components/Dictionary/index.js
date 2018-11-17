import React, {Component} from 'react'
import {Box, Grid} from '../../components'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridtemplatecolumns}; 
  margin: 0 auto;
  width: 100%;

  @media(min-width: 640px) {
    grid-template-columns: ${props => props.gridtemplatecolumns640}; 
    width: 100%;
  }
`

class Dictionary extends Component {
  renderChildren = () => {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(
        child,
        {
          // alignitems: this.props.alignitems
        }
      )
    })
  };

  render() {
    const {
      height,
      term,
      definition,
      media,
      name,
      overflowy,
      gridbody,
      gridbody640,
      gridheader,
      gridheader640
    } = this.props
    const children = this.props.children
    return (
      <Container>
        <Grid
          gridtemplatecolumns={gridheader}
          gridtemplatecolumns640={gridheader640}
          gridautorows="100px">
          <Box
            alignitems="flex-start"
            background="black"
            color="white"
            display="block"
            fontsize="1.5rem"
            lineheight="100px"
            padding="0 20px 0 20px"
            textoverflow="ellipsis"
            whitespace="nowrap"
            width640="100%"
            minwidth640="100%">
            {term}
          </Box>
          {name
            ? <Box
                alignitems="flex-start"
                background="black"
                color="white"
                display="block"
                fontsize="1.5rem"
                lineheight="100px"
                textoverflow="ellipsis"
                whitespace="nowrap"
                minwidth640="100%">
                {name}
              </Box>
            : null}
          {name
            ? <Box
                alignitems="flex-start"
                background="black"
                color="white"
                display="block"
                fontsize="1.5rem"
                lineheight="100px"
                padding="0 15px 0 5px"
                textoverflow="ellipsis"
                whitespace="nowrap"
                minwidth640="100%">
                {definition}
              </Box>
            : <Box
                alignitems="flex-start"
                background="black"
                color="white"
                display="block"
                fontsize="1.5rem"
                lineheight="100px"
                textoverflow="ellipsis"
                whitespace="nowrap"
                minwidth640="100%">
                {definition}
              </Box>}
          <Box
            alignitems="flex-start"
            background="black"
            color="white"
            display="block"
            fontsize="1.5rem"
            lineheight="100px"
            textalign="center"
            textoverflow="ellipsis"
            whitespace="nowrap"
            minwidth640="100%">
            {media}
          </Box>
        </Grid>
        <Grid
          gridcolumngap="15px"
          gridtemplatecolumns={gridbody}
          gridtemplatecolumns640={gridbody640}
          gridautorows="100px"
          height={height}
          overflowy={overflowy}>
          {this.renderChildren()}
        </Grid>
      </Container>
    )
  }
}

export default Dictionary
