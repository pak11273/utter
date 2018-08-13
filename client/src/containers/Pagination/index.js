import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {Grid, Form, Pagination, Segment} from 'semantic-ui-react'
import {Flex, Box, Text} from '../../components'

class PaginationContainer extends Component {
  state = {
    activePage: 5,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
    totalPages: 20
  }

  handleCheckboxChange = (e, {checked, name}) =>
    this.setState({[name]: checked})

  handleInputChange = (e, {name, value}) => this.setState({[name]: value})

  handlePaginationChange = (e, {activePage}) => this.setState({activePage})

  render() {
    const {
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages
    } = this.state

    return (
      <Grid columns={1}>
        <Grid.Column>
          <Pagination
            activePage={activePage}
            boundaryRange={boundaryRange}
            onPageChange={this.handlePaginationChange}
            size="mini"
            siblingRange={siblingRange}
            totalPages={totalPages}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            ellipsisItem={showEllipsis ? undefined : null}
            firstItem={showFirstAndLastNav ? undefined : null}
            lastItem={showFirstAndLastNav ? undefined : null}
            prevItem={showPreviousAndNextNav ? undefined : null}
            nextItem={showPreviousAndNextNav ? undefined : null}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default PaginationContainer
