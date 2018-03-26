import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {Img, Text} from '../../components'

// ad rotator
import {ad} from '../../services/index.js'

const StyledAd = styled.div`  
  align-items: ${props => props.alignitems};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  font-size: ${props => props.fontsize};
  text-align: ${props => props.textalign};
  padding: ${props => props.padding};
`
StyledAd.defaultProps = {
  alignitems: 'center',
  display: 'flex',
  flexdirection: 'column',
  fontsize: '100px',
  padding: '40px'
}

function Ad(props) {
  const lang = props.roomReducer.language
  const today = ad.today()
  return (
    <StyledAd>
      <Text
        fontsize="1.4rem"
        textalign="center"
        padding="10px 10px 30px 10px">
        {' '}{ad[lang]['title' + today]}
      </Text>
      <a
        href={ad[lang]['lnk' + today]}
        title={ad[lang]['alt' + today]}
        rel="external"
        target="_blank">
        <Img
          src={ad[lang]['gfx' + today]}
          alt={ad[lang]['gfx' + today]}
          width="400"
          height="300"
        />
      </a>
      <br />
    </StyledAd>
  )
}

const mapStateToProps = state => {
  return {
    roomReducer: state.roomReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ad)
