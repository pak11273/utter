import React, {Component} from 'react'
import {NavLink, Link, Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import 'react-table/react-table.css'

import {Flex, Grid, Subtitle} from '../../components'

// actions
import {toggleFooter} from '../../actions/toggleFooterAction.js'

const StyledSubtitle = styled(Subtitle)`
  text-align: left;
  font-color: #2196f3;
  font-size: 1.2rem;
`
const StyledGrid = styled(Grid)`
  grid-template-columns: 100%;
  grid-template-areas: 'content';

  min-height: 600px;

  @media (min-width: 640px) {
    grid-template-areas: 'sidebar content';
  }
`
const StyledNavLink = styled(NavLink)`
  padding: 0 0 20px 0;
  &:hover {
    color: green;
  }
`

class Created extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  render() {
    return (
      <StyledGrid>
        <Grid gridarea="content">
          <h1>Use react virtualized here</h1>
          <NavLink to="/courses/my-courses/created/edit">
            <h1>edit course</h1>
          </NavLink>
        </Grid>
      </StyledGrid>
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
        toggleFooter
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Created)
