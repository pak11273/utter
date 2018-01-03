import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Box, Img, Text} from '../components'

// actions
import {chooseCourseLanguage} from '../layouts/Courses/actions.js'

class LanguageCard extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = name => {
    this.props.actions.chooseCourseLanguage(name)
  }

  render() {
    const {name, src, levels} = this.props
    return (
      <Box width="200px" margin="0 0 40px 0">
        <Text fontsize="2rem">
          <Link
            onClick={() => this.handleChange(`${name}`)}
            to={`/languageDetails/${name}`}>
            {name}
          </Link>
        </Text>
        <Img src={src} width="120px" height="100px" />
        <Text fontsize="1rem">levels: {levels}</Text>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        chooseCourseLanguage
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageCard)
